import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResumeManPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dk min-h-screen pt-28 pb-24 px-6 sm:px-12 font-mono text-sm leading-relaxed text-[#ccc]">
      <Helmet>
        <title>Technical Resume & Manual Specifications — Rishabh Sharma</title>
        <meta name="title" content="Technical Resume & Manual Specifications — Rishabh Sharma" />
        <meta name="description" content="Technical resume and backend engineering specifications of Rishabh Sharma (B.Tech CSE AI & ML)." />
        <link rel="canonical" href="https://rishabhh.is-a.dev/resume" />
      </Helmet>

      <div className="max-w-[1000px] mx-auto space-y-10 blueprint-standalone">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#262626] pb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase text-[#9b9b9b] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
          </Link>

          <span className="text-xs text-[#777] uppercase tracking-wider">
            MANUAL SPECIFICATION
          </span>
        </div>

        {/* Top Header Card */}
        <div className="border border-[#333] p-6 bg-[#080808] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-white font-bold text-sm tracking-wider">
              RISHABH(1) — SYSTEM ARCHITECTURE MANUAL
            </div>
            <div className="text-xs text-[#888] mt-1 font-sans">
              B.Tech CSE (AI & ML) • SMS Lucknow • Backend Systems Engineer
            </div>
          </div>

          <a
            href="https://drive.google.com/file/d/1_TSEuYMucfqFTDUs2-YR2tvL9uXo5ZBh/view"
            target="_blank"
            rel="noopener noreferrer"
            className="b text-xs"
          >
            Download PDF (Drive) ↗
          </a>
        </div>

        {/* Section 1: Name */}
        <section className="space-y-2 border-t border-[#222] pt-6">
          <div className="text-white font-bold text-xs uppercase tracking-widest text-[#9b9b9b]">
            NAME
          </div>
          <div className="pl-4 text-white">
            rishabh-sharma — Software Engineer focusing on Backend, Distributed Pipelines, and AI Inference
          </div>
        </section>

        {/* Section 2: Synopsis */}
        <section className="space-y-2 border-t border-[#222] pt-6">
          <div className="text-white font-bold text-xs uppercase tracking-widest text-[#9b9b9b]">
            SYNOPSIS
          </div>
          <div className="pl-4 text-[#ddd]">
            <code>rishabh [--backend] [--caching] [--rag-pipelines] [--devops]</code>
          </div>
        </section>

        {/* Section 3: Description */}
        <section className="space-y-2 border-t border-[#222] pt-6">
          <div className="text-white font-bold text-xs uppercase tracking-widest text-[#9b9b9b]">
            DESCRIPTION
          </div>
          <div className="pl-4 space-y-2 text-[#aaa]">
            <p>
              Backend-focused software engineer designing deterministic systems that withstand real production throughput. Experienced in Node.js, Express v5, MongoDB Atlas, Upstash Redis, Docker Compose, and hybrid cloud/local LLM orchestration pipelines.
            </p>
            <p>
              Emphasizes clean error boundaries, unit testing with in-memory database isolation (Jest + mongodb-memory-server), and zero-dependency POSIX tooling.
            </p>
          </div>
        </section>

        {/* Section 4: Work Experience */}
        <section className="space-y-4 border-t border-[#222] pt-6">
          <div className="text-white font-bold text-xs uppercase tracking-widest text-[#9b9b9b]">
            EXPERIENCE & WORK HISTORY
          </div>

          <div className="pl-4 space-y-6">
            <div className="border border-[#262626] p-4 bg-[#050505] space-y-2">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <span className="text-white font-bold">foundertruth — SDE Intern & Tech Lead</span>
                <span className="text-xs text-[#777]">Jul 2026 – Present</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#aaa] pt-2">
                <li>Built asynchronous document ingestion pipeline using Cloudflare R2, text chunk parsing, and VisionJob lifecycle processing.</li>
                <li>Implemented 4096-dimensional semantic vector embedding pipeline with Qwen3-Embedding-8B for chunk similarity search.</li>
                <li>Designed multi-stage RAG engine combining startup document retrieval with a curated knowledge base, separating facts from hallucination.</li>
                <li>Architected decoupled AI service abstraction around Groq GPT-OSS 120B with JSON Schema constraints.</li>
                <li>Implemented JWT authentication via HttpOnly cookies, RBAC authorization, and Upstash rate limiting.</li>
              </ul>
            </div>

            <div className="border border-[#262626] p-4 bg-[#050505] space-y-2">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <span className="text-white font-bold">Decoders Entity — Backend Developer Intern</span>
                <span className="text-xs text-[#777]">Jun 2026 – Present</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#aaa] pt-2">
                <li>Architected backend for HerShield AI safety platform using Node.js, Express, MongoDB, and Socket.io.</li>
                <li>Engineered sub-2s SOS emergency pipeline with dual-channel OTP (D7 SMS + Nodemailer SMTP) fan-out.</li>
                <li>Implemented live location tracking with Socket.io rooms (&lt;500ms latency) and MongoDB 2dsphere indexing.</li>
              </ul>
            </div>

            <div className="border border-[#262626] p-4 bg-[#050505] space-y-2">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <span className="text-white font-bold">RevLabz Solutions — MERN Developer Intern</span>
                <span className="text-xs text-[#777]">Nov 2025 – Feb 2026</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#aaa] pt-2">
                <li>Engineered backend for SDR outreach platform across Chrome extension and web app using MERN + TypeScript.</li>
                <li>Built 12+ RESTful APIs with multi-provider OAuth 2.0 (Google & Microsoft) and real-time contact list synchronization.</li>
              </ul>
            </div>

            <div className="border border-[#262626] p-4 bg-[#050505] space-y-2">
              <div className="flex justify-between items-baseline flex-wrap gap-2">
                <span className="text-white font-bold">Walk Reward — Software Developer Intern</span>
                <span className="text-xs text-[#777]">Mar 2026 – Apr 2026</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#aaa] pt-2">
                <li>Architected split-domain production hosting a React SPA and WordPress blog on the same domain via .htaccess.</li>
                <li>Built GitHub Actions CI/CD pipeline automating Vite builds and FTP production deployment.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Tooling & Environment */}
        <section className="space-y-4 border-t border-[#222] pt-6">
          <div className="text-white font-bold text-xs uppercase tracking-widest text-[#9b9b9b]">
            ENVIRONMENT & TECHNICAL LEDGER
          </div>

          <div className="pl-4 border border-[#262626] p-4 bg-[#050505] space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <span className="text-white font-semibold">Languages:</span>
              <span className="sm:col-span-3 text-[#aaa]">TypeScript, JavaScript, Python, C</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <span className="text-white font-semibold">Backend & APIs:</span>
              <span className="sm:col-span-3 text-[#aaa]">Node.js (v18+), Express v5, Bun, REST, SSE, JWT, Zod, RBAC, OAuth 2.0</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <span className="text-white font-semibold">Persistence & Caching:</span>
              <span className="sm:col-span-3 text-[#aaa]">MongoDB Atlas (2dsphere), Upstash Redis (Sliding Rate Limit, SHA-256 TTL Caches)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <span className="text-white font-semibold">Inference & Vector:</span>
              <span className="sm:col-span-3 text-[#aaa]">Groq LPU, Qwen3-Embedding-8B, Ollama Local (4-bit Quantization), Gemini Flash</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <span className="text-white font-semibold">DevOps & Operating Systems:</span>
              <span className="sm:col-span-3 text-[#aaa]">Docker, Docker Compose, AWS EC2, Cloudflare R2, GitHub Actions, Linux POSIX Signals</span>
            </div>
          </div>
        </section>

        {/* Section 6: Verified Links */}
        <section className="space-y-2 border-t border-[#222] pt-6">
          <div className="text-white font-bold text-xs uppercase tracking-widest text-[#9b9b9b]">
            VERIFIED LINKS
          </div>
          <div className="pl-4 space-y-1 text-xs">
            <div>
              <span className="text-white">GitHub: </span>
              <a href="https://github.com/rishhbh" target="_blank" rel="noreferrer" className="underline hover:text-white">
                https://github.com/rishhbh
              </a>
            </div>
            <div>
              <span className="text-white">LinkedIn: </span>
              <a href="https://linkedin.com/in/rishabhh-sharma" target="_blank" rel="noreferrer" className="underline hover:text-white">
                https://linkedin.com/in/rishabhh-sharma
              </a>
            </div>
          </div>
        </section>

        {/* Bottom Status Line */}
        <div className="pt-6 border-t border-[#333] flex justify-between text-xs text-[#777] uppercase">
          <span>Linux Terminal Standards</span>
          <span>RISHABH(1)</span>
        </div>
      </div>
    </div>
  );
}
