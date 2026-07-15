
import { Sun, Moon, Terminal } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 mx-auto w-[calc(100%-3rem)] max-w-6xl z-50">
      <nav
        className={`relative transition-all duration-300 glass border border-glass-border shadow-2xl ${
          isScrolled
            ? 'py-3'
            : 'py-5'
        }`}
      >
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink origin-left z-10"
        style={{ scaleX }}
      />
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative z-20">
        {/* Logo/Wordmark */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 font-display font-bold text-lg tracking-tight text-ink hover:text-ink-dim transition-colors"
        >
          <Terminal className="w-5 h-5" />
          <span className="hidden sm:inline">RISHABH SHARMA</span>
          <span className="sm:hidden">RISHABH</span>
        </button>

        <div className="flex items-center gap-4">
          {/* Terminal Status / Accent */}
          <div className="hidden sm:flex items-center gap-2 mr-4 opacity-50 font-mono text-[10px]">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             <span>SYS.ONLINE</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-ink hover:text-ink-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink p-1.5 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>
      </nav>
    </div>
  );
}
