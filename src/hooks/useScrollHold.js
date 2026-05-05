import { useState, useEffect, useRef, useCallback } from 'react';

export const useScrollHold = (holdPoints, { sensitivity = 120, lerpSpeed = 0.08, totalVH = 3000 }) => {
  const [currentVH, setCurrentVH] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const [activeHoldPoint, setActiveHoldPoint] = useState(null);

  const scrollPos = useRef(0);
  const currentPos = useRef(0);
  const accumulatedDelta = useRef(0);
  const lockCooldown = useRef(false);
  const lastTouchY = useRef(0);
  const rafRef = useRef(null);

  const VH_TO_PX = window.innerHeight;

  const isInternalScroll = (target, delta) => {
    let el = target;
    while (el && el !== document.body && el !== document.documentElement) {
      const style = window.getComputedStyle(el);
      const overflowY = style.getPropertyValue('overflow-y');
      const isScrollable = (overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight;

      if (isScrollable) {
        // Check if we have room to scroll in the requested direction
        if (delta > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
        if (delta < 0 && el.scrollTop > 1) return true;
      }
      el = el.parentElement;
    }
    return false;
  };
  
  const handleScroll = useCallback((delta, target) => {
    // Check if we should let the element scroll internally
    if (isInternalScroll(target, delta)) {
      return; // Do nothing, let native scroll happen (we won't call preventDefault)
    }

    const currentTarget = scrollPos.current;
    const threshold = 0.5;
    const hPoint = holdPoints.find(p => Math.abs(currentTarget - p) < threshold);

    if (hPoint && !lockCooldown.current) {
      setIsHeld(true);
      setActiveHoldPoint(hPoint);
      accumulatedDelta.current += delta;

      if (Math.abs(accumulatedDelta.current) > sensitivity) {
        const direction = Math.sign(accumulatedDelta.current);
        scrollPos.current = hPoint + (direction * 5); // Jump more to avoid re-lock
        accumulatedDelta.current = 0;
        setIsHeld(false);
        setActiveHoldPoint(null);
        lockCooldown.current = true;
        setTimeout(() => { lockCooldown.current = false; }, 600);
      }
      return;
    }

    const deltaVH = (delta / VH_TO_PX) * 100;
    scrollPos.current = Math.max(0, Math.min(totalVH, scrollPos.current + deltaVH));
    
    const nextHPoint = holdPoints.find(p => 
      (delta > 0 && currentTarget < p && scrollPos.current >= p) || 
      (delta < 0 && currentTarget > p && scrollPos.current <= p)
    );

    if (nextHPoint && !lockCooldown.current) {
      scrollPos.current = nextHPoint;
      accumulatedDelta.current = 0;
    }
  }, [holdPoints, sensitivity, totalVH, VH_TO_PX]);

  useEffect(() => {
    const onWheel = (e) => {
      // Only prevent default if we are NOT doing an internal scroll
      if (!isInternalScroll(e.target, e.deltaY)) {
        e.preventDefault();
        handleScroll(e.deltaY, e.target);
      }
    };

    const onTouchStart = (e) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const delta = lastTouchY.current - e.touches[0].clientY;
      if (!isInternalScroll(e.target, delta)) {
        e.preventDefault();
        handleScroll(delta * 2, e.target);
      }
      lastTouchY.current = e.touches[0].clientY;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      document.body.style.overflow = 'auto';
    };
  }, [handleScroll]);

  useEffect(() => {
    const animate = () => {
      const diff = scrollPos.current - currentPos.current;
      currentPos.current += diff * lerpSpeed;
      if (Math.abs(diff) > 0.001) {
        setCurrentVH(currentPos.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [lerpSpeed]);

  const scrollToVH = useCallback((vh) => {
    scrollPos.current = Math.max(0, Math.min(totalVH, vh));
    accumulatedDelta.current = 0;
    setIsHeld(false);
    setActiveHoldPoint(null);
  }, [totalVH]);

  return { currentVH, isHeld, activeHoldPoint, scrollToVH };
};
