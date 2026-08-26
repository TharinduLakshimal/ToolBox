import React from 'react';

const Contact = () => {
  const contactInfo = [
    {
      title: 'Email us',
      value: 'support@toolbox.com',
      href: 'mailto:support@toolbox.com',
      icon: '✉️',
    },
    {
      title: 'Call us',
      value: '+94 71 234 5678',
      href: 'tel:+94712345678',
      icon: '📞',
    },
    {
      title: 'Visit us',
      value: '123 Tool Street, Colombo, Sri Lanka',
      href: '#',
      icon: '📍',
    },
  ];

  const socials = [
    { label: 'WhatsApp', href: 'https://wa.me/94712345678', icon: 'https://img.icons8.com/color/48/whatsapp--v1.png' },
    { label: 'Facebook', href: 'https://www.facebook.com/toolbox.lk', icon: 'https://img.icons8.com/color/48/facebook-new.png' },
    { label: 'Email', href: 'mailto:support@toolbox.com', icon: 'https://img.icons8.com/color/48/gmail--v1.png' },
  ];

  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)', minHeight: '100vh', padding: '40px 20px 70px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0f172a 35%, #0ea5e9 100%)', borderRadius: '32px', padding: '42px 36px', boxShadow: '0 26px 60px rgba(15,23,42,0.12)', color: '#fff', marginBottom: '28px' }}>
          <div style={{ color: '#7dd3fc', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '800' }}>Contact</div>
          <h1 style={{ margin: '14px 0 12px', fontSize: 'clamp(2.3rem, 5vw, 4rem)', lineHeight: 1.1 }}>We’re here to help with every project.</h1>
          <p style={{ margin: 0, maxWidth: '650px', color: '#e2e8f0', fontSize: '18px', lineHeight: 1.8 }}>
            Have a question, need expert guidance, or want to book a tool for your next job? Reach out and our team will get back to you quickly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '22px', marginBottom: '28px' }}>
          {contactInfo.map((item) => (
            <div key={item.title} style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.06)', border: '1px solid rgba(148,163,184,0.12)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #dbeafe 0%, #bae6fd 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', fontSize: '24px' }}>{item.icon}</div>
              <div style={{ color: '#64748b', fontSize: '12px', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.title}</div>
              {item.href !== '#' ? (
                <a href={item.href} style={{ display: 'block', marginTop: '12px', color: '#0f172a', textDecoration: 'none', fontSize: '20px', fontWeight: '700' }}>{item.value}</a>
              ) : (
                <div style={{ marginTop: '12px', color: '#0f172a', fontSize: '20px', fontWeight: '700' }}>{item.value}</div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '28px', padding: '28px', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.06)', border: '1px solid rgba(148,163,184,0.12)' }}>
            <div style={{ color: '#0ea5e9', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '12px', marginBottom: '12px' }}>Support hours</div>
            <h2 style={{ margin: '0 0 16px', fontSize: '30px', color: '#0f172a' }}>Friendly service, fast response.</h2>
            <p style={{ margin: '0 0 12px', color: '#475569', lineHeight: 1.8, fontSize: '17px' }}>
              We typically reply within 24 hours on business days and are committed to helping you get the right tools for the right job.
            </p>
            <div style={{ display: 'grid', gap: '10px', marginTop: '18px' }}>
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '14px 16px', color: '#0f172a', fontWeight: '700' }}>Monday – Friday: 8:00 AM – 7:00 PM</div>
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '14px 16px', color: '#0f172a', fontWeight: '700' }}>Saturday: 9:00 AM – 4:00 PM</div>
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '14px 16px', color: '#0f172a', fontWeight: '700' }}>Sunday: Support by email only</div>
            </div>
          </div>

          <div style={{ background: '#0f172a', borderRadius: '28px', padding: '28px', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.18)', color: '#fff' }}>
            <div style={{ color: '#7dd3fc', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '12px', marginBottom: '12px' }}>Social</div>
            <h2 style={{ margin: '0 0 18px', fontSize: '30px' }}>Connect with us</h2>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', marginBottom: '18px' }}>
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" style={{ width: '58px', height: '58px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '16px', textDecoration: 'none' }} aria-label={social.label}>
                  <img src={social.icon} alt={social.label} style={{ width: '32px', height: '32px', display: 'block' }} />
                </a>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(148,163,184,0.2)', borderRadius: '20px', padding: '20px 18px', color: '#e2e8f0', lineHeight: 1.8 }}>
              We’re ready to help with tool availability, delivery questions, rental duration support, and more. Just send us a message and we’ll guide you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
