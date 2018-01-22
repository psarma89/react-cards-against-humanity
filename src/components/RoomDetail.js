import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {AuthAdapter} from './Adapter';
import {RoomAdapter} from './Adapter';

const RoomDetail = ({room}) => {
  let players;
  if (room.players.length > 0) {
    AuthAdapter.allUsers().then(resp => {
      players = room.players.map(player => {
        const foundPlayer = resp.find(r =>{
          return r.id === player.id
        })
        return foundPlayer ? <li key={player.id}>{foundPlayer.username}</li> : null
      })
    })
  }else {
    players = <li>No one Here yet</li>
  }

  // const handleJoin = (room) =>{
  //   AuthAdapter.connectRoom(room.id)
  //   return (<Redirect to={"/room/" + room.id} />)
  // }
  //onClick={() => handleJoin(room)}

  return room ? (
    <div className="ui segment inverted">
      <Link to={"/room/" + room.id}
        
        className="ui right floated labeled icon button">
        <i className="right arrow icon"></i>
        Join
      </Link>
      <h3>{room.title}</h3>
      <h4>Friends In Room</h4>
      <ul>
        {players}
      </ul>
    </div>
  ) :
  (
    <div className="ui segment inverted">Pick a room...</div>
  )
}

export default RoomDetail;
