import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';


const navLinks = [
  { name: 'ABOUT', target: 'about' },
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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
        <Link
          to="/"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display font-bold text-lg tracking-tight text-ink hover:text-ink-dim transition-colors"
        >
          <span className="hidden sm:inline">RISHABH SHARMA</span>
          <span className="sm:hidden">RISHABH</span>
        </Link>

        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8 font-mono text-xs tracking-tight text-ink-dim">
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
          </div>

          <div className="flex items-center gap-2">
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
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-[calc(100%+0.5rem)] left-0 right-0 glass border border-glass-border overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-6 p-6 font-mono text-xs tracking-tight text-ink-dim">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
