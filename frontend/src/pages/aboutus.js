import React from 'react';

const About = () => {
  return (
    <div
      style={{
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
        textAlign: 'justify',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', textAlign: 'center' }}>About ToolBox</h1>

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '20px' }}>
        <strong>ToolBox</strong> is a smart and reliable tool rental platform designed to connect
        individuals, DIYers, and professionals with the tools they need when they need them.
        Whether you're working on a home improvement project or a large scale construction job,
        ToolBox offers a wide selection of equipment at affordable rates, without the burden of
        ownership.
      </p>

      <h2 style={{ fontSize: '1.5rem', marginTop: '30px', textAlign: 'left' }}>Our Mission</h2>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        To simplify access to tools and equipment, empower project success, and promote a more
        sustainable future through shared resources.
      </p>

      <h2 style={{ fontSize: '1.5rem', marginTop: '30px', textAlign: 'left' }}>Why Choose ToolBox?</h2>
      <ul
        style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          paddingLeft: '20px',
          marginTop: '10px',
        }}
      >
        <li>  Wide range of tools for rent – from hand tools to power machines</li>
        <li>  User-friendly interface with seamless booking and payment process</li>
        <li>  Real-time availability and transparent pricing</li>
        <li>  Flexible rental durations pay only for what you use</li>
        <li>  Trusted by homeowners, contractors, and businesses alike</li>
      </ul>

      <h2 style={{ fontSize: '1.5rem', marginTop: '30px', textAlign: 'left' }}>Our Vision</h2>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        We envision a world where tools are no longer barriers but bridges enabling creativity,
        building dreams, and reducing waste through smart, shared access.
      </p>

      <p style={{ fontSize: '1.1rem', marginTop: '30px', fontStyle: 'italic', textAlign: 'center' }}>
        ToolBox – Rent Smart. Build Better.
      </p>
    </div>
  );
};

export default About;
