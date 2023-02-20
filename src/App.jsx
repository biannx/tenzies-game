import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Dice from './components/dice'
import './App.css'

function App() {
  function allNewDice() {
    let dice=[];
    for(let i=0; i < 10; i++){
      let roll = Math.ceil(Math.random() * 6);
      dice.push(roll)
    }
    return dice
  }

  console.log(allNewDice())
  return (
    <main className="App">
      <div className="dice-container">
        <Dice value={1} />
        <Dice value={2} />
        <Dice value={3} />
        <Dice value={4} />
        <Dice value={5} />
        <Dice value={6} />
        <Dice value={7} />
        <Dice value={8} />
        <Dice value={9} />
        <Dice value={10} />
      </div>
    </main>
  )
}

export default App
