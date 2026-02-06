import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminRentalDashboard from './AdminRentalDashboard';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('tools');

  const tabStyle = (tab) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: activeTab === tab ? '#007bff' : '#f1f1f1',
    color: activeTab === tab ? 'white' : '#333',
    border: 'none',
    borderRadius: '5px',
    marginRight: '10px'
  });

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>👑 Admin Control Panel</h1>

      {/* Tabs */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button style={tabStyle('tools')} onClick={() => setActiveTab('tools')}>🛠️ Tool Management</button>
        <button style={tabStyle('rentals')} onClick={() => setActiveTab('rentals')}>📋 Rental Management</button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'tools' && <AdminDashboard />}
        {activeTab === 'rentals' && <AdminRentalDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
