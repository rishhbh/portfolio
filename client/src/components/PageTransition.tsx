import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProjectDetail from '../pages/ProjectDetail';

export function PageTransition() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <TransitionWrapper>
              <Home />
            </TransitionWrapper>
          } 
        />
        <Route 
          path="/projects/:slug" 
          element={
            <TransitionWrapper>
              <ProjectDetail />
            </TransitionWrapper>
          } 
        />
        <Route 
          path="*" 
          element={
            <TransitionWrapper>
              <Home />
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
