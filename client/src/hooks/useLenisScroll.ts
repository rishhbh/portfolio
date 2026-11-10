import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface UseLenisScrollOptions {
  activeSlot: string;
  pageDomRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  isTransitioning: boolean;
}

/**
 * Initializes Lenis smooth scrolling with weighted, luxurious inertia
 * attached directly to the active full-height page scroll panel.
 */
export function useLenisScroll({
  activeSlot,
  pageDomRefs,
  isTransitioning,
}: UseLenisScrollOptions) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If user prefers reduced motion, disable smooth scrolling
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const activeEl = pageDomRefs.current[activeSlot];
    if (!activeEl) return;

    // Destroy existing instance before creating a new one
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    // Initialize Lenis on the active page element
    const lenis = new Lenis({
      wrapper: activeEl,
      content: (activeEl.firstElementChild as HTMLElement) || activeEl,
      duration: 1.8, // Slow, weighty, cinematic momentum
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious exponential deceleration
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.25,
      wheelMultiplier: 0.88,
      autoRaf: true,
    });

    lenisRef.current = lenis;

    // Forward Lenis scroll updates to activeEl so ReadStatement and scroll observers respond
    lenis.on('scroll', () => {
      activeEl.dispatchEvent(new Event('scroll'));
    });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [activeSlot, pageDomRefs]);

  // Stop Lenis inertia during page transitions to prevent jitter
  useEffect(() => {
    if (lenisRef.current) {
      if (isTransitioning) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isTransitioning]);

  return lenisRef;
}
