import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export function GithubActivity() {
  const { theme, colorScheme } = useTheme();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(
    () => typeof window === 'undefined' || typeof IntersectionObserver === 'undefined'
  );
  const [calendarColors, setCalendarColors] = React.useState<string[]>([
    '#24242a', '#2196F3', '#FFEB3B', '#FF5252', '#ffffff'
  ]);

  React.useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const updateColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const bgSofter = styles.getPropertyValue('--bg-softer').trim() || '#24242a';
      const btnSecondary = styles.getPropertyValue('--btn-secondary').trim() || '#2196F3';
      const btnPrimary = styles.getPropertyValue('--btn-primary').trim() || '#FFEB3B';
      const btnAccent = styles.getPropertyValue('--btn-accent').trim() || '#FF5252';
      const ink = styles.getPropertyValue('--ink').trim() || '#ffffff';

      setCalendarColors([bgSofter, btnSecondary, btnPrimary, btnAccent, ink]);
    };

    updateColors();

    const observer = new MutationObserver(() => updateColors());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-scheme', 'class'],
    });

    return () => observer.disconnect();
  }, [colorScheme, theme]);

  const themeConfig = {
    light: calendarColors,
    dark: calendarColors,
  };

  return (
    <ErrorBoundary>
      <div ref={containerRef} className="bg-bg-soft border-3 border-black p-6 sm:p-8 font-sans text-xs sm:text-sm shadow-[6px_6px_0px_#000] rounded-none overflow-hidden mt-6 min-h-[160px]">
        <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
          <span className="bg-btn-primary text-btn-primary-text border-2 border-black font-extrabold text-xs px-3 py-1 shadow-[2px_2px_0px_#000] rounded-none uppercase">
            GitHub Contributions Calendar
          </span>
          <span className="text-ink-dim font-mono font-bold text-xs">@rishhbh</span>
        </div>
        
        <div className="w-full overflow-x-auto scrollbar-none pb-2">
          <div className="min-w-max text-ink font-bold text-[11px] uppercase">
            {isVisible ? (
              <GitHubCalendar
                username="rishhbh"
                colorScheme={theme === 'dark' ? 'dark' : 'light'}
                theme={themeConfig}
                blockRadius={0}
                blockSize={14}
                blockMargin={5}
                fontSize={11}
              />
            ) : (
              <div className="h-32 flex items-center justify-center font-mono text-xs text-ink-dim uppercase">
                [ Deferred Loading Calendar... ]
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
