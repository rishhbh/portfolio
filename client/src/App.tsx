import { useState, useEffect, useRef, useCallback } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Dock } from './components/Dock';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import { projects } from './data/projects';
import { useLenisScroll } from './hooks/useLenisScroll';

interface RouteTarget {
  id: string; // 'home' | 'projects' | 'experience' | 'skills' | 'resume' | 'contact' | 'project-detail'
  path: string;
  slug?: string;
  tone: 'light' | 'dark';
}

const TONES: Record<string, 'light' | 'dark'> = {
  home: 'light',
  projects: 'dark',
  'project-detail': 'dark',
  experience: 'light',
  skills: 'dark',
  resume: 'light',
  contact: 'dark',
};

const TITLES: Record<string, string> = {
  home: 'Rishabh Sharma, backend engineer',
  projects: 'Projects, Rishabh Sharma',
  'project-detail': 'Project Details, Rishabh Sharma',
  experience: 'Experience, Rishabh Sharma',
  skills: 'Skills & Architecture, Rishabh Sharma',
  resume: 'Resume, Rishabh Sharma',
  contact: 'Contact, Rishabh Sharma',
};

function parseCurrentRoute(): RouteTarget {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const path = window.location.pathname.replace(/^\//, '');
  const effective = hash || path;

  if (effective.startsWith('projects/') || effective.startsWith('work/')) {
    const slug = effective.split('/')[1];
    return {
      id: 'project-detail',
      path: `/projects/${slug}`,
      slug,
      tone: 'dark',
    };
  }

  if (effective === 'projects' || effective === 'work') {
    return { id: 'projects', path: '/projects', tone: 'dark' };
  }

  if (effective === 'experience' || effective === 'history') {
    return { id: 'experience', path: '/experience', tone: 'light' };
  }

  if (effective === 'skills') {
    return { id: 'skills', path: '/skills', tone: 'dark' };
  }

  if (effective === 'resume') {
    return { id: 'resume', path: '/resume', tone: 'light' };
  }

  if (effective === 'contact' || effective === 'dispatch') {
    return { id: 'contact', path: '/contact', tone: 'dark' };
  }

  return { id: 'home', path: '/', tone: 'light' };
}

export function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteTarget>(parseCurrentRoute);

  // Active page slot in DOM: 'home', 'projects', etc., or 'project-detail-a' / 'project-detail-b'
  const [activeSlot, setActiveSlot] = useState<string>(() => {
    const initial = parseCurrentRoute();
    return initial.id === 'project-detail' ? 'project-detail-a' : initial.id;
  });

  // Track slugs for detail slots A and B
  const [detailSlugA, setDetailSlugA] = useState<string>(() => {
    const initial = parseCurrentRoute();
    return initial.id === 'project-detail' && initial.slug ? initial.slug : (projects[0]?.slug || 'layerzero');
  });
  const [detailSlugB, setDetailSlugB] = useState<string>('purgeport');

  const [transitioning, setTransitioning] = useState<{
    fromSlot: string;
    toSlot: string;
  } | null>(null);

  const pageDomRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const queuedRouteRef = useRef<RouteTarget | null>(null);
  const busyRef = useRef(false);
  const transitionRef = useRef<(to: RouteTarget) => void>(() => {});

  // Smooth inertial momentum scrolling powered by Lenis
  useLenisScroll({
    activeSlot,
    pageDomRefs,
    isTransitioning: !!transitioning,
  });

  // Sync document tone and theme-color meta
  const applyTone = useCallback((tone: 'light' | 'dark') => {
    document.documentElement.dataset.tone = tone;
    const themeMeta = document.getElementById('theme-color');
    if (themeMeta) {
      themeMeta.setAttribute('content', tone === 'dark' ? '#1a1a1a' : '#f5f5f4');
    }
  }, []);

  // Update page title
  const applyTitle = useCallback((target: RouteTarget) => {
    if (target.id === 'project-detail' && target.slug) {
      const found = projects.find((p) => p.slug === target.slug);
      document.title = found
        ? `${found.name}, Rishabh Sharma`
        : 'Project Details, Rishabh Sharma';
    } else {
      document.title = TITLES[target.id] || 'Rishabh Sharma, backend engineer';
    }
  }, []);

  const executeTransition = useCallback(
    (to: RouteTarget) => {
      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const fromRoute = currentRoute;
      if (fromRoute.id === to.id && fromRoute.slug === to.slug) return;

      if (busyRef.current) {
        queuedRouteRef.current = to;
        return;
      }

      // Determine the target slot
      let toSlot = to.id;
      if (to.id === 'project-detail') {
        // Toggle between slot A and slot B to allow cross-project transition
        if (activeSlot === 'project-detail-a') {
          toSlot = 'project-detail-b';
          setDetailSlugB(to.slug || 'layerzero');
        } else {
          toSlot = 'project-detail-a';
          setDetailSlugA(to.slug || 'layerzero');
        }
      }

      const fromSlot = activeSlot;

      applyTone(to.tone);
      applyTitle(to);

      if (reduce) {
        setCurrentRoute(to);
        setActiveSlot(toSlot);
        const toEl = pageDomRefs.current[toSlot];
        if (toEl) toEl.scrollTop = 0;
        return;
      }

      busyRef.current = true;

      // Prepare target element: ensure incoming page starts cleanly at top
      const toEl = pageDomRefs.current[toSlot];
      if (toEl) {
        toEl.scrollTop = 0;
      }

      // Trigger transition classes WITHOUT remounting fromSlot, so fromSlot preserves its exact scroll position!
      setTransitioning({
        fromSlot,
        toSlot,
      });

      const timer = setTimeout(() => {
        // Now that fromSlot is completely hidden, reset its scroll position for future visits
        const fromEl = pageDomRefs.current[fromSlot];
        if (fromEl) {
          fromEl.scrollTop = 0;
        }

        setCurrentRoute(to);
        setActiveSlot(toSlot);
        setTransitioning(null);
        busyRef.current = false;

        const next = queuedRouteRef.current;
        queuedRouteRef.current = null;
        if (next && (next.id !== to.id || next.slug !== to.slug)) {
          transitionRef.current(next);
        }
      }, 1350);

      return () => clearTimeout(timer);
    },
    [currentRoute, activeSlot, applyTone, applyTitle]
  );

  useEffect(() => {
    transitionRef.current = executeTransition;
  }, [executeTransition]);

  const navigateTo = useCallback(
    (id: string, path: string) => {
      let slug: string | undefined;
      let effectiveId = id;

      if (path.startsWith('/projects/') && path !== '/projects') {
        effectiveId = 'project-detail';
        slug = path.split('/')[2];
      }

      const tone = TONES[effectiveId] || 'light';
      const target: RouteTarget = { id: effectiveId, path, slug, tone };

      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }

      executeTransition(target);
    },
    [executeTransition]
  );

  // Popstate / back-forward browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const target = parseCurrentRoute();
      executeTransition(target);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [executeTransition]);

  // Initial mount tone and title setup
  useEffect(() => {
    applyTone(currentRoute.tone);
    applyTitle(currentRoute);
  }, [applyTone, applyTitle, currentRoute]);

  // Helper to determine CSS classes for each persistent page container
  const getPageClass = (slot: string) => {
    if (transitioning) {
      if (slot === transitioning.fromSlot) return 'page leaving';
      if (slot === transitioning.toSlot) return 'page entering';
      return 'page';
    }
    if (slot === activeSlot) {
      return 'page is-current';
    }
    return 'page';
  };

  // Active dock nav identifier
  const dockNavId = currentRoute.id === 'project-detail' ? 'projects' : currentRoute.id;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{TITLES[currentRoute.id] || 'Rishabh Sharma, backend engineer'}</title>
        <meta name="theme-color" content={currentRoute.tone === 'dark' ? '#1a1a1a' : '#f5f5f4'} />
      </Helmet>

      <main className="app-main">
        {/* HOME PAGE */}
        <div
          ref={(el) => { pageDomRefs.current['home'] = el; }}
          id="page-home"
          className={getPageClass('home')}
          data-tone="light"
        >
          <Home onNavigate={navigateTo} />
        </div>

        {/* PROJECTS PAGE */}
        <div
          ref={(el) => { pageDomRefs.current['projects'] = el; }}
          id="page-projects"
          className={getPageClass('projects')}
          data-tone="dark"
        >
          <Projects onNavigate={navigateTo} />
        </div>

        {/* PROJECT DETAIL SLOT A */}
        <div
          ref={(el) => { pageDomRefs.current['project-detail-a'] = el; }}
          id="page-project-detail-a"
          className={getPageClass('project-detail-a')}
          data-tone="dark"
        >
          <ProjectDetail slug={detailSlugA} onNavigate={navigateTo} />
        </div>

        {/* PROJECT DETAIL SLOT B */}
        <div
          ref={(el) => { pageDomRefs.current['project-detail-b'] = el; }}
          id="page-project-detail-b"
          className={getPageClass('project-detail-b')}
          data-tone="dark"
        >
          <ProjectDetail slug={detailSlugB} onNavigate={navigateTo} />
        </div>

        {/* EXPERIENCE PAGE */}
        <div
          ref={(el) => { pageDomRefs.current['experience'] = el; }}
          id="page-experience"
          className={getPageClass('experience')}
          data-tone="light"
        >
          <Experience onNavigate={navigateTo} />
        </div>

        {/* SKILLS PAGE */}
        <div
          ref={(el) => { pageDomRefs.current['skills'] = el; }}
          id="page-skills"
          className={getPageClass('skills')}
          data-tone="dark"
        >
          <Skills onNavigate={navigateTo} />
        </div>

        {/* RESUME PAGE */}
        <div
          ref={(el) => { pageDomRefs.current['resume'] = el; }}
          id="page-resume"
          className={getPageClass('resume')}
          data-tone="light"
        >
          <Resume onNavigate={navigateTo} />
        </div>

        {/* CONTACT PAGE */}
        <div
          ref={(el) => { pageDomRefs.current['contact'] = el; }}
          id="page-contact"
          className={getPageClass('contact')}
          data-tone="dark"
        >
          <Contact onNavigate={navigateTo} />
        </div>
      </main>

      {/* Floating Bottom Dock */}
      <Dock
        currentNav={dockNavId}
        onNavigate={navigateTo}
      />
    </HelmetProvider>
  );
}

export default App;
