import { useState, useEffect } from 'react';
import ComputerBattle from "./ComputerBattle";

function PokemonViewer() {

   
  const [threePoke, setthreepoke] = useState(null);

  const [bulbMove, setBulbMove] = useState(null);
  const [charMove, setCharMove] = useState(null);
  const [squrMove, setSqurMove] = useState(null);

  // State needed to be able to individually select one of the above set of moves:
const [selectedMoves, setSelectedMoves] = useState([]);

  // State to handle which picture is clicked, separate state needed as it's an individual and so can't determine array position.
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  
  //Below are all the calls to the Pokemon Moves, grouped together for each respective
  //pokemon

const bulbMoveUrl = [
  `https://pokeapi.co/api/v2/move/13`,
  `https://pokeapi.co/api/v2/move/31`,
  `https://pokeapi.co/api/v2/move/37`,
  `https://pokeapi.co/api/v2/move/475`
]

const charMoveUrl = [
  `https://pokeapi.co/api/v2/move/22`,
  `https://pokeapi.co/api/v2/move/37`,
  `https://pokeapi.co/api/v2/move/38`,
  `https://pokeapi.co/api/v2/move/65`
]

const squrMoveUrl = [
  `https://pokeapi.co/api/v2/move/10`,
  `https://pokeapi.co/api/v2/move/37`,
  `https://pokeapi.co/api/v2/move/50`,
  `https://pokeapi.co/api/v2/move/262`
]

//As We have multiple URLS we can make use of the map functionality

useEffect(() => {
  const fetchData = async () => {
    const data = await Promise.all(bulbMoveUrl.map(url => fetch(url).then(response => response.json())));
    setBulbMove(data);
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    const data = await Promise.all(charMoveUrl.map(url => fetch(url).then(response => response.json())));
    setCharMove(data);
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    const data = await Promise.all(squrMoveUrl.map(url => fetch(url).then(response => response.json())));
    setSqurMove(data);
  };

  fetchData();
}, []);


//Below is a different way of calling multiple API URLS at once
//Instead of mapping we are just doing await Promise.all twice, one to call
//The second to configure to .JSON


useEffect(() => {
  async function getThreePokemon() {
    const [firstpokemonObj, secondpokemonObj, thirdpokemonObj] = await Promise.all( [
      fetch(`https://pokeapi.co/api/v2/pokemon/1/`),
      fetch(`https://pokeapi.co/api/v2/pokemon/4/`),
      fetch(`https://pokeapi.co/api/v2/pokemon/7/`),
    ]);

    const [bulbasaur, charmander, squirtle] = await Promise.all([
      firstpokemonObj.json(),
      secondpokemonObj.json(),
      thirdpokemonObj.json(),
    ])


    setthreepoke([bulbasaur, charmander, squirtle]);
    
  }
  getThreePokemon();
}, [])



const handleClick = (pokemon) => {
  setSelectedPokemon(pokemon);
}

// useEffect to set the moves to the selectedPokemon from the appropriate array

useEffect(() => {
  if (selectedPokemon) {
    let movesArray = [];
    if (selectedPokemon.name === 'bulbasaur') {
      movesArray = bulbMove;
    } else if (selectedPokemon.name === 'charmander') {
      movesArray = charMove;
    } else if (selectedPokemon.name === 'squirtle') {
      movesArray = squrMove;
    }

    setSelectedMoves(movesArray);
  } else {
    setSelectedMoves([]);
  }
}, [selectedPokemon])




  if (threePoke === null) {
    //Render a loading state while waiting for API
    return <div>Loading...</div>;
  }

  if (!threePoke) {
    //Render an error message if the data not available
    return <div>Error: Data not found</div>;
  }

function showMove() {
  console.log(selectedMoves[0].power);
}
  


  return (<div className="pokemon-viewer">
 

    <h1>Choose a Pokemon</h1>
    
    <img 
      src={threePoke[0].sprites.front_default} 
      alt={threePoke[0].name}
      onClick={() => handleClick(threePoke[0])} />
    <img 
      src={threePoke[1].sprites.front_default} 
      alt={threePoke[1].name}
      onClick={() => handleClick(threePoke[1])} />
    <img 
      src={threePoke[2].sprites.front_default} 
      alt={threePoke[2].name}
      onClick={() => handleClick(threePoke[2])} />


    {/* {selectedPokemon && (
      <div>
        <h2>{selectedPokemon.name}</h2>
      <div>
        {
          selectedMoves.map(moves => (
            <button key={moves.id} onClick={showMove}>{moves.name}</button>
          ))}
          </div>
          <ComputerBattle attacks={selectedMoves} />
        </div>
       
    )} */}


    {selectedMoves.map((move, index) => (
      <div key={move.id}>
        <button onClick={() => handleClickMove(move)}>
          {move.name}
        </button>
        {selectedMoves[index] === move && (
          <ComputerBattle attack={move.power} />
        )}
      </div>
    ))}
    </div>
  );
}

export default PokemonViewer;
