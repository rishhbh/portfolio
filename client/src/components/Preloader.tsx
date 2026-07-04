import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#f9f9f9' : '#080808';
  const textColor = isDark ? '#111111' : '#f5f5f5';
  const chevronColor = isDark ? '#666666' : '#8a8a8a';

  const command = 'sudo rm -rf rishabh';

  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 400);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    
    // Initial delay before typing starts
    const initialTimeout = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex <= command.length) {
          setText(command.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          
          // Wait a moment after typing finishes, then trigger completion
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      }, 100); // Typing speed
      
      return () => clearInterval(typeInterval);
    }, 500);

    return () => clearTimeout(initialTimeout);
  }, [isTyping, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
    >
      {/* Harsh wipe background overlay */}
      <motion.div
        className="absolute inset-0 origin-top"
        style={{ backgroundColor: bgColor }}
        initial={{ scaleY: 1 }}
        exit={{ 
          scaleY: 0,
          transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } 
        }}
      />
      
      {/* Terminal Text */}
      <motion.div 
        className="relative z-10 font-mono text-sm tracking-tight flex items-center gap-2"
        style={{ color: textColor }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
      >
        <span style={{ color: chevronColor }}>{'>'}</span>
        <span>
          {text}
          <span 
            className={`inline-block w-2 h-4 ml-1 align-middle transition-opacity duration-75 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`} 
            style={{ backgroundColor: textColor }}
          />
        </span>
      </motion.div>
    </motion.div>
  );
}
