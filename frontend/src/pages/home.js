import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const categories = [
  { name: 'Construction', icon: '🧱' },
  { name: 'Electrical', icon: '⚡' },
  { name: 'Garden', icon: '🌿' },
  { name: 'Painting', icon: '🎨' },
];

const featureList = [
  { title: 'Fast booking', text: 'Book tools in minutes with instant confirmation.' },
  { title: 'Flexible pricing', text: 'Daily rental plans for every budget and project.' },
  { title: 'Trusted quality', text: 'Well-maintained equipment checked before every rental.' },
];

const Home = () => {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [current, setCurrent] = useState(0);
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTools();
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (search.trim() === '' && filteredTools.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % filteredTools.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [filteredTools, search]);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  const fetchAllTools = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/tools/getTools');
      setTools(response.data);
      setFilteredTools(response.data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const handleSearchChange = async (e) => {
    const keyword = e.target.value;
    setSearch(keyword);

    if (keyword.trim() === '') {
      setFilteredTools(tools);
    } else {
      try {
        const response = await axios.get(`http://localhost:8080/api/tools/search?keyword=${keyword}`);
        setFilteredTools(response.data);
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  };

  const handleRentClick = (id) => {
    if (!isLoggedIn) {
      alert('Please log in to rent tools.');
      navigate('/login');
    } else {
      navigate(`/rent/${id}`);
    }
  };

  const featuredProduct = filteredTools[current] || filteredTools[0];

  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px 60px' }}>
        <section
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0ea5e9 100%)',
            borderRadius: '32px',
            padding: '42px 40px',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '30px',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.18)',
            overflow: 'hidden',
          }}
        >
          <div style={{ color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.08)',
                color: '#dbeafe',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '18px',
                width: 'fit-content',
              }}
            >
              Smart rental platform
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', lineHeight: '1.05', margin: '0 0 18px', fontWeight: '900' }}>
              Rent the right tool for every job.
            </h1>

            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#e2e8f0', maxWidth: '620px', margin: '0 0 26px' }}>
              Upgrade your projects without buying expensive equipment. Access premium tools, flexible pricing, and fast delivery across your city.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <button
                onClick={() => navigate('/tool')}
                style={{
                  background: '#fff',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '15px 22px',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                }}
              >
                Browse tools
              </button>
              <button
                onClick={() => navigate('/contact')}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.35)',
                  borderRadius: '14px',
                  padding: '15px 22px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                Talk to sales
              </button>
            </div>

            <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', marginTop: '8px' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '800' }}>1200+</div>
                <div style={{ color: '#cbd5e1', fontSize: '14px' }}>Happy renters</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '800' }}>4.9/5</div>
                <div style={{ color: '#cbd5e1', fontSize: '14px' }}>Customer rating</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '800' }}>24/7</div>
                <div style={{ color: '#cbd5e1', fontSize: '14px' }}>Support</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '480px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '28px',
                padding: '18px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <img
                src={featuredProduct?.imageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80'}
                alt={featuredProduct?.name || 'Featured tool'}
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '22px', display: 'block' }}
              />
              <div
                style={{
                  marginTop: '18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ color: '#dbeafe', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Featured rental</div>
                  <div style={{ color: '#fff', fontSize: '26px', fontWeight: '800' }}>{featuredProduct?.name || 'Premium Equipment'}</div>
                </div>
                <button
                  onClick={() => featuredProduct && handleRentClick(featuredProduct.id)}
                  style={{
                    background: '#22c55e',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    padding: '12px 18px',
                    cursor: 'pointer',
                    fontWeight: '800',
                  }}
                >
                  Rent now
                </button>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px' }}>
            {categories.map((category) => (
              <div
                key={category.name}
                style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '22px 18px',
                  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.04)',
                  border: '1px solid rgba(148,163,184,0.12)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '34px', marginBottom: '10px' }}>{category.icon}</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{category.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: '46px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#0ea5e9', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}>Popular tools</div>
              <h2 style={{ margin: '8px 0 0', fontSize: '36px', color: '#0f172a' }}>{search.trim() === '' ? 'Featured equipment' : 'Search results'}</h2>
            </div>

            <div style={{ position: 'relative', minWidth: '300px', flex: '1', maxWidth: '420px' }}>
              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={handleSearchChange}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '16px 18px',
                  borderRadius: '14px',
                  border: '1px solid rgba(148, 163, 184, 0.35)',
                  background: '#fff',
                  fontSize: '16px',
                  outline: 'none',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.04)',
                }}
              />
            </div>
          </div>

          {filteredTools.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
              {filteredTools.map((tool) => (
                <ProductCard
                  key={tool.id}
                  product={tool}
                  onClick={() => handleRentClick(tool.id)}
                />
              ))}
            </div>
          ) : (
            <div style={{ background: '#fff', borderRadius: '20px', padding: '32px', textAlign: 'center', color: '#475569' }}>
              No tools found. Try a different keyword.
            </div>
          )}
        </section>

        <section style={{ marginTop: '50px', background: '#fff', borderRadius: '28px', padding: '30px 24px', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '26px' }}>
            <div style={{ color: '#0ea5e9', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}>Why choose us</div>
            <h2 style={{ margin: '12px 0 0', fontSize: '34px', color: '#0f172a' }}>Built for better projects</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}>
            {featureList.map((feature) => (
              <div key={feature.title} style={{ background: '#f8fafc', borderRadius: '20px', padding: '26px 22px', border: '1px solid rgba(148,163,184,0.15)' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '16px' }}>✓</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>{feature.title}</div>
                <div style={{ color: '#475569', lineHeight: '1.7' }}>{feature.text}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
