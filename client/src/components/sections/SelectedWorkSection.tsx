import { useState } from 'react';
import { Link } from 'react-router-dom';

interface SystemItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  metrics: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const SYSTEMS: SystemItem[] = [
  {
    id: 'layerzero',
    slug: 'layerzero',
    name: 'Layerzero',
    tagline: 'Multi-Model Content Ingestion & Caching Engine',
    summary: 'A unified ingestion pipeline for PDFs, DOCX, and web URLs. Generates SHA-256 fingerprints to query Upstash Redis first, cutting repeat latency from ~8.5s to ~150ms (~98% reduction). Streams tokens in real time via Server-Sent Events.',
    metrics: '~98% latency drop on cache hits • Real-time SSE token streaming',
    stack: ['Node.js 18+', 'Upstash Redis', 'SSE', 'Gemini Flash', 'Cloudflare R2'],
    githubUrl: 'https://github.com/rishhbh/layerzero',
    liveUrl: 'https://layerzero.rishhbh.workers.dev',
  },
  {
    id: 'purgeport',
    slug: 'purgeport',
    name: 'purgeport',
    tagline: 'Zero-Runtime-Dependency POSIX Port Killer CLI',
    summary: 'A lightweight native ESM command-line tool to discover and safely terminate processes bound to network ports. Resolves PIDs via terse lsof -t, extracts process metadata through /proc/PID/exe, and dispatches graceful POSIX SIGTERM signals.',
    metrics: '0 runtime npm dependencies • Published to npm registry • Pure POSIX signals',
    stack: ['Node ESM', 'POSIX Signals', 'Linux /proc FS', 'lsof -t', 'npm CLI'],
    githubUrl: 'https://github.com/rishhbh/purgeport',
    liveUrl: 'https://www.npmjs.com/package/purgeport',
  },
  {
    id: 'jaas',
    slug: 'jaas',
    name: 'JaaS',
    tagline: 'Automated README Analysis & Buzzword Audit Engine',
    summary: 'A technical evaluation engine that audits public GitHub repository documentation. Queries GitHub REST APIs, computes SHA-256 hashes to prevent redundant inference, and formats strict JSON Schema prompts for Groq GPT-OSS-120B in under 2 seconds.',
    metrics: '<2s Groq LPU inference • Upstash sliding-window rate limits • Bun runtime',
    stack: ['Bun v4', 'Groq LPU', 'JSON Schema', 'Upstash Redis', 'GitHub REST API'],
    githubUrl: 'https://github.com/rishhbh/jaas',
    liveUrl: 'https://jaas.localplayer.dev',
  },
  {
    id: 'kaushal-ai',
    slug: 'kaushal-ai',
    name: 'KaushalAI',
    tagline: 'Conversational Skill Assessment Marketplace',
    summary: 'An accessible job verification platform for informal-sector workers. Runs adaptive conversational skill evaluations using Gemini Flash, generates dynamic QR-verifiable PDF credentials client-side, and provides localized Hindi, Marathi, and English interfaces.',
    metrics: '🏆 1st place winner / 50+ teams at Ideas to Impact 2026 • Multilingual i18next',
    stack: ['Express v5', 'Gemini API', 'jsPDF', 'i18next Multilingual', 'MongoDB Atlas'],
  },
  {
    id: 'deepsynth',
    slug: 'deepsynth',
    name: 'DeepSynth',
    tagline: 'Offline-First Local LLM Container Architecture',
    summary: 'Runs 4-bit quantized Gemma 3 4B completely on-device through Ollama, eliminating per-token cloud costs and data egress. Wrapped in an Express backend secured with Auth0 JWT tokens and orchestrated via Docker Compose.',
    metrics: '100% offline inference • 4-bit quantization • Docker Compose orchestration',
    stack: ['Docker Compose', 'Ollama', '4-Bit Gemma 3', 'Express v5', 'Auth0 JWT'],
    githubUrl: 'https://github.com/rishhbh/deepsynth',
  },
];

export function SelectedWorkSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sys = SYSTEMS[activeIdx];

  return (
    <section className="s dk" id="systems" data-name="Systems">
      <div className="w">
        {/* Left Column: Headline */}
        <div className="t">
          <p className="eyebrow">
            <span className="eyebrow-line"></span> 01 / ENGINEERED SYSTEMS
          </p>
          <h2 className="max-w-[12ch]">
            Production code with metrics.
          </h2>
          <p className="lead">
            Real backend architectures built to solve concrete bottlenecks: cache invalidation, dependency bloat, and unverified AI outputs.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {SYSTEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`c text-xs ${idx === activeIdx ? 'on' : ''}`}
                aria-pressed={idx === activeIdx}
              >
                0{idx + 1} {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active System Card */}
        <div className="v">
          <div className="pn p-6 sm:p-8 border border-[#333] bg-[#0a0a0a]">
            <div className="flex items-center justify-between gap-4 border-b border-[#262626] pb-4">
              <span className="text-xs font-mono text-[#888]">
                SYSTEM SPECIFICATION // 0{activeIdx + 1} — 0{SYSTEMS.length}
              </span>
              <span className="font-mono text-xs text-[#888]">
                [{sys.slug}]
              </span>
            </div>

            <div className="mt-5">
              <h3 className="font-serif text-3xl text-white">{sys.name}</h3>
              <p className="text-xs text-[#9b9b9b] font-mono mt-1 uppercase tracking-wide">
                {sys.tagline}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-[#c2c2c2] mt-4 min-h-[64px]">
              {sys.summary}
            </p>

            <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between flex-wrap gap-2">
              <span className="font-mono text-xs text-white">
                {sys.metrics}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {sys.stack.map((t) => (
                <span key={t} className="bg-[#161616] px-2 py-0.5 border border-[#333] text-[11px] font-mono text-[#888]">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#262626] flex flex-wrap items-center gap-4 text-xs font-medium">
              <Link
                to={`/projects/${sys.slug}`}
                className="text-white underline hover:text-[#9b9b9b] transition-colors"
              >
                Deep dive specs ↗
              </Link>
              {sys.liveUrl && (
                <a
                  href={sys.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9b9b9b] hover:text-white transition-colors"
                >
                  Live deployment ↗
                </a>
              )}
              {sys.githubUrl && (
                <a
                  href={sys.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9b9b9b] hover:text-white transition-colors"
                >
                  Source repository ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
