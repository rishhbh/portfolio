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
      className="min-h-screen bg-bg text-ink p-4 sm:p-8 md:p-12 font-mono text-sm sm:text-base leading-relaxed selection:bg-ink selection:text-bg pb-32"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between font-bold mb-8 text-ink-dim">
          <span>RISHABH(1)</span>
          <span>User Commands</span>
          <span>RISHABH(1)</span>
        </div>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Name</h2>
          <div className="pl-8 sm:pl-12">
            rishabh-sharma - Software Engineer focusing on Backend, APIs, and AI Systems
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Synopsis</h2>
          <div className="pl-8 sm:pl-12">
            <strong>rishabh</strong> [--backend] [--ai-integrations] [--devops]
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Description</h2>
          <div className="pl-8 sm:pl-12 space-y-4">
            <p>
              <strong>rishabh</strong> is a software engineer focusing on backend architecture and intelligent interfaces. He specializes in combining large language model capabilities with secure, rate-limited application layers that perform at scale.
            </p>
            <p>
              He is currently a final-year B.Tech CSE (AI & ML) student at the School of Management Sciences, Lucknow.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Experience</h2>
          
          <div className="pl-8 sm:pl-12 mb-6">
            <div className="font-bold">Decoders Entity - Backend Developer Intern</div>
            <div className="text-ink-dim text-sm italic mb-2">June 2026 - Present</div>
            <ul className="list-[square] list-inside space-y-2 ml-4">
              <li>Architected and developed the complete backend for HerShield using Node.js, Express.js, MongoDB, and Socket.io.</li>
              <li>Built dual-channel OTP authentication system with phone and email verification, bcrypt hashing, and JWT.</li>
              <li>Engineered a sub-2s SOS emergency pipeline triggering Socket.io alerts, Firebase push notifications, and SMS.</li>
              <li>Implemented real-time live location tracking using Socket.io rooms.</li>
            </ul>
          </div>

          <div className="pl-8 sm:pl-12 mb-6">
            <div className="font-bold">Walk Reward - Software Developer Intern</div>
            <div className="text-ink-dim text-sm italic mb-2">Mar 2026 - Apr 2026</div>
            <ul className="list-[square] list-inside space-y-2 ml-4">
              <li>Architected a split-domain production setup hosting a React SPA and WordPress blog on the same domain.</li>
              <li>Built a GitHub Actions CI/CD pipeline automating Vite + React builds and FTP deployment.</li>
              <li>Optimized Web Vitals, SEO, and mobile responsiveness using Lighthouse and Chrome DevTools.</li>
            </ul>
          </div>

          <div className="pl-8 sm:pl-12 mb-6">
            <div className="font-bold">RevLabz Solutions - MERN Developer Intern</div>
            <div className="text-ink-dim text-sm italic mb-2">Nov 2025 - Feb 2026</div>
            <ul className="list-[square] list-inside space-y-2 ml-4">
              <li>Engineered the backend for an SDR outreach platform across a Chrome extension and web app using MERN + TypeScript.</li>
              <li>Engineered 12+ RESTful APIs covering multi-provider OAuth, contact list management, and campaign orchestration.</li>
              <li>Implemented OAuth 2.0 with session management and org-level RBAC.</li>
              <li>Built real-time list sync between extension and web app with bulk contact selection.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Skills & Environment</h2>
          <div className="pl-8 sm:pl-12">
            <dl className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <dt className="font-bold">LANGUAGES</dt>
              <dd className="sm:col-span-3">TypeScript, JavaScript, Python, C</dd>
              
              <dt className="font-bold">FRONTEND</dt>
              <dd className="sm:col-span-3">React.js, Tailwind CSS, Zustand, i18next</dd>
              
              <dt className="font-bold">BACKEND & APIs</dt>
              <dd className="sm:col-span-3">Node.js, Express.js, REST APIs, OAuth 2.0, JWT, Auth0</dd>
              
              <dt className="font-bold">DEVOPS & INFRA</dt>
              <dd className="sm:col-span-3">AWS EC2, Docker, GitHub Actions, Cloudflare Pages/Workers, Linux</dd>
              
              <dt className="font-bold">DATABASES & AI</dt>
              <dd className="sm:col-span-3">MongoDB, Redis, Ollama, Gemma, Gemini API</dd>
            </dl>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Files</h2>
          <div className="pl-8 sm:pl-12 space-y-2">
            <div>
              <code>~/.github</code>
              <a href="https://github.com/rishhbh" target="_blank" rel="noreferrer" className="block pl-4 text-ink hover:underline">https://github.com/rishhbh</a>
            </div>
            <div>
              <code>~/.linkedin</code>
              <a href="https://linkedin.com/in/rishabhh-sharma" target="_blank" rel="noreferrer" className="block pl-4 text-ink hover:underline">https://linkedin.com/in/rishabhh-sharma</a>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">See Also</h2>
          <div className="pl-8 sm:pl-12">
            <p>hershield(1), kaushal-ai(1), layerzero(1)</p>
          </div>
        </section>

        <section>
          <h2 className="font-bold mb-4 uppercase">Author</h2>
          <div className="pl-8 sm:pl-12">
            Written by Rishabh Sharma &lt;root@server.com&gt;
          </div>
        </section>

        <div className="mt-16 pt-4 border-t border-glass-border flex justify-between text-ink-dim">
          <span>Linux</span>
          <span>July 2026</span>
          <span>RISHABH(1)</span>
        </div>
      </div>
    </motion.div>
  );
}
