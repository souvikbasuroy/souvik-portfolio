import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalCanvas from './components/GlobalCanvas';
import Navigation from './components/Navigation';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Awards from './components/sections/Awards';
import Certificates from './components/sections/Certificates';
import Connect from './components/sections/Connect';
import LoadingScreen from './components/LoadingScreen';

const SECTIONS = [
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'education', title: 'Education' },
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
  { id: 'awards', title: 'Awards' },
  { id: 'certs', title: 'Certificates' },
  { id: 'connect', title: 'Connect' },
];

const SEC_H = 100; // vh
const VID_H = 150; // vh

const App = () => {
  const [scrollVH, setScrollVH] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userStarted, setUserStarted] = useState(false);

  const timeline = useMemo(() => {
    const tl = [];
    let vh = 0;
    SECTIONS.forEach((sec, i) => {
      tl.push({ type: 'section', sectionIdx: i, startVH: vh, endVH: vh + SEC_H, id: sec.id });
      vh += SEC_H;
      if (i < SECTIONS.length - 1) {
        tl.push({ type: 'video', videoIdx: i, startVH: vh, endVH: vh + VID_H });
        vh += VID_H;
      }
    });
    return tl;
  }, []);

  const totalVH = timeline[timeline.length - 1].endVH;

  useEffect(() => {
    const handleScroll = () => {
      const svh = (window.scrollY / window.innerHeight) * 100;
      setScrollVH(svh);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!userStarted) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [userStarted]);

  useEffect(() => {
    if (isLoaded) {
      // Small delay for smooth transition
      const timer = setTimeout(() => {
        setUserStarted(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  const currentSectionIdx = useMemo(() => {
    const seg = timeline.find(s => scrollVH >= s.startVH && scrollVH < s.endVH);
    return (seg && seg.type === 'section') ? seg.sectionIdx : -1;
  }, [scrollVH, timeline]);

  return (
    <div className="app-container">
      <AnimatePresence>
        {!userStarted && (
          <motion.div
            key="loading"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 10000 }}
          >
            <LoadingScreen 
              progress={loadingProgress} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <GlobalCanvas 
        scrollVH={scrollVH} 
        timeline={timeline} 
        onProgress={setLoadingProgress}
        onLoaded={() => setIsLoaded(true)}
      />

      <AnimatePresence>
        {userStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <Navigation scrollVH={scrollVH} totalVH={totalVH} currentSectionIdx={currentSectionIdx} sections={SECTIONS} />
            
            <div id="scroll-space" style={{ height: `${totalVH}vh`, position: 'relative' }} />

            <AnimatePresence>
              {currentSectionIdx !== -1 && (
                <motion.div
                  key={SECTIONS[currentSectionIdx].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="section-overlay active"
                >
                  {currentSectionIdx === 0 && <About />}
                  {currentSectionIdx === 1 && <Projects />}
                  {currentSectionIdx === 2 && <Education />}
                  {currentSectionIdx === 3 && <Skills />}
                  {currentSectionIdx === 4 && <Experience />}
                  {currentSectionIdx === 5 && <Awards />}
                  {currentSectionIdx === 6 && <Certificates />}
                  {currentSectionIdx === 7 && <Connect />}
                </motion.div>
              )}
            </AnimatePresence>

            <div id="section-dim" className={currentSectionIdx !== -1 ? 'on' : ''} style={{
              position: 'fixed', inset: 0, background: 'rgba(4,4,7,0.68)', zIndex: 6,
              opacity: currentSectionIdx !== -1 ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none'
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicators and hints could go here */}
    </div>
  );
};

export default App;
