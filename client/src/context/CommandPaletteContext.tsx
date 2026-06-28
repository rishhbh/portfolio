import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface CommandPaletteContextType {
  isOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPalette = () => setIsOpen(true);
  const closePalette = () => setIsOpen(false);
  const togglePalette = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        togglePalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, openPalette, closePalette, togglePalette }}>
      {children}
    </CommandPaletteContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (context === undefined) {
    throw new Error('useCommandPalette must be used within a CommandPaletteProvider');
  }
  return context;
}
