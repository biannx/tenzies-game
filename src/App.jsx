import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Dice from './components/dice';
import Confetti from 'react-confetti'
import './App.css';

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false)
  const [dieClicked, setDieClicked] = useState(false);
  const [rollCount, setRollCount] = useState(0)

  // timer
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    let intervalId;
    if (dieClicked && !gameWon) {
      intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [dieClicked, gameWon]);

  // check if all dice were held and have the same value, then the player wins
  useEffect(() => {
    const allAreHeld = dice.every(die => die.isHeld)
    const allHaveSameValue = dice.every(die => die.value === dice[0].value)
    if (allAreHeld && allHaveSameValue) {
      setTenzies(true)
      setGameWon(true);
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
    setDieClicked(true);
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
      // start timer when the first roll is made
      if (!dieClicked) {
        setDieClicked(true);
      }
    } else {
      setTenzies(false)
      setDieClicked(false);
      setDice(allNewDice())
      setElapsedTime(0);
      setGameWon(false);
    }
    setRollCount(prevRoll => prevRoll + 1);
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
      <div className="trackers">
        <div><strong>Time:</strong> {elapsedTime}s</div>
        <div><strong>No. of rolls:</strong> {rollCount}</div>
      </div>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.
      </p>
      <p className="note">The timer only starts when a die is clicked or rolled.</p>
      <div className="dice-container">{diceElements}</div>
      <button type="button" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
