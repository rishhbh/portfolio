import { Sun, Moon, Search, Github, Linkedin, FileText, Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCommandPalette } from '../context/CommandPaletteContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { openPalette } = useCommandPalette();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { label: 'About', target: 'about' },
    { label: 'Work', target: 'work' },
    { label: 'Stack', target: 'stack' },
    { label: 'Experience', target: 'experience' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(target);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      navigate(`/#${target}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-bg-soft border-b-3 border-black shadow-[0_4px_0_#000] rounded-none">
      {/* Scroll progress bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-brutal-yellow origin-left z-30"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative z-20">
        
        {/* Brand / Logo */}
        <button
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-ink hover:translate-x-0.5 transition-transform"
        >
          <span className="bg-brutal-yellow text-black px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] font-black text-sm rounded-none">
            RS
          </span>
          <span className="font-extrabold uppercase text-sm tracking-wide hidden sm:inline">
            rishabh sharma
          </span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 font-bold text-xs uppercase tracking-wide">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className="px-3 py-1.5 text-ink-dim hover:text-ink hover:bg-bg-softer border border-transparent hover:border-black transition-all rounded-none"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions & Links */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={openPalette}
            className="flex items-center gap-1.5 bg-bg-softer text-ink hover:bg-brutal-yellow hover:text-black border-2 border-black px-2.5 py-1 text-xs font-bold shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-none uppercase"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline bg-black/10 px-1 py-0.2 font-mono text-[10px]">⌘K</kbd>
          </button>

          {/* External Social Links */}
          <div className="hidden lg:flex items-center gap-1.5 border-l-2 border-black/20 pl-2">
            <a
              href="https://github.com/rishhbh"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-softer text-ink hover:bg-brutal-yellow hover:text-black border-2 border-black p-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-none"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/rishabhh-sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-softer text-ink hover:bg-brutal-yellow hover:text-black border-2 border-black p-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-none"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <Link
              to="/resume"
              className="bg-bg-softer text-ink hover:bg-brutal-yellow hover:text-black border-2 border-black p-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-none flex items-center gap-1 text-xs font-bold uppercase"
              aria-label="Resume MAN Page"
            >
              <FileText className="w-4 h-4" />
            </Link>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-bg-softer text-ink hover:bg-brutal-yellow hover:text-black border-2 border-black p-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-none"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-bg-softer text-ink border-2 border-black p-1.5 shadow-[2px_2px_0px_#000] rounded-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-soft border-t-2 border-black p-4 space-y-3 font-bold text-xs uppercase">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="text-left py-2 px-3 bg-bg-softer border border-black text-ink hover:bg-brutal-yellow hover:text-black"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-black/20 flex items-center justify-between">
            <a
              href="https://github.com/rishhbh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-bg-softer text-ink border border-black p-2"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/rishabhh-sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-bg-softer text-ink border border-black p-2"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <Link
              to="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 bg-brutal-yellow text-black border border-black p-2"
            >
              <FileText className="w-4 h-4" /> Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
