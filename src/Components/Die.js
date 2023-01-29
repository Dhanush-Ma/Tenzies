import React from 'react'
import "../Stylesheets/Die.css"

const Die = (props) => {
  const styles = {
    backgroundColor: props.isClicked ? "#59E391" : "transparent"
  }
  return (
    <div onClick={() => props.handleClick(props.id)}  className='die' style={styles}>
      {props.diceNumber}
    </div>
  )
}

export default Die

