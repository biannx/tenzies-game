import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import reactLogo from './assets/react.svg';
import Dice from './components/dice';
import './App.css';

function App() {
  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      let roll = {
        value: Math.ceil(Math.random() * 6),
        isHeld: true,
        id: nanoid()
      };
      newDice.push(roll);
    }
    return newDice;
  }

  const diceElements = dice.map((die) => {
    return <Dice key={die.id} value={die.value} isHeld={die.isHeld} />;
  });

  function rollDice() {
    setDice(allNewDice());
  }

  return (
    <main className="App">
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
