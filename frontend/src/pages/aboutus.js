import React from 'react';

const About = () => {
  return (
    <div style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef6ff 100%)', minHeight: '100vh', padding: '40px 20px 70px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0f172a 35%, #0ea5e9 100%)', borderRadius: '32px', padding: '42px 36px', boxShadow: '0 26px 60px rgba(15,23,42,0.12)', color: '#fff', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ color: '#7dd3fc', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '800' }}>About us</div>
              <h1 style={{ margin: '14px 0 12px', fontSize: 'clamp(2.3rem, 5vw, 4rem)', lineHeight: 1.1 }}>Built for busy builders and smart renters.</h1>
              <p style={{ margin: 0, maxWidth: '650px', color: '#e2e8f0', fontSize: '18px', lineHeight: 1.8 }}>
                ToolBox makes renting tools easier, faster, and more affordable for homeowners, contractors, and creators who need equipment without the heavy cost of ownership.
              </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '22px 18px', minWidth: '220px' }}>
              <div style={{ color: '#7dd3fc', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800' }}>Since 2024</div>
              <div style={{ marginTop: '8px', fontSize: '42px', fontWeight: '900' }}>1K+</div>
              <div style={{ color: '#cbd5e1', fontSize: '14px' }}>happy customers</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '22px', marginBottom: '28px' }}>
          {[
            { title: 'Smart booking', text: 'Reserve the exact tool you need with transparent pricing and fast confirmations.' },
            { title: 'Flexible rentals', text: 'Choose the duration that fits your project instead of paying for long-term ownership.' },
            { title: 'Trusted support', text: 'Get reliable equipment and responsive help when your work needs momentum.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#fff', borderRadius: '24px', padding: '24px', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.06)', border: '1px solid rgba(148,163,184,0.12)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #dbeafe 0%, #bae6fd 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '14px' }}>✓</div>
              <h3 style={{ margin: '0 0 10px', color: '#0f172a', fontSize: '24px' }}>{item.title}</h3>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>{item.text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '28px', padding: '28px', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.06)', border: '1px solid rgba(148,163,184,0.12)' }}>
            <div style={{ color: '#0ea5e9', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px', marginBottom: '12px' }}>Our mission</div>
            <h2 style={{ margin: '0 0 14px', fontSize: '30px', color: '#0f172a' }}>Make access to tools simpler, smarter, and more sustainable.</h2>
            <p style={{ margin: 0, color: '#475569', fontSize: '17px', lineHeight: 1.9 }}>
              We help customers and businesses rent quality tools without the friction of long-term purchase commitments. Our mission is to reduce waste, save money, and make every project feel more achievable.
            </p>
          </div>

          <div style={{ background: '#0f172a', borderRadius: '28px', padding: '28px', boxShadow: '0 18px 35px rgba(15, 23, 42, 0.18)', color: '#fff' }}>
            <div style={{ color: '#7dd3fc', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '12px', marginBottom: '12px' }}>Our vision</div>
            <h2 style={{ margin: '0 0 14px', fontSize: '30px' }}>Rent smart. Build better.</h2>
            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '17px', lineHeight: 1.9 }}>
              We envision a future where tools are shared efficiently, projects move faster, and communities spend less on ownership while achieving more together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
