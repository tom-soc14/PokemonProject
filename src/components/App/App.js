import React, { useState } from "react";
import "./App.css";


import PokemonViewer from "../PokemonViewer/getPokemon";
import SquareMovement from "../SquareMovement/SquareMovement";


function App() {
  const [id, setId] = useState(1);
  // const [apiData, setApiData] = useState([]);



  function handleClick() {
    // TODO: Task 2 - Set id to be random number between 1 and 151
   const randomNumber = Math.floor(Math.random() * 150) +1;
   setId(randomNumber);

  }

  return (
    <div className="App">
     

      <PokemonViewer id={id} />
      <div className="canvas">
        <SquareMovement />
      </div>

    </div>
  );
}

export default App;
