import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const About = () => {
  const scrollToConnect = () => {
    const targetVH = 7 * 400;
    window.scrollTo({
      top: (targetVH / 100) * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div id="sec-about" className="section-content">
      <div className="about-layout" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr',
        gap: '6vw',
        alignItems: 'flex-start',
        maxWidth: '1200px'
      }}>

        {/* Left Column: Heading + Photo */}
        <div className="about-left" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'center' }}>
          <div className="sec-heading" style={{ margin: 0, width: '100%' }}>
            <span className="sec-label-text">Introduction</span>
            <h1 className="sec-title" style={{ fontSize: '3.5rem' }}>Souvik Basu Roy</h1>
          </div>

          <div className="profile-frame-container" style={{ position: 'relative', cursor: 'pointer' }}>
            {/* Dynamic Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                inset: '-10px',
                borderRadius: '50%',
                border: '2px dashed var(--accent)',
                opacity: 0.3,
                pointerEvents: 'none'
              }}
            />

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, x: [0, -10, 10, -10, 10, 0] }}
              transition={{ tap: { duration: 0.5 } }}
              className="profile-frame-wrap"
              style={{ position: 'relative', zIndex: 1 }}
            >
              <div className="profile-frame" style={{
                width: '220px',
                height: '225px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px var(--accent-glow)',
                border: '2px solid var(--accent)',
                padding: '4px',
                background: 'var(--bg-dark)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img
                    src="./souvik.jpeg"
                    alt="Souvik"
                    style={{
                      width: '100%',
                      height: '76%',
                      objectFit: 'cover',
                      objectPosition: '10% 15%', // Adjusted to center the face from the left-heavy image
                      scale: '1.7', // Increased zoom for better focus
                      filter: 'contrast(1.1) brightness(1.1)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 40%, rgba(7,7,10,0.5) 100%)',
                    borderRadius: '50%'
                  }} />
                </div>
              </div>
            </motion.div>

            {/* Floating Badge */}

          </div>

          <div className="profile-name-tag" style={{
            marginTop: '1rem', fontFamily: 'var(--font-heading)', fontSize: '0.8rem',
            color: 'var(--accent)', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 800,
            textAlign: 'center'
          }}>
            Data Architect • Web Innovator
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="about-right" style={{ paddingTop: '0' }}>
          <div className="about-bio" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p className="body-text" style={{ fontSize: '1rem', color: 'var(--text-bright)', lineHeight: '1.6', fontWeight: 500 }}>
              I am an aspiring <span className="accent-text" style={{ color: 'var(--accent-secondary)' }}>Data Analyst and Web Developer</span> with a strong passion for building intelligent, user-focused digital solutions.
            </p>

            <p className="body-text" style={{ opacity: 0.9, fontSize: '0.9rem', lineHeight: '1.5' }}>
              My work revolves around transforming complex data into actionable insights while crafting seamless, visually compelling web experiences. I specialize in bridging the gap between data and design—combining analytical thinking with creative problem-solving.
            </p>

            <p className="body-text" style={{ opacity: 0.8, fontSize: '0.85rem', lineHeight: '1.5' }}>
              Currently, as a student at <span style={{ color: 'var(--accent)' }}>IEM</span>, I am continuously expanding my skill set by building real-world projects and deepening my understanding of AI and data-driven systems.
            </p>

            <div className="tag-row" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              {['Web Developer', 'Data Analyst', 'AI Developer', 'Problem Solver'].map(tag => (
                <span key={tag} className="tag glass" style={{
                  padding: '8px 20px', borderRadius: '30px', fontSize: '0.6rem', fontFamily: 'var(--font-heading)',
                  textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', fontWeight: 700
                }}>{tag}</span>
              ))}
            </div>

            <div className="about-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="./Souvik Basu Roy CV (1).pdf" className="btn-resume" style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, #f5d878 100%)',
                color: '#000', padding: '12px 28px', borderRadius: '8px', fontWeight: 900,
                textDecoration: 'none', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em',
                boxShadow: '0 10px 30px var(--accent-glow)', transition: 'transform 0.3s'
              }}>Download CV</a>
              <button
                onClick={scrollToConnect}
                className="btn-contact glass"
                style={{
                  color: 'var(--text-bright)', padding: '12px 28px', borderRadius: '8px', fontWeight: 700,
                  cursor: 'pointer', border: '1px solid var(--glass-border)', background: 'transparent',
                  fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'all 0.3s'
                }}
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
