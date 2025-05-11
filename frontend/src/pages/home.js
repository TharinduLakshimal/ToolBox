import React, { useEffect, useState } from 'react';

const tools = [
  { id: 1, name: 'Drill Machine', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjGHDNixee6Xyo28dBH5ZTH4fh5pq0rMymw&s' },
  { id: 2, name: 'Angle Grinder', image: 'https://m.media-amazon.com/images/I/51Pl3EH0TWL._AC_SL1000_.jpg' },
  { id: 3, name: 'Electric Saw', image: 'https://slon-cdn.zenegal.store/products/4849/800-electric-circular-saw-16805109919367.jpg' },
  { id: 4, name: 'Hammer Drill', image: 'https://slon-cdn.zenegal.store/products/4838/800-hammer-drill-16805091544039.jpg' },
  { id: 5, name: 'Tile Cutter', image: 'https://m.media-amazon.com/images/I/61ucL9sPCQL.jpg' },
  { id: 6, name: 'Drill Machine', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMjGHDNixee6Xyo28dBH5ZTH4fh5pq0rMymw&s' },
  { id: 7, name: 'Angle Grinder', image: 'https://m.media-amazon.com/images/I/51Pl3EH0TWL._AC_SL1000_.jpg' },
  { id: 8, name: 'Electric Saw', image: 'https://slon-cdn.zenegal.store/products/4849/800-electric-circular-saw-16805109919367.jpg' },
  { id: 9, name: 'Hammer Drill', image: 'https://slon-cdn.zenegal.store/products/4838/800-hammer-drill-16805091544039.jpg' },
  { id: 10, name: 'Tile Cutter', image: 'https://m.media-amazon.com/images/I/61ucL9sPCQL.jpg' },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % tools.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to ToolBox</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
      </div>

      {/* Slider Banner */}
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <img
          src={filteredTools[current]?.image}
          alt={filteredTools[current]?.name}
          style={{ width: '400px', height: '200px', borderRadius: '10px', objectFit: 'cover' }}
        />
        <h2 style={{ marginTop: '10px' }}>{filteredTools[current]?.name}</h2>
      </div>

      {/* Horizontal Tool List */}
      <h3>Rent Tools</h3>
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          padding: '10px 0',
        }}
      >
        {filteredTools.map(tool => (
          <div
            key={tool.id}
            style={{
              minWidth: '180px',
              marginRight: '15px',
              background: '#f5f5f5',
              padding: '10px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={tool.image}
              alt={tool.name}
              style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
            />
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{tool.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
