import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FOLDERS = 7;
const FRAMES_PER_FOLDER = 192;
const FRAME_EXT = 'jpg';

const GlobalCanvas = ({ scrollVH, timeline, onProgress, onLoaded }) => {
  const canvasRef = useRef(null);
  const frameCache = useRef({});
  const [isLoadedInternal, setIsLoadedInternal] = useState(false);

  const pad = (n) => String(n).padStart(3, '0');

  const preloadFolder = async (folderNum, startProgress, endProgress) => {
    if (frameCache.current[folderNum]) return;
    frameCache.current[folderNum] = {};

    let loadedCount = 0;
    const promises = [];
    for (let i = 1; i <= FRAMES_PER_FOLDER; i++) {
      promises.push(new Promise((resolve) => {
        const img = new Image();
        img.src = `./frames/${folderNum}/ezgif-frame-${pad(i)}.${FRAME_EXT}`;
        img.onload = img.onerror = () => {
          frameCache.current[folderNum][i] = img;
          loadedCount++;
          const currentProgress = startProgress + (loadedCount / FRAMES_PER_FOLDER) * (endProgress - startProgress);
          if (onProgress) onProgress(currentProgress);
          resolve();
        };
      }));
    }
    await Promise.all(promises);
  };

  useEffect(() => {
    const init = async () => {
      // Load first 2 folders initially
      await preloadFolder(1, 0, 50);
      await preloadFolder(2, 50, 100);
      setIsLoadedInternal(true);
      if (onLoaded) onLoaded();
    };
    init();

    const handleResize = () => {
      if (canvasRef.current) {
        // FIX 1: UP SAMPLE FOR RETINA/HIGH-DPI DISPLAYS
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isLoadedInternal || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    // FIX 2: IMPROVE IMAGE SMOOTHING QUALITY
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const svh = scrollVH;
    let seg = timeline.find(s => svh >= s.startVH && svh < s.endVH) || timeline[timeline.length - 1];

    let folder, progress;
    if (seg.type === 'video') {
      folder = seg.videoIdx + 1;
      progress = (svh - seg.startVH) / (seg.endVH - seg.startVH);
      if (progress > 0.6 && folder < TOTAL_FOLDERS) preloadFolder(folder + 1);
    } else {
      folder = seg.sectionIdx + 1;
      progress = 0;
      if (seg.sectionIdx > 0) {
        folder = seg.sectionIdx;
        progress = 1;
      }
    }

    const frameNum = Math.max(1, Math.min(FRAMES_PER_FOLDER, Math.round(progress * (FRAMES_PER_FOLDER - 1)) + 1));
    const img = frameCache.current[folder] && frameCache.current[folder][frameNum];

    if (img && img.complete && img.naturalWidth !== 0) {
      const cw = canvasRef.current.width;
      const ch = canvasRef.current.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh);
    }
  }, [scrollVH, isLoadedInternal, timeline]);

  return (
    <div id="stage" style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
      {/* FIX 3: CSS SHARPENING FILTERS */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: '-webkit-optimize-contrast', // Safari/Chrome sharpen
          filter: 'contrast(1.08) brightness(1.02)'    // Counteracts the "faded" look
        }}
      />
      {/* FIX 4: REDUCE VIGNETTE INTENSITY (Changed 0.55 to 0.45) */}
      <div id="vignette" style={{
        position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)'
      }} />
    </div>
  );
};

export default GlobalCanvas;