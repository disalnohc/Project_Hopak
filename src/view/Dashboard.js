import React from 'react';
import AdminMenu from './AdminMenu';
import '../style/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="app">
      <div className="header">
        <h2 className="subtitle">Dashboard</h2>
      </div>
      <AdminMenu /> 
    </div>
  );
};

export default Dashboard;