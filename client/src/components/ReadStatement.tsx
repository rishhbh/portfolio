import React, { useEffect, useRef, useState, useMemo } from 'react';

interface ReadStatementProps {
  text: string;
  className?: string;
  scrollContainerSelector?: string;
}

export const ReadStatement: React.FC<ReadStatementProps> = ({
  text,
  className = '',
  scrollContainerSelector = '.page',
}) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const words = useMemo(() => text.trim().split(/\s+/), [text]);
  const [opacities, setOpacities] = useState<number[]>(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return new Array(words.length).fill(reduce ? 1 : 0.2);
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) return;

    const scrollParent = el.closest(scrollContainerSelector) || window;
    let ticking = false;

    const calculateOpacities = () => {
      ticking = false;
      if (!el.offsetParent) return;

      const N = words.length;
      const W = 3.5; // Window width of words actively transitioning
      let p: number;

      if (scrollParent instanceof HTMLElement) {
        const vh = scrollParent.clientHeight;
        const top = el.offsetTop - scrollParent.scrollTop;
        const maxScroll = scrollParent.scrollHeight - scrollParent.clientHeight;

        // Position progress: starts when top enters 88% of viewport,
        // completes when top reaches 38% of viewport
        const startY = 0.88 * vh;
        const endY = 0.38 * vh;
        const posProgress = (startY - top) / Math.max(1, startY - endY);

        // End-of-page progress: ensures all words hit 100% opacity as the user reaches the page end
        let bottomProgress: number;
        if (maxScroll > 10) {
          const scrollRatio = scrollParent.scrollTop / maxScroll;
          // When at or near the bottom (within 40px or scrollRatio >= 0.95), lock to 100%
          if (scrollParent.scrollTop >= maxScroll - 40 || scrollRatio >= 0.95) {
            bottomProgress = 1;
          } else {
            // Smoothly ramp up towards 1.0
            bottomProgress = Math.max(0, (scrollRatio - 0.25) / 0.75);
          }
        } else {
          // If page has no scrollable overflow, display at full opacity
          bottomProgress = 1;
        }

        p = Math.max(posProgress, bottomProgress);
      } else {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        const startY = 0.88 * vh;
        const endY = 0.38 * vh;
        const posProgress = (startY - rect.top) / Math.max(1, startY - endY);

        let bottomProgress: number;
        if (maxScroll > 10) {
          const scrollRatio = window.scrollY / maxScroll;
          if (window.scrollY >= maxScroll - 40 || scrollRatio >= 0.95) {
            bottomProgress = 1;
          } else {
            bottomProgress = Math.max(0, (scrollRatio - 0.25) / 0.75);
          }
        } else {
          bottomProgress = 1;
        }

        p = Math.max(posProgress, bottomProgress);
      }

      p = Math.max(0, Math.min(1, p));

      const newOpacities = new Array(N);
      for (let i = 0; i < N; i++) {
        const k = Math.max(0, Math.min(1, (p * (N + W) - i) / W));
        newOpacities[i] = parseFloat((0.2 + 0.8 * k).toFixed(3));
      }
      setOpacities(newOpacities);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(calculateOpacities);
      }
    };

    const frameId = requestAnimationFrame(calculateOpacities);

    scrollParent.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      scrollParent.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [words.length, scrollContainerSelector]);

  return (
    <p ref={containerRef} className={`read ${className}`}>
      {words.map((word, idx) => (
        <React.Fragment key={`rw-${idx}`}>
          <span
            className="rw"
            style={{ opacity: opacities[idx] ?? 0.2 }}
          >
            {word}
          </span>
          {idx < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </p>
  );
};

export default ReadStatement;
