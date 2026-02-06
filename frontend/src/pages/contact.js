import React from 'react';

const Contact = () => {
  return (
    <div
      style={{
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Contact Us</h1>

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
        Have a question, need support, or just want to say hello? We're here to help! <br />
        Feel free to reach out to our team through any of the methods below.
      </p>

      <ul
        style={{
          fontSize: '1.1rem',
          lineHeight: '2',
          listStyleType: 'none',
          paddingLeft: '0',
          marginBottom: '30px',
        }}
      >
        <li>
          <strong> Email:</strong>{' '}
          <a href="mailto:support@toolbox.com">support@toolbox.com</a>
        </li>
        <li>
          <strong> Phone:</strong> +94 71 234 5678
        </li>
        <li>
          <strong>  Address:</strong> 123 Tool Street, Colombo, Sri Lanka
        </li>
      </ul>

      {/* Social & App Links */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Connect with us on:</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <a href="https://wa.me/94712345678" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/color/48/whatsapp--v1.png"
              alt="WhatsApp"
            />
          </a>
          <a href="https://www.facebook.com/toolbox.lk" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/color/48/facebook-new.png"
              alt="Facebook"
            />
          </a>
          <a href="mailto:support@toolbox.com">
            <img
              src="https://img.icons8.com/color/48/gmail--v1.png"
              alt="Email"
            />
          </a>
        </div>
      </div>

      {/* Find Our Location
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Find Our Location</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <iframe
            title="ToolBox Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63325.12404017771!2d79.8438225!3d6.9218389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596d3e218bfd%3A0xb05f3a2432588573!2sColombo!5e0!3m2!1sen!2slk!4v1719300000000!5m2!1sen!2slk"
            width="100%"
            height="300"
            style={{
              border: '0',
              borderRadius: '10px',
              maxWidth: '100%',
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div> */}

      <p style={{ fontStyle: 'italic', color: '#555' }}>
        We typically respond within 24 hours on business days.
      </p>
    </div>
  );
};

export default Contact;
