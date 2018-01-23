import React, {Component} from 'react';
import {RoomAdapter} from './Adapter';
import RoomList from './RoomList';
import RoomDetail from './RoomDetail';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');


class Home extends Component{
  constructor(){
    super()
    this.state = {
      rooms: [],
      selectedRoom: []
    }
    var io = sailsIOClient(socketIOClient);
    io.sails.useCORSRouteToGetCookie = false;
    io.sails.url = 'http://localhost:1337';
    io.socket.get('/api/v1/rooms', (data, jwr) => {
      io.socket.on('new_entry', (entry) => {
        console.log(entry)
        this.setState({rooms: [...this.state.rooms, entry]})
      })
    })

    RoomAdapter.getRooms().then(resp => {
      console.log(resp)
      this.setState({rooms: resp, selectedRoom: [resp[0]]}, () => console.log(this.state))
    })
  }

  handleRooms = () => {
    if(this.state.rooms.length>0){
      return (<RoomList rooms={this.state.rooms} handleRoomSelect={this.handleRoomSelect} />)
    } else{
      return (<h2>No Rooms Available</h2>)
    }
  }

  handleRoomSelect = id => {
    const selectedRoom = this.state.rooms.find(room => room.id === id)
    this.setState({ selectedRoom: [selectedRoom] });
  }

  render(){
    return(
      <div className="ui grid">
        <div className="four wide column">
          <Link to="/room/create"
            className="ui labeled icon button">
            <i className="plus icon"></i>
            Create Room
          </Link>

          {this.handleRooms()}
        </div>
        {this.state.rooms.length > 0 && this.state.selectedRoom.length > 0 ?
          <div className="twelve wide column">
            <RoomDetail room={this.state.selectedRoom[0]} />
          </div> : null
        }
      </div>
    )
  }
}

export default Home
