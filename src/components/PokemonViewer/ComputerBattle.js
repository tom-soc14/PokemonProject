//PLAN
// Import attack value from random pokemon
// When user clicks attack we do health - attack value

import { useState } from 'react';

function ComputerBattle({ attack }) {
    const [health, setHealth] = useState(400);


function onAttack() {
    const newHealth = health - attack;
    setHealth(newHealth);

}




    return (
        <div>
        <h1>Computer Health</h1>
        <p>{health > 0 ? health : 'You win!'}</p>
        <p>{health} </p>
        
        </div>
    ) 
}

export default ComputerBattle;