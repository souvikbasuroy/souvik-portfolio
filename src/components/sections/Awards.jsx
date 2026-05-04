import React from 'react';

const AWARDS = [
  {
    num: '01',
    title: 'School Topper',
    tag: 'Rank 1',
    subject: 'Computer Application & Geography',
    desc: 'Highest score across the entire school in Class 11th Examinations, 2024.',
    img: './WhatsApp.jpeg'
  },
  {
    num: '02',
    title: 'Top 10 in School',
    tag: 'Rank 2 & 8',
    subject: 'Humanities Stream',
    desc: 'Ranked among the top 10 students in the entire school; secured 8th position in overall in Higher Secondary Examination and Secured 2nd rank in the Humanities stream in School in H.S., 2025.',
    img: './12.jpeg'
  }
];

const Awards = () => {
  return (
    <div id="sec-awards" className="section-content" style={{ maxWidth: '1200px' }}>

      <div className="sec-heading">
        <span className="sec-label-text">Recognition</span>
        <h2 className="sec-title">Awards</h2>
      </div>

      <div className="awards-grid">
        {AWARDS.map((a) => (
          <div
            key={a.num}
            className="award-card glass"
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              transition: 'transform 0.4s ease'
            }}
          >
            {/* Image */}
            <div style={{ height: '180px', overflow: 'hidden' }}>
              <img
                src={a.img}
                alt={a.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Content */}
            <div style={{ padding: '2rem' }}>

              <div style={{
                fontSize: '1.4rem',
                color: 'var(--accent)',
                opacity: 0.3,
                fontWeight: 900
              }}>
                {a.num}
              </div>

              <div style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                padding: '4px 10px',
                background: 'rgba(255,215,0,0.1)',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontSize: '0.6rem',
                fontWeight: 700,
                borderRadius: '4px'
              }}>
                {a.tag}
              </div>

              <h3 style={{
                marginTop: '0.8rem',
                fontSize: '1.2rem',
                color: 'var(--text-bright)'
              }}>
                {a.title}
              </h3>

              <p style={{
                fontSize: '0.8rem',
                color: 'var(--accent-secondary)',
                marginTop: '0.2rem'
              }}>
                {a.subject}
              </p>

              <p style={{
                marginTop: '1rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)'
              }}>
                {a.desc}
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;