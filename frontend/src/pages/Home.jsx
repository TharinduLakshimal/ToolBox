import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
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
    if (search.trim() === '' && filteredTools.length > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % filteredTools.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [filteredTools, search]);

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  const fetchAllTools = async () => {
    try {
      const response = await api.get('/api/tools/getTools');
      setTools(response.data || []);
      setFilteredTools(response.data || []);
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
        const response = await api.get(`/api/tools/search?keyword=${encodeURIComponent(keyword)}`);
        setFilteredTools(response.data || []);
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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 20px 50px' }}>
        {/* Compact, Viewport-Friendly Hero Section */}
        <section
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0284c7 100%)',
            borderRadius: '24px',
            padding: '28px 36px',
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '24px',
            alignItems: 'center',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.16)',
            overflow: 'hidden',
          }}
        >
          {/* Left Hero Content */}
          <div style={{ color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.1)',
                color: '#bae6fd',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                width: 'fit-content',
              }}
            >
              Smart rental platform
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)',
                lineHeight: '1.15',
                margin: '0 0 10px',
                fontWeight: '900',
                letterSpacing: '-0.02em',
              }}
            >
              Rent the right tool for every job.
            </h1>

            <p
              style={{
                fontSize: '15px',
                lineHeight: '1.55',
                color: '#e2e8f0',
                maxWidth: '540px',
                margin: '0 0 18px',
              }}
            >
              Upgrade your projects without buying expensive equipment. Access premium tools, flexible pricing, and fast delivery across your city.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
              <button
                onClick={() => navigate('/tool')}
                style={{
                  background: '#fff',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '11px 20px',
                  fontSize: '14px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s',
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
                  borderRadius: '12px',
                  padding: '11px 20px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                Talk to sales
              </button>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '2px' }}>
              <div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>1200+</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px' }}>Happy renters</div>
              </div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>4.9/5</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px' }}>Customer rating</div>
              </div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>24/7</div>
                <div style={{ color: '#cbd5e1', fontSize: '12px' }}>Support</div>
              </div>
            </div>
          </div>

          {/* Right Featured Tool Compact Card */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '380px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '14px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
              }}
            >
              {/* Product Image Container */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '14px',
                  height: '220px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  key={featuredProduct?.id || 'default'}
                  src={featuredProduct?.imageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80'}
                  alt={featuredProduct?.name || 'Featured tool'}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'contain',
                    padding: '10px',
                    boxSizing: 'border-box',
                    transition: 'all 0.4s ease-in-out',
                  }}
                />
              </div>

              {/* Product Info & CTA */}
              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ color: '#7dd3fc', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>
                    Featured rental
                  </div>
                  <div
                    style={{
                      color: '#fff',
                      fontSize: '18px',
                      fontWeight: '800',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {featuredProduct?.name || 'Premium Equipment'}
                  </div>
                  {featuredProduct?.pricePerDay && (
                    <div style={{ color: '#bae6fd', fontSize: '13px', fontWeight: '600', marginTop: '2px' }}>
                      Rs. {featuredProduct.pricePerDay} / day
                    </div>
                  )}
                </div>

                <button
                  onClick={() => featuredProduct && handleRentClick(featuredProduct.id)}
                  style={{
                    background: '#22c55e',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#fff',
                    padding: '9px 16px',
                    cursor: 'pointer',
                    fontWeight: '800',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.35)',
                    transition: 'background 0.2s',
                  }}
                >
                  Rent now
                </button>
              </div>

              {/* Indicator Dots for Cycling Items */}
              {filteredTools.length > 1 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: '12px',
                    alignItems: 'center',
                  }}
                >
                  {filteredTools.slice(0, Math.min(filteredTools.length, 6)).map((tool, idx) => (
                    <button
                      key={tool.id || idx}
                      onClick={() => setCurrent(idx)}
                      title={tool.name}
                      style={{
                        height: '6px',
                        width: current === idx ? '20px' : '6px',
                        borderRadius: '999px',
                        background: current === idx ? '#38bdf8' : 'rgba(255,255,255,0.3)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section style={{ marginTop: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '14px' }}>
            {categories.map((category) => (
              <div
                key={category.name}
                style={{
                  background: '#fff',
                  borderRadius: '18px',
                  padding: '18px 14px',
                  boxShadow: '0 8px 20px rgba(15, 23, 42, 0.04)',
                  border: '1px solid rgba(148,163,184,0.12)',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease',
                }}
              >
                <div style={{ fontSize: '30px', marginBottom: '8px' }}>{category.icon}</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{category.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Tools Catalog Section */}
        <section style={{ marginTop: '38px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: '#0ea5e9', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}>Popular tools</div>
              <h2 style={{ margin: '6px 0 0', fontSize: '32px', color: '#0f172a' }}>{search.trim() === '' ? 'Featured equipment' : 'Search results'}</h2>
            </div>

            <div style={{ position: 'relative', minWidth: '280px', flex: '1', maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={handleSearchChange}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(148, 163, 184, 0.35)',
                  background: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  boxShadow: '0 8px 20px rgba(15, 23, 42, 0.04)',
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
            <div style={{ background: '#fff', borderRadius: '18px', padding: '30px', textAlign: 'center', color: '#475569' }}>
              No tools found. Try a different keyword.
            </div>
          )}
        </section>

        {/* Features Section */}
        <section style={{ marginTop: '42px', background: '#fff', borderRadius: '24px', padding: '26px 20px', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.04)' }}>
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <div style={{ color: '#0ea5e9', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}>Why choose us</div>
            <h2 style={{ margin: '8px 0 0', fontSize: '30px', color: '#0f172a' }}>Built for better projects</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '18px' }}>
            {featureList.map((feature) => (
              <div key={feature.title} style={{ background: '#f8fafc', borderRadius: '18px', padding: '22px 18px', border: '1px solid rgba(148,163,184,0.15)' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '14px' }}>✓</div>
                <div style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>{feature.title}</div>
                <div style={{ color: '#475569', lineHeight: '1.6', fontSize: '14px' }}>{feature.text}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
