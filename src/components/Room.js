import React, {Component} from 'react'
import {RoomAdapter} from './Adapter'

class Room extends Component{
  constructor(props){
    super(props)

    RoomAdapter.connectRoom(props.match.params.id)
    .then(resp => resp.json())
    .then(resp => console.log(resp))

  }



  render(){
    return(
      <div>

      </div>
    )
  }
}

export default Room
