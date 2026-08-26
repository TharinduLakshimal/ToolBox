import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const syncCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem('toolCart') || '[]');
    setCartCount(storedCart.length);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(storedRole || '');
    syncCartCount();
  }, [location]);

  useEffect(() => {
    window.addEventListener('cartUpdated', syncCartCount);
    return () => window.removeEventListener('cartUpdated', syncCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole('');
    navigate('/login');
  };

  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 32px',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
      color: 'white',
    },
    logo: {
      fontSize: '28px',
      fontWeight: '900',
      cursor: 'pointer',
      letterSpacing: '-0.04em',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    link: {
      color: '#e2e8f0',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.3s ease',
    },
    button: {
      background: '#fff',
      color: '#111827',
      border: 'none',
      borderRadius: '12px',
      padding: '10px 14px',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: '0 6px 18px rgba(15, 23, 42, 0.12)',
    },
    cartButton: {
      position: 'relative',
      background: '#0ea5e9',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      padding: '10px 14px',
      fontWeight: '700',
      cursor: 'pointer',
    },
    badge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: '#f97316',
      color: '#fff',
      borderRadius: '999px',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: '800',
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

        <button style={styles.cartButton} onClick={() => navigate('/cart')}>
          Cart
          {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </button>

        {role === 'ADMIN' && (
          <button style={styles.button} onClick={() => navigate('/admin')}>
            Admin
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
