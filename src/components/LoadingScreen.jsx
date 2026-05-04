import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ progress }) => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#07070a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Simple Minimal Percentage */}
        <div style={{
          fontFamily: 'Cinzel', color: '#FFD700', fontSize: '2.5rem', fontWeight: '200',
          marginBottom: '30px', letterSpacing: '0.1em'
        }}>
          {Math.round(progress)}<span style={{ fontSize: '1rem', opacity: 0.5, marginLeft: '4px' }}>%</span>
        </div>

        {/* Minimal Progress Bar */}
        <div style={{
          width: '200px', height: '1px', background: 'rgba(255,255,255,0.05)',
          position: 'relative', overflow: 'hidden'
        }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            style={{ 
              height: '100%', 
              background: '#FFD700', 
              boxShadow: '0 0 15px rgba(255,215,0,0.6)' 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
