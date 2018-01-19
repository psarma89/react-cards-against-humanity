import React, {Component} from 'react'

const RoomCard = (props) =>{
  return(
    <div>
      <h1>{props.room.name}</h1>
      <h1>{props.room.id}</h1>
      
    </div>
  )
}

export default RoomCard
