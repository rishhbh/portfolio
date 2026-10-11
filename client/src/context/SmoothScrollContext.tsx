import { createContext, useContext, useEffect, useRef, useCallback, useSyncExternalStore, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | HTMLElement | number,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      easing?: (t: number) => number;
      onComplete?: () => void;
    }
  ) => void;
}

let activeLenis: Lenis | null = null;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Lenis | null {
  return activeLenis;
}

function getServerSnapshot(): Lenis | null {
  return null;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

// Ease-out exponential for luxurious, buttery inertia deceleration
const easeOutExpo = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const location = useLocation();
  const lenis = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const instance = new Lenis({
      duration: 1.25,
      easing: easeOutExpo,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisRef.current = instance;
    activeLenis = instance;
    (window as unknown as { __lenis?: Lenis }).__lenis = instance;
    notifyListeners();

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      activeLenis = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      notifyListeners();
    };
  }, []);

  // Handle route and hash navigation smoothly
  useEffect(() => {
    const instance = lenisRef.current;

    if (!instance) {
      if (location.hash) {
        const el = document.getElementById(location.hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
      return;
    }

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
          instance.scrollTo(target, {
            offset: 0,
            duration: 1.2,
            easing: easeOutExpo,
          });
        }
      }, 160);
      return () => clearTimeout(timer);
    } else {
      // Immediately reset scroll on page transition to prevent flash of scrolled state
      instance.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, location.hash]);

  const scrollTo = useCallback(
    (
      target: string | HTMLElement | number,
      options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
        easing?: (t: number) => number;
        onComplete?: () => void;
      }
    ) => {
      const instance = lenisRef.current;
      if (instance) {
        instance.scrollTo(target, {
          easing: easeOutExpo,
          ...options,
        });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
      }
    },
    []
  );

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
