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

  const currentUserId = 1; // Simulated user ID

  useEffect(() => {
    axios.get(`http://localhost:8080/api/tools/${id}`)
      .then(response => {
        setTool(response.data);
      })
      .catch(error => {
        console.error("Error fetching tool:", error);
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
        quantity: quantity
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

  if (!tool) return <p style={{ padding: '20px' }}>Loading tool data...</p>;

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1000px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row',
      gap: '30px',
      alignItems: 'flex-start',
      height: '90vh',
    }}>
      <div style={{ flex: '1' }}>
        <h2>Rent: {tool.name}</h2>
        <img
          src={tool.imageUrl}
          alt={tool.name}
          style={{ width: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '8px' }}
        />
        <p><strong>Price per Day:</strong> Rs. {tool.pricePerDay}</p>
        <p><strong>Available Quantity:</strong> {tool.quantity}</p>
        <p><strong>Total Price:</strong> Rs. {totalPrice}</p>
      </div>
      <div style={{ flex: '1' }}>
        <label>From Date:</label><br />
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /><br /><br />

        <label>To Date:</label><br />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /><br /><br />

        <label>Quantity:</label><br />
        <input
          type="number"
          min="1"
          max={tool.quantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        /><br /><br />

        <button
          onClick={handleConfirm}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#999' : '#282c34',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Processing...' : 'Confirm Rent'}
        </button>
      </div>
    </div>
  );
};

export default Rent;
