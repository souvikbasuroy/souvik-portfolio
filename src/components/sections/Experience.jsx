import React from 'react';

const Experience = () => {
  return (
    <div id="sec-experience" className="section-content">
      <div className="sec-heading">
        <span className="sec-label-text">Professional Path</span>
        <h2 className="sec-title">Experience</h2>
      </div>

      <div className="exp-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="exp-item glass" style={{ padding: '2rem', borderRadius: '16px', borderLeft: '4px solid var(--accent-secondary)' }}>
          <div className="exp-period" style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 800 }}>FEB 2026 — MAR 2026</div>
          <h3 className="exp-title" style={{ color: 'var(--text-bright)', fontSize: '1.2rem', marginTop: '0.5rem' }}>Data Analyst Intern</h3>
          <div className="exp-company" style={{ color: 'var(--accent-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Elevate Labs · Remote</div>
          <ul className="exp-points" style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <li>Analyzed large datasets to drive business decisions.</li>
            <li>Implemented automated data cleaning workflows using Python.</li>
            <li>Created interactive dashboards in Power BI.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
