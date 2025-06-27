import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      if (res.data.token && res.data.role) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('email', res.data.email); // optional

        alert('Login successful!');

        if (res.data.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setErrorMessage('Login failed: Invalid response from server');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <p style={{ marginTop: '15px' }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

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

        .login-page a {
          color: #008cba;
          text-decoration: none;
        }

        .login-page a:hover {
          text-decoration: underline;
        }

        .error-message {
          color: #e74c3c;
          font-size: 1rem;
          margin-top: 15px;
        }
      `}</style>
    </div>
  );
}

export default Login;
