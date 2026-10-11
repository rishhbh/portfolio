import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface QueryPreset {
  question: string;
  shortLabel: string;
  headline: string;
  answer: string;
  badge: string;
}

const PRESETS: QueryPreset[] = [
  {
    shortLabel: 'Frontend LLM calls',
    question: 'Why not just call OpenAI directly from the frontend?',
    headline: 'API keys leak and clients cannot be trusted.',
    answer: 'Exposing provider keys in the browser lets anyone steal your budget. A backend proxy gives you sliding-window rate limits, strict schema validation, and SHA-256 caching so duplicate requests never hit the GPU twice.',
    badge: 'SECURITY & CACHING',
  },
  {
    shortLabel: 'Redis vs Memory',
    question: 'Why Upstash Redis instead of an in-memory Node.js Map?',
    headline: 'Process restarts wipe memory and containers cannot share state.',
    answer: 'In-memory maps vanish when a Node process crashes or restarts. In multi-instance or serverless deployments, an external Redis cache persists across deploys, enforces strict TTLs, and handles atomic rate limiting across all instances.',
    badge: 'INFRASTRUCTURE',
  },
  {
    shortLabel: 'Zero dependencies',
    question: 'Why build purgeport with zero npm dependencies?',
    headline: 'Every external package is an attack surface and a version hazard.',
    answer: 'POSIX operating systems already expose lsof, ps, and the /proc filesystem. Wrapping native kernel utilities in pure Node ESM took under 200 lines, avoided 50MB of node_modules bloat, and will still run in ten years.',
    badge: 'SYSTEMS ENGINEERING',
  },
  {
    shortLabel: 'Layerzero latency',
    question: 'How did Layerzero cut repeat latency from 8.5s to 150ms?',
    headline: 'Deterministic SHA-256 content fingerprinting.',
    answer: 'Instead of re-running token inference on identical PDFs or web pages, the pipeline computes a SHA-256 hash of the cleaned text and checks Redis first. Cache hits return instant cached summaries, dropping latency by ~98%.',
    badge: 'PERFORMANCE',
  },
];

export function HeroSection() {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [typedAnswer, setTypedAnswer] = useState<string>(PRESETS[0].answer);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = PRESETS[selectedPreset];

  const handleSelectPreset = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedPreset(index);
    const targetText = PRESETS[index].answer;
    setTypedAnswer('');

    let charIndex = 0;
    timerRef.current = setInterval(() => {
      charIndex += 2;
      setTypedAnswer(targetText.slice(0, charIndex));
      if (charIndex >= targetText.length) {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 18);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section className="s dk hero" id="overview">
      <div className="w home-hero">
        {/* Left Column: Editorial Statement */}
        <div className="t">
          <p className="eyebrow">
            <span className="eyebrow-line"></span> FOR PEOPLE BUILDING PRODUCTION SOFTWARE
          </p>

          <h1 className="max-w-[12ch] pb-5">
            Engineered to survive production.
          </h1>

          <p className="lead">
            Backend engineer specializing in distributed pipelines, cache invalidation, and LLM integrations that survive production traffic without burning memory budgets.
          </p>

          <div className="row">
            <Link to="/work" className="b">
              Inspect systems <span aria-hidden="true">↗</span>
            </Link>
            <Link to="/skills" className="b b2">
              Tooling & decisions
            </Link>
          </div>

          <p className="text-xs text-[#9b9b9b] mt-7 tracking-wide font-mono">
            B.Tech CSE (AI & ML) • SMS Lucknow • Built Layerzero, purgeport, and KaushalAI.
          </p>
        </div>

        {/* Right Column: Live Engineering Decision Simulator */}
        <div className="v hero-demo">
          <div className="demo-top">
            <span className="flex items-center gap-2">
              <span className="live-dot"></span>
              <span>ENGINEERING DECISION // LIVE RATIONALE</span>
            </span>
            <span className="demo-index">
              0{selectedPreset + 1} — 0{PRESETS.length}
            </span>
          </div>

          <div className="demo-question">
            <span className="micro-label">THE ARCHITECTURAL DILEMMA</span>
            <p className="font-serif">“{active.question}”</p>
          </div>

          <div className="demo-rule"></div>

          <div className="demo-answer">
            <span className="micro-label">THE UNCOMFORTABLE REALITY</span>
            <h3 className="font-serif">{active.headline}</h3>
            <p className="min-h-[72px] font-sans">
              {typedAnswer}
            </p>
          </div>

          <div className="pt-3 pb-3 border-t border-[#333] flex flex-wrap gap-2">
            {PRESETS.map((p, idx) => (
              <button
                key={p.shortLabel}
                onClick={() => handleSelectPreset(idx)}
                className={`c text-xs ${idx === selectedPreset ? 'on' : ''}`}
                aria-pressed={idx === selectedPreset}
              >
                {p.shortLabel}
              </button>
            ))}
          </div>

          <div className="demo-bottom">
            <span>{active.badge}</span>
            <span>MEASURED TRUTH <span aria-hidden="true">↗</span></span>
          </div>
        </div>
      </div>

      {/* Hero Edge Ticker */}
      <div className="hero-edge" aria-hidden="true">
        <span>SPEC</span>
        <i></i>
        <span>RETRIEVAL</span>
        <i></i>
        <span>BENCHMARK</span>
        <i></i>
        <span>DEPLOY</span>
      </div>
    </section>
  );
}
