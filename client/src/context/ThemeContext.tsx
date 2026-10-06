import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { COLOR_SCHEMES } from '../theme/schemes';
import type { ColorSchemeConfig } from '../theme/schemes';

export type { ColorSchemeConfig };

interface ThemeContextType {
  theme: 'light' | 'dark';
  colorScheme: string;
  setScheme: (schemeId: string) => void;
  toggleTheme: () => void;
  schemes: ColorSchemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<string>(() => {
    // 1. Read stored scheme from localStorage
    const savedScheme = localStorage.getItem('portfolio_color_scheme');
    if (savedScheme && COLOR_SCHEMES.some((s) => s.id === savedScheme)) {
      return savedScheme;
    }
    // 2. Legacy fallback or initial visitor default
    const legacyTheme = localStorage.getItem('theme');
    if (legacyTheme === 'light') return 'light-brutal';
    return 'synth-cyberpunk';
  });

  const activeSchemeConfig = COLOR_SCHEMES.find((s) => s.id === colorScheme) || COLOR_SCHEMES[0];
  const theme: 'light' | 'dark' = activeSchemeConfig.isDark ? 'dark' : 'light';

  useEffect(() => {
    const root = document.documentElement;
    
    // Set data-scheme attribute for CSS variable selector
    root.setAttribute('data-scheme', colorScheme);

    // Toggle legacy light class for backwards compatibility
    if (activeSchemeConfig.isDark) {
      root.classList.remove('light');
    } else {
      root.classList.add('light');
    }

    // Persist to localStorage
    localStorage.setItem('portfolio_color_scheme', colorScheme);
    localStorage.setItem('theme', activeSchemeConfig.isDark ? 'dark' : 'light');
  }, [colorScheme, activeSchemeConfig]);

  const setScheme = (schemeId: string) => {
    if (COLOR_SCHEMES.some((s) => s.id === schemeId)) {
      setColorSchemeState(schemeId);
    }
  };

  const toggleTheme = () => {
    // Quick toggle between Classic Dark and Classic Light
    setColorSchemeState((prev) => (prev === 'light-brutal' ? 'dark-brutal' : 'light-brutal'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        setScheme,
        toggleTheme,
        schemes: COLOR_SCHEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
