import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandPalette } from '../context/CommandPaletteContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSound } from '../hooks/useSound';

export function CommandPalette() {
  const { isOpen, closePalette } = useCommandPalette();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'command' | 'output'; text: string; }[]>([
    { type: 'output', text: 'Terminal v1.0.0. Type "help" for a list of available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { playKeystroke, playBeep } = useSound();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { type: 'command', text: trimmed }]);
    const args = trimmed.split(' ');
    const command = args[0].toLowerCase();

    const addOutput = (text: string) => {
      setHistory(prev => [...prev, { type: 'output', text }]);
    };

    switch (command) {
      case 'help':
        addOutput('Available commands:');
        addOutput('  ls         - List available directories/projects');
        addOutput('  cd <dir>   - Navigate to section (e.g., cd work)');
        addOutput('  cat <file> - Open a file (e.g., cat resume.md)');
        addOutput('  theme      - Toggle light/dark mode');
        addOutput('  clear      - Clear terminal window');
        addOutput('  exit       - Close terminal');
        break;
      case 'ls':
        addOutput('Directories: work/  stack/  experience/  contact/');
        addOutput('Projects:    layerzero/  kaushal-ai/  deepsynth/  calculator/');
        addOutput('Files:       resume.md');
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'exit':
        closePalette();
        break;
      case 'theme':
        toggleTheme();
        addOutput(`Theme switched to ${theme === 'dark' ? 'light' : 'dark'} mode.`);
        break;
      case 'cat':
        if (args[1] === 'resume.md') {
          addOutput('Opening man page...');
          setTimeout(() => {
            closePalette();
            navigate('/resume');
          }, 400);
        } else if (args[1] === 'resume.pdf') {
            addOutput('Opening PDF...');
            setTimeout(() => {
              closePalette();
              window.open('https://drive.google.com/file/d/1_TSEuYMucfqFTDUs2-YR2tvL9uXo5ZBh/view', '_blank');
            }, 400);
        } else {
          addOutput(`cat: ${args[1] || ''}: No such file or directory`);
        }
        break;
      case 'cd': {
        const target = args[1];
        if (!target) {
          addOutput('cd: missing argument');
          break;
        }
        const sections = ['work', 'stack', 'experience', 'contact'];
        const projects = ['layerzero', 'kaushal-ai', 'deepsynth', 'calculator'];
        
        if (sections.includes(target)) {
          addOutput(`Navigating to /${target}...`);
          setTimeout(() => {
            closePalette();
            if (location.pathname === '/') {
              document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/#' + target);
            }
          }, 400);
        } else if (projects.includes(target)) {
          addOutput(`Opening project /${target}...`);
          setTimeout(() => {
            closePalette();
            navigate(`/projects/${target}`);
          }, 400);
        } else {
          addOutput(`cd: ${target}: No such file or directory`);
        }
        break;
      }
      default:
        addOutput(`command not found: ${command}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    playKeystroke();
    if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      playBeep();
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true">
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
            className="relative w-full max-w-3xl bg-bg border border-line overflow-hidden flex flex-col h-[70vh] shadow-2xl shadow-black/40 font-mono text-sm"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-bg-soft">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={closePalette} />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs text-ink-dim tracking-wider font-bold">guest@portfolio:~</div>
              <div className="text-[10px] text-ink-faint border border-line px-1.5 py-0.5 rounded-sm bg-bg">ESC</div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-bg text-ink-dim" onClick={() => inputRef.current?.focus()}>
              <div className="space-y-2 mb-2">
                {history.map((line, i) => (
                  <div key={i} className={line.type === 'command' ? 'text-ink mt-4' : 'whitespace-pre-wrap leading-relaxed'}>
                    {line.type === 'command' && (
                      <span className="text-green-500/70 mr-2">guest@portfolio:~$</span>
                    )}
                    {line.text}
                  </div>
                ))}
              </div>
              <div className="flex items-center text-ink mt-4">
                <span className="text-green-500/70 mr-2 shrink-0">guest@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-ink caret-ink placeholder:text-ink-faint/30"
                  spellCheck={false}
                  autoComplete="off"
                  placeholder="Type a command..."
                />
              </div>
              <div ref={bottomRef} className="h-4" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
