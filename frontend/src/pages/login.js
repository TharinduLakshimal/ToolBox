import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>

      <style>{`
        .login-page {
          max-width: 400px;
          margin: 80px auto;
          padding: 40px;
          background-color: white;
          border-radius: 15px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        .login-page h2 {
          color: #2c3e50;
          margin-bottom: 25px;
          font-size: 2rem;
        }

        .login-page form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .login-page input {
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          transition: 0.3s;
        }

        .login-page input:focus {
          border-color: #008cba;
          outline: none;
          box-shadow: 0 0 5px rgba(0, 140, 186, 0.5);
        }

        .login-page button {
          padding: 12px;
          background-color: #008cba;
          color: white;
          font-weight: bold;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-page button:hover {
          background-color: #005f75;
        }
      `}</style>
    </div>
  );
}

export default Login;
