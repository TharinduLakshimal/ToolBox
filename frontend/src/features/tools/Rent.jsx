import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const Rent = () => {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addToCart = () => {
    if (!fromDate || !toDate || !quantity) {
      alert('❗ Please fill all fields.');
      return;
    }
    if (new Date(toDate) < new Date(fromDate)) {
      alert('❗ To date cannot be earlier than From date.');
      return;
    }
    if (quantity <= 0 || quantity > tool.quantity) {
      alert(`❗ Quantity must be between 1 and ${tool.quantity}`);
      return;
    }

    const days = Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) + 1;
    const item = {
      cartId: `${tool.id}-${Date.now()}`,
      id: tool.id,
      name: tool.name,
      imageUrl: tool.imageUrl,
      pricePerDay: tool.pricePerDay,
      quantity,
      startDate: fromDate,
      endDate: toDate,
      days,
      totalPrice: days * tool.pricePerDay * quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem('toolCart') || '[]');
    const updatedCart = [...existingCart, item];
    localStorage.setItem('toolCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/cart');
  };

  useEffect(() => {
    api
      .get(`/api/tools/${id}`)
      .then((response) => {
        setTool(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tool:', error);
        alert('❌ Tool not found!');
      });
  }, [id]);

  useEffect(() => {
    if (tool && fromDate && toDate && new Date(toDate) >= new Date(fromDate) && quantity > 0) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      setTotalPrice(days * tool.pricePerDay * quantity);
    } else {
      setTotalPrice(0);
    }
  }, [fromDate, toDate, tool, quantity]);

  const handleQuantityChange = (value) => {
    const nextValue = Number(value);
    if (tool && nextValue >= 1 && nextValue <= tool.quantity) {
      setQuantity(nextValue);
    }
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('❗ Please log in before creating a rental.');
      navigate('/login');
      return;
    }

    if (!fromDate || !toDate || !quantity) {
      alert('❗ Please fill all fields.');
      return;
    }
    if (new Date(toDate) < new Date(fromDate)) {
      alert('❗ To date cannot be earlier than From date.');
      return;
    }
    if (quantity <= 0 || quantity > tool.quantity) {
      alert(`❗ Quantity must be between 1 and ${tool.quantity}`);
      return;
    }

    setLoading(true);
    try {
      await api.post('/api/rental/create', {
        toolId: tool.id,
        startDate: fromDate,
        endDate: toDate,
        amount: totalPrice,
        quantity: quantity,
      });

      alert('✅ Rental successfully saved to database!');
      setFromDate('');
      setToDate('');
      setQuantity(1);
      navigate('/my-rentals');
    } catch (error) {
      console.error('Error:', error);
      alert(`❌ Failed to rent tool: ${error.extractedMessage || error.response?.data?.message || 'Server error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!tool) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: '#475569', fontSize: '18px' }}>
        Loading tool data...
      </div>
    );
  }

  const days =
    fromDate && toDate && new Date(toDate) >= new Date(fromDate)
      ? Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) + 1
      : 0;

  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)', minHeight: 'calc(100vh - 70px)', padding: '16px 20px 32px' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        {/* Top Header & Breadcrumbs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              color: '#0284c7',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: 0,
            }}
          >
            ← Back to tools
          </button>
          <div
            style={{
              background: '#e0f2fe',
              color: '#0369a1',
              padding: '4px 10px',
              borderRadius: '999px',
              fontWeight: '800',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Rental booking
          </div>
        </div>

        {/* Main Side-by-Side Viewport-Friendly Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '20px', alignItems: 'start' }}>
          {/* Left Column: Tool Details & Image */}
          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '18px',
              boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)',
              border: '1px solid rgba(148,163,184,0.14)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div>
                <div style={{ color: '#0284c7', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Selected Tool
                </div>
                <h1 style={{ margin: '4px 0 0', fontSize: '24px', color: '#0f172a', fontWeight: '800' }}>{tool.name}</h1>
              </div>
              <div
                style={{
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontWeight: '700',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                }}
              >
                In stock • {tool.quantity} units
              </div>
            </div>

            {/* Compact Tool Image Preview */}
            <div
              style={{
                background: '#f8fafc',
                borderRadius: '14px',
                height: '240px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid rgba(148,163,184,0.15)',
              }}
            >
              <img
                src={tool.imageUrl}
                alt={tool.name}
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'contain',
                  padding: '12px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Quick Specs Chips */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px', marginTop: '14px' }}>
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '10px 12px', border: '1px solid rgba(148,163,184,0.12)', textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Daily rate</div>
                <div style={{ marginTop: '4px', fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>Rs. {tool.pricePerDay}</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '10px 12px', border: '1px solid rgba(148,163,184,0.12)', textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Availability</div>
                <div style={{ marginTop: '4px', fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>{tool.quantity} in stock</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '10px 12px', border: '1px solid rgba(148,163,184,0.12)', textAlign: 'center' }}>
                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Pickup</div>
                <div style={{ marginTop: '4px', fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>Same Day</div>
              </div>
            </div>
          </div>

          {/* Right Column: Date Selection & Rental Action */}
          <div
            style={{
              background: '#0f172a',
              borderRadius: '20px',
              padding: '20px 22px',
              color: '#fff',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.16)',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7dd3fc', marginBottom: '4px' }}>
              Configure Booking
            </div>
            <h2 style={{ margin: '0 0 14px', fontSize: '22px', fontWeight: '800' }}>Choose your dates</h2>

            {/* Side-by-Side Date Selectors to Save Vertical Space */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '12px', padding: '10px 12px' }}>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '600' }}>
                  From date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: '#fff',
                    color: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    fontSize: '13px',
                    fontWeight: '600',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '12px', padding: '10px 12px' }}>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '11px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '600' }}>
                  To date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: '#fff',
                    color: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    fontSize: '13px',
                    fontWeight: '600',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Quantity Selector */}
            <div
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(148,163,184,0.2)',
                borderRadius: '12px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}
            >
              <div>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '600' }}>
                  Quantity
                </label>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Max {tool.quantity} available</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#fff',
                    color: '#0f172a',
                    fontSize: '18px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  −
                </button>
                <div style={{ minWidth: '24px', textAlign: 'center', fontSize: '18px', fontWeight: '800' }}>{quantity}</div>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#fff',
                    color: '#0f172a',
                    fontSize: '18px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Pricing Summary Box */}
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '14px',
                padding: '12px 14px',
                border: '1px solid rgba(148,163,184,0.15)',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '13px', marginBottom: '6px' }}>
                <span>Rental Duration</span>
                <strong style={{ color: '#fff' }}>{days || 0} {days === 1 ? 'day' : 'days'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px' }}>
                <span>Rate breakdown</span>
                <strong style={{ color: '#fff' }}>Rs. {tool.pricePerDay} × {quantity} unit(s)</strong>
              </div>
              <div style={{ height: '1px', background: 'rgba(148,163,184,0.2)', margin: '6px 0 10px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>Total Amount</span>
                <span style={{ color: '#38bdf8', fontSize: '24px', fontWeight: '900' }}>Rs. {totalPrice}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={addToCart}
                style={{
                  padding: '12px 14px',
                  border: 'none',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(14, 165, 233, 0.25)',
                  transition: 'opacity 0.2s',
                }}
              >
                Add to cart
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                style={{
                  padding: '12px 14px',
                  border: 'none',
                  borderRadius: '12px',
                  background: loading ? '#64748b' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: '15px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 20px rgba(34, 197, 94, 0.25)',
                  transition: 'opacity 0.2s',
                }}
              >
                {loading ? 'Processing...' : 'Confirm rental'}
              </button>
            </div>

            <div style={{ marginTop: '12px', color: '#94a3b8', fontSize: '12px', textAlign: 'center', lineHeight: '1.5' }}>
              ✓ Instant confirmation · Secure booking · 24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
