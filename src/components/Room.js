import React, {Component} from 'react'
import {RoomAdapter} from './Adapter'

class Room extends Component{
  constructor(props){
    super(props)
    console.log("anything?")
    RoomAdapter.connectRoom(props.match.params.id)
    .then(resp => console.log(resp))

  }



  render(){
    return(
      <div>
        <h1>Testing</h1>
      </div>
    )
  }
}

export default Room
