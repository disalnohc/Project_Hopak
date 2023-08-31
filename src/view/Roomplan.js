import React from 'react';
import AdminMenu from './AdminMenu';
import { Link } from 'react-router-dom';
import '../style/Roomplan.css';

const Roomplan = () => {
  const rooms = [
    { id: 1, name: 'Room A', status: 'Occupied' },
    { id: 2, name: 'Room B', status: 'Available' },
    { id: 3, name: 'Room C', status: 'Cleaning' },
    { id: 4, name: 'Room A', status: 'Occupied' },
    { id: 5, name: 'Room B', status: 'Available' },
    { id: 6, name: 'Room C', status: 'Cleaning' },
  ];

  return (
    <div className="app">
      <div className="header">
        <h2 className="subtitle">ผังห้องพัก</h2>
      </div>
      <AdminMenu />
      <div className="search">
        <input
          type="text"
          placeholder="ค้นหา..."
          className="search-input"
        />
      </div>
      <div className="room-list">
  <div className="row">
    {rooms.map((room, index) => (
      <Link to={`/room/${room.id}`} key={room.id} className={`room-box ${room.status.toLowerCase()}`}>
        <h3>{room.name}</h3>
        <p className="status">Status: {room.status}</p>
      </Link>
    ))}
  </div>
</div>
    </div>
  );
};

export default Roomplan;
