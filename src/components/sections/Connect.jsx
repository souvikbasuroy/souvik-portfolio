import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MessageSquare } from 'lucide-react';

const Connect = ({ scrollVH }) => {
  // Fallback: If we are in the Connect section range (approx > 1740 VH), force visibility
  const isVisibleRange = scrollVH >= 1740;

  return (
    <div 
      id="sec-connect" 
      className="section-content" 
      style={{ 
        zIndex: 50, // Ultra high z-index
        position: 'relative',
        opacity: isVisibleRange ? 1 : undefined // Force opacity if in range
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="sec-heading">
          <span className="sec-label-text">Get In Touch</span>
          <h2 className="sec-title">Let's <em>Connect</em></h2>
        </div>

        <div className="connect-grid" style={{ marginTop: '3rem' }}>
          <div className="connect-links" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="mailto:souvikbasuroy1@gmail.com" className="connect-link glass" style={{
              display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.2rem 2rem', borderRadius: '12px',
              textDecoration: 'none', color: 'var(--text-bright)', transition: 'all 0.3s ease'
            }}>
              <Mail size={24} color="var(--accent)" />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Email</span>
            </a>
            
            <a href="https://www.linkedin.com/in/souvik-basu-roy" target="_blank" rel="noopener noreferrer" className="connect-link glass" style={{
              display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.2rem 2rem', borderRadius: '12px',
              textDecoration: 'none', color: 'var(--text-bright)', transition: 'all 0.3s ease'
            }}>
              <Linkedin size={24} color="var(--accent)" />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>LinkedIn</span>
            </a>
            
            <a href="https://github.com/souvikbasuroy" target="_blank" rel="noopener noreferrer" className="connect-link glass" style={{
              display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.2rem 2rem', borderRadius: '12px',
              textDecoration: 'none', color: 'var(--text-bright)', transition: 'all 0.3s ease'
            }}>
              <Github size={24} color="var(--accent)" />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>GitHub</span>
            </a>
          </div>

          <div className="connect-text" style={{ padding: '1rem' }}>
            <p className="body-text" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-bright)' }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div style={{ 
              marginTop: '3rem', 
              padding: '2rem', 
              borderLeft: '2px solid var(--accent)',
              background: 'rgba(255,215,0,0.03)',
              fontFamily: 'var(--font-accent)', 
              fontStyle: 'italic', 
              color: 'var(--accent)', 
              fontSize: '1.3rem' 
            }}>
              "Designing the future, one frame at a time."
            </div>
            
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-faint)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
              <MessageSquare size={14} /> Available for freelance & full-time roles
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Connect;
