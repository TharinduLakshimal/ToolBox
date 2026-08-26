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
  const image = product.imageUrl || product.image || 'https://via.placeholder.com/300x220?text=Product';

  return (
    <div
      style={{
        minWidth: compact ? '180px' : '220px',
        width: compact ? '180px' : '220px',
        marginRight: '20px',
        marginBottom: '20px',
        background: '#f5f5f5',
        padding: '12px',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #ececec',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <img
        src={image}
        alt={product.name || 'Product'}
        style={{
          width: '100%',
          height: '170px',
          objectFit: 'cover',
          borderRadius: '8px',
          display: 'block',
        }}
      />

      <div style={{ marginTop: '12px', textAlign: 'left' }}>
        <p style={{ margin: '0 0 8px', fontWeight: 'bold', fontSize: '16px' }}>{product.name}</p>
        <p style={{ margin: '0 0 12px', color: '#2d3748', fontSize: '15px' }}>
          Rs. {price}/day
        </p>
      </div>

      {showButton && (
        <button
          onClick={onClick}
          style={{
            padding: '10px 12px',
            backgroundColor: '#282c34',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            width: '100%',
            fontSize: '14px',
          }}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
