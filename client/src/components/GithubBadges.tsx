import type { ReactNode } from 'react';
import { Trophy, ExternalLink, Zap, Flame, GitPullRequest } from 'lucide-react';

export interface GithubBadgeItem {
  id: string;
  name: string;
  count: number;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: ReactNode;
  unlockedDate: string;
}

export const GITHUB_BADGES: GithubBadgeItem[] = [
  {
    id: 'pull-shark',
    name: 'PULL SHARK',
    count: 2,
    description: 'Opened and merged multiple Pull Requests into production codebases.',
    bgColor: 'bg-brutal-yellow',
    textColor: 'text-black',
    borderColor: 'border-black',
    icon: <GitPullRequest className="w-5 h-5 text-black" />,
    unlockedDate: '2x Unlocked',
  },
  {
    id: 'quickdraw',
    name: 'QUICKDRAW',
    count: 1,
    description: 'Closed an issue or pull request within 5 minutes of opening.',
    bgColor: 'bg-brutal-blue',
    textColor: 'text-white',
    borderColor: 'border-black',
    icon: <Zap className="w-5 h-5 text-white" />,
    unlockedDate: '1x Unlocked',
  },
  {
    id: 'yolo',
    name: 'YOLO',
    count: 1,
    description: 'Merged a pull request directly into the primary branch without code review.',
    bgColor: 'bg-brutal-red',
    textColor: 'text-white',
    borderColor: 'border-black',
    icon: <Flame className="w-5 h-5 text-white" />,
    unlockedDate: '1x Unlocked',
  },
];

interface GithubBadgesProps {
  compact?: boolean;
}

export function GithubBadges({ compact = false }: GithubBadgesProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {GITHUB_BADGES.map((badge) => (
          <a
            key={badge.id}
            href="https://github.com/rishhbh"
            target="_blank"
            rel="noopener noreferrer"
            title={`${badge.name} (${badge.count}x): ${badge.description}`}
            className={`${badge.bgColor} ${badge.textColor} border-2 ${badge.borderColor} px-2 py-0.5 font-mono text-[10px] font-black uppercase flex items-center gap-1 shadow-[2px_2px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform rounded-none`}
          >
            <span>{badge.name}</span>
            <span className="bg-black text-white px-1 py-0 text-[9px] font-bold">x{badge.count}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="border-3 border-black bg-bg-soft p-6 shadow-[6px_6px_0px_#000] rounded-none space-y-4">
      <div className="flex flex-wrap items-center justify-between border-b-2 border-black pb-3 gap-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-brutal-yellow" />
          <h3 className="font-black text-sm uppercase text-ink tracking-wide">
            GitHub Achievement Ledger
          </h3>
        </div>
        <a
          href="https://github.com/rishhbh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono font-bold uppercase text-ink-dim hover:text-brutal-red flex items-center gap-1 transition-colors"
        >
          @rishhbh <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {GITHUB_BADGES.map((badge) => (
          <div
            key={badge.id}
            className={`border-3 border-black bg-bg-softer p-4 shadow-[4px_4px_0px_#000] rounded-none flex flex-col justify-between space-y-3 relative overflow-hidden group`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 border-2 border-black ${badge.bgColor} shadow-[2px_2px_0px_#000]`}>
                {badge.icon}
              </div>
              <span className="bg-black text-white font-mono font-black text-xs px-2 py-1 border border-black shadow-[2px_2px_0px_#000]">
                {badge.count}x BADGE
              </span>
            </div>

            <div>
              <div className="font-black text-base uppercase text-ink flex items-center gap-2">
                {badge.name}
              </div>
              <p className="text-xs font-medium text-ink-dim leading-relaxed mt-1">
                {badge.description}
              </p>
            </div>

            <div className="pt-2 border-t border-black/20 flex items-center justify-between font-mono text-[10px] font-bold text-ink-faint uppercase">
              <span>UNLOCKED STATUS</span>
              <span className="text-emerald-400 font-extrabold">{badge.unlockedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
