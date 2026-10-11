import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import WorkPage from '../pages/WorkPage';
import SkillsPage from '../pages/SkillsPage';
import ProjectDetail from '../pages/ProjectDetail';
import ResumeManPage from '../pages/ResumeManPage';

export function PageTransition() {
  const location = useLocation();

  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.16,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleExitComplete = () => {
    window.scrollTo(0, 0);
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void };
      }
    ).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Precision Blueprint Laser Alignment Bar */}
      <div
        key={`laser-${location.pathname}`}
        className="blueprint-laser"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
        <motion.div
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="blueprint-stage w-full min-h-screen relative"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/projects" element={<WorkPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/resume" element={<ResumeManPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
