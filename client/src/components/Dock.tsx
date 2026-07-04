import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Github, Linkedin, FileText, Mail, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from '../context/CommandPaletteContext';

const dockLinks = [
  { name: 'Home', icon: <Home className="w-[18px] h-[18px]" />, target: '/' },
  { name: 'Search', icon: <Search className="w-[18px] h-[18px]" />, action: 'search' },
  { name: 'GitHub', icon: <Github className="w-[18px] h-[18px]" />, href: 'https://github.com/rishhbh' },
  { name: 'LinkedIn', icon: <Linkedin className="w-[18px] h-[18px]" />, href: 'https://linkedin.com/in/rishabhh-sharma' },
  { name: 'Resume', icon: <FileText className="w-[18px] h-[18px]" />, href: 'https://drive.google.com/file/d/1_TSEuYMucfqFTDUs2-YR2tvL9uXo5ZBh/view?usp=drive_link' },
  { name: 'Contact', icon: <Mail className="w-[18px] h-[18px]" />, target: 'contact' },
];

export default function Dock() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { openPalette } = useCommandPalette();

  const handleNavClick = (link: typeof dockLinks[0]) => {
    if (link.action === 'search') {
      openPalette();
      return;
    }

    const target = link.target;
    if (!target) return;

    if (target === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else {
      if (location.pathname === '/') {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${target}`);
      }
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, x: '-50%' }}
      animate={{ y: 0, opacity: 1, x: '-50%' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-8 left-1/2 z-[100] glass border border-glass-border shadow-2xl flex items-center p-1.5 md:p-2 gap-1 md:gap-2 transform-gpu"
    >
      {dockLinks.map((link) => {
        const isAction = !!link.href;
        const isHovered = hoveredLink === link.name;

        const content = (
          <div 
            className={`relative p-3 md:p-3.5 transition-colors flex items-center justify-center ${
              isHovered ? 'bg-glass-strong text-ink' : 'text-ink-dim hover:text-ink hover:bg-glass'
            }`}
            onMouseEnter={() => setHoveredLink(link.name)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {link.icon}
            
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute -top-[52px] left-1/2 -translate-x-1/2 glass border border-glass-border px-3 py-2 text-[11px] font-mono tracking-tight text-ink pointer-events-none whitespace-nowrap shadow-xl"
                >
                  {link.name.toLowerCase()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

        if (isAction) {
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink block"
              aria-label={link.name}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={link.name}
            onClick={() => handleNavClick(link)}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink block"
            aria-label={link.name}
          >
            {content}
          </button>
        );
      })}
    </motion.div>
  );
}
