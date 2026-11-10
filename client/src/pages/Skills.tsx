import React from 'react';
import { motion } from 'framer-motion';
import { SplitText } from '../components/SplitText';

interface SkillsProps {
  onNavigate: (id: string, path: string) => void;
}

interface SkillGroup {
  category: string;
  title: string;
  description: string;
  pills: string[];
  specs: string;
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Runtimes & Systems',
    title: 'Node.js (18+) & Bun',
    description: 'Event-loop optimization, asynchronous I/O, native ES Modules, stream.pipeline, worker threads, and POSIX system call integration.',
    pills: ['Node.js 18+', 'Bun', 'TypeScript', 'Python 3.12', 'C++'],
    specs: 'Libuv thread pool • stream.pipeline • Worker threads • Native POSIX signals',
  },
  {
    category: 'APIs & Streaming',
    title: 'Express v5 & Real-Time Protocols',
    description: 'Strict schema boundary validation, RFC 7807 problem payloads, SSE token streaming, and authenticated real-time sockets.',
    pills: ['Express v5', 'REST Architecture', 'Zod', 'SSE (Server-Sent Events)', 'WebSockets'],
    specs: 'Server-Sent Events • Sliding-window rate limiting • Zod schema contracts • HttpOnly cookies',
  },
  {
    category: 'Storage & Caching',
    title: 'Distributed Redis & MongoDB',
    description: 'Sub-millisecond SHA-256 fingerprint caching, TTL policies, sliding-window rate limit counters, and 2dsphere geospatial room indexing.',
    pills: ['Upstash Redis', 'MongoDB Atlas', 'Mongoose', 'PostgreSQL', 'Cloudflare R2'],
    specs: 'SHA-256 cache-first pipelines • 2dsphere indexing • MongoDB replica sets • R2 object storage',
  },
  {
    category: 'AI & Inference',
    title: 'Hybrid AI & Vector Retrieval',
    description: 'Routing between cloud LPUs and offline quantized models. High-dimensional vector embeddings, dual-path RAG, and strict JSON Schema outputs.',
    pills: ['Groq LPU (GPT-120B)', 'Gemini 3.5 Flash', 'Ollama (Gemma 4-bit)', 'Sarvam 30B', 'Qwen3 Vectors'],
    specs: 'Sub-2s Groq inference • Local 4-bit Ollama Gemma • Dual-path RAG • Multilingual Hinglish',
  },
  {
    category: 'DevOps & Tooling',
    title: 'Containerization & POSIX',
    description: 'Zero-runtime-dependency CLI publishing, Linux virtual filesystems (/proc), Docker Compose multi-container networks, and CI/CD automation.',
    pills: ['Linux / POSIX', 'Docker', 'Docker Compose', 'AWS EC2', 'GitHub Actions', 'npm Registry'],
    specs: 'lsof socket detection • POSIX SIGTERM • Multi-stage Docker builds • Automated CI/CD',
  },
];

export const Skills: React.FC<SkillsProps> = ({ onNavigate }) => {
  return (
    <div className="wrap">
      <SplitText tag="h1" text="Skills" className="page-title" delay={120} />

      {/* Technical Systems */}
      <div className="items">
        {SKILL_GROUPS.map((item, idx) => (
          <motion.article
            key={idx}
            className="item"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.0,
              ease: [0.16, 1, 0.3, 1],
              delay: idx * 0.08,
            }}
          >
            <div className="meta">
              <p>{item.category}</p>
              <p className="mt-1 text-[11px] opacity-75">{item.specs}</p>
            </div>

            <div className="body">
              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-xs text-[var(--muted)]">
                {item.pills.map((pill, pIdx) => (
                  <span
                    key={pIdx}
                    className="border border-[var(--rule)] bg-[var(--panel)] px-2 py-0.5"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-[var(--rule)] flex justify-between items-center text-sm">
        <button
          type="button"
          onClick={() => onNavigate('projects', '/projects')}
          className="link-ink font-mono text-xs cursor-pointer bg-transparent border-none p-0"
        >
          ← Inspect Engineered Projects
        </button>

        <button
          type="button"
          onClick={() => onNavigate('resume', '/resume')}
          className="link-ink font-mono text-xs cursor-pointer bg-transparent border-none p-0"
        >
          Read Resume & Manual →
        </button>
      </div>
    </div>
  );
};

export default Skills;
