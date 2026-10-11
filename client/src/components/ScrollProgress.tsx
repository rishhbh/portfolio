import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '../context/SmoothScrollContext';

export function ScrollProgress() {
  const location = useLocation();
  const { lenis } = useSmoothScroll();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!barRef.current) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const max = docHeight - winHeight;
      const ratio = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
      barRef.current.style.transform = `scaleX(${ratio})`;
    };

    if (lenis) {
      lenis.on('scroll', update);
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    update();
    const t1 = setTimeout(update, 60);
    const t2 = setTimeout(update, 250);

    return () => {
      if (lenis) {
        lenis.off('scroll', update);
      }
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [location.pathname, lenis]);

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      style={{
        transform: 'scaleX(0)',
        transformOrigin: '0% 50%',
      }}
      aria-hidden="true"
    />
  );
}
