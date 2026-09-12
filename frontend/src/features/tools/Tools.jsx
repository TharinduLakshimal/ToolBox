import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import ProductCard from '../../components/ProductCard';

const Tool = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/api/tools/getTools')
      .then((response) => {
        setTools(response.data);
      })
      .catch((err) => {
        console.error('Error fetching tools:', err);
        setError(err.extractedMessage || 'Failed to load tools catalog.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRentClick = (id) => {
    navigate(`/rent/${id}`);
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: '#475569' }}>
        Loading tools catalog...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: '#dc2626' }}>
        {error}
      </div>
    );
  }

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
