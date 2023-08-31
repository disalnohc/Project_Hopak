import React from 'react';
import { useParams } from 'react-router-dom';

const RoomDetail = () => {
  const { id } = useParams(); 

  const rooms = [
    { id: 1, name: 'Room A', status: 'Occupied', details: 'This room is occupied.' },
    { id: 2, name: 'Room B', status: 'Available', details: 'This room is available for booking.' },
    { id: 3, name: 'Room C', status: 'Cleaning', details: 'This room is currently being cleaned.' },
  ];

  const room = rooms.find(room => room.id === parseInt(id));

  if (!room) {
    return <div>Room not found</div>; 
  }

  return (
    <div className="room-detail">
      <h2>{room.name}</h2>
      <p>Status: {room.status}</p>
      <p>{room.details}</p>
    </div>
  );
};

export default RoomDetail;
