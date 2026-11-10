import React from 'react';
import { motion } from 'framer-motion';
import { SplitText } from '../components/SplitText';

interface ExperienceProps {
  onNavigate: (id: string, path: string) => void;
}

interface RoleItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  details?: string[];
}

const ROLES: RoleItem[] = [
  {
    company: 'Kraftors Web Solutions Pvt Ltd',
    role: 'AI Engineer Intern (Onsite · Lucknow)',
    period: 'Nov 2026 to Present',
    summary: '',
    details: [],
  },
  {
    company: 'foundertruth',
    role: 'SDE Intern & Tech Lead',
    period: 'Jul 2026 to Oct 2026',
    summary: 'Architected asynchronous document ingestion, dual-path vector RAG, and schema-enforced LLM pipelines.',
    details: [
      'Document Ingestion & Metadata: Async pipeline using Cloudflare R2, text chunk parsing, and vision job lifecycle to preserve page-level citations.',
      '4096-D Vector Embedding & RAG: High-dimensional semantic vectors via Qwen3-Embedding-8B separating factual source docs from knowledge bases.',
      'Groq Schema-Enforced Inference: Decoupled AI service layer around Groq GPT-OSS-120B with JSON schema contracts for structured outputs.',
      'Security & Auth: JWT authentication via HttpOnly cookies, RBAC authorization, and sliding-window rate limiting.',
    ],
  },
  {
    company: 'RevLabz Solutions',
    role: 'MERN Developer Intern',
    period: 'Nov 2025 to Feb 2026',
    summary: 'Built the complete backend for a B2B sales outreach platform with Google & Microsoft sign-in and two production clients.',
    details: [
      'Multi-Provider OAuth 2.0: Unified Google and Microsoft account authentication and token rotation.',
      'Bi-Directional Sync: 12+ REST endpoints synchronizing Chrome extension activity with the web dashboard in real time.',
    ],
  },
];

export const Experience: React.FC<ExperienceProps> = ({ onNavigate }) => {
  return (
    <div className="wrap">
      <SplitText tag="h1" text="Experience" className="page-title" delay={150} />

      <div className="items">
        {ROLES.map((item, idx) => (
          <motion.article
            key={idx}
            className="item"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
              delay: idx * 0.1,
            }}
          >
            <div className="meta">
              <p>{item.role}</p>
              <p className="mt-1">{item.period}</p>
            </div>

            <div className="body">
              <h3>{item.company}</h3>
              <p>{item.summary}</p>

              {item.details && item.details.length > 0 && (
                <ul className="mt-3 space-y-1.5 list-none p-0 text-sm text-[var(--muted)]">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <span className="font-mono text-xs text-[var(--ink)] mt-0.5 select-none">—</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.article>
        ))}

        {/* Awards and Honors */}
        <motion.article
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <div className="meta">
            <p>Honors & Recognition</p>
            <p className="mt-1">2026</p>
          </div>

          <div className="body">
            <h3>Awards</h3>
            <div className="space-y-4 mt-3 text-sm text-[var(--muted)]">
              <div>
                <p>
                  <strong className="text-[var(--ink)] font-medium">1st Place</strong> — ROTATECH 2K26 | Impact-A-Thon
                </p>
                <p className="font-mono text-xs text-[var(--muted)] mt-0.5">
                  Rotaract Club Lucknow SMS, in association with Rotary International, District 3120 · Oct 2026
                </p>
                <p className="mt-1 leading-relaxed">
                  Beat 25+ teams across 5+ institutions for developing an AI skilling platform for India’s informal workforce.
                </p>
              </div>

              <div>
                <p>
                  <strong className="text-[var(--ink)] font-medium">1st Place</strong> — Ideas to Impact 2026 Innovation Hackathon
                </p>
                <p className="font-mono text-xs text-[var(--muted)] mt-0.5">
                  Awadh Incubation Foundation, KMCLU Lucknow · 2026
                </p>
                <p className="mt-1 leading-relaxed">
                  Beat 50+ teams across 14+ institutions for developing an AI skilling platform for India’s informal workforce.
                </p>
              </div>

              <div>
                <p>
                  <strong className="text-[var(--ink)] font-medium">1st Place</strong> — CodeSprint DSA Coding Round
                </p>
                <p className="font-mono text-xs text-[var(--muted)] mt-0.5">
                  School of Management Sciences, Lucknow · 2025
                </p>
                <p className="mt-1 leading-relaxed">
                  Secured 1st place in the college-wide algorithmic problem-solving and Data Structures &amp; Algorithms round.
                </p>
              </div>

              <div>
                <p>
                  <strong className="text-[var(--ink)] font-medium">2nd Place</strong> — Design Dynamics
                </p>
                <p className="font-mono text-xs text-[var(--muted)] mt-0.5">
                  Ingenuity 2k24, SMS Lucknow · 2024
                </p>
                <p className="mt-1 leading-relaxed">
                  First Runner-Up in Design Dynamics at Ingenuity 2k24, prototyping and presenting UI/UX architectures for hybrid education &amp; mental health.
                </p>
              </div>
            </div>
          </div>
        </motion.article>
      </div>

      <div className="mt-16 pt-8 border-t border-[var(--rule)] flex justify-between items-center text-sm">
        <button
          type="button"
          onClick={() => onNavigate('resume', '/resume')}
          className="link-ink font-mono text-xs cursor-pointer bg-transparent border-none p-0"
        >
          View System Architecture Manual &amp; Resume →
        </button>

        <button
          type="button"
          onClick={() => onNavigate('contact', '/contact')}
          className="link-ink font-mono text-xs cursor-pointer bg-transparent border-none p-0"
        >
          Dispatch Channel →
        </button>
      </div>
    </div>
  );
};

export default Experience;
