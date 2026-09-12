import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const AdminRentalDashboard = () => {
  const [rentals, setRentals] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    userId: '',
    toolId: '',
    startDate: '',
    endDate: '',
    amount: '',
    quantity: '',
    status: 'CONFIRMED',
  });
  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = '/api/rental';
  const usersApiUrl = '/api/users';

  useEffect(() => {
    fetchRentals();
    fetchUsers();
  }, []);

  const fetchRentals = () => {
    api
      .get(`${apiUrl}/all`)
      .then((res) => setRentals(res.data || []))
      .catch((err) =>
        alert(`Failed to fetch rentals: ${err.extractedMessage || err.response?.data?.message || 'Server error'}`)
      );
  };

  const fetchUsers = () => {
    api
      .get(`${usersApiUrl}/all`)
      .then((res) => setUsers(res.data || []))
      .catch((err) =>
        alert(`Failed to fetch users: ${err.extractedMessage || err.response?.data?.message || 'Server error'}`)
      );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rental = {
      ...formData,
      amount: parseFloat(formData.amount),
      quantity: parseInt(formData.quantity, 10),
    };

    const request = isEditing
      ? api.put(`${apiUrl}/update/${formData.id}`, rental)
      : api.post(`${apiUrl}/create`, rental);

    request
      .then(() => {
        alert(`Rental ${isEditing ? 'updated' : 'created'} successfully!`);
        resetForm();
        fetchRentals();
      })
      .catch((err) =>
        alert(
          `${isEditing ? 'Update' : 'Create'} failed: ${
            err.extractedMessage || err.response?.data?.message || 'Server error'
          }`
        )
      );
  };

  const handleEdit = (rental) => {
    setFormData({
      id: rental.id,
      userId: rental.user?.id || '',
      toolId: rental.tool?.id || '',
      startDate: rental.startDate,
      endDate: rental.endDate,
      amount: rental.totalAmount,
      quantity: rental.quantity,
      status: rental.status,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this rental?')) {
      api
        .delete(`${apiUrl}/delete/${id}`)
        .then(() => fetchRentals())
        .catch((err) =>
          alert(`Delete failed: ${err.extractedMessage || err.response?.data?.message || 'Server error'}`)
        );
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      userId: '',
      toolId: '',
      startDate: '',
      endDate: '',
      amount: '',
      quantity: '',
      status: 'CONFIRMED',
    });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>📋 Admin Rental Management</h1>

      {/* Rental Form */}
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '600px',
          margin: '30px auto',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2>{isEditing ? '✏️ Edit Rental' : '➕ Add New Rental'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          {/* User Select Dropdown */}
          <select name="userId" value={formData.userId} onChange={handleChange} required>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name || user.email || user.id}
              </option>
            ))}
          </select>

          <input name="toolId" placeholder="Tool ID" value={formData.toolId} onChange={handleChange} required />
          <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
          <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
          <input
            name="amount"
            type="number"
            step="0.01"
            placeholder="Total Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="PENDING">PENDING</option>
            <option value="RETURNED">RETURNED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
          <div>
            <button
              type="submit"
              style={{
                backgroundColor: isEditing ? '#007bff' : '#28a745',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {isEditing ? 'Update Rental' : 'Add Rental'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Rental Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
          <thead style={{ backgroundColor: '#343a40', color: 'white' }}>
            <tr>
              <th>User</th>
              <th>Tool</th>
              <th>Start</th>
              <th>End</th>
              <th>Amount</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((r) => (
              <tr key={r.id} style={{ textAlign: 'center', backgroundColor: '#fff' }}>
                <td>{r.user?.name || r.user?.email || r.user?.id || 'N/A'}</td>
                <td>{r.tool?.name || r.tool?.id || 'N/A'}</td>
                <td>{r.startDate}</td>
                <td>{r.endDate}</td>
                <td>Rs. {r.totalAmount}</td>
                <td>{r.quantity}</td>
                <td>{r.status}</td>
                <td>{r.createdAt?.slice(0, 19).replace('T', ' ')}</td>
                <td>
                  <button
                    onClick={() => handleEdit(r)}
                    style={{
                      marginRight: '5px',
                      backgroundColor: '#ffc107',
                      color: '#333',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {rentals.length === 0 && (
              <tr>
                <td colSpan="9" style={{ padding: '20px' }}>
                  No rentals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRentalDashboard;
