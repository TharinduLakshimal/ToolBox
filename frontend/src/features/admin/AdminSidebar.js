import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab, stats }) => {
  const items = [
    { key: 'tools', label: 'Add Tools', icon: '＋' },
    { key: 'show-tools', label: 'Show Tools', icon: '🧰' },
    { key: 'rented', label: 'Rented', icon: '📦' },
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.brandWrap}>
        <div style={styles.brandIcon}>T</div>
        <div>
          <div style={styles.brandText}>ToolBox</div>
          <div style={styles.brandSub}>Admin panel</div>
        </div>
      </div>

      <div style={styles.sectionLabel}>Navigation</div>
      <nav style={styles.nav}>
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            style={{
              ...styles.navButton,
              ...(activeTab === item.key ? styles.navButtonActive : {}),
            }}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
            {item.key === 'rented' && (
              <span style={styles.countBadge}>{stats.rentals || 0}</span>
            )}
            {item.key === 'show-tools' && (
              <span style={styles.countBadge}>{stats.tools || 0}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    position: 'sticky',
    top: '24px',
    width: '260px',
    minWidth: '260px',
    background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
    color: '#fff',
    borderRadius: '24px',
    padding: '22px 16px',
    boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)',
    minHeight: '760px',
    border: '1px solid rgba(148, 163, 184, 0.18)',
  },
  brandWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 10px 18px',
    borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
    marginBottom: '20px',
  },
  brandIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)',
    color: '#fff',
    fontWeight: '900',
    fontSize: '20px',
    boxShadow: '0 12px 24px rgba(37, 99, 235, 0.35)',
  },
  brandText: {
    fontWeight: '900',
    fontSize: '18px',
    letterSpacing: '-0.04em',
  },
  brandSub: {
    color: '#cbd5e1',
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginTop: '2px',
  },
  sectionLabel: {
    color: '#94a3b8',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '0 12px 12px',
  },
  nav: {
    display: 'grid',
    gap: '10px',
  },
  navButton: {
    border: '1px solid transparent',
    background: 'rgba(148, 163, 184, 0.04)',
    color: '#e2e8f0',
    borderRadius: '14px',
    padding: '13px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '700',
    cursor: 'pointer',
    textAlign: 'left',
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  navButtonActive: {
    background: 'linear-gradient(135deg, rgba(14,165,233,0.2) 0%, rgba(59,130,246,0.12) 100%)',
    borderColor: 'rgba(125,211,252,0.35)',
    color: '#fff',
    boxShadow: 'inset 0 0 0 1px rgba(125,211,252,0.2)',
  },
  navIcon: {
    width: '26px',
    height: '26px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(148, 163, 184, 0.1)',
    fontSize: '14px',
  },
  countBadge: {
    marginLeft: 'auto',
    background: '#f97316',
    color: '#fff',
    borderRadius: '999px',
    minWidth: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '800',
    padding: '0 6px',
  },
};

export default AdminSidebar;
