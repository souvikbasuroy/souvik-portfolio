import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ scrollVH, totalVH, currentSectionIdx, sections }) => {
  const progress = (scrollVH / totalVH) * 100;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (idx) => {
    const targetVH = idx * 400;
    window.scrollTo({
      top: (targetVH / 100) * window.innerHeight,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav id="nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 'var(--nav-h)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 6vw', background: 'transparent',
        backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.4s ease'
      }}>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          SOUVIK BASU ROY
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          {sections.map((sec, i) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(i); }}
                className={currentSectionIdx === i ? 'active' : ''}
                style={{
                  fontFamily: 'var(--font-heading)', fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase', color: currentSectionIdx === i ? 'var(--accent)' : 'rgba(255,255,255,0.5)',
                  textDecoration: 'none', transition: 'all 0.3s ease', position: 'relative', padding: '8px 0'
                }}
              >
                {sec.title}
                {currentSectionIdx === i && (
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', background: 'var(--accent)'
                  }} />
                )}
              </a>
            </li>
          ))}
        </ul>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)} />

      <div id="progress-bar" style={{
        position: 'fixed', top: 'var(--nav-h)', left: 0, height: '2px', width: `${progress}%`,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-secondary))', zIndex: 101,
        boxShadow: '0 0 10px var(--accent-glow)', transition: 'width 0.1s linear'
      }} />
    </>
  );
};

export default Navigation;
