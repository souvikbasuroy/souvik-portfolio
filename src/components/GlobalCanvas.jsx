import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FOLDERS = 7;
const FRAMES_PER_FOLDER = 192;
const FRAME_EXT = 'jpg';

const GlobalCanvas = ({ scrollVH, timeline, onProgress, onLoaded }) => {
  const canvasRef = useRef(null);
  const frameCache = useRef({});
  const [isLoadedInternal, setIsLoadedInternal] = useState(false);

  // RAF refs — keeps draw loop off React's render cycle
  const rafRef = useRef(null);
  const currentScrollVH = useRef(scrollVH);  // mutable, no re-render
  const lastDrawnFrame = useRef(null);        // skip draw if frame unchanged

  const pad = (n) => String(n).padStart(3, '0');

  // ─── PRELOAD ────────────────────────────────────────────────────────────────
  const preloadFolder = (folderNum, startProgress = 0, endProgress = 100) => {
    // Return existing promise if already loading/loaded
    if (frameCache.current[`__promise_${folderNum}`]) {
      return frameCache.current[`__promise_${folderNum}`];
    }

    frameCache.current[folderNum] = {};
    let loadedCount = 0;
    const total = FRAMES_PER_FOLDER;

    const promise = new Promise((resolve) => {
      for (let i = 1; i <= total; i++) {
        const img = new Image();
        img.src = `./frames/${folderNum}/ezgif-frame-${pad(i)}.${FRAME_EXT}`;
        img.onload = () => {
          frameCache.current[folderNum][i] = img;
          loadedCount++;
          const p = startProgress + (loadedCount / total) * (endProgress - startProgress);
          if (onProgress) onProgress(p);
          if (loadedCount === total) resolve();
        };
        img.onerror = () => {
          // Cache placeholder so we don't retry broken images
          frameCache.current[folderNum][i] = null;
          loadedCount++;
          if (loadedCount === total) resolve();
        };
      }
    });

    frameCache.current[`__promise_${folderNum}`] = promise;
    return promise;
  };

  // ─── INIT: Preload first 3 folders in parallel ────────────────────────────
  useEffect(() => {
    const init = async () => {
      // Load folder 1 first (visible immediately), then 2 & 3 in parallel
      await preloadFolder(1, 0, 40);
      await Promise.all([
        preloadFolder(2, 40, 70),
        preloadFolder(3, 70, 100),
      ]);
      setIsLoadedInternal(true);
      if (onLoaded) onLoaded();

      // Quietly preload remaining folders in background
      for (let f = 4; f <= TOTAL_FOLDERS; f++) {
        preloadFolder(f);
      }
    };
    init();
  }, []);

  // ─── CANVAS RESIZE ───────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── SYNC scrollVH → mutable ref (no re-render needed) ──────────────────
  useEffect(() => {
    currentScrollVH.current = scrollVH;
  }, [scrollVH]);

  // ─── FRAME RESOLVER ──────────────────────────────────────────────────────
  const resolveFrame = (svh) => {
    const seg = timeline.find(s => svh >= s.startVH && svh < s.endVH)
      ?? timeline[timeline.length - 1];

    let folder, frameNum;

    if (seg.type === 'video') {
      folder = seg.videoIdx + 1;
      const progress = Math.min(1, Math.max(0,
        (svh - seg.startVH) / (seg.endVH - seg.startVH)
      ));
      frameNum = Math.max(1, Math.min(
        FRAMES_PER_FOLDER,
        Math.floor(progress * (FRAMES_PER_FOLDER - 1)) + 1
      ));

      // Preload next folder early (at 50% instead of 60% for more headroom)
      if (progress > 0.5 && folder < TOTAL_FOLDERS) {
        preloadFolder(folder + 1);
      }
    } else {
      // Static section: hold the LAST frame of the preceding video segment
      // Find the video segment that ended just before this static section
      const prevVideoSeg = [...timeline]
        .reverse()
        .find(s => s.type === 'video' && s.endVH <= seg.startVH);

      if (prevVideoSeg) {
        folder = prevVideoSeg.videoIdx + 1;
        frameNum = FRAMES_PER_FOLDER; // hold last frame
      } else {
        folder = 1;
        frameNum = 1;
      }
    }

    return { folder, frameNum };
  };

  // ─── RAF DRAW LOOP ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoadedInternal) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);

      const { folder, frameNum } = resolveFrame(currentScrollVH.current);
      const cacheKey = `${folder}-${frameNum}`;

      // Skip draw if nothing changed
      if (lastDrawnFrame.current === cacheKey) return;
      lastDrawnFrame.current = cacheKey;

      const img = frameCache.current[folder]?.[frameNum];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isLoadedInternal, timeline]);

  return (
    <div id="stage" style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'auto',
          filter: 'contrast(1.05) brightness(1.01)',
        }}
      />
      <div
        id="vignette"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
};

export default GlobalCanvas;
