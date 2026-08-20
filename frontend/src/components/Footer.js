import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#282c34',
      color: 'white',
      textAlign: 'center',
      padding: '20px 0',
      marginTop: 'auto',
    },
    text: {
      margin: 0,
      fontSize: '14px',
    },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
