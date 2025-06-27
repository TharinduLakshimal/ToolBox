import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check login status and user role when route changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(storedRole || '');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove role on logout
    setIsLoggedIn(false);
    setRole('');
    navigate('/login');
  };

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: '#282c34',
      color: 'white',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    button: {
      backgroundColor: 'white',
      color: '#282c34',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 12px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo} onClick={() => navigate('/')}>
        ToolBox
      </div>
      <nav style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/tool" style={styles.link}>Tools</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>

        {/* Show Dashboard if user is admin */}
        {role === 'ADMIN' && (
            <button style={styles.button} onClick={() => navigate('/admin')}>
            Admin Dashboard
          </button>
        )}

        {isLoggedIn ? (
          <>
            <button style={styles.button} onClick={() => navigate('/account')}>
              My Account
            </button>
            <button style={styles.button} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button style={styles.button} onClick={() => navigate('/login')}>
              Login
            </button>
            <button style={styles.button} onClick={() => navigate('/register')}>
              Register
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
