import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import WorkPage from '../pages/WorkPage';
import SkillsPage from '../pages/SkillsPage';
import ProjectDetail from '../pages/ProjectDetail';
import ResumeManPage from '../pages/ResumeManPage';
import Footer from './Footer';

function getRouteRank(pathname: string): number {
  if (pathname === '/') return 0;
  if (pathname.startsWith('/work') || pathname === '/projects') return 1;
  if (pathname.startsWith('/skills')) return 2;
  if (pathname.startsWith('/projects/')) return 3;
  if (pathname.startsWith('/resume')) return 4;
  return 5;
}

export function PageTransition() {
  const location = useLocation();
  const [routeState, setRouteState] = useState({
    pathname: location.pathname,
    dir: 1,
    savedScrollY: 0,
  });

  if (location.pathname !== routeState.pathname) {
    const prevRank = getRouteRank(routeState.pathname);
    const nextRank = getRouteRank(location.pathname);
    const currentScroll = typeof window !== 'undefined' ? window.scrollY : 0;
    setRouteState({
      pathname: location.pathname,
      dir: nextRank >= prevRank ? 1 : -1,
      savedScrollY: currentScroll,
    });
  }

  const dir = routeState.dir;
  const savedScroll = routeState.savedScrollY;

  // Exponential ease-out matching Lenis momentum curve for luxurious gliding physics
  const smoothEase = [0.22, 1, 0.36, 1];

  const variants = {
    initial: (direction: number) => ({
      x: `${direction * 100}%`,
      scale: 0.992,
      opacity: 1,
      filter: 'blur(4px)',
    }),
    animate: {
      x: '0%',
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        x: { duration: 0.7, ease: smoothEase },
        scale: { duration: 0.7, ease: smoothEase },
        opacity: { duration: 0.4, ease: smoothEase },
        filter: { duration: 0.48, ease: smoothEase },
      },
    },
    exit: (direction: number) => ({
      x: `${-direction * 24}%`,
      scale: 0.985,
      opacity: 0,
      filter: 'blur(5px)',
      position: 'absolute' as const,
      top: -savedScroll,
      left: 0,
      width: '100%',
      zIndex: 0,
      pointerEvents: 'none' as const,
      transition: {
        x: { duration: 0.7, ease: smoothEase },
        scale: { duration: 0.7, ease: smoothEase },
        opacity: { duration: 0.44, ease: [0.32, 0, 0.67, 0] },
        filter: { duration: 0.44, ease: [0.32, 0, 0.67, 0] },
      },
    }),
  };

  return (
    <div className="relative w-full overflow-x-clip min-h-screen">
      {/* Precision Blueprint Laser Alignment Bar on Route Change */}
      <div
        key={`laser-${location.pathname}`}
        className="blueprint-laser pointer-events-none fixed top-[56px] left-0 right-0 h-[1.5px] z-50"
        aria-hidden="true"
      />

      <AnimatePresence mode="popLayout" custom={dir} initial={false}>
        <motion.div
          key={location.pathname}
          custom={dir}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen bg-black will-change-[transform,opacity,filter] [transform-style:preserve-3d] [backface-visibility:hidden] relative flex flex-col justify-between"
        >
          {/* Architectural Leading-Edge Hairline Divider & Soft Shadow */}
          <div
            className="absolute inset-y-0 w-[1px] bg-white/20 pointer-events-none z-50"
            style={{
              [dir > 0 ? 'left' : 'right']: 0,
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 w-24 pointer-events-none z-40"
            style={{
              [dir > 0 ? 'left' : 'right']: '-6rem',
              background:
                dir > 0
                  ? 'linear-gradient(to right, transparent, rgba(0, 0, 0, 0.8))'
                  : 'linear-gradient(to left, transparent, rgba(0, 0, 0, 0.8))',
            }}
            aria-hidden="true"
          />

          <div className="flex-grow">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/projects" element={<WorkPage />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/resume" element={<ResumeManPage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>

          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
