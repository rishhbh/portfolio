import React from 'react';
import { motion } from 'framer-motion';
import { SplitText } from '../components/SplitText';
import { ReadStatement } from '../components/ReadStatement';
import { useNpmDownloads } from '../hooks/useNpmDownloads';

interface HomeProps {
  onNavigate: (id: string, path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const purgeportDownloads = useNpmDownloads('purgeport');

  const heroHeadline = "I build the backend,<br />the part of a product nobody notices until it’s missing.";

  return (
    <div className="wrap">
      {/* Hero Section */}
      <div className="hero play">
        <SplitText
          tag="h1"
          text={heroHeadline}
          className="split"
          delay={120}
        />

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
        >
          <span className="who font-medium text-[var(--ink)]">Rishabh Sharma</span>, final-year
          B.Tech student in computer science (AI &amp; ML) at the School of Management
          Sciences, Lucknow. I work mostly with Node.js, JavaScript and databases.
        </motion.p>

        <motion.p
          className="now"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        >
          Currently building{' '}
          <button
            type="button"
            className="link-ink font-medium text-[var(--ink)] cursor-pointer bg-transparent border-none p-0 inline"
            onClick={() => onNavigate('projects', '/projects/purgeport')}
          >
            purgeport
          </button>
          , a command-line tool for developers{purgeportDownloads ? ` (${purgeportDownloads.toLocaleString()} downloads on npm)` : ''}.
        </motion.p>
      </div>

      {/* Metrics Bar with slow, silky reveal */}
      <motion.div
        className="py-7 my-6 border-y border-[var(--rule)] grid grid-cols-1 sm:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div>
          <div className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Live CLI Traction</div>
          <div className="font-serif text-3xl sm:text-4xl text-[var(--ink)]">
            {purgeportDownloads ? purgeportDownloads.toLocaleString() : '487+'}
          </div>
          <div className="text-xs text-[var(--muted)] mt-1 font-mono">npm downloads</div>
        </div>
        <div>
          <div className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Cache-Aside P99</div>
          <div className="font-serif text-3xl sm:text-4xl text-[var(--ink)]">150ms</div>
          <div className="text-xs text-[var(--muted)] mt-1 font-mono">down from 9s via Redis</div>
        </div>
        <div>
          <div className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Competitions</div>
          <div className="font-serif text-3xl sm:text-4xl text-[var(--ink)]">4 Podiums</div>
          <div className="text-xs text-[var(--muted)] mt-1 font-mono">3x 1st Place · 1x 2nd Place</div>
        </div>
      </motion.div>

      {/* Philosophy / Reading Statement */}
      <ReadStatement
        text="I care about the parts of a product that nobody sees: sign-in, caching, deployment. I built the whole backend for a B2B outreach platform, cut repeat requests in an AI summarizer from nine seconds to 150 milliseconds, and won 2 hackathons with a skilling platform for India’s informal workforce."
        scrollContainerSelector=".page"
      />
    </div>
  );
};

export default Home;
