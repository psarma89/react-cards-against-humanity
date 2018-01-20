import React from 'react';

const RoomDetail = ({room}) => {
  return room ? (
    <div className="ui segment inverted">
      <h3>{room.title}</h3>
      
    </div>
  ) :
  (
    <div className="ui segment inverted">Loading...</div>
  )
}

export default RoomDetail;
