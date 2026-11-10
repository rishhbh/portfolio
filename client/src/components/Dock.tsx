import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export interface NavItem {
  id: string;
  label: string;
  keyNumber: string;
  path: string;
}

interface DockProps {
  currentNav: string;
  onNavigate: (id: string, path: string) => void;
  items?: NavItem[];
}

const DEFAULT_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', keyNumber: '1', path: '/' },
  { id: 'projects', label: 'Projects', keyNumber: '2', path: '/projects' },
  { id: 'experience', label: 'Experience', keyNumber: '3', path: '/experience' },
  { id: 'skills', label: 'Skills', keyNumber: '4', path: '/skills' },
  { id: 'resume', label: 'Resume', keyNumber: '5', path: '/resume' },
  { id: 'contact', label: 'Contact', keyNumber: '6', path: '/contact' },
];

export const Dock: React.FC<DockProps> = ({
  currentNav,
  onNavigate,
  items = DEFAULT_ITEMS,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markerY, setMarkerY] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const dockRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPointerRef = useRef<'mouse' | 'touch' | 'pen'>('mouse');

  // Find DOM anchor for given nav id
  const findLinkEl = (id: string): HTMLAnchorElement | HTMLButtonElement | null => {
    if (!listRef.current) return null;
    return listRef.current.querySelector(`[data-nav="${id}"]`);
  };

  const moveMarkerTo = (el: HTMLElement | null) => {
    if (!el || !listRef.current) return;
    const y = el.offsetTop + el.offsetHeight / 2 - 3; // marker height is 6px (0.375rem)
    setMarkerY(y);
  };

  // Keep marker on current page link
  useEffect(() => {
    const el = findLinkEl(currentNav);
    if (el) {
      moveMarkerTo(el);
    }
  }, [currentNav, isOpen]);

  // Initial ready state animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
      const el = findLinkEl(currentNav);
      if (el) moveMarkerTo(el);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentNav]);

  // Keyboard shortcut listeners (1-6, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.key.length !== 1) return;

      const target = e.target as HTMLElement | null;
      if (target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)) {
        return;
      }

      const match = items.find((item) => item.keyNumber === e.key);
      if (match) {
        e.preventDefault();
        onNavigate(match.id, match.path);
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, items, onNavigate]);

  // Click outside to close
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (isOpen && dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsOpen(true);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 220);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (lastPointerRef.current === 'mouse' && e.detail > 0) {
      setIsOpen(true);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  const handleItemHover = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const target = (e.target as HTMLElement).closest('button, a') as HTMLElement | null;
    if (target) {
      moveMarkerTo(target);
    }
  };

  const handleListPointerLeave = () => {
    const currentEl = findLinkEl(currentNav);
    if (currentEl) {
      moveMarkerTo(currentEl);
    }
  };

  return (
    <div
      ref={dockRef}
      className={`dock ${isOpen ? 'open' : ''} ${isReady ? 'ready' : ''}`}
      id="dock"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <button
        ref={triggerRef}
        className="dock-trigger"
        id="dock-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-controls="dock-panel"
        onPointerDown={(e) => {
          lastPointerRef.current = e.pointerType as 'mouse' | 'touch' | 'pen';
        }}
        onClick={handleTriggerClick}
      >
        <span>See more</span>
        <span className="plus" aria-hidden="true">+</span>
      </button>

      <nav className="dock-panel" id="dock-panel" aria-label="Pages">
        <div>
          <motion.span
            className="dock-marker"
            aria-hidden="true"
            animate={{ y: markerY }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 32,
              mass: 0.8,
            }}
          />
          <ul
            ref={listRef}
            className="dock-list"
            onPointerLeave={handleListPointerLeave}
          >
            {items.map((item) => {
              const isCurrent = currentNav === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    data-nav={item.id}
                    aria-current={isCurrent ? 'page' : undefined}
                    onPointerOver={(e) => handleItemHover(e)}
                    onClick={() => {
                      onNavigate(item.id, item.path);
                      setIsOpen(false);
                    }}
                  >
                    <span className="label-text">{item.label}</span>
                    <kbd>{item.keyNumber}</kbd>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};
