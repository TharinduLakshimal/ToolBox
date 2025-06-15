import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:8080/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        navigate('/login');
      });
  }, [navigate]);

  if (!user) {
    return <div style={{ padding: '20px' }}>Loading user data...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2>My Account</h2>
      <div style={cardStyle}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '30px',
  maxWidth: '600px',
  margin: '0 auto',
};

const cardStyle = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
};

export default Account;
