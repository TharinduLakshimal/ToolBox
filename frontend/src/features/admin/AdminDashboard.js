import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [tools, setTools] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: '',
    description: '',
    imageUrl: '',
    pricePerDay: '',
    pricePerWeek: '',
    quantity: '',
    isAvailable: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const apiUrl = 'http://localhost:8080/api/tools';

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = () => {
    axios.get(`${apiUrl}/getTools`)
      .then(res => setTools(res.data))
      .catch(err => console.error('Fetch tools failed:', err));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      pricePerDay: parseFloat(formData.pricePerDay),
      pricePerWeek: parseFloat(formData.pricePerWeek),
      quantity: parseInt(formData.quantity),
    };

    const request = isEditing
      ? axios.put(`${apiUrl}/update/${formData.id}`, data)
      : axios.post(`${apiUrl}/add`, data);

    request
      .then(() => {
        alert(`Tool ${isEditing ? 'updated' : 'added'} successfully!`);
        resetForm();
        fetchTools();
      })
      .catch(() => alert(`${isEditing ? 'Update' : 'Add'} failed`));
  };

  const handleEdit = (tool) => {
    setFormData(tool);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tool?")) {
      axios.delete(`${apiUrl}/delete/${id}`)
        .then(() => fetchTools())
        .catch(() => alert("Delete failed"));
    }
  };

  const handleSearch = () => {
    if (searchKeyword.trim() === '') {
      fetchTools();
    } else {
      axios.get(`${apiUrl}/search?keyword=${searchKeyword}`)
        .then(res => setTools(res.data))
        .catch(() => alert("Search failed"));
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      category: '',
      description: '',
      imageUrl: '',
      pricePerDay: '',
      pricePerWeek: '',
      quantity: '',
      isAvailable: true
    });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🛠️ Admin Tool Management</h1>

      {/* Tool Form */}
      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        margin: '30px auto',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <h2>{isEditing ? '✏️ Edit Tool' : '➕ Add New Tool'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required />
          <input name="pricePerDay" type="number" placeholder="Price per Day" value={formData.pricePerDay} onChange={handleChange} required />
          <input name="pricePerWeek" type="number" placeholder="Price per Week" value={formData.pricePerWeek} onChange={handleChange} required />
          <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
          <label>
            <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} />
            {' '}Available
          </label>
          <div>
            <button type="submit" style={{ backgroundColor: isEditing ? '#007bff' : '#28a745', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
              {isEditing ? 'Update Tool' : 'Add Tool'}
            </button>
            {isEditing &&
              <button type="button" onClick={resetForm} style={{ marginLeft: '10px', backgroundColor: '#6c757d', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
                Cancel
              </button>
            }
          </div>
        </form>
      </div>

      {/* Search bar */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          placeholder="🔍 Search tool name"
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#17a2b8', color: 'white', border: 'none' }}>
          Search
        </button>
      </div>

      {/* Tool List Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
          <thead style={{ backgroundColor: '#343a40', color: 'white' }}>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price/Day</th>
              <th>Quantity</th>
              <th>Available</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tools.map(tool => (
              <tr key={tool.id} style={{ backgroundColor: '#fff', textAlign: 'center', transition: '0.3s' }}>
                <td>{tool.name}</td>
                <td>{tool.category}</td>
                <td>Rs. {tool.pricePerDay}</td>
                <td>{tool.quantity}</td>
                <td>{tool.isAvailable ? "✅" : "❌"}</td>
                <td><img src={tool.imageUrl} alt="tool" width="50" style={{ borderRadius: '5px' }} /></td>
                <td>
                  <button onClick={() => handleEdit(tool)} style={{ marginRight: '5px', backgroundColor: '#ffc107', color: '#333', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(tool.id)} style={{ backgroundColor: '#dc3545', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tools.length === 0 && (
              <tr>
                <td colSpan="7" style={{ padding: '20px', textAlign: 'center' }}>No tools found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
