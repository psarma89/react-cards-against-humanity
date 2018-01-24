import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {AuthAdapter} from './Adapter';
import {RoomAdapter} from './Adapter';

const RoomDetail = ({room}) => {
  // console.log(room)
  let players;

  if (room && room.roomData.players.length > 0) {
    players = room.roomData.players.map(player => {
      return <li key={player.userId}>{player.username}</li>
    })
  }else {
    players = <li>No one Here yet</li>
  }

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
