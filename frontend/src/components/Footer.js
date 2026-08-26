import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      background: 'linear-gradient(135deg, #0f172a 0%, #111827 100%)',
      color: 'white',
      padding: '36px 20px 26px',
      marginTop: 'auto',
    },
    inner: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    },
    brand: {
      fontSize: '28px',
      fontWeight: '900',
      letterSpacing: '-0.05em',
    },
    text: {
      margin: 0,
      fontSize: '14px',
      color: '#cbd5e1',
    },
    links: {
      display: 'flex',
      gap: '18px',
      flexWrap: 'wrap',
      color: '#cbd5e1',
      fontSize: '14px',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.brand}>ToolBox</div>
        <div style={styles.links}>
          <span>Home</span>
          <span>Tools</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <p style={styles.text}>© {new Date().getFullYear()} ToolBox. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
