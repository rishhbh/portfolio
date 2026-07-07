import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from '../context/CommandPaletteContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Monitor, ArrowRight, FileText, Github, Linkedin, Sun, Moon } from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  category: 'Sections' | 'Projects' | 'Links' | 'Actions';
  icon?: React.ReactNode;
  action: () => void;
}

export function CommandPalette() {
  const { isOpen, closePalette } = useCommandPalette();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery('');
      setSelectedIndex(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleScrollToSection = (target: string) => {
    closePalette();
    if (location.pathname === '/') {
      const element = document.getElementById(target);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#' + target);
      // Let the Navbar's existing logic handle smooth scrolling on route change if implemented,
      // or the browser will jump to the anchor.
    }
  };

  const handleNavigateProject = (slug: string) => {
    closePalette();
    navigate(`/projects/${slug}`);
  };

  const handleExternalLink = (url: string) => {
    closePalette();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const items: PaletteItem[] = [
    { id: 'sec-work', title: 'Work', category: 'Sections', icon: <Monitor className="w-4 h-4" />, action: () => handleScrollToSection('work') },
    { id: 'sec-stack', title: 'Stack', category: 'Sections', icon: <Monitor className="w-4 h-4" />, action: () => handleScrollToSection('stack') },
    { id: 'sec-exp', title: 'Experience', category: 'Sections', icon: <Monitor className="w-4 h-4" />, action: () => handleScrollToSection('experience') },
    { id: 'sec-contact', title: 'Contact', category: 'Sections', icon: <Monitor className="w-4 h-4" />, action: () => handleScrollToSection('contact') },
    
    { id: 'proj-lz', title: 'LayerZero', category: 'Projects', icon: <ArrowRight className="w-4 h-4" />, action: () => handleNavigateProject('layerzero') },
    { id: 'proj-ka', title: 'KaushalAI', category: 'Projects', icon: <ArrowRight className="w-4 h-4" />, action: () => handleNavigateProject('kaushal-ai') },
    { id: 'proj-ds', title: 'DeepSynth', category: 'Projects', icon: <ArrowRight className="w-4 h-4" />, action: () => handleNavigateProject('deepsynth') },
    { id: 'proj-calc', title: 'Calculator', category: 'Projects', icon: <ArrowRight className="w-4 h-4" />, action: () => handleNavigateProject('calculator') },

    { id: 'link-res', title: 'Resume', category: 'Links', icon: <FileText className="w-4 h-4" />, action: () => handleExternalLink('https://drive.google.com/file/d/1_TSEuYMucfqFTDUs2-YR2tvL9uXo5ZBh/view?usp=drive_link') },
    { id: 'link-git', title: 'GitHub', category: 'Links', icon: <Github className="w-4 h-4" />, action: () => handleExternalLink('https://github.com/rishhbh') },
    { id: 'link-lin', title: 'LinkedIn', category: 'Links', icon: <Linkedin className="w-4 h-4" />, action: () => handleExternalLink('https://linkedin.com/in/rishabhh-sharma') },

    { id: 'act-theme', title: `Toggle Theme (${theme === 'dark' ? 'Light' : 'Dark'})`, category: 'Actions', icon: theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />, action: () => { toggleTheme(); closePalette(); } }
  ];

  const filteredItems = items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector('[aria-selected="true"]') as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, filteredItems.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Tab') {
      e.preventDefault(); // Trap focus
    }
  };

  const categories = ['Sections', 'Projects', 'Links', 'Actions'] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closePalette}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative w-full max-w-xl bg-bg border border-line overflow-hidden flex flex-col max-h-[60vh] shadow-2xl shadow-black/20"
            onKeyDown={handleKeyDown}
          >
            <div className="flex items-center px-4 border-b border-line bg-glass">
              <Search className="w-5 h-5 text-ink-dim mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search projects, sections, links..."
                className="w-full bg-transparent border-none text-ink placeholder:text-ink-dim font-mono text-base py-4 outline-none"
                aria-label="Command Palette Search"
              />
              <div className="text-[10px] font-mono text-ink-faint border border-line px-1.5 py-0.5 rounded-sm">ESC</div>
            </div>

            <div ref={listRef} className="overflow-y-auto p-2 flex-grow">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-ink-faint font-mono text-xs">
                  No results found for "{query}"
                </div>
              ) : (
                categories.map(category => {
                  const categoryItems = filteredItems.filter(i => i.category === category);
                  if (categoryItems.length === 0) return null;
                  
                  return (
                    <div key={category} className="mb-4 last:mb-0">
                      <div className="px-3 py-2 text-xs font-mono tracking-tight text-ink-dim lowercase">
                        {category}
                      </div>
                      <div className="space-y-0.5">
                        {categoryItems.map(item => {
                          const globalIndex = filteredItems.findIndex(i => i.id === item.id);
                          const isSelected = globalIndex === selectedIndex;
                          
                          return (
                            <button
                              key={item.id}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => item.action()}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`w-full flex items-center px-3 py-3 font-mono text-sm text-left transition-colors ${
                                isSelected 
                                  ? 'bg-glass-strong text-ink border-l-2 border-ink' 
                                  : 'text-ink-dim hover:text-ink border-l-2 border-transparent hover:bg-glass'
                              }`}
                            >
                              <span className="mr-3 text-ink-faint flex-shrink-0">{item.icon}</span>
                              <span className="truncate">{item.title}</span>
                              {isSelected && (
                                <ArrowRight className="w-3 h-3 ml-auto text-ink-faint" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
