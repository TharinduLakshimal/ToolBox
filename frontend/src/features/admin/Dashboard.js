import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  const [tools, setTools] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [activeTab, setActiveTab] = useState('tools');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: '',
    description: '',
    imageUrl: '',
    pricePerDay: '',
    pricePerWeek: '',
    quantity: '',
    isAvailable: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const apiUrl = 'http://localhost:8080/api/tools';
  const rentalApiUrl = 'http://localhost:8080/api/rental';

  useEffect(() => {
    fetchTools();
    fetchRentals();
  }, []);

  const fetchTools = () => {
    axios
      .get(`${apiUrl}/getTools`)
      .then((res) => setTools(res.data))
      .catch((err) => console.error('Fetch tools failed:', err));
  };

  const fetchRentals = () => {
    axios
      .get(`${rentalApiUrl}/all`)
      .then((res) => setRentals(res.data))
      .catch((err) => console.error('Fetch rentals failed:', err));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      pricePerDay: parseFloat(formData.pricePerDay),
      pricePerWeek: parseFloat(formData.pricePerWeek),
      quantity: parseInt(formData.quantity, 10),
    };

    const request = isEditing
      ? axios.put(`${apiUrl}/update/${formData.id}`, data)
      : axios.post(`${apiUrl}/add`, data);

    request
      .then(() => {
        resetForm();
        fetchTools();
      })
      .catch(() => alert(`${isEditing ? 'Update' : 'Add'} failed`));
  };

  const handleEdit = (tool) => {
    setFormData(tool);
    setIsEditing(true);
    setActiveTab('tools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      axios
        .delete(`${apiUrl}/delete/${id}`)
        .then(() => fetchTools())
        .catch(() => alert('Delete failed'));
    }
  };

  const handleSearch = () => {
    if (searchKeyword.trim() === '') {
      fetchTools();
      return;
    }

    axios
      .get(`${apiUrl}/search?keyword=${searchKeyword}`)
      .then((res) => setTools(res.data))
      .catch(() => alert('Search failed'));
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
      isAvailable: true,
    });
    setIsEditing(false);
  };

  const renderToolsTab = () => (
    <>
      <div style={sectionHeaderWrap}>
        <div>
          <div style={eyebrow}>Admin panel</div>
          <h1 style={pageTitle}>Add tools</h1>
        </div>
        <div style={pill}>Tool form</div>
      </div>

      <div style={panelCard}>
        <div style={panelHead}>
          <h2 style={panelTitle}>{isEditing ? 'Edit tool' : 'Add new tool'}</h2>
          {isEditing && (
            <button type="button" onClick={resetForm} style={secondaryButton}>
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} style={formGrid}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Tool name</label>
            <input name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <input name="category" value={formData.category} onChange={handleChange} required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Quantity</label>
            <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Price per day</label>
            <input name="pricePerDay" type="number" value={formData.pricePerDay} onChange={handleChange} required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Price per week</label>
            <input name="pricePerWeek" type="number" value={formData.pricePerWeek} onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Image URL</label>
            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
            <span style={{ color: '#0f172a', fontWeight: '700' }}>Available for rent</span>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit" style={primaryButton}>
              {isEditing ? 'Update tool' : 'Add tool'}
            </button>
          </div>
        </form>
      </div>
    </>
  );

  const renderShowToolsTab = () => (
    <>
      <div style={sectionHeaderWrap}>
        <div>
          <div style={eyebrow}>Inventory</div>
          <h1 style={pageTitle}>Show tools</h1>
        </div>
        <div style={pill}>{tools.length} tools</div>
      </div>

      <div style={panelCard}>
        <div style={panelHead}>
          <h2 style={panelTitle}>Tool inventory</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              placeholder="Search tool name"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ ...inputStyle, width: '250px', minWidth: '200px' }}
            />
            <button onClick={handleSearch} style={searchButton}>Search</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#0f172a', color: '#fff' }}>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price/day</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.id} style={{ borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
                  <td style={tdStyle}>{tool.name}</td>
                  <td style={tdStyle}>{tool.category}</td>
                  <td style={tdStyle}>Rs. {tool.pricePerDay}</td>
                  <td style={tdStyle}>{tool.quantity}</td>
                  <td style={tdStyle}>{tool.isAvailable ? '✅ Available' : '❌ Unavailable'}</td>
                  <td style={tdStyle}>
                    <img src={tool.imageUrl} alt={tool.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '12px' }} />
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button onClick={() => handleEdit(tool)} style={editButton}>Edit</button>
                      <button onClick={() => handleDelete(tool.id)} style={deleteButton}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {tools.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>No tools found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderRentedTab = () => (
    <>
      <div style={sectionHeaderWrap}>
        <div>
          <div style={eyebrow}>Rental overview</div>
          <h1 style={pageTitle}>Rented tools</h1>
        </div>
        <div style={pill}>{rentals.length} records</div>
      </div>

      <div style={panelCard}>
        <div style={panelHead}>
          <h2 style={panelTitle}>Current rental activity</h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#0f172a', color: '#fff' }}>
              <tr>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Tool</th>
                <th style={thStyle}>Start</th>
                <th style={thStyle}>End</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental) => (
                <tr key={rental.id} style={{ borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
                  <td style={tdStyle}>{rental.user?.username || 'User'}</td>
                  <td style={tdStyle}>{rental.tool?.name || 'Tool'}</td>
                  <td style={tdStyle}>{rental.startDate}</td>
                  <td style={tdStyle}>{rental.endDate}</td>
                  <td style={tdStyle}>Rs. {rental.totalAmount || rental.amount || 0}</td>
                  <td style={tdStyle}>{rental.quantity || 1}</td>
                  <td style={tdStyle}>
                    <span style={{
                      display: 'inline-block',
                      padding: '7px 10px',
                      borderRadius: '999px',
                      background: rental.status === 'RETURNED' ? '#dcfce7' : rental.status === 'CANCELLED' ? '#fee2e2' : '#dbeafe',
                      color: rental.status === 'RETURNED' ? '#166534' : rental.status === 'CANCELLED' ? '#991b1b' : '#1d4ed8',
                      fontWeight: '800',
                      fontSize: '12px',
                    }}>
                      {rental.status}
                    </span>
                  </td>
                </tr>
              ))}
              {rentals.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>No rental records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  return (
    <div style={pageWrap}>
      <div style={dashboardShell}>
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} stats={{ tools: tools.length, rentals: rentals.length }} />

        <main style={contentArea}>
          {activeTab === 'tools' && renderToolsTab()}
          {activeTab === 'show-tools' && renderShowToolsTab()}
          {activeTab === 'rented' && renderRentedTab()}
        </main>
      </div>
    </div>
  );
};

const pageWrap = {
  background: 'linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)',
  minHeight: '100vh',
  padding: '36px 20px 70px',
};

const dashboardShell = {
  maxWidth: '1360px',
  margin: '0 auto',
  display: 'flex',
  gap: '24px',
  alignItems: 'flex-start',
};

const contentArea = {
  flex: 1,
  display: 'grid',
  gap: '24px',
};

const sectionHeaderWrap = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
};

const eyebrow = {
  color: '#0ea5e9',
  fontWeight: '800',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontSize: '12px',
};

const pageTitle = {
  margin: '10px 0 0',
  fontSize: '42px',
  color: '#0f172a',
  lineHeight: 1.1,
};

const pill = {
  background: '#0f172a',
  color: '#fff',
  borderRadius: '999px',
  padding: '10px 18px',
  fontWeight: '800',
  boxShadow: '0 12px 24px rgba(15, 23, 42, 0.12)',
};

const panelCard = {
  background: '#fff',
  borderRadius: '28px',
  padding: '26px',
  boxShadow: '0 18px 35px rgba(15, 23, 42, 0.08)',
  border: '1px solid rgba(148,163,184,0.14)',
};

const panelHead = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
  marginBottom: '18px',
};

const panelTitle = {
  margin: 0,
  color: '#0f172a',
  fontSize: '28px',
};

const formGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '18px',
};

const inputStyle = {
  width: '100%',
  border: '1px solid #cbd5e1',
  borderRadius: '12px',
  padding: '12px 14px',
  fontSize: '15px',
  background: '#f8fafc',
  color: '#0f172a',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: '#334155',
  fontWeight: '700',
  fontSize: '13px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const primaryButton = {
  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '14px',
  padding: '14px 24px',
  fontWeight: '800',
  cursor: 'pointer',
  minWidth: '180px',
};

const secondaryButton = {
  border: 'none',
  borderRadius: '12px',
  background: '#e2e8f0',
  color: '#0f172a',
  padding: '10px 16px',
  fontWeight: '800',
  cursor: 'pointer',
};

const searchButton = {
  background: '#0ea5e9',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  padding: '12px 16px',
  fontWeight: '800',
  cursor: 'pointer',
};

const editButton = {
  background: '#facc15',
  color: '#111827',
  border: 'none',
  borderRadius: '10px',
  padding: '8px 12px',
  fontWeight: '800',
  cursor: 'pointer',
};

const deleteButton = {
  background: '#ef4444',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  padding: '8px 12px',
  fontWeight: '800',
  cursor: 'pointer',
};

const thStyle = {
  padding: '14px 12px',
  textAlign: 'left',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
};

const tdStyle = {
  padding: '16px 12px',
  textAlign: 'left',
  color: '#0f172a',
};

export default AdminDashboard;
