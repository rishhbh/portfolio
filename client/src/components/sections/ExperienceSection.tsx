import { useState } from 'react';

interface WorkRole {
  company: string;
  role: string;
  period: string;
  accomplishments: string[];
}

const ROLES: WorkRole[] = [
  {
    company: 'foundertruth',
    role: 'SDE Intern & Tech Lead',
    period: 'Jul 2026 – Present',
    accomplishments: [
      'Document Ingestion & Metadata Pipeline: Asynchronous pipeline using Cloudflare R2, text chunk parsing, and vision job lifecycle processing to preserve page-level citations.',
      '4096-D Vector Embedding & Dual-Path RAG: Implemented semantic vector representation using Qwen3-Embedding-8B and multi-stage retrieval separating factual documentation from curated knowledge bases.',
      'Groq Schema-Enforced Inference: Decoupled AI service layer around Groq GPT-OSS-120B with JSON schema contracts for structured evaluations.',
      'Security & Auth: JWT authentication via HttpOnly cookies, RBAC authorization, and sliding-window rate limiting.',
    ],
  },
  {
    company: 'Decoders Entity',
    role: 'Backend Developer Intern',
    period: 'Jun 2026 – Present',
    accomplishments: [
      'Sub-2s Emergency SOS Fan-Out: Parallel SMS, SMTP, and Firebase FCM dispatch via Promise.allSettled.',
      'Real-Time Geospatial Tracking: Live room tracking (<500ms latency) with MongoDB 2dsphere spatial indexing.',
      'Secure Media: Encrypted evidence capture with Cloudinary AES-256 and automated safety check-in cron jobs.',
    ],
  },
  {
    company: 'RevLabz Solutions',
    role: 'MERN Developer Intern',
    period: 'Nov 2025 – Feb 2026',
    accomplishments: [
      'SDR Extension Backend: Multi-provider OAuth 2.0 (Google & Microsoft) and session management.',
      'Campaign APIs & Sync: 12+ REST endpoints for bi-directional real-time sync between Chrome extension and dashboard.',
    ],
  },
  {
    company: 'Walk Reward',
    role: 'Software Developer Intern',
    period: 'Mar 2026 – Apr 2026',
    accomplishments: [
      'Split-Domain Routing: Sub-directory .htaccess routing hosting React SPA and WordPress on a single domain.',
      'Automated CI/CD: GitHub Actions workflow automating Vite builds and FTP deployments on push.',
    ],
  },
];

interface ExperienceSectionProps {
  theme?: 'dk' | 'lt';
}

export function ExperienceSection({ theme = 'lt' }: ExperienceSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index: number) => {
    // Mandatory single-open behavior: clicking currently open item does not collapse it
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <section className={`s ${theme}`} id="history" data-name="Track Record">
      <div className="w">
        {/* Right Column on Desktop: Headline & Awards */}
        <div className="t">
          <p className="eyebrow md:justify-end">
            <span className="eyebrow-line"></span> 02 / CAREER TRACK RECORD
          </p>
          <h2 className="max-w-[18ch] md:ml-auto">
            Where code ran in production.
          </h2>
          <p className="lead md:ml-auto">
            Experience across early-stage startups and high-stakes platforms, building systems that didn't fail under pressure.
          </p>

          <div className="mt-8 pt-6 border-t border-[var(--line)] md:ml-auto md:max-w-[42ch]">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--mut)]">
              Awards & Recognition
            </span>
            <div className="mt-2 space-y-1.5 text-xs text-[var(--mut)]">
              <p>
                <strong className="text-[var(--fg)]">🏆 1st Place</strong> — Ideas to Impact 2026 Innovation Hackathon (Beat 50+ teams across 14+ institutions)
              </p>
              <p>
                <strong className="text-[var(--fg)]">Winner</strong> — CodeSprint DSA Coding Round (School of Management Sciences, Lucknow)
              </p>
            </div>
          </div>
        </div>

        {/* Left Column on Desktop: Accordion Component */}
        <div className="v">
          <div className="pn border border-[var(--line)] bg-[var(--bg)] shadow-sm">
            {ROLES.map((role, idx) => {
              const isOpen = activeIndex === idx;

              return (
                <div
                  key={role.company}
                  className="border-b last:border-b-0 border-[var(--line)]"
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`exp-content-${idx}`}
                    id={`exp-header-${idx}`}
                    className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 cursor-pointer bg-transparent border-0 transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--fg)_3%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-current"
                  >
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[var(--fg)] tracking-tight">
                        {role.company}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--mut)] font-mono tracking-wide mt-1">
                        {role.role} • {role.period}
                      </p>
                    </div>

                    <span
                      className={`font-serif text-2xl text-[var(--mut)] transition-transform duration-300 select-none ${
                        isOpen ? 'rotate-45 text-[var(--fg)]' : 'rotate-0'
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={`exp-content-${idx}`}
                    role="region"
                    aria-labelledby={`exp-header-${idx}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-1 sm:px-8 sm:pb-8 sm:pt-1">
                        <ul className="space-y-3 text-xs sm:text-sm leading-relaxed text-[var(--mut)] border-t border-[var(--line)] pt-4">
                          {role.accomplishments.map((point, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-[var(--fg)] select-none font-bold pt-0.5">
                                ›
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
