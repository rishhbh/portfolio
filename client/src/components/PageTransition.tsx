import { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const ResumeManPage = lazy(() => import('../pages/ResumeManPage'));

export function PageTransition() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <TransitionWrapper>
              <Suspense fallback={null}>
                <Home />
              </Suspense>
            </TransitionWrapper>
          } 
        />
        <Route 
          path="/projects/:slug" 
          element={
            <TransitionWrapper>
              <Suspense fallback={null}>
                <ProjectDetail />
              </Suspense>
            </TransitionWrapper>
          } 
        />
        <Route 
          path="/resume" 
          element={
            <TransitionWrapper>
              <Suspense fallback={null}>
                <ResumeManPage />
              </Suspense>
            </TransitionWrapper>
          } 
        />
        <Route 
          path="*" 
          element={
            <TransitionWrapper>
              <Suspense fallback={null}>
                <Home />
              </Suspense>
            </TransitionWrapper>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function TransitionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "linear", delay: 0.15 }}
      >
        {children}
      </motion.div>
      
      {/* Harsh wipe overlay */}
      <motion.div
        className="fixed inset-0 bg-ink z-[200] origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
}
