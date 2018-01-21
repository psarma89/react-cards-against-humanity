import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {AuthAdapter} from './Adapter';

const RoomDetail = ({room}) => {
  let players;
  if (room.players.length > 0) {
    players = room.players.map(player => {
      AuthAdapter.userInfo(player.id).then(resp => {
        return <li key={player.id}>{resp.username}</li>
      })
    })
  }else {
    players = <li>No one Here yet</li>
  }

  return room ? (
    <div className="ui segment inverted">
      <Link
        to={`/room/${room.id}`}
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
