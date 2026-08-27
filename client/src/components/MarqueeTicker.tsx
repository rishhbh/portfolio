interface MarqueeTickerProps {
  items?: string[];
  direction?: 'left' | 'right';
  variant?: 'yellow' | 'dark' | 'red' | 'blue';
}

const DEFAULT_ITEMS = [
  'NODE.JS / EXPRESS V5',
  'RESTful API ARCHITECTURE',
  'MONGODB & 2DSPHERE INDEXING',
  'UPSTASH REDIS CACHING',
  'DOCKER & AWS EC2 DEPLOYMENT',
  'CLOUDFLARE R2 & WORKERS',
  'HYBRID LLM ORCHESTRATION',
  'JEST & SUPERTEST AUTOMATION',
  'JWT & OAUTH 2.0 SECURITY',
  'SUB-2S SOS EMERGENCY PIPELINES',
];

export function MarqueeTicker({
  items = DEFAULT_ITEMS,
  direction = 'left',
  variant = 'yellow',
}: MarqueeTickerProps) {
  const repeatedItems = [...items, ...items, ...items, ...items];

  const variantStyles = {
    yellow: 'bg-brutal-yellow text-black border-y-3 border-black',
    dark: 'bg-bg-softer text-ink border-y-3 border-black',
    red: 'bg-brutal-red text-white border-y-3 border-black',
    blue: 'bg-brutal-blue text-white border-y-3 border-black',
  };

  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  return (
    <div className={`w-full overflow-hidden py-3 font-mono text-xs font-black uppercase tracking-wider select-none ${variantStyles[variant]}`}>
      <div className={animClass}>
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 px-4 whitespace-nowrap">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-black border border-white shrink-0" />
              {item}
            </span>
            <span className="opacity-40">///</span>
          </div>
        ))}
      </div>
    </div>
  );
}
