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
  const { theme } = useTheme();

  // Custom grayscale theme matching the site's brutalist aesthetic
  const explicitTheme = {
    light: ['#e5e5e5', '#cccccc', '#999999', '#666666', '#111111'],
    dark: ['#111111', '#444444', '#777777', '#aaaaaa', '#ffffff'],
  };

  return (
    <ErrorBoundary>
      <div className="glass bg-bg-soft border border-glass-border p-6 sm:p-8 font-mono text-xs sm:text-sm shadow-2xl overflow-hidden mt-6">
        <div className="text-ink-dim mb-8">
          <span className="text-green-500/70">guest@server</span>:<span className="text-blue-400/70">~</span>$ <span className="text-ink">curl -s https://api.github.com/users/rishhbh/activity | grep commits</span>
        </div>
        
        <div className="w-full overflow-x-auto scrollbar-none pb-2 cursor-grab active:cursor-grabbing">
          <div className="min-w-max text-ink-dim font-mono text-[10px] tracking-tight">
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
      </div>
    </ErrorBoundary>
  );
}
