import { useEffect, useState } from 'react';
import './App.css';
import Die from './Components/Die';
import Confetti from 'react-confetti';

function App() {

const [diceCount, setDiceCount] = useState(0)
const [isWon, setIsWon] = useState(false)
const [diceChoosen , setDiceChoosen] = useState(getDiceState()) 
const [newDice, setNewDice] = useState(getNewDices())


//utility function to get Random number
function getRandomNumber(){
  let rand = Math.floor((Math.random() * 6) + 1)
  return rand
}

//utility function to initialise state (diceChoosen)
function getNewDices(){
  let diceArray = []
  for(let i=0; i<10; i++){
    diceArray.push(<Die 
                    key = {i+1}
                    id = {i+1}
                    isClicked = {false}
                    diceNumber = {getRandomNumber()}
                    handleClick = {diceToggle}
                  />
                  )
      }
return diceArray
}

//utility function to initialise state (diceChoosen)
function getDiceState(){
  let diceStateArray = []
    for(let i=1; i<=10; i++){
        diceStateArray.push(false)
      }
return diceStateArray
}

//dice toggle functionality - when user click the die (div)
function diceToggle(id){
    setDiceChoosen((prevDiceChoosen => {
      return prevDiceChoosen.map((diceState,index) => {
        return id === index+1 ? !diceState : diceState
      })
    }))
}

// to re-render the Die Component
useEffect(() => {
    setNewDice((prevDice) => {
      return prevDice.map((dice,index) =>{
        return <Die 
                    key = {dice.props.id}
                    id = {dice.props.id}
                    isClicked = {diceChoosen[index]}
                    diceNumber = {dice.props.diceNumber}
                    handleClick = {diceToggle}
                  />
      })
    })
}, [ diceChoosen ])

// to end the game if the game is over
useEffect(() => {
      if(newDice.every((dice) => dice.props.isClicked === true) && newDice.every((dice) => dice.props.diceNumber === newDice[0].props.diceNumber)){
          setIsWon(true)
        }
},[ newDice ])


// wehen {roll} button clicked
function modifyDice(){
    setDiceCount(diceCount + 1)
    setNewDice((prevDiceChoosen) => {
      return prevDiceChoosen.map((dice) => {
        return dice.props.isClicked ? <Die 
                    key = {dice.props.id}
                    id = {dice.props.id}
                    isClicked = {dice.props.isClicked}
                    diceNumber = {dice.props.diceNumber}
                    handleClick = {diceToggle}
                  /> : <Die 
                    key = {dice.props.id}
                    id = {dice.props.id}
                    isClicked = {dice.props.isClicked}
                    diceNumber = {getRandomNumber()}
                    handleClick = {diceToggle}
                  />
      })
    })
}

// when resetGame button clicked
function generateNewDice(){
  setIsWon((prev => !prev))
  setNewDice(getNewDices())
  setDiceChoosen(getDiceState())
  setDiceCount(0)
}

  return (
    <div className='container'>
      <h1 className='title'>Tenzies</h1>
      <p className='desc'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-component">
        {newDice}
      </div>
      {isWon ? <>
                <p className='result'>You won in <span className='count'>{diceCount}</span>  tries.</p>
                <button onClick={generateNewDice}>Reset Game</button> 
               <Confetti width={window.innerWidth} height={window.innerHeight} /> </>
      : <button onClick={modifyDice}>Roll</button>}
    </div>
  );
}

export default App;
