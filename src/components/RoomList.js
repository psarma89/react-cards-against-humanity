import React, {Component} from 'react';

const RoomList = (props) =>{
  const rooms = props.rooms.map(room => {
    return(
      <a className="item" key={room.id} onClick={() => props.handleRoomSelect(room.id)}>
        <i className="game icon"></i>
        {room.title}
      </a>
    )
  })

  return (
    <div className="ui inverted vertical pointing menu">
      {rooms}
    </div>

  );
}

export default RoomList
