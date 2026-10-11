import { lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const WorkPage = lazy(() => import('../pages/WorkPage'));
const SkillsPage = lazy(() => import('../pages/SkillsPage'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const ResumeManPage = lazy(() => import('../pages/ResumeManPage'));

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
  });

  if (location.pathname !== routeState.pathname) {
    const prevRank = getRouteRank(routeState.pathname);
    const nextRank = getRouteRank(location.pathname);
    setRouteState({
      pathname: location.pathname,
      dir: nextRank >= prevRank ? 1 : -1,
    });
  }

  const dir = routeState.dir;
  const smoothEase = [0.16, 1, 0.3, 1];

  const variants = {
    initial: (direction: number) => ({
      x: `${direction * 100}%`,
      scale: 0.992,
      opacity: 0.35,
      boxShadow:
        direction > 0
          ? '-1px 0 0 0 rgba(255, 255, 255, 0.18)'
          : '1px 0 0 0 rgba(255, 255, 255, 0.18)',
    }),
    animate: {
      x: '0%',
      scale: 1,
      opacity: 1,
      boxShadow: 'none',
      transition: {
        x: { duration: 0.68, ease: smoothEase },
        scale: { duration: 0.68, ease: smoothEase },
        opacity: { duration: 0.54, ease: smoothEase },
      },
    },
    exit: (direction: number) => ({
      x: `${-direction * 28}%`,
      scale: 0.98,
      opacity: 0,
      transition: {
        x: { duration: 0.68, ease: smoothEase },
        scale: { duration: 0.68, ease: smoothEase },
        opacity: { duration: 0.46, ease: [0.32, 0, 0.67, 0] },
      },
    }),
  };

  return (
    <div className="relative w-full overflow-x-clip min-h-screen">
      <AnimatePresence mode="popLayout" custom={dir} initial={false}>
        <motion.div
          key={location.pathname}
          custom={dir}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full min-h-screen will-change-[transform,opacity] [transform-style:preserve-3d] [backface-visibility:hidden] relative"
        >
          {/* Architectural Leading-Edge Hairline Divider during slide */}
          <div
            className="absolute inset-y-0 w-[1px] bg-white/20 pointer-events-none z-50"
            style={{
              [dir > 0 ? 'left' : 'right']: 0,
            }}
            aria-hidden="true"
          />
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Suspense fallback={null}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/work"
              element={
                <Suspense fallback={null}>
                  <WorkPage />
                </Suspense>
              }
            />
            <Route
              path="/projects"
              element={
                <Suspense fallback={null}>
                  <WorkPage />
                </Suspense>
              }
            />
            <Route
              path="/projects/:slug"
              element={
                <Suspense fallback={null}>
                  <ProjectDetail />
                </Suspense>
              }
            />
            <Route
              path="/skills"
              element={
                <Suspense fallback={null}>
                  <SkillsPage />
                </Suspense>
              }
            />
            <Route
              path="/resume"
              element={
                <Suspense fallback={null}>
                  <ResumeManPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={null}>
                  <Home />
                </Suspense>
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
