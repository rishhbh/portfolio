import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ResumeManPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg text-ink p-4 sm:p-8 md:p-12 font-mono text-sm sm:text-base leading-relaxed selection:bg-brutal-yellow selection:text-black pt-28 pb-32"
    >
      <div className="max-w-4xl mx-auto bg-bg-soft border-3 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-10 rounded-none space-y-8">
        <div className="flex justify-between font-black text-xs sm:text-sm bg-brutal-yellow text-black border-2 border-black p-3 shadow-[2px_2px_0px_#000] rounded-none uppercase">
          <span>RISHABH(1)</span>
          <span>Manual Page / Resume</span>
          <span>RISHABH(1)</span>
        </div>

        <section>
          <h2 className="font-extrabold text-base mb-3 uppercase bg-black text-white px-3 py-1 border-2 border-black inline-block rounded-none">Name</h2>
          <div className="pl-4 font-bold text-sm sm:text-base">
            rishabh-sharma — Software Engineer focusing on Backend, APIs, and AI Systems
          </div>
        </section>

        <section>
          <h2 className="font-extrabold text-base mb-3 uppercase bg-black text-white px-3 py-1 border-2 border-black inline-block rounded-none">Synopsis</h2>
          <div className="pl-4 font-bold text-brutal-red text-sm sm:text-base">
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
              <div className="bg-brutal-yellow text-black text-xs font-bold px-2.5 py-0.5 border border-black rounded-none inline-block my-2">Jul 2026 – Present</div>
              <ul className="list-[square] list-inside space-y-2 text-xs sm:text-sm text-ink-dim font-medium">
                <li>Engineered a document upload pipeline using Multer supporting 3+ formats (DOCX, PDF, PPTX) and multi-file batch uploads (5+ files simultaneously), persisting assets to Cloudflare R2 storage.</li>
                <li>Added JWT and Google OAuth with email verification link using Resend and account linking with existing flow.</li>
              </ul>
            </div>

            <div className="bg-bg-softer border-2 border-black p-4 shadow-[3px_3px_0px_#000] rounded-none">
              <div className="font-extrabold text-ink uppercase text-sm sm:text-base">Decoders Entity — Backend Developer Intern</div>
              <div className="bg-brutal-yellow text-black text-xs font-bold px-2.5 py-0.5 border border-black rounded-none inline-block my-2">June 2026 – Present</div>
              <ul className="list-[square] list-inside space-y-2 text-xs sm:text-sm text-ink-dim font-medium">
                <li>Architected and developed the complete backend for HerShield using Node.js, Express.js, MongoDB, and Socket.io.</li>
                <li>Built dual-channel OTP authentication system with phone and email verification, bcrypt hashing, and JWT.</li>
                <li>Engineered a sub-2s SOS emergency pipeline triggering Socket.io alerts, Firebase push notifications, and SMS.</li>
                <li>Implemented real-time live location tracking using Socket.io rooms.</li>
              </ul>
            </div>

            <div className="bg-bg-softer border-2 border-black p-4 shadow-[3px_3px_0px_#000] rounded-none">
              <div className="font-extrabold text-ink uppercase text-sm sm:text-base">Walk Reward — Software Developer Intern</div>
              <div className="bg-brutal-yellow text-black text-xs font-bold px-2.5 py-0.5 border border-black rounded-none inline-block my-2">Mar 2026 – Apr 2026</div>
              <ul className="list-[square] list-inside space-y-2 text-xs sm:text-sm text-ink-dim font-medium">
                <li>Architected a split-domain production setup hosting a React SPA and WordPress blog on the same domain.</li>
                <li>Built a GitHub Actions CI/CD pipeline automating Vite + React builds and FTP deployment.</li>
                <li>Optimized Web Vitals, SEO, and mobile responsiveness using Lighthouse and Chrome DevTools.</li>
              </ul>
            </div>

            <div className="bg-bg-softer border-2 border-black p-4 shadow-[3px_3px_0px_#000] rounded-none">
              <div className="font-extrabold text-ink uppercase text-sm sm:text-base">RevLabz Solutions — MERN Developer Intern</div>
              <div className="bg-brutal-yellow text-black text-xs font-bold px-2.5 py-0.5 border border-black rounded-none inline-block my-2">Nov 2025 – Feb 2026</div>
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
              <dd className="sm:col-span-3 text-ink-dim">React.js, Tailwind CSS, Zustand, i18next</dd>
              
              <dt className="font-black text-ink uppercase">BACKEND & APIs</dt>
              <dd className="sm:col-span-3 text-ink-dim">Node.js, Express.js, REST APIs, OAuth 2.0, JWT, Auth0</dd>
              
              <dt className="font-black text-ink uppercase">TESTING</dt>
              <dd className="sm:col-span-3 text-ink-dim">Jest, Supertest, mongodb-memory-server</dd>
              
              <dt className="font-black text-ink uppercase">DEVOPS & INFRA</dt>
              <dd className="sm:col-span-3 text-ink-dim">AWS EC2, Docker, GitHub Actions, Cloudflare Pages/Workers/R2, Linux</dd>
              
              <dt className="font-black text-ink uppercase">DATABASES & AI</dt>
              <dd className="sm:col-span-3 text-ink-dim">MongoDB, Redis, Ollama, Gemma, Gemini API</dd>
            </dl>
          </div>
        </section>

        <section>
          <h2 className="font-extrabold text-base mb-3 uppercase bg-black text-white px-3 py-1 border-2 border-black inline-block rounded-none">Links</h2>
          <div className="space-y-2 font-bold text-xs sm:text-sm">
            <div>
              <span className="text-brutal-red uppercase">GitHub: </span>
              <a href="https://github.com/rishhbh" target="_blank" rel="noreferrer" className="text-ink hover:underline">https://github.com/rishhbh</a>
            </div>
            <div>
              <span className="text-brutal-red uppercase">LinkedIn: </span>
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
  );
}
