import React, {Component} from 'react';
import {RoomAdapter} from './Adapter';
import RoomList from './RoomList';
import RoomDetail from './RoomDetail';


const sampleRooms = [{
  id: 1,
  title: "Sample Room",
  players: [{userId: 1, score: 0}, {userId: 2, score: 0}, {userId: 3, score: 0}],
  currentTurn: {
    userId: 2,
    blackCard: 2,
    pickedCards: {
      1: [14],
      3: [3]
    },
    currentHands: {
      1: [7,8,9,10,11],
      2: [12,20,21,22,23],
      3: [1,2,30,31,32]
    }
  },
  graveYard: {
    blackCards: [1],
    whiteCards: [6]
  }
},
{
  id: 2,
  title: "Sample Room 2",
  players: [{userId: 1, score: 0}, {userId: 2, score: 0}, {userId: 3, score: 0}],
  currentTurn: {
    userId: 2,
    blackCard: 2,
    pickedCards: {
      1: [14],
      3: [3]
    },
    currentHands: {
      1: [7,8,9,10,11],
      2: [12,20,21,22,23],
      3: [1,2,30,31,32]
    }
  },
  graveYard: {
    blackCards: [1],
    whiteCards: [6]
  }
}
]

class Home extends Component{
  constructor(){
    super()

    this.state = {
      rooms: sampleRooms,
      selectedRoom: sampleRooms[0]
    }

    // RoomAdapter.getRooms().then(resp => {
    //   return this.setState({rooms: resp, selectedRoom: resp[0]})
    // })
      //return RoomAdapter.getRooms()
  }

  handleRooms = () => {
    if(this.state.rooms.length>0){
      return (<RoomList rooms={this.state.rooms} handleRoomSelect={this.handleRoomSelect} />)
    }
    // this.state.rooms.map((room) => <h1>hello</h1>)
  }

  handleRoomSelect = id => {
    const selectedRoom = this.state.rooms.find(room => room.id === parseInt(id))
    this.setState({ selectedRoom });
  }

  // handleRoomRedirect = id => {
  //   const selectedRoom = this.state.rooms.find(room => room.id === parseInt(id))
  //   this.setState({ selectedRoom });
  // }

  render(){
    //console.log(this.state.rooms)
    return(
      <div className="ui grid">
        <div className="four wide column">
          {this.handleRooms()}
        </div>
        <div className="twelve wide column">
          <RoomDetail room={this.state.selectedRoom} handleRoomRedirect={this.handleRoomRedirect}/>
        </div>
      </div>
    )
  }
}

export default Home
