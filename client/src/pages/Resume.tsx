import React from 'react';
import { motion } from 'framer-motion';
import { SplitText } from '../components/SplitText';
import { useNpmDownloads } from '../hooks/useNpmDownloads';

interface ResumeProps {
  onNavigate: (id: string, path: string) => void;
}

export const Resume: React.FC<ResumeProps> = ({ onNavigate }) => {
  const purgeportDownloads = useNpmDownloads('purgeport');
  return (
    <div className="wrap">
      <SplitText tag="h1" text="Resume" className="page-title" delay={150} />

      {/* Manual Spec Header Box */}
      <motion.div
        className="border border-[var(--rule)] p-6 bg-[var(--panel)] mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] block">
            RISHABH(1) — SYSTEM ARCHITECTURE MANUAL & SPECIFICATION
          </span>
          <p className="font-serif text-xl text-[var(--ink)] mt-1">
            Rishabh Sharma
          </p>
          <p className="text-xs text-[var(--muted)] mt-0.5 font-mono">
            Backend & Systems Engineer • Final-year B.Tech CSE (AI &amp; ML) • Lucknow, India
          </p>
        </div>

        <a
          href="https://drive.google.com/file/d/1_TSEuYMucfqFTDUs2-YR2tvL9uXo5ZBh/view"
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-btn text-xs font-mono whitespace-nowrap"
        >
          Download PDF (Google Drive) ↗
        </a>
      </motion.div>

      <div className="items">
        {/* Synopsis */}
        <motion.article
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label">Synopsis</p>
          <div className="body">
            <p className="text-[var(--ink)] font-serif text-lg leading-relaxed">
              Backend engineer building distributed pipelines, cache invalidation, and LLM integrations that survive production traffic. Specialized in Node.js, TypeScript, Upstash Redis, Docker, and POSIX system call integrations.
            </p>
          </div>
        </motion.article>

        {/* Education */}
        <motion.article
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          <p className="meta">2022 to 2026<br />Lucknow, India</p>
          <div className="body">
            <h3>School of Management Sciences (SMS)</h3>
            <p className="font-medium text-[var(--ink)]">
              Bachelor of Technology (B.Tech) in Computer Science &amp; Engineering (AI &amp; ML)
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">
              Final-year undergraduate. Focused on distributed systems, operating systems, networking, database indexing, and machine learning pipelines.
            </p>
          </div>
        </motion.article>

        {/* Technical Competencies */}
        <motion.article
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p className="label">Capabilities</p>
          <div className="body space-y-4">
            <div>
              <span className="font-mono text-xs text-[var(--muted)] block uppercase">
                Languages &amp; Runtimes
              </span>
              <p className="text-sm text-[var(--ink)] mt-0.5">
                Node.js (v18+), Bun, TypeScript, JavaScript (ESM), Python 3.12, C++, POSIX Shell
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-[var(--muted)] block uppercase">
                Backend Frameworks &amp; Protocols
              </span>
              <p className="text-sm text-[var(--ink)] mt-0.5">
                Express.js v5, Fastify, REST APIs, Server-Sent Events (SSE), WebSockets, Zod, JSON Schema, JWT, RBAC
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-[var(--muted)] block uppercase">
                Databases &amp; Distributed Caching
              </span>
              <p className="text-sm text-[var(--ink)] mt-0.5">
                Upstash Redis, MongoDB Atlas (Mongoose &amp; 2dsphere indexing), PostgreSQL, Prisma ORM, Cloudflare R2, AWS S3
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-[var(--muted)] block uppercase">
                AI Pipelines &amp; Retrieval
              </span>
              <p className="text-sm text-[var(--ink)] mt-0.5">
                Groq LPU (GPT-OSS-120B), Google Gemini Flash, Ollama (Gemma 4-bit Quantized), Sarvam 30B, Qwen3 Embeddings, Dual-Path Vector RAG
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-[var(--muted)] block uppercase">
                Infrastructure &amp; DevOps
              </span>
              <p className="text-sm text-[var(--ink)] mt-0.5">
                Docker, Docker Compose, AWS EC2, Linux /proc &amp; POSIX Signals, GitHub Actions CI/CD, npm CLI Packaging, Vercel, Cloudflare Pages
              </p>
            </div>
          </div>
        </motion.article>

        {/* Career Experience */}
        <motion.article
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <p className="label">History</p>
          <div className="body space-y-6">
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-[var(--ink)]">Kraftors Web Solutions Pvt Ltd</span>
                <span className="font-mono text-xs text-[var(--muted)]">Nov 2026 – Present</span>
              </div>
              <p className="text-xs text-[var(--muted)] font-mono">AI Engineer Intern (Onsite · Lucknow)</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Engineering production LLM pipelines, autonomous agentic workflows, prompt-routing architectures, and schema-enforced inference layers.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-[var(--ink)]">foundertruth</span>
                <span className="font-mono text-xs text-[var(--muted)]">Jul 2026 – Oct 2026</span>
              </div>
              <p className="text-xs text-[var(--muted)] font-mono">SDE Intern &amp; Tech Lead</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Engineered async R2 ingestion pipeline, 4096-D vector embedding with Qwen3-Embedding-8B, dual-path RAG, Groq schema-enforced inference, and HttpOnly JWT auth.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-medium text-[var(--ink)]">RevLabz Solutions</span>
                <span className="font-mono text-xs text-[var(--muted)]">Nov 2025 – Feb 2026</span>
              </div>
              <p className="text-xs text-[var(--muted)] font-mono">MERN Developer Intern</p>
              <p className="text-sm text-[var(--muted)] mt-1">
                Constructed full backend for B2B outreach platform: 15+ REST endpoints, Google &amp; Microsoft OAuth 2.0, real-time Chrome extension sync, and 2 production clients.
              </p>
            </div>
          </div>
        </motion.article>

        {/* Selected Systems */}
        <motion.article
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <p className="label">Key Systems</p>
          <div className="body space-y-4">
            <div>
              <button
                type="button"
                onClick={() => onNavigate('project-detail', '/projects/layerzero')}
                className="link-ink font-medium text-[var(--ink)] font-serif text-lg cursor-pointer bg-transparent border-none p-0 inline"
              >
                Layerzero →
              </button>
              <p className="text-sm text-[var(--muted)] mt-0.5">
                AI summarization engine routing between 4 models. SHA-256 Redis caching reduced repeat latency by ~98% (8.5s to 150ms).
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onNavigate('project-detail', '/projects/purgeport')}
                className="link-ink font-medium text-[var(--ink)] font-serif text-lg cursor-pointer bg-transparent border-none p-0 inline"
              >
                purgeport →
              </button>
              <p className="text-sm text-[var(--muted)] mt-0.5">
                Zero-runtime-dependency CLI published to npm{purgeportDownloads ? ` (${purgeportDownloads.toLocaleString()} live downloads)` : ''}. Inspects Internet sockets via terse lsof, resolves /proc/PID/exe, and dispatches graceful POSIX SIGTERM signals.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onNavigate('project-detail', '/projects/jaas')}
                className="link-ink font-medium text-[var(--ink)] font-serif text-lg cursor-pointer bg-transparent border-none p-0 inline"
              >
                JaaS →
              </button>
              <p className="text-sm text-[var(--muted)] mt-0.5">
                Groq GPT-OSS-120B repository evaluation and README buzzword audit engine with sub-2s inference and Bun runtime.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onNavigate('project-detail', '/projects/calculator')}
                className="link-ink font-medium text-[var(--ink)] font-serif text-lg cursor-pointer bg-transparent border-none p-0 inline"
              >
                Calculator →
              </button>
              <p className="text-sm text-[var(--muted)] mt-0.5">
                Full-stack calculator with custom Stripe payment gateway trigger when calculations equal 67.
              </p>
            </div>
          </div>
        </motion.article>

        {/* Awards */}
        <motion.article
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <p className="label">Honors</p>
          <div className="body space-y-3 text-sm text-[var(--muted)]">
            <div>
              <p>
                <strong className="text-[var(--ink)]">🏆 1st Place</strong> — ROTATECH 2K26 | Impact-A-Thon (Rotaract Club Lucknow SMS &amp; Rotary International, District 3120 · Oct 2026)
              </p>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                Led team of five competing against 25+ teams from 5+ institutions. Recognized for technical execution and problem-solving.
              </p>
            </div>
            <div>
              <p>
                <strong className="text-[var(--ink)]">🏆 1st Place</strong> — Ideas to Impact 2026 Innovation Hackathon (Beat 50+ teams across 14+ institutions)
              </p>
            </div>
            <div>
              <p>
                <strong className="text-[var(--ink)]">🏆 1st Place</strong> — CodeSprint DSA Coding Round (School of Management Sciences, Lucknow)
              </p>
            </div>
            <div>
              <p>
                <strong className="text-[var(--ink)]">🥈 2nd Place (First Runner-Up)</strong> — Design Dynamics (Ingenuity 2k24, SMS Lucknow): UI/UX for hybrid education &amp; mental health.
              </p>
            </div>
          </div>
        </motion.article>
      </div>

      <div className="mt-16 pt-8 border-t border-[var(--rule)] flex justify-between items-center text-sm">
        <button
          type="button"
          onClick={() => onNavigate('projects', '/projects')}
          className="link-ink font-mono text-xs cursor-pointer bg-transparent border-none p-0"
        >
          ← Explore All 4 Projects
        </button>

        <button
          type="button"
          onClick={() => onNavigate('contact', '/contact')}
          className="link-ink font-mono text-xs cursor-pointer bg-transparent border-none p-0"
        >
          Dispatch Message →
        </button>
      </div>
    </div>
  );
};

export default Resume;
