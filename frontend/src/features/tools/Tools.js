import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

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
          <ProductCard
            key={tool.id}
            product={tool}
            onClick={() => handleRentClick(tool.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Tool;
