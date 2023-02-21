import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Dice from './components/dice';
import Confetti from 'react-confetti'
import './App.css';

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(true)

  useEffect(() => {
    const allAreHeld = dice.every(die => die.isHeld)
    const allHaveSameValue = dice.every(die => die.value === dice[0].value)

    if (allAreHeld && allHaveSameValue) {
      setTenzies(true)
      console.log("you won!")
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      let roll = generateNewDie();
      newDice.push(roll);
    }
    return newDice;
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }
  
  const diceElements = dice.map((die) => {
    return (
      <Dice
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    )
  });

  return (
    <main className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
