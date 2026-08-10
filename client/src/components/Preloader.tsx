import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 600);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center p-8 overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } 
      }}
    >
      <motion.div 
        className="bg-brutal-yellow text-black border-3 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-8 rounded-none flex flex-col items-center space-y-4 max-w-sm w-full"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.h1 
          className="font-black text-2xl sm:text-3xl text-black tracking-tight uppercase text-center"
        >
          rishabh sharma
        </motion.h1>
        
        <div className="bg-black text-white text-xs font-mono font-bold px-3 py-1 border-2 border-black rounded-none uppercase">
          loading portfolio...
        </div>

        <motion.div 
          className="w-full h-3 bg-white border-2 border-black rounded-none overflow-hidden relative"
        >
          <motion.div 
            className="w-full h-full bg-brutal-red rounded-none"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
