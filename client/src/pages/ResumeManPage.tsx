import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function ResumeManPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Resume & Technical Specs (MAN Page) — Rishabh Sharma</title>
        <meta name="title" content="Resume & Technical Specs (MAN Page) — Rishabh Sharma" />
        <meta name="description" content="Full technical resume, backend engineering specs, microservices experience, and LLM pipeline architecture of Rishabh Sharma (B.Tech CSE AI & ML)." />
        <link rel="canonical" href="https://rishabhh.is-a.dev/resume" />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://rishabhh.is-a.dev/resume" />
        <meta property="og:title" content="Resume & Engineering Specs — Rishabh Sharma" />
        <meta property="og:description" content="Backend Software Engineer specializing in Node.js, Express v5, MongoDB, Upstash Redis, Docker, AWS EC2, and hybrid LLM ingestion pipelines." />
        <meta property="og:image" content="https://rishabhh.is-a.dev/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://rishabhh.is-a.dev/resume" />
        <meta name="twitter:title" content="Resume & Engineering Specs — Rishabh Sharma" />
        <meta name="twitter:description" content="Backend Software Engineer specializing in Node.js, Express v5, MongoDB, Upstash Redis, Docker, AWS EC2, and hybrid LLM ingestion pipelines." />
        <meta name="twitter:image" content="https://rishabhh.is-a.dev/og-image.png" />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-bg text-ink p-4 sm:p-8 md:p-12 font-mono text-sm sm:text-base leading-relaxed selection:bg-btn-primary selection:text-btn-primary-text pt-28 pb-32"
      >
      <div className="max-w-4xl mx-auto bg-bg-soft border-3 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-10 rounded-none space-y-8">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-btn-primary text-btn-primary-text border-2 border-black p-4 shadow-[2px_2px_0px_#000] rounded-none">
          <div className="font-black text-xs sm:text-sm uppercase flex items-center justify-between sm:justify-start gap-4">
            <span>RISHABH(1)</span>
            <span>Manual Page / Resume</span>
            <span>RISHABH(1)</span>
          </div>

          <a
            href="https://drive.google.com/file/d/1_TSEuYMucfqFTDUs2-YR2tvL9uXo5ZBh/view"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white hover:bg-btn-accent hover:text-btn-accent-text border-2 border-black px-3.5 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 rounded-none cursor-pointer"
          >
            <span>DOWNLOAD PDF (DRIVE)</span>
            <span className="text-sm">↗</span>
          </a>
        </div>

        <section>
          <h2 className="font-extrabold text-base mb-3 uppercase bg-black text-white px-3 py-1 border-2 border-black inline-block rounded-none">Name</h2>
          <div className="pl-4 font-bold text-sm sm:text-base">
            rishabh-sharma — Software Engineer focusing on Backend, APIs, and AI Systems
          </div>
        </section>

        <section>
          <h2 className="font-extrabold text-base mb-3 uppercase bg-black text-white px-3 py-1 border-2 border-black inline-block rounded-none">Synopsis</h2>
          <div className="pl-4 font-bold text-ink text-sm sm:text-base">
            <strong>rishabh</strong> [--backend] [--ai-integrations] [--devops]
          </div>
        </section>

        <section>
          <h2 className="font-extrabold text-base mb-3 uppercase bg-black text-white px-3 py-1 border-2 border-black inline-block rounded-none">Description</h2>
          <div className="pl-4 space-y-3 font-medium text-ink-dim text-sm sm:text-base">
            <p>
              <strong className="text-ink font-bold">rishabh</strong> is a software engineer focusing on backend architecture and intelligent interfaces. He specializes in combining large language model capabilities with secure, rate-limited application layers that perform at scale.
            </p>
            <p>
              He is currently a final-year B.Tech CSE (AI & ML) student at the School of Management Sciences, Lucknow.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-extrabold text-base mb-4 uppercase bg-black text-white px-3 py-1 border-2 border-black inline-block rounded-none">Experience</h2>
          
          <div className="space-y-6">
            <div className="bg-bg-softer border-2 border-black p-4 shadow-[3px_3px_0px_#000] rounded-none">
              <div className="font-extrabold text-ink uppercase text-sm sm:text-base">foundertruth — SDE Intern & Tech Lead</div>
              <div className="bg-btn-primary text-btn-primary-text text-xs font-bold px-2.5 py-0.5 border border-black rounded-none inline-block my-2">Jul 2026 – Present</div>
              <ul className="list-[square] list-inside space-y-2 text-xs sm:text-sm text-ink-dim font-medium">
                <li>Built an asynchronous document ingestion pipeline using Cloudflare R2, text extraction, page/chunk metadata parsing, and VisionJob lifecycle processing to preserve source provenance.</li>
                <li>Implemented a 4096-dimensional semantic embedding pipeline using Qwen3-Embedding-8B, generating and persisting vector representations for document chunks to enable vector similarity search.</li>
                <li>Designed a multi-stage RAG engine combining startup-specific document retrieval with a curated founder failure knowledge base, explicitly separating factual startup evidence from historical failure patterns.</li>
                <li>Architected a decoupled AI service abstraction around Groq (chatCompletion.js), executing GPT-OSS 120B with JSON Schema constraints to produce machine-readable startup analyses, task generation, and evaluations.</li>
                <li>Developed an evidence-grounded evaluation engine scoring market fit, business model, traction, product, and team with explicit confidence tracking, risk flags, page citations, and missing-evidence representation.</li>
                <li>Built an incubator-integrated development workflow where GPT-OSS synthesizes weekly tasks from progress history, incubators review/assign tasks, and AI evaluates submissions into an immutable ProgressHistory trajectory.</li>
                <li>Implemented JWT authentication with HttpOnly cookie handling, admin-protected knowledge base CRUD endpoints, and role-scoped authorization for incubator vs. founder operations.</li>
                <li>Engineered a standalone newsletter microservice with a dedicated subscription API, Zod validation, Google Sheets API integration for subscriber management, and Resend-powered transactional email delivery.</li>
              </ul>
            </div>

            <div className="bg-bg-softer border-2 border-black p-4 shadow-[3px_3px_0px_#000] rounded-none">
              <div className="font-extrabold text-ink uppercase text-sm sm:text-base">Decoders Entity — Backend Developer Intern</div>
              <div className="bg-btn-secondary text-btn-secondary-text text-xs font-bold px-2.5 py-0.5 border border-black rounded-none inline-block my-2">June 2026 – Present</div>
              <ul className="list-[square] list-inside space-y-2 text-xs sm:text-sm text-ink-dim font-medium">
                <li>Architected and developed the complete backend for HerShield using Node.js, Express.js, MongoDB, and Socket.io.</li>
                <li>Built dual-channel OTP authentication system with phone and email verification, bcrypt hashing, and JWT.</li>
                <li>Engineered a sub-2s SOS emergency pipeline triggering Socket.io alerts, Firebase push notifications, and SMS.</li>
                <li>Implemented real-time live location tracking using Socket.io rooms.</li>
              </ul>
            </div>

            <div className="bg-bg-softer border-2 border-black p-4 shadow-[3px_3px_0px_#000] rounded-none">
              <div className="font-extrabold text-ink uppercase text-sm sm:text-base">Walk Reward — Software Developer Intern</div>
              <div className="bg-btn-accent text-btn-accent-text text-xs font-bold px-2.5 py-0.5 border border-black rounded-none inline-block my-2">Mar 2026 – Apr 2026</div>
              <ul className="list-[square] list-inside space-y-2 text-xs sm:text-sm text-ink-dim font-medium">
                <li>Architected a split-domain production setup hosting a React SPA and WordPress blog on the same domain.</li>
                <li>Built a GitHub Actions CI/CD pipeline automating Vite + React builds and FTP deployment.</li>
                <li>Optimized Web Vitals, SEO, and mobile responsiveness using Lighthouse and Chrome DevTools.</li>
              </ul>
            </div>

            <div className="bg-bg-softer border-2 border-black p-4 shadow-[3px_3px_0px_#000] rounded-none">
              <div className="font-extrabold text-ink uppercase text-sm sm:text-base">RevLabz Solutions — MERN Developer Intern</div>
              <div className="bg-btn-badge-1 text-btn-badge-1-text text-xs font-bold px-2.5 py-0.5 border border-black rounded-none inline-block my-2">Nov 2025 – Feb 2026</div>
              <ul className="list-[square] list-inside space-y-2 text-xs sm:text-sm text-ink-dim font-medium">
                <li>Engineered the backend for an SDR outreach platform across a Chrome extension and web app using MERN + TypeScript.</li>
                <li>Engineered 12+ RESTful APIs covering multi-provider OAuth, contact list management, and campaign orchestration.</li>
                <li>Implemented OAuth 2.0 with session management and org-level RBAC.</li>
                <li>Built real-time list sync between extension and web app with bulk contact selection.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-extrabold text-base mb-4 uppercase bg-black text-white px-3 py-1 border-2 border-black inline-block rounded-none">Skills & Environment</h2>
          <div className="bg-bg-softer border-2 border-black p-4 shadow-[3px_3px_0px_#000] rounded-none">
            <dl className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-medium">
              <dt className="font-black text-ink uppercase">LANGUAGES</dt>
              <dd className="sm:col-span-3 text-ink-dim">TypeScript, JavaScript, Python, C</dd>
              
              <dt className="font-black text-ink uppercase">FRONTEND</dt>
              <dd className="sm:col-span-3 text-ink-dim">React.js, Tailwind CSS, Zustand, i18next, jsPDF, html2canvas</dd>
              
              <dt className="font-black text-ink uppercase">BACKEND & APIs</dt>
              <dd className="sm:col-span-3 text-ink-dim">Node.js, Express.js, REST APIs, Microservices, OAuth 2.0, JWT, Auth0, Rate Limiting, RBAC, Zod</dd>
              
              <dt className="font-black text-ink uppercase">TESTING</dt>
              <dd className="sm:col-span-3 text-ink-dim">Jest, Supertest, mongodb-memory-server</dd>
              
              <dt className="font-black text-ink uppercase">DEVOPS & INFRA</dt>
              <dd className="sm:col-span-3 text-ink-dim">AWS EC2, Docker, Docker Compose, GitHub Actions, Cloudflare Pages/Workers/R2, Linux</dd>
              
              <dt className="font-black text-ink uppercase">DATABASES & AI</dt>
              <dd className="sm:col-span-3 text-ink-dim">MongoDB (Vector Search), Redis, Groq SDK, GPT-OSS 120B, Qwen3-Embedding-8B, RAG & Vector Retrieval, Gemini API, Ollama, Gemma 4</dd>
            </dl>
          </div>
        </section>

        <section>
          <h2 className="font-extrabold text-base mb-3 uppercase bg-black text-white px-3 py-1 border-2 border-black inline-block rounded-none">Links</h2>
          <div className="space-y-2 font-bold text-xs sm:text-sm">
            <div>
              <span className="text-ink uppercase">GitHub: </span>
              <a href="https://github.com/rishhbh" target="_blank" rel="noreferrer" className="text-ink hover:underline">https://github.com/rishhbh</a>
            </div>
            <div>
              <span className="text-ink uppercase">LinkedIn: </span>
              <a href="https://linkedin.com/in/rishabhh-sharma" target="_blank" rel="noreferrer" className="text-ink hover:underline">https://linkedin.com/in/rishabhh-sharma</a>
            </div>
          </div>
        </section>

        <div className="pt-4 border-t-3 border-black flex justify-between font-bold text-xs text-ink-dim uppercase">
          <span>Linux</span>
          <span>July 2026</span>
          <span>RISHABH(1)</span>
        </div>
      </div>
    </motion.div>
    </>
  );
}
