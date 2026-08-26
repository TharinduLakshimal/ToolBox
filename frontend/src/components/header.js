import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const syncCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem('toolCart') || '[]');
    setCartCount(storedCart.length);
  };

  const userInitial = (localStorage.getItem('email') || 'U').charAt(0).toUpperCase();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(storedRole || '');
    syncCartCount();
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    window.addEventListener('cartUpdated', syncCartCount);
    return () => window.removeEventListener('cartUpdated', syncCartCount);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setRole('');
    setMenuOpen(false);
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
    profileWrap: {
      position: 'relative',
    },
    profileButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(148, 163, 184, 0.25)',
      borderRadius: '999px',
      padding: '6px 12px 6px 8px',
      cursor: 'pointer',
      color: '#fff',
      boxShadow: '0 6px 18px rgba(15, 23, 42, 0.14)',
    },
    avatar: {
      width: '34px',
      height: '34px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '800',
      fontSize: '15px',
      border: '2px solid rgba(255,255,255,0.6)',
    },
    profileMenu: {
      position: 'absolute',
      top: 'calc(100% + 12px)',
      right: 0,
      minWidth: '210px',
      background: '#fff',
      borderRadius: '18px',
      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.18)',
      border: '1px solid rgba(148, 163, 184, 0.18)',
      overflow: 'hidden',
      zIndex: 10,
    },
    menuItem: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: 'transparent',
      border: 'none',
      color: '#0f172a',
      textAlign: 'left',
      padding: '12px 16px',
      fontWeight: '700',
      cursor: 'pointer',
      fontSize: '14px',
    },
    divider: {
      height: '1px',
      background: '#e2e8f0',
      margin: '4px 0',
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
          <div ref={menuRef} style={styles.profileWrap}>
            <button style={styles.profileButton} onClick={() => setMenuOpen((prev) => !prev)} aria-label="Open profile menu">
              <span style={styles.avatar}>{userInitial}</span>
            </button>

            {menuOpen && (
              <div style={styles.profileMenu}>
                <button
                  style={styles.menuItem}
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/account');
                  }}
                >
                  <span>👤</span>
                  <span>My Account</span>
                </button>
                <button
                  style={styles.menuItem}
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/my-rentals');
                  }}
                >
                  <span>📦</span>
                  <span>My Rentals</span>
                </button>
                <div style={styles.divider} />
                <button
                  style={{ ...styles.menuItem, color: '#ef4444' }}
                  onClick={handleLogout}
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
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
