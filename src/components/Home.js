import React, {Component} from 'react'
import {RoomAdapter} from './Adapter'
import RoomCard from './RoomCard'

class Home extends Component{
  constructor(){
    super()

    this.state = {
      rooms: ''
    }

    RoomAdapter.getRooms().then(resp => {
      return this.setState({rooms: resp})
    })
      //return RoomAdapter.getRooms()
  }

  handleRooms = () => {
    if(this.state.rooms.length>0){
      return this.state.rooms.map((room) => <RoomCard key={room.id} room={room}/>)
    }
    // this.state.rooms.map((room) => <h1>hello</h1>)
  }


  render(){
    //console.log(this.state.rooms)
    return(
      <div>
        <p>Hello</p>
        {this.handleRooms()}
      </div>
    )
  }
}

export default Home
