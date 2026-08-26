import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Rent = () => {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentUserId = 1;

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

    alert('✅ Product added to cart successfully!');
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tools/${id}`)
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
      await axios.post('http://localhost:8080/api/rental/create', {
        userId: currentUserId,
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
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Failed to rent tool.');
    } finally {
      setLoading(false);
    }
  };

  if (!tool) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#475569', fontSize: '18px' }}>
        Loading tool data...
      </div>
    );
  }

  const days = fromDate && toDate && new Date(toDate) >= new Date(fromDate)
    ? Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)', minHeight: '100vh', padding: '32px 20px 60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '22px', color: '#0ea5e9', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}>
          Rental booking
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '28px', alignItems: 'stretch' }}>
          <div style={{ background: '#fff', borderRadius: '28px', padding: '24px', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.08)', border: '1px solid rgba(148,163,184,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ color: '#0ea5e9', fontSize: '12px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Available now</div>
                <h1 style={{ margin: '8px 0 0', fontSize: '34px', color: '#0f172a' }}>{tool.name}</h1>
              </div>
              <div style={{ background: '#dcfce7', color: '#166534', padding: '8px 12px', borderRadius: '999px', fontWeight: '800', fontSize: '13px' }}>
                In stock • {tool.quantity} units
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '16px' }}>
              <img
                src={tool.imageUrl}
                alt={tool.name}
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '18px', display: 'block' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px', marginTop: '22px' }}>
              <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '18px', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Daily rate</div>
                <div style={{ marginTop: '8px', fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>Rs. {tool.pricePerDay}</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '18px', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pickup</div>
                <div style={{ marginTop: '8px', fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>Today</div>
              </div>
              <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '18px', border: '1px solid rgba(148,163,184,0.14)' }}>
                <div style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Support</div>
                <div style={{ marginTop: '8px', fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>24/7</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#0f172a', borderRadius: '28px', padding: '24px', color: '#fff', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.18)' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7dd3fc', marginBottom: '10px' }}>
              Book your rental
            </div>
            <h2 style={{ margin: '0 0 22px', fontSize: '30px' }}>Choose your dates</h2>

            <div style={{ display: 'grid', gap: '18px' }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '18px', padding: '16px 14px' }}>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>From date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#fff',
                    color: '#0f172a',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    fontSize: '15px',
                  }}
                />
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '18px', padding: '16px 14px' }}>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>To date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#fff',
                    color: '#0f172a',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    fontSize: '15px',
                  }}
                />
              </div>

              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '18px', padding: '16px 14px' }}>
                <label style={{ display: 'block', color: '#cbd5e1', fontSize: '12px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Quantity</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    style={{ width: '42px', height: '42px', borderRadius: '12px', border: 'none', background: '#fff', color: '#0f172a', fontSize: '24px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    −
                  </button>
                  <div style={{ flex: 1, textAlign: 'center', fontSize: '28px', fontWeight: '800' }}>{quantity}</div>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    style={{ width: '42px', height: '42px', borderRadius: '12px', border: 'none', background: '#fff', color: '#0f172a', fontSize: '24px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '26px', background: 'rgba(255,255,255,0.04)', borderRadius: '18px', padding: '18px', border: '1px solid rgba(148,163,184,0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', marginBottom: '10px' }}>
                <span>Rental days</span>
                <strong style={{ color: '#fff' }}>{days || 0} days</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', marginBottom: '10px' }}>
                <span>Unit price</span>
                <strong style={{ color: '#fff' }}>Rs. {tool.pricePerDay}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', marginBottom: '18px' }}>
                <span>Quantity</span>
                <strong style={{ color: '#fff' }}>{quantity}</strong>
              </div>
              <div style={{ height: '1px', background: 'rgba(148,163,184,0.2)', margin: '10px 0 16px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>Total</span>
                <span style={{ color: '#7dd3fc', fontSize: '30px', fontWeight: '900' }}>Rs. {totalPrice}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '22px' }}>
              <button
                onClick={addToCart}
                style={{
                  padding: '16px 18px',
                  border: 'none',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: '18px',
                  cursor: 'pointer',
                  boxShadow: '0 14px 30px rgba(14, 165, 233, 0.25)',
                }}
              >
                Add to cart
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                style={{
                  padding: '16px 18px',
                  border: 'none',
                  borderRadius: '16px',
                  background: loading ? '#64748b' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: '18px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 14px 30px rgba(34, 197, 94, 0.28)',
                }}
              >
                {loading ? 'Processing...' : 'Confirm rental'}
              </button>
            </div>

            <div style={{ marginTop: '18px', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.7' }}>
              ✓ Secure booking<br />
              ✓ Flexible payment options<br />
              ✓ Fast support and delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
