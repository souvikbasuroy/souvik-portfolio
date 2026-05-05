import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FOLDERS = 7;
const FRAMES_PER_FOLDER = 192;
const FRAME_EXT = 'jpg';
const BASE_PATH = '/souvik-portfolio/';

const GlobalCanvas = ({ scrollVH, timeline, onProgress, onLoaded, onSectionFrameReady }) => {
  const canvasRef = useRef(null);
  const frameCache = useRef({});
  const [isLoadedInternal, setIsLoadedInternal] = useState(false);
  const isMobile = useRef(window.innerWidth < 768);

  const rafRef = useRef(null);
  const lastDrawnKey = useRef(null);
  const lastSuccessfulImage = useRef(null);

  const pad = (n) => String(n).padStart(3, '0');

  // ─── PRELOAD ────────────────────────────────────────────────────────────────
  const preloadFolder = useCallback(async (folderNum, startProgress = 0, endProgress = 100) => {
    const promiseKey = `__promise_${folderNum}`;
    if (frameCache.current[promiseKey]) {
      return frameCache.current[promiseKey];
    }

    frameCache.current[folderNum] = frameCache.current[folderNum] || {};
    let loadedCount = 0;
    
    const step = isMobile.current ? 2 : 1;
    const framesToLoad = [];
    for (let i = 1; i <= FRAMES_PER_FOLDER; i += step) {
      framesToLoad.push(i);
    }
    if (framesToLoad[framesToLoad.length - 1] !== FRAMES_PER_FOLDER) {
      framesToLoad.push(FRAMES_PER_FOLDER);
    }

    const totalToLoad = framesToLoad.length;

    const promise = new Promise((resolve) => {
      const CHUNK_SIZE = 8;
      let index = 0;

      const loadNextChunk = () => {
        if (index >= totalToLoad) {
          resolve();
          return;
        }

        const chunk = framesToLoad.slice(index, index + CHUNK_SIZE);
        index += CHUNK_SIZE;

        let chunkLoaded = 0;
        chunk.forEach((i) => {
          if (frameCache.current[folderNum][i]) {
            chunkLoaded++;
            if (chunkLoaded === chunk.length) loadNextChunk();
            return;
          }

          const img = new Image();
          const framePath = `${BASE_PATH}frames/${folderNum}/ezgif-frame-${pad(i)}.${FRAME_EXT}`;
          img.src = framePath;
          
          img.onload = () => {
            frameCache.current[folderNum][i] = img;
            loadedCount++;
            chunkLoaded++;
            if (onProgress) {
              const p = startProgress + (loadedCount / totalToLoad) * (endProgress - startProgress);
              onProgress(Math.min(99, p));
            }
            if (chunkLoaded === chunk.length) loadNextChunk();
          };
          img.onerror = () => {
            frameCache.current[folderNum][i] = null;
            loadedCount++;
            chunkLoaded++;
            if (chunkLoaded === chunk.length) loadNextChunk();
          };
        });
      };
      loadNextChunk();
    });

    frameCache.current[promiseKey] = promise;
    return promise;
  }, [onProgress]);

  // ─── INITIAL LOAD ──────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      await preloadFolder(1, 0, 30);
      await preloadFolder(2, 30, 60);
      await preloadFolder(3, 60, 100);
      setIsLoadedInternal(true);
      if (onLoaded) onLoaded();
      for (let f = 4; f <= TOTAL_FOLDERS; f++) {
        await preloadFolder(f);
      }
    };
    init();
  }, [onLoaded, preloadFolder]);

  // ─── RESIZE ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const maxWidth = isMobile.current ? 1080 : 1920;
      const width = Math.min(window.innerWidth, maxWidth);
      const height = (width / window.innerWidth) * window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      isMobile.current = window.innerWidth < 768;
      lastDrawnKey.current = null;
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      let rawFrame = Math.floor(progress * (FRAMES_PER_FOLDER - 1)) + 1;
      if (isMobile.current) {
        rawFrame = rawFrame < FRAMES_PER_FOLDER ? Math.floor((rawFrame - 1) / 2) * 2 + 1 : FRAMES_PER_FOLDER;
      }
      frameNum = Math.max(1, Math.min(FRAMES_PER_FOLDER, rawFrame));
      if (progress > 0.4 && folder < TOTAL_FOLDERS) preloadFolder(folder + 1);
    } else {
      const prevVideoSeg = [...timeline].reverse().find(s => s.type === 'video' && s.endVH <= seg.startVH);
      if (prevVideoSeg) {
        folder = prevVideoSeg.videoIdx + 1;
        frameNum = FRAMES_PER_FOLDER;
      } else {
        folder = 1;
        frameNum = 1;
      }
    }
    return { folder, frameNum, sectionId: seg.id };
  };

  // ─── DRAW LOOP ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoadedInternal) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    
    let lastTime = 0;
    const draw = (time) => {
      rafRef.current = requestAnimationFrame(draw);
      if (time - lastTime < 16) return;
      lastTime = time;

      const { folder, frameNum, sectionId } = resolveFrame(scrollVH);
      const cacheKey = `${folder}-${frameNum}`;

      if (sectionId && onSectionFrameReady) onSectionFrameReady(sectionId);
      if (lastDrawnKey.current === cacheKey) return;

      const img = frameCache.current[folder]?.[frameNum];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      lastDrawnKey.current = cacheKey;
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale, sh = ih * scale;
      const sx = (cw - sw) / 2, sy = (ch - sh) / 2;
      ctx.drawImage(img, sx, sy, sw, sh);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isLoadedInternal, timeline, onSectionFrameReady, scrollVH]);

  return (
    <div id="stage" style={{ position: 'fixed', inset: 0, zIndex: 1, backgroundColor: '#040407' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', imageRendering: 'auto', filter: 'contrast(1.05) brightness(1.01)', display: 'block' }} />
      <div id="vignette" style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.4) 100%)' }} />
    </div>
  );
};

export default GlobalCanvas;