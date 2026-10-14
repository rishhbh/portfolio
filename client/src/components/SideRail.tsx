import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '../context/SmoothScrollContext';

export interface SectionItem {
  id: string;
  name: string;
}

interface SideRailProps {
  sections?: SectionItem[];
}

const ROUTE_SECTIONS: Record<string, SectionItem[]> = {
  '/': [
    { id: 'overview', name: 'Overview' },
    { id: 'problem', name: 'Realities' },
    { id: 'dispatch', name: 'Dispatch' },
  ],
  '/work': [
    { id: 'systems', name: 'Systems' },
    { id: 'history', name: 'Track Record' },
  ],
  '/projects': [
    { id: 'systems', name: 'Systems' },
    { id: 'history', name: 'Track Record' },
  ],
  '/skills': [
    { id: 'runtimes', name: 'Runtimes' },
    { id: 'storage', name: 'Storage' },
    { id: 'ai-infra', name: 'AI & Infra' },
  ],
};

function getSectionsForPath(pathname: string): SectionItem[] | null {
  if (ROUTE_SECTIONS[pathname]) {
    return ROUTE_SECTIONS[pathname];
  }
  if (pathname.startsWith('/work')) {
    return ROUTE_SECTIONS['/work'];
  }
  if (pathname.startsWith('/skills')) {
    return ROUTE_SECTIONS['/skills'];
  }
  return null;
}

export function SideRail({ sections: propSections }: SideRailProps = {}) {
  const location = useLocation();

  const sections = useMemo(() => {
    if (propSections && propSections.length > 0) return propSections;
    return getSectionsForPath(location.pathname);
  }, [propSections, location.pathname]);

  const [activeIndex, setActiveIndex] = useState(0);

  // Target name from activeIndex and sections
  const targetName = sections && sections[activeIndex] ? sections[activeIndex].name : '';
  const [displayedName, setDisplayedName] = useState(targetName);
  const [isOut, setIsOut] = useState(false);

  // Animate label transition when targetName changes
  useEffect(() => {
    if (!targetName) return;
    if (targetName === displayedName) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const raf = requestAnimationFrame(() => setDisplayedName(targetName));
      return () => cancelAnimationFrame(raf);
    }

    const tOut = setTimeout(() => setIsOut(true), 10);
    const tIn = setTimeout(() => {
      setDisplayedName(targetName);
      setIsOut(false);
    }, 180);

    return () => {
      clearTimeout(tOut);
      clearTimeout(tIn);
    };
  }, [targetName, displayedName]);

  // Reset active index when route changes
  useEffect(() => {
    if (!sections || !sections.length) return;

    const raf = requestAnimationFrame(() => {
      if (location.hash) {
        const hashId = location.hash.replace('#', '');
        const idx = sections.findIndex((s) => s.id === hashId);
        if (idx !== -1) {
          setActiveIndex(idx);
          return;
        }
      }
      setActiveIndex(0);
    });

    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash, sections]);

  // Scroll detection with RAF throttling to prevent layout thrashing
  useEffect(() => {
    if (!sections || !sections.length) return;

    let ticking = false;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        ticking = false;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

        // 1. Top of page
        if (scrollY < 80) {
          setActiveIndex(0);
          return;
        }

        // 2. Near bottom of page
        if (scrollY + windowHeight >= docHeight - 80) {
          setActiveIndex(sections.length - 1);
          return;
        }

        // 3. Viewport threshold
        const threshold = windowHeight * 0.45;
        let active = 0;

        for (let i = 0; i < sections.length; i++) {
          const el = document.getElementById(sections[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold) {
              active = i;
            }
          }
        }

        setActiveIndex(active);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial check
    handleScroll();
    const t = setTimeout(handleScroll, 200);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(t);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sections]);

  const { scrollTo } = useSmoothScroll();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      scrollTo(element, { offset: 0, duration: 1.2 });
    }
  };

  if (!sections || sections.length === 0) return null;

  return (
    <nav
      className="rail"
      aria-label="Sections"
      style={{ '--i': activeIndex } as React.CSSProperties}
    >
      <div className="rl-lab" aria-hidden="true">
        <span key={displayedName} className={isOut ? 'out' : ''}>
          {displayedName || targetName}
        </span>
      </div>
      <ul style={{ position: 'relative' }}>
        <li
          className="ind"
          aria-hidden="true"
        />
        {sections.map((sec, idx) => (
          <li key={sec.id}>
            <a
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(sec.id);
              }}
              className={idx === activeIndex ? 'on' : ''}
              aria-current={idx === activeIndex ? 'true' : undefined}
              title={sec.name}
            >
              <span>{sec.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
