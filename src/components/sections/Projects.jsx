import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    num: '01',
    title: 'MeetIQ',
    desc: 'MeetIQ is a multi-agent AI system that transforms a simple meeting goal into a complete, data-driven executive brief in minutes.',
    tech: ['Python', 'CrewAI', 'HTML', 'CSS', 'JavaScript', 'Gemini API'],
    img: 'Projects/Front.jpeg',
    github: 'https://github.com/souvikbasuroy/MeetIQ',
    live: 'https://huggingface.co/spaces/Souvikbasur/MeetIQ'
  },
];

const Projects = () => {
  return (
    <div id="sec-projects" className="section-content" style={{ maxWidth: '1200px' }}>
      <div className="sec-heading">
        <span className="sec-label-text">Masterpieces</span>
        <h2 className="sec-title">Selected <em>Works</em></h2>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <div key={p.num} className="project-card glass" style={{
            borderRadius: '20px', position: 'relative', overflow: 'hidden',
            transition: 'transform 0.4s ease', height: '100%'
          }}>
            <div className="project-img-wrap" style={{ height: '180px', width: '100%', overflow: 'hidden' }}>
              <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ padding: '2rem' }}>
              <div className="project-num" style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--accent)', opacity: 0.3, fontWeight: 900
              }}>{p.num}</div>
              <h3 className="project-title" style={{ marginTop: '0.5rem', fontSize: '1.25rem', color: 'var(--text-bright)' }}>{p.title}</h3>
              <p className="project-desc" style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', minHeight: '3.5rem' }}>{p.desc}</p>

              <div className="project-tech" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {p.tech.map(t => (
                  <span key={t} className="tech-pill" style={{
                    fontSize: '0.55rem', padding: '4px 10px', background: 'rgba(255,215,0,0.05)',
                    border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '4px', textTransform: 'uppercase'
                  }}>{t}</span>
                ))}
              </div>

              <div className="project-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="glass" style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'var(--text-bright)', fontSize: '0.7rem', fontWeight: 700
                }}>
                  <Github size={16} /> Code
                </a>
                <a href={p.live} target="_blank" rel="noopener noreferrer" style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '10px', borderRadius: '8px', textDecoration: 'none', background: 'var(--accent)', color: '#000', fontSize: '0.7rem', fontWeight: 700
                }}>
                  <ExternalLink size={16} /> Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
