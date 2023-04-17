import React, { useState } from "react";
import "./App.css";

import PokemonViewer from "../PokemonViewer";

function App() {
  const [id, setId] = useState(1);

  function handleClick() {
    // TODO: Task 2 - Set id to be random number between 1 and 151
   const randomNumber = Math.floor(Math.random() * 150) +1;
   setId(randomNumber);

   console.log(id);
  }

  return (
    <div className="App">
      {/* TODO: Task 2 -  call handleClick when button clicked */}
      <button onClick={handleClick}>Get Random Pokemon</button>
      {/* TODO: Task 2 -  hand down id as a prop */}
      <PokemonViewer id={id} />
    </div>
  );
}

export default App;
