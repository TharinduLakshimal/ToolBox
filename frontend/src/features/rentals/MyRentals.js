import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRentals = useCallback(async () => {
    const email = localStorage.getItem('email');

    if (!email) {
      navigate('/login');
      return;
    }

    try {
      const userResponse = await axios.get(
        `http://localhost:8080/api/users/by-email?email=${encodeURIComponent(email)}`
      );

      const userId = userResponse.data.id;
      const rentalResponse = await axios.get(`http://localhost:8080/api/rental/user/${userId}`);

      const activeRentals = rentalResponse.data.filter(
        (rental) => rental.status !== 'RETURNED' && rental.status !== 'CANCELLED'
      );

      setRentals(activeRentals);
    } catch (error) {
      console.error('Failed to fetch rentals:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  const handleExtend = async (rentalId, extraDays) => {
    try {
      await axios.put(`http://localhost:8080/api/rental/${rentalId}/extend?days=${extraDays}`);
      fetchRentals();
    } catch (error) {
      console.error('Failed to extend rental:', error);
      alert('Failed to extend rental.');
    }
  };

  const handleReturn = async (rentalId) => {
    try {
      await axios.put(`http://localhost:8080/api/rental/${rentalId}/return`);
      fetchRentals();
    } catch (error) {
      console.error('Failed to return rental:', error);
      alert('Failed to process return.');
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: '#475569' }}>
        Loading your active rentals...
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)', minHeight: '100vh', padding: '40px 20px 60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: '#0ea5e9', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px' }}>
            Active rentals
          </div>
          <h1 style={{ margin: '8px 0 0', fontSize: '38px', color: '#0f172a' }}>My rental portal</h1>
        </div>

        {rentals.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '28px', padding: '48px 24px', textAlign: 'center', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ fontSize: '60px', marginBottom: '16px' }}>📦</div>
            <h2 style={{ margin: '0 0 12px', color: '#0f172a' }}>No active rentals</h2>
            <p style={{ color: '#475569', marginBottom: '24px' }}>Your current rented tools will appear here.</p>
            <button
              onClick={() => navigate('/tool')}
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '14px',
                padding: '14px 22px',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              Rent a tool
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {rentals.map((rental) => {
              const tool = rental.tool || {};
              const endDate = rental.endDate ? new Date(rental.endDate) : null;
              const daysLeft = endDate ? Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24)) : 0;

              return (
                <div key={rental.id} style={{ background: '#fff', borderRadius: '28px', padding: '20px', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.08)', border: '1px solid rgba(148,163,184,0.14)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '20px' }}>
                    <img
                      src={tool.imageUrl || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80'}
                      alt={tool.name || 'Tool'}
                      style={{ width: '180px', height: '150px', objectFit: 'cover', borderRadius: '18px' }}
                    />

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <h2 style={{ margin: '0', color: '#0f172a', fontSize: '30px' }}>{tool.name || 'Rental item'}</h2>
                        <span
                          style={{
                            background: rental.status === 'CONFIRMED' ? '#dcfce7' : '#e0f2fe',
                            color: rental.status === 'CONFIRMED' ? '#166534' : '#075985',
                            borderRadius: '999px',
                            padding: '7px 12px',
                            fontWeight: '800',
                            fontSize: '12px',
                          }}
                        >
                          {rental.status}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '14px', marginTop: '18px' }}>
                        <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '14px' }}>
                          <div style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>From</div>
                          <div style={{ marginTop: '8px', fontWeight: '800', color: '#0f172a' }}>{rental.startDate || 'N/A'}</div>
                        </div>
                        <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '14px' }}>
                          <div style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>To</div>
                          <div style={{ marginTop: '8px', fontWeight: '800', color: '#0f172a' }}>{rental.endDate || 'N/A'}</div>
                        </div>
                        <div style={{ background: '#f8fafc', borderRadius: '18px', padding: '14px' }}>
                          <div style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Days left</div>
                          <div style={{ marginTop: '8px', fontWeight: '800', color: '#0f172a' }}>{daysLeft > 0 ? `${daysLeft} days` : 'Due now'}</div>
                        </div>
                      </div>

                      <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => handleExtend(rental.id, 3)}
                            style={{ background: '#e0f2fe', color: '#075985', border: 'none', borderRadius: '12px', padding: '10px 12px', fontWeight: '800', cursor: 'pointer' }}
                          >
                            +3 days
                          </button>
                          <button
                            onClick={() => handleExtend(rental.id, 7)}
                            style={{ background: '#dbeafe', color: '#1d4ed8', border: 'none', borderRadius: '12px', padding: '10px 12px', fontWeight: '800', cursor: 'pointer' }}
                          >
                            +7 days
                          </button>
                        </div>

                        <button
                          onClick={() => handleReturn(rental.id)}
                          style={{ background: '#0f172a', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 16px', fontWeight: '800', cursor: 'pointer' }}
                        >
                          Return item
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRentals;
