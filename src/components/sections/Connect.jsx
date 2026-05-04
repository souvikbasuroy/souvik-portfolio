import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const Connect = () => {
  return (
    <div id="sec-connect" className="section-content">
      <div className="sec-heading">
        <span className="sec-label-text">Get In Touch</span>
        <h2 className="sec-title">Let's <em>Connect</em></h2>
      </div>

      <div className="connect-grid">
        <div className="connect-links" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a href="mailto:souvikbasuroy1@gmail.com" className="connect-link glass" style={{
            display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.2rem 2rem', borderRadius: '12px',
            textDecoration: 'none', color: 'var(--text-bright)', transition: 'transform 0.3s'
          }}>
            <Mail size={24} color="var(--accent)" />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Email</span>
          </a>
          <a href="https://www.linkedin.com/in/souvik-basu-roy" target="_blank" rel="noopener noreferrer" className="connect-link glass" style={{
            display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.2rem 2rem', borderRadius: '12px',
            textDecoration: 'none', color: 'var(--text-bright)'
          }}>
            <Linkedin size={24} color="var(--accent)" />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>LinkedIn</span>
          </a>
          <a href="https://github.com/souvikbasuroy" target="_blank" rel="noopener noreferrer" className="connect-link glass" style={{
            display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.2rem 2rem', borderRadius: '12px',
            textDecoration: 'none', color: 'var(--text-bright)'
          }}>
            <Github size={24} color="var(--accent)" />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>GitHub</span>
          </a>
        </div>

        <div className="connect-text">
          <p className="body-text">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
          <div style={{ marginTop: '2rem', fontFamily: 'var(--font-accent)', fontStyle: 'italic', color: 'var(--accent)', fontSize: '1.2rem' }}>
            "Designing the future, one frame at a time."
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
