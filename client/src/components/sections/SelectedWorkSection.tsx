import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [simMode, setSimMode] = useState<'hit' | 'miss'>('hit');
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

          {/* Fluid Spring Glider Selector */}
          <div className="mt-8 flex flex-wrap gap-2">
            {SYSTEMS.map((item, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className="relative px-3.5 py-1.5 text-xs font-mono border border-[#333] transition-colors duration-200 cursor-pointer overflow-hidden bg-[#0c0c0c]"
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSystemHighlight"
                      className="absolute inset-0 bg-white pointer-events-none"
                      transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-150 ${
                      isActive ? 'text-black font-semibold' : 'text-[#888] hover:text-white'
                    }`}
                  >
                    0{idx + 1} {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active System Card */}
        <div className="v">
          <div className="pn relative p-6 sm:p-8 border border-[#333] bg-[#0a0a0a] overflow-hidden">
            {/* Architectural Hairline Beam Sweep on system switch */}
            <motion.div
              key={activeIdx}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            <div className="flex items-center justify-between gap-4 border-b border-[#262626] pb-4">
              <span className="text-xs font-mono text-[#888]">
                SYSTEM SPECIFICATION // 0{activeIdx + 1} — 0{SYSTEMS.length}
              </span>
              <span className="font-mono text-xs text-[#888]">
                [{sys.slug}]
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={sys.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mt-5">
                  <h3 className="font-serif text-3xl text-white">{sys.name}</h3>
                  <p className="text-xs text-[#9b9b9b] font-mono mt-1 uppercase tracking-wide">
                    {sys.tagline}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-[#c2c2c2] mt-4 min-h-[56px]">
                  {sys.summary}
                </p>

                {/* Interactive Cache Simulation Widget (For Layerzero) */}
                {sys.id === 'layerzero' && (
                  <div className="mt-4 p-3.5 border border-[#262626] bg-[#111111]">
                    <div className="flex items-center justify-between gap-2 border-b border-[#222] pb-2">
                      <span className="font-mono text-[10px] text-[#888] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live Cache Pipeline Simulator
                      </span>
                      <div className="flex items-center gap-1 font-mono text-[10px]">
                        <button
                          type="button"
                          onClick={() => setSimMode('hit')}
                          className={`px-2 py-0.5 border cursor-pointer transition-colors ${
                            simMode === 'hit'
                              ? 'bg-white text-black border-white font-semibold'
                              : 'bg-transparent text-[#888] border-[#333] hover:text-white'
                          }`}
                        >
                          ⚡ Cache Hit
                        </button>
                        <button
                          type="button"
                          onClick={() => setSimMode('miss')}
                          className={`px-2 py-0.5 border cursor-pointer transition-colors ${
                            simMode === 'miss'
                              ? 'bg-white text-black border-white font-semibold'
                              : 'bg-transparent text-[#888] border-[#333] hover:text-white'
                          }`}
                        >
                          🐢 Cold Run
                        </button>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono flex-wrap gap-2">
                      <span className="text-[#888]">
                        Pipeline Trace:{' '}
                        <strong className="text-white font-normal">
                          {simMode === 'hit'
                            ? 'SHA-256 Fingerprint → Upstash Redis → SSE Stream'
                            : 'Parse Text → Cloudflare R2 → Gemini Flash → SSE Stream'}
                        </strong>
                      </span>
                      <span
                        className={`font-semibold ${
                          simMode === 'hit' ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {simMode === 'hit' ? '148ms (-98.2%)' : '8,420ms'}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between flex-wrap gap-2">
                  <span className="font-mono text-xs text-white">
                    {sys.metrics}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {sys.stack.map((t) => (
                    <span
                      key={t}
                      className="bg-[#161616] px-2 py-0.5 border border-[#333] text-[11px] font-mono text-[#888]"
                    >
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
