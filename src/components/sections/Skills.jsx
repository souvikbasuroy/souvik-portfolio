import React from 'react';
import { motion } from 'framer-motion';

const SKILL_GROUPS = [
  {
    label: 'Languages',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
      { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    ]
  },
  {
    label: 'Frameworks & Libs',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
      { name: 'D3.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d3js/d3js-original.svg' },
      { name: 'Framer Motion', icon: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg' },
    ]
  },
  {
    label: 'Tools & AI',
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    ]
  }
];

const SkillCoin = ({ name, icon, invert, index }) => {
  return (
    <motion.div
      className="coin-container"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      <div className="premium-coin">
        <div className="coin-inner-ring" />
        <div className="coin-shine" />
        <img
          src={icon}
          alt={name}
          className={`skill-logo ${invert ? 'invert-icon' : ''}`}
          style={invert ? { filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.5))' } : {}}
        />
      </div>
      <div className="coin-name-tag">{name}</div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <div id="sec-skills" className="section-content" style={{ maxWidth: '1000px' }}>
      <div className="sec-heading">
        <span className="sec-label-text">Technical Arsenal</span>
        <h2 className="sec-title">Expertise</h2>
      </div>

      <div className="treasury">
        {SKILL_GROUPS.map((group, gIdx) => (
          <div key={group.label} className="treasury-group">
            <motion.div
              className="treasury-group-label"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {group.label}
            </motion.div>
            <div className="coins-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem' }}>
              {group.skills.map((skill, sIdx) => (
                <SkillCoin
                  key={skill.name}
                  {...skill}
                  index={sIdx + gIdx * 3}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
