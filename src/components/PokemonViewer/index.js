import { useState, useEffect } from 'react';

function PokemonViewer({ id }) {
  const [poke, setPoke] = useState('')


  useEffect(() => {
    async function getPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        headers: { accept: "application/json"}
      });
      const data = await response.json();
      setPoke(data);
    }
    getPokemon();
    console.log(poke.name);
  }, [id])

  return <div className="pokemon-viewer"></div>;
}



export default PokemonViewer;
