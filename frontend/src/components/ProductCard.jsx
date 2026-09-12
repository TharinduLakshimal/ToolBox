import React from 'react';

const ProductCard = ({
  product,
  onClick,
  buttonLabel = 'Rent Now',
  showButton = true,
  compact = false,
}) => {
  if (!product) return null;

  const price = product.pricePerDay ?? product.price ?? 0;
  const image = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80';

  return (
    <div
      style={{
        minWidth: compact ? '200px' : '240px',
        width: compact ? '200px' : '240px',
        marginRight: compact ? '18px' : '0',
        marginBottom: '22px',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        padding: '12px',
        borderRadius: '22px',
        textAlign: 'center',
        boxShadow: '0 14px 30px rgba(15, 23, 42, 0.08)',
        border: '1px solid rgba(148, 163, 184, 0.18)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 18px 35px rgba(15, 23, 42, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 14px 30px rgba(15, 23, 42, 0.08)';
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={image}
          alt={product.name || 'Product'}
          style={{
            width: '100%',
            height: compact ? '170px' : '190px',
            objectFit: 'cover',
            borderRadius: '16px',
            display: 'block',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(15, 23, 42, 0.8)',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: '700',
          }}
        >
          Top Rated
        </div>
      </div>

      <div style={{ marginTop: '14px', textAlign: 'left' }}>
        <p style={{ margin: '0 0 8px', fontWeight: '800', fontSize: '18px', color: '#0f172a' }}>{product.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ color: '#64748b', fontSize: '13px' }}>Daily rental</span>
          <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '18px' }}>Rs. {price}</span>
        </div>
      </div>

      {showButton && (
        <button
          onClick={onClick}
          style={{
            padding: '11px 14px',
            background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '14px',
            fontWeight: '700',
            transition: 'opacity 0.2s ease',
          }}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
