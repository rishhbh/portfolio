import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSmoothScroll } from '../context/SmoothScrollContext';

interface NavbarProps {
  onNavClick?: (targetId: string) => void;
}

export default function Navbar({ onNavClick }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      label: 'Overview',
      to: '/',
      isActive: location.pathname === '/',
    },
    {
      label: 'Systems & Work',
      to: '/work',
      isActive: location.pathname.startsWith('/work') || location.pathname.startsWith('/projects'),
    },
    {
      label: 'Tooling & Skills',
      to: '/skills',
      isActive: location.pathname.startsWith('/skills'),
    },
  ];

  const handleLinkClick = (to: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (location.pathname === to) {
      e.preventDefault();
      scrollTo(0, { duration: 1.2 });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      if (onNavClick) {
        onNavClick('dispatch');
      } else {
        const el = document.getElementById('dispatch');
        if (el) scrollTo(el, { offset: 0, duration: 1.2 });
      }
    } else {
      navigate('/#dispatch');
    }
  };

  return (
    <>
      <header className="hdr" role="banner">
        <Link
          to="/"
          onClick={(e) => handleLinkClick('/', e)}
          className="logo bg-transparent border-0 text-white cursor-pointer p-0"
          aria-label="Rishabh Sharma home"
        >
          rishabh sharma
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={(e) => handleLinkClick(item.to, e)}
              aria-current={item.isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/resume"
            className="cta ml-2"
            aria-current={location.pathname.startsWith('/resume') ? 'page' : undefined}
          >
            Resume ↗
          </Link>
          <a
            href="/#dispatch"
            onClick={handleContactClick}
            className="cta"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white text-xs uppercase tracking-widest border border-white px-3 py-1.5 bg-transparent cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black text-white flex flex-col justify-center px-8 py-16 md:hidden">
          <p className="eyebrow"><span className="eyebrow-line"></span> NAVIGATION</p>
          <div className="flex flex-col space-y-6">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={(e) => handleLinkClick(item.to, e)}
                className={`font-serif text-3xl tracking-tight no-underline transition-opacity ${
                  item.isActive ? 'opacity-100 underline underline-offset-8' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-8 border-t border-[#333] flex flex-col gap-4">
              <Link
                to="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="b text-center"
              >
                Inspect Resume ↗
              </Link>
              <a
                href="/#dispatch"
                onClick={handleContactClick}
                className="b b2 text-center"
              >
                Direct Dispatch
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
