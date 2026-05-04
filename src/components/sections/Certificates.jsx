import React from 'react';

const CERTS = [
  { name: 'MLH Bot To Agents', issuer: 'Major League Hacking', year: '2026', img: './Certificates/MLH_AGENT.jpeg' },
  { name: 'AI Agents Intensive', issuer: 'Kaggle : Google', year: '2025', img: './Certificates/5-Day AI Agents Intensive Course with Google.png' },
  { name: 'Google Data Analytics', issuer: 'Coursera : Google', year: '2026', img: './Certificates/Google Data Analytics.jpg' },
  { name: 'Big Data Computing', issuer: 'NPTEL', year: '2025', img: './Certificates/Big Data Computing.jpg' },
  { name: 'Business English', issuer: 'Coursera : Arizona State University', year: '2025', img: './Certificates/Business English.jpg' },
  { name: 'Marketing Management I', issuer: 'NPTEL', year: '2025', img: './Certificates/Marketing Management.jpg' },
];

const Certificates = () => {
  // Double the list for seamless looping
  const loopedCerts = [...CERTS, ...CERTS];

  return (
    <div id="sec-certs" className="section-content" style={{ overflow: 'hidden', width: '100%' }}>
      <div className="sec-heading">
        <span className="sec-label-text">Verified Credentials</span>
        <h2 className="sec-title">Certificates</h2>
      </div>

      <div className="certs-carousel-wrap" style={{ position: 'relative', marginTop: '2rem' }}>
        <div className="scroll-infinite">
          {loopedCerts.map((c, i) => (
            <div key={i} className="cert-card glass" style={{
              width: '320px', flexShrink: 0, margin: '0 1rem', borderRadius: '20px',
              overflow: 'hidden', borderBottom: '4px solid var(--accent)'
            }}>
              <div className="cert-img-wrap" style={{ height: '200px', width: '100%', background: 'rgba(255,255,255,0.05)' }}>
                {c.img ? (
                  <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}>
                    <span style={{ fontSize: '3rem' }}>📜</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'var(--text-bright)', fontSize: '1rem', letterSpacing: '0.05em' }}>{c.name}</h3>
                <div style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '0.4rem', fontWeight: 700 }}>{c.issuer}</div>
                <div style={{ color: 'var(--text-faint)', fontSize: '0.65rem', marginTop: '1rem', textTransform: 'uppercase' }}>Issued {c.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
