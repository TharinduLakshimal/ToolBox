import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tool = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/tools/getTools')
      .then(response => {
        console.log(response);
        setTools(response.data);
      })
      .catch(error => {
        console.error("Error fetching tools:", error);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Available Tools for Rent</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              width: '300px',
            }}
          >
            <img
              src={tool.imageUrl}
              alt={tool.name}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            <h2>{tool.name}</h2>
            <p>Rs. {tool.pricePerDay}/day</p>
            <button style={{ padding: '10px', backgroundColor: '#282c34', color: 'white', border: 'none', borderRadius: '4px' }}>
              Rent Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tool;
