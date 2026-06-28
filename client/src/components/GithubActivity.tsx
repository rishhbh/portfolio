import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';
import { SpotlightCard } from './SpotlightCard';

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
  const { theme } = useTheme();

  // Custom grayscale theme matching the site's brutalist aesthetic
  const explicitTheme = {
    light: ['#e5e5e5', '#cccccc', '#999999', '#666666', '#111111'],
    dark: ['#111111', '#333333', '#666666', '#999999', '#ffffff'],
  };

  return (
    <ErrorBoundary>
      <SpotlightCard className="glass border border-glass-border p-6 space-y-6 relative overflow-hidden mt-6">
        <h3 className="font-display font-bold text-sm tracking-wider text-ink uppercase border-b border-line pb-2">
          Contribution Activity
        </h3>
        
        <div className="w-full overflow-x-auto scrollbar-none pb-2 cursor-grab active:cursor-grabbing">
          <div className="min-w-max text-ink-dim font-mono text-[10px] tracking-widest">
            <GitHubCalendar
              username="rishhbh"
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              theme={explicitTheme}
              blockRadius={0} // Brutalist sharp edges
              blockSize={14}
              blockMargin={5}
              fontSize={10}
            />
          </div>
        </div>
      </SpotlightCard>
    </ErrorBoundary>
  );
}
