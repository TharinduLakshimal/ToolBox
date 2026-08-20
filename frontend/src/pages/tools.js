import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Tool = () => {
  const [tools, setTools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/tools/getTools')
      .then(response => {
        setTools(response.data);
      })
      .catch(error => {
        console.error("Error fetching tools:", error);
      });
  }, []);

  const handleRentClick = (id) => {
    navigate(`/rent/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', textAlign: 'center' }}>Available Tools for Rent</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {tools.map((tool) => (
          <div
            key={tool.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '21px',
              width: '200px',
            }}
          >
            <img
              src={tool.imageUrl}
              alt={tool.name}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            <h2>{tool.name}</h2>
            <p>Rs. {tool.pricePerDay}/day</p>
            <button onClick={() => handleRentClick(tool.id)} style={{ padding: '10px', backgroundColor: '#282c34', color: 'white', border: 'none', borderRadius: '4px' }}>
              Rent Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tool;
