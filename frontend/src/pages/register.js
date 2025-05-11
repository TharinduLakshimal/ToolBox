import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('user');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        name,
        email,
        password,
        phone,
        address,
        role,
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="owner">Tool Owner</option>
        </select>
        <button type="submit">Register</button>
      </form>

      <style>{`
        .register-page {
          max-width: 500px;
          margin: 60px auto;
          padding: 40px;
          background: #fdfdfd;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          text-align: center;
        }

        .register-page h2 {
          color: #2c3e50;
          font-size: 2.2rem;
          margin-bottom: 25px;
        }

        .register-page form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .register-page input,
        .register-page select {
          padding: 12px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: 0.3s;
        }

        .register-page input:focus,
        .register-page select:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 6px rgba(52, 152, 219, 0.5);
        }

        .register-page button {
          padding: 12px;
          background: #27ae60;
          color: white;
          font-weight: bold;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .register-page button:hover {
          background: #1e8449;
        }
      `}</style>
    </div>
  );
}

export default Register;
