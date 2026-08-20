import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    console.log(email);
    console.log(token);
    
    if (!token || !email) {
      setErrorMessage('You must be logged in to view this page.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    axios
      .get('http://localhost:8080/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response?.data?.message || 'Could not load user data. Please log in again.');
        setLoading(false);
        setTimeout(() => navigate('/login'), 2000);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="account-page">
        <div className="loading-message">Loading user data...</div>
        <style>{styles}</style>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="account-page">
        <div className="error-message">{errorMessage}</div>
        <style>{styles}</style>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="account-page">
        <div className="error-message">No user data found.</div>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="account-page">
      <h2>My Account</h2>
      <div className="user-details">
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
        <p><strong>Role:</strong> {user.role || 'N/A'}</p>
        <p><strong>Member Since:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>
      <p>
        <button onClick={() => { localStorage.clear(); navigate('/login'); }}>Logout</button>
      </p>
      <style>{styles}</style>
    </div>
  );
}

const styles = `
  .account-page {
    max-width: 400px;
    margin: 80px auto;
    padding: 40px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .account-page h2 {
    color: #2c3e50;
    margin-bottom: 25px;
    font-size: 2rem;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: left;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  .user-details p {
    margin: 0;
    font-size: 1rem;
    color: #2c3e50;
  }

  .account-page button {
    padding: 12px;
    background-color: #e74c3c;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
  }

  .account-page button:hover {
    background-color: #c0392b;
  }

  .error-message, .loading-message {
    color: #e74c3c;
    font-size: 1rem;
    margin-top: 15px;
  }
`;

export default Account;