import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const loadCart = () => {
    const storedItems = JSON.parse(localStorage.getItem('toolCart') || '[]');
    setCartItems(storedItems);
    const totalAmount = storedItems.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);
    setTotal(totalAmount);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = (cartId) => {
    const updatedItems = cartItems.filter((item) => item.cartId !== cartId);
    localStorage.setItem('toolCart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
    setCartItems(updatedItems);
    setTotal(updatedItems.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0));
  };

  const updateQuantity = (cartId, nextQty) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.cartId !== cartId) return item;
        const safeQty = Math.max(1, Number(nextQty) || 1);
        const days = item.days || 1;
        return { ...item, quantity: safeQty, totalPrice: days * item.pricePerDay * safeQty };
      })
      .filter((item) => item.quantity > 0);

    localStorage.setItem('toolCart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
    setCartItems(updatedItems);
    setTotal(updatedItems.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0));
  };

  const clearCart = () => {
    localStorage.removeItem('toolCart');
    window.dispatchEvent(new Event('cartUpdated'));
    setCartItems([]);
    setTotal(0);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '60px 20px', background: 'linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)', minHeight: '70vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', background: '#fff', borderRadius: '28px', padding: '48px 24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ fontSize: '60px', marginBottom: '12px' }}>🛒</div>
          <h2 style={{ margin: '0 0 12px', color: '#0f172a', fontSize: '36px' }}>Your cart is empty</h2>
          <p style={{ color: '#475569', fontSize: '18px', marginBottom: '24px' }}>Add your preferred tools from the rental page to get started.</p>
          <button
            onClick={() => navigate('/tool')}
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '14px',
              padding: '14px 22px',
              fontSize: '16px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            Browse tools
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)', minHeight: '100vh', padding: '40px 20px 60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#0ea5e9', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}>Shopping cart</div>
            <h1 style={{ margin: '8px 0 0', fontSize: '38px', color: '#0f172a' }}>Your selected tools</h1>
          </div>
          <button
            onClick={clearCart}
            style={{
              background: 'transparent',
              color: '#0f172a',
              border: '1px solid rgba(15, 23, 42, 0.2)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Clear cart
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.9fr', gap: '26px' }}>
          <div style={{ display: 'grid', gap: '18px' }}>
            {cartItems.map((item) => (
              <div key={item.cartId || `${item.id}-${item.startDate}-${item.endDate}`} style={{ background: '#fff', borderRadius: '24px', padding: '18px', boxShadow: '0 16px 30px rgba(15, 23, 42, 0.06)', border: '1px solid rgba(148,163,184,0.14)', display: 'grid', gridTemplateColumns: '180px 1fr auto', gap: '18px' }}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: '180px', height: '150px', objectFit: 'cover', borderRadius: '16px', display: 'block' }}
                />

                <div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '24px', color: '#0f172a' }}>{item.name}</h3>
                  <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '10px' }}>
                    {item.startDate} to {item.endDate} · {item.days} days
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#475569', fontWeight: '700' }}>Qty</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => updateQuantity(item.cartId || item.id, item.quantity - 1)}
                        style={{ width: '30px', height: '30px', borderRadius: '8px', border: 'none', background: '#e2e8f0', fontWeight: '800', cursor: 'pointer' }}
                      >
                        −
                      </button>
                      <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: '800' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId || item.id, item.quantity + 1)}
                        style={{ width: '30px', height: '30px', borderRadius: '8px', border: 'none', background: '#e2e8f0', fontWeight: '800', cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a' }}>Rs. {item.totalPrice}</div>
                  <button
                    onClick={() => removeItem(item.cartId || item.id)}
                    style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '10px', padding: '10px 12px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside style={{ background: '#0f172a', borderRadius: '28px', padding: '24px', color: '#fff', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.16)', height: 'fit-content' }}>
            <div style={{ color: '#7dd3fc', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '800', marginBottom: '12px' }}>Summary</div>
            <h2 style={{ margin: '0 0 18px', fontSize: '30px' }}>Order total</h2>

            <div style={{ display: 'grid', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Items</span>
                <strong style={{ color: '#fff' }}>{cartItems.length}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Subtotal</span>
                <strong style={{ color: '#fff' }}>Rs. {total}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Delivery</span>
                <strong style={{ color: '#fff' }}>Free</strong>
              </div>
            </div>

            <div style={{ height: '1px', background: 'rgba(148,163,184,0.2)', margin: '18px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: '700' }}>Total</span>
              <span style={{ fontSize: '30px', fontWeight: '900', color: '#7dd3fc' }}>Rs. {total}</span>
            </div>

            <button
              onClick={() => alert('Checkout page coming soon')}
              style={{
                width: '100%',
                marginTop: '22px',
                padding: '16px 18px',
                border: 'none',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                color: '#fff',
                fontWeight: '800',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              Proceed to checkout
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
