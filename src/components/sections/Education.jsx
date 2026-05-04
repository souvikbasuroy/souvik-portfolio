import React from 'react';

const Education = () => {
  return (
    <div id="sec-education" className="section-content">
      <div className="sec-heading">
        <span className="sec-label-text">Academic Foundation</span>
        <h2 className="sec-title">Education</h2>
      </div>

      <div className="edu-timeline" style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid var(--accent)' }}>
        <div className="edu-item glass" style={{ padding: '1.5rem', borderRadius: '0 12px 12px 0', marginBottom: '1.5rem' }}>
          <div className="edu-year" style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700 }}>2025 — Present</div>
          <h3 className="edu-degree" style={{ color: 'var(--text-bright)', fontSize: '1.1rem' }}>Bachelor of Computer Applications (BCA) Hons.</h3>
          <div className="edu-school" style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem' }}>Institute of Engineering & Management (IEM)</div>
        </div>
        <div className="edu-item glass" style={{ padding: '1.5rem', borderRadius: '0 12px 12px 0', marginBottom: '1.5rem' }}>
          <div className="edu-year" style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700 }}>2023-2025</div>
          <h3 className="edu-degree" style={{ color: 'var(--text-bright)', fontSize: '1.1rem' }}>Higher Secondary (WBCHSE)</h3>
          <div className="edu-school" style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem' }}>Jadavpur Vidyapith</div>
          <div className="edu-year" style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700 }}>Percentage: 94%</div>
        </div>
        <div className="edu-item glass" style={{ padding: '1.5rem', borderRadius: '0 12px 12px 0' }}>
          <div className="edu-year" style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700 }}>2011-2023</div>
          <h3 className="edu-degree" style={{ color: 'var(--text-bright)', fontSize: '1.1rem' }}>Madhyamik (WBBSE)</h3>
          <div className="edu-school" style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem' }}>Jadavpur Vidyapith</div>
          <div className="edu-year" style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700 }}>Percentage: 84.28%</div>
        </div>
      </div>
    </div>
  );
};

export default Education;
