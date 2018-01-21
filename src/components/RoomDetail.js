import React from 'react';
import { Redirect } from 'react-router';

const RoomDetail = ({room}) => {
  const players = room.players.map(player => <li key={player.id}>{player.userId}</li>)
  return room ? (
    <div
      onClick={() => <Redirect to={`/room/${parseInt(room.id)}`} />}
      className="ui segment inverted">
      <button className="ui right floated labeled icon button">
        <i className="right arrow icon"></i>
        Join
      </button>
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
