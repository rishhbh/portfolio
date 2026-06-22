import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sun, Moon, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCommandPalette } from '../context/CommandPaletteContext';

const navLinks = [
  { name: 'WORK', target: 'work' },
  { name: 'STACK', target: 'stack' },
  { name: 'EXPERIENCE', target: 'experience' },
  { name: 'CONTACT', target: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { openPalette } = useCommandPalette();

  // Handle body overflow lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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

  // Close mobile menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [location]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(null);
      return;
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is prominent in viewport
    });

    navLinks.forEach(({ target }) => {
      const el = document.getElementById(target);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const currentTarget = hoveredLink || activeSection;

  const handleNavClick = (target: string, fromMobileMenu: boolean = false) => {
    // 1. Close menu visually
    setMobileMenuOpen(false);
    // 2. Remove body scroll lock synchronously to prevent race conditions
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = '';

    const executeNavigation = () => {
      if (location.pathname === '/') {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to homepage with hash
        navigate(`/#${target}`);
      }
    };

    if (fromMobileMenu) {
      // 3. Trigger scroll after menu animation completes (0.35s)
      setTimeout(executeNavigation, 350);
    } else {
      executeNavigation();
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-strong border-b border-glass-border py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo/Wordmark */}
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display font-bold text-lg tracking-wider text-ink hover:text-ink-dim transition-colors"
        >
          RISHABH SHARMA
        </Link>

        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8 font-mono text-xs tracking-widest text-ink-dim">
              {navLinks.map((link) => (
                <li key={link.name} className="flex items-center">
                  <button
                    onMouseEnter={() => setHoveredLink(link.target)}
                    onMouseLeave={() => setHoveredLink(null)}
                    onClick={() => handleNavClick(link.target)}
                    className={`transition-colors py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 ${
                      currentTarget === link.target ? 'text-ink' : 'hover:text-ink'
                    }`}
                  >
                    <span className="relative inline-block">
                      {link.name}
                      {currentTarget === link.target && (
                        <motion.div
                          layoutId="navUnderline"
                          className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-ink"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30
                          }}
                        />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <a
              href="https://drive.google.com/file/d/1_TSEuYMucfqFTDUs2-YR2tvL9uXo5ZBh/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="glass hover:bg-glass-strong border border-glass-border text-ink font-mono text-xs tracking-widest py-2 px-4 transition-colors flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
            >
              RESUME <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={openPalette}
              className="hidden sm:flex items-center gap-2 glass hover:bg-glass-strong border border-glass-border text-ink font-mono text-xs tracking-widest py-2 px-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5" />
              <span>⌘K</span>
            </button>
            <button
              onClick={openPalette}
              className="sm:hidden text-ink hover:text-ink-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink p-1.5 transition-colors"
              aria-label="Open command palette"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-ink hover:text-ink-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink p-1.5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-ink hover:text-ink-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink p-1.5 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-[100%] left-0 right-0 glass-strong border-b border-glass-border overflow-hidden"
          >
            <div className="flex flex-col space-y-6 p-6 font-mono text-xs tracking-widest text-ink-dim">
              {navLinks.map((link, idx) => (
                <div key={link.name} className="relative border-b border-line">
                  <motion.button
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.04 + 0.1, duration: 0.2, ease: 'easeOut' }}
                    onClick={() => handleNavClick(link.target, true)}
                    className={`w-full text-left py-3 transition-colors ${
                      activeSection === link.target ? 'text-ink' : 'hover:text-ink text-ink-dim'
                    }`}
                  >
                    {link.name}
                  </motion.button>
                  {activeSection === link.target && (
                    <motion.div
                      layoutId="mobileNavUnderline"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-ink"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              ))}
              <motion.a
                initial={{ x: -12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.04 + 0.1, duration: 0.2, ease: 'easeOut' }}
                href="https://drive.google.com/file/d/1_TSEuYMucfqFTDUs2-YR2tvL9uXo5ZBh/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="glass hover:bg-glass-strong border border-glass-border text-ink text-center py-3 px-4 transition-colors flex items-center justify-center gap-2"
              >
                RESUME <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
