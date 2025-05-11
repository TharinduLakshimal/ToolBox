import React from 'react';


const Header = () => {
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
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    linkHover: {
      color: '#61dafb',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>ToolBox</div>
      <nav style={styles.navLinks}>
        <a href="/" style={styles.link}>Home</a>
        <a href="/tool" style={styles.link}>Tools</a>
        <a href="/about" style={styles.link}>About</a>
        <a href="/contact" style={styles.link}>Contact</a>
        <a href="/login" style={styles.link}>Login</a>
        <a href="/register" style={styles.link}>Register</a>
      </nav>
    </header>
  );
};

export default Header;
