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
import { useScrollHold } from './hooks/useScrollHold';

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

const SEC_H = 200; // vh - Making website longer for better visibility
const VID_H = 200; // vh - Slower, more cinematic transitions

const App = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const [confirmedSectionId, setConfirmedSectionId] = useState(null);

  // Build timeline and hold points
  const { timeline, holdPoints } = useMemo(() => {
    const tl = [];
    const hp = [];
    let vh = 0;
    SECTIONS.forEach((sec, i) => {
      tl.push({ type: 'section', sectionIdx: i, startVH: vh, endVH: vh + SEC_H, id: sec.id });
      hp.push(vh);
      vh += SEC_H;
      if (i < SECTIONS.length - 1) {
        tl.push({ type: 'video', videoIdx: i, startVH: vh, endVH: vh + VID_H });
        vh += VID_H;
      }
    });
    return { timeline: tl, holdPoints: hp };
  }, []);

  const totalVH = timeline[timeline.length - 1].endVH;

  // Custom Scroll with Hold Points
  const { currentVH, isHeld, scrollToVH } = useScrollHold(holdPoints, {
    sensitivity: 140,
    lerpSpeed: 0.08,
    totalVH: totalVH
  });

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setUserStarted(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  const currentSectionIdx = useMemo(() => {
    const seg = timeline.find(s => currentVH >= s.startVH - 2 && currentVH < s.endVH);
    return (seg && seg.type === 'section') ? seg.sectionIdx : -1;
  }, [currentVH, timeline]);

  return (
    <div className="app-container" style={{ 
      backgroundColor: '#040407', height: '100vh', overflow: 'hidden', position: 'relative' 
    }}>
      <AnimatePresence>
        {!userStarted && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'fixed', inset: 0, zIndex: 10000 }}
          >
            <LoadingScreen progress={loadingProgress} />
          </motion.div>
        )}
      </AnimatePresence>

      <GlobalCanvas 
        scrollVH={currentVH} 
        timeline={timeline} 
        onProgress={setLoadingProgress}
        onLoaded={() => setIsLoaded(true)}
        onSectionFrameReady={(id) => setConfirmedSectionId(id)}
      />

      <AnimatePresence>
        {userStarted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Navigation 
              scrollVH={currentVH} 
              totalVH={totalVH} 
              currentSectionIdx={currentSectionIdx} 
              sections={SECTIONS} 
              scrollToVH={scrollToVH} 
            />
            
            <AnimatePresence mode="wait">
              {currentSectionIdx !== -1 && (confirmedSectionId === SECTIONS[currentSectionIdx].id || isHeld) && (
                <motion.div
                  key={SECTIONS[currentSectionIdx].id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="section-overlay active"
                  style={{ zIndex: 10 }}
                >
                  {currentSectionIdx === 0 && <About scrollToVH={scrollToVH} />}
                  {currentSectionIdx === 1 && <Projects />}
                  {currentSectionIdx === 2 && <Education />}
                  {currentSectionIdx === 3 && <Skills />}
                  {currentSectionIdx === 4 && <Experience />}
                  {currentSectionIdx === 5 && <Awards />}
                  {currentSectionIdx === 6 && <Certificates />}
                  {currentSectionIdx === 7 && <Connect scrollVH={currentVH} />}
                </motion.div>
              )}
            </AnimatePresence>

            <div id="section-dim" style={{
              position: 'fixed', inset: 0, background: 'rgba(4,4,7,0.7)', zIndex: 6,
              opacity: currentSectionIdx !== -1 ? 1 : 0, transition: 'opacity 0.6s ease', pointerEvents: 'none'
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
