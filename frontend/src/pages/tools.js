import React from 'react';

const tools = [
  {
    id: 1,
    name: 'Drill Machine',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjGHDNixee6Xyo28dBH5ZTH4fh5pq0rMymw&s',
    price: 'Rs. 2,000/day',
  },
  {
    id: 2,
    name: 'Angle Grinder',
    image: 'https://m.media-amazon.com/images/I/51Pl3EH0TWL._AC_SL1000_.jpg',
    price: 'Rs. 1,500/day',
  },
  {
    id: 3,
    name: 'Electric Saw',
    image: 'https://slon-cdn.zenegal.store/products/4849/800-electric-circular-saw-16805109919367.jpg',
    price: 'Rs. 2,500/day',
  },
  {
    id: 1,
    name: 'Drill Machine',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjGHDNixee6Xyo28dBH5ZTH4fh5pq0rMymw&s',
    price: 'Rs. 2,000/day',
  },
  {
    id: 2,
    name: 'Angle Grinder',
    image: 'https://m.media-amazon.com/images/I/51Pl3EH0TWL._AC_SL1000_.jpg',
    price: 'Rs. 1,500/day',
  },
  {
    id: 3,
    name: 'Electric Saw',
    image: 'https://slon-cdn.zenegal.store/products/4849/800-electric-circular-saw-16805109919367.jpg',
    price: 'Rs. 2,500/day',
  }
  // Add more tools as needed
];

const Tool = () => {
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
              src={tool.image}
              alt={tool.name}
              style={{ width: '100%', borderRadius: '4px' }}
            />
            <h2>{tool.name}</h2>
            <p>{tool.price}</p>
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
