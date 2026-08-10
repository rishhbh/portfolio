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

  // Custom Neubrutalist color scheme (yellow/green steps)
  const explicitTheme = {
    light: ['#eef0ea', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'],
    dark: ['#24242a', '#4a4000', '#998000', '#FFEB3B', '#FF5252'],
  };

  return (
    <ErrorBoundary>
      <div className="bg-bg-soft border-3 border-black p-6 sm:p-8 font-sans text-xs sm:text-sm shadow-[6px_6px_0px_#000] rounded-none overflow-hidden mt-6">
        <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
          <span className="bg-brutal-yellow text-black border-2 border-black font-extrabold text-xs px-3 py-1 shadow-[2px_2px_0px_#000] rounded-none uppercase">
            GitHub Contributions Calendar
          </span>
          <span className="text-ink-dim font-mono font-bold text-xs">@rishhbh</span>
        </div>
        
        <div className="w-full overflow-x-auto scrollbar-none pb-2">
          <div className="min-w-max text-ink font-bold text-[11px] uppercase">
            <GitHubCalendar
              username="rishhbh"
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              theme={explicitTheme}
              blockRadius={0}
              blockSize={14}
              blockMargin={5}
              fontSize={11}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
