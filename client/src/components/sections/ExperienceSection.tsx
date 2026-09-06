import { memo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { BlurFade } from '../BlurFade';
import { TextReveal } from '../TextReveal';

const internships = [
  {
    company: 'foundertruth',
    role: 'SDE Intern & Tech Lead',
    duration: 'Jul 2026 – Present',
    points: [
      "Document Ingestion Pipeline: Built an asynchronous document ingestion pipeline using Cloudflare R2, text extraction, page/chunk metadata parsing, and VisionJob lifecycle processing to preserve page-level provenance for downstream retrieval.",
      "4096-D Vector Embedding Engine: Implemented a 4096-dimensional semantic embedding pipeline using Qwen3-Embedding-8B, generating and persisting vector representations for document chunks to enable vector similarity search.",
      "Dual-Path RAG Architecture: Designed a multi-stage RAG engine combining startup-specific document retrieval with a curated founder knowledge base—explicitly separating factual startup evidence from historical failure patterns to prevent model hallucination.",
      "Groq Provider Abstraction & Structured Outputs: Architected a decoupled AI service layer around Groq (chatCompletion.js), executing GPT-OSS 120B with JSON Schema constraints to produce machine-readable startup analyses, task generation, and evaluations.",
      "Evidence-Grounded Startup Evaluator: Developed an automated evaluation engine analyzing market fit, business model, traction, product, and team with explicit confidence scoring, risk flags, page/chunk citations, and missing-evidence tracking.",
      "AI-Driven Weekly Founder Workflow: Built an incubator-integrated development pipeline where GPT-OSS synthesizes weekly tasks from progress history, incubators review/assign tasks, and AI evaluates submissions into an immutable ProgressHistory model.",
      "JWT & RBAC Security Layer: Implemented JWT authentication with HttpOnly cookie handling, admin-protected knowledge base CRUD endpoints, and role-scoped authorization for incubator vs. founder operations.",
      "Newsletter Microservice: Engineered a standalone newsletter microservice with a dedicated subscription API, Zod validation, Google Sheets API integration for subscriber management, and Resend-powered transactional email delivery."
    ],
  },
  {
    company: 'Decoders Entity',
    role: 'Backend Developer Intern',
    duration: 'Jun 2026 – Present',
    points: [
      "Backend Architecture: Architected the complete backend for HerShield, an AI-powered women's safety platform using Node.js, Express.js, MongoDB, and Socket.io with 15+ REST API modules.",
      "Emergency Pipeline: Engineered a sub-2s SOS emergency pipeline with dual-channel OTP auth (D7 Networks SMS + Nodemailer SMTP), simultaneously triggering Socket.io alerts, Firebase FCM push, and D7 SMS via Promise.allSettled.",
      "Real-Time Tracking: Implemented real-time live location tracking with Socket.io rooms at less than 500ms latency and geospatial community alerts using MongoDB 2dsphere indexing and Google Places API.",
      "Features & Deployment: Built encrypted evidence capture with Cloudinary AES-256 storage, guardian network with three-channel alert fan-out, safety check-in cron escalation, admin panel with aggregation-based analytics dashboard, and Docker-based deployment."
    ],
  },
  {
    company: 'Walk Reward',
    role: 'Software Developer Intern',
    duration: 'Mar 2026 – Apr 2026',
    points: [
      'Architecture: Architected a split-domain production setup hosting a React SPA and WordPress blog on the same domain using .htaccess routing and subdirectory configuration.',
      'CI/CD Pipeline: Built a GitHub Actions CI/CD pipeline automating Vite + React builds and FTP deployment to production on every push to main.',
      'Performance Optimization: Optimized Web Vitals, SEO, and mobile responsiveness using Lighthouse and Chrome DevTools.'
    ],
  },
  {
    company: 'RevLabz Solutions',
    role: 'MERN Developer Intern',
    duration: 'Nov 2025 – Feb 2026',
    points: [
      'Backend Engineering: Solely engineered the backend for an SDR outreach platform across a Chrome extension (LinkedIn/Sales Navigator) and web app using MERN + TypeScript.',
      'API Development: Engineered 12+ RESTful APIs covering multi-provider OAuth (Google & Microsoft), contact list management, campaign orchestration (Autopilot/Copilot modes), and analytics dashboard data layers.',
      'Authentication & RBAC: Implemented OAuth 2.0 with session management and org-level RBAC (individual vs. Org-Head).',
      'Real-Time Sync: Built real-time list sync between extension and web app with bulk contact selection.'
    ],
  },
];

const recognitions = [
  {
    title: '1st Place — Ideas to Impact 2026 Innovation Hackathon',
    details: 'Awadh Incubation Foundation, KMCLU Lucknow. Led a team of 4 to build KaushalAI, placing 1st among 50+ teams from 14+ institutions.',
    type: 'Achievement / Hackathon',
  },
  {
    title: 'Winner — CodeSprint',
    details: 'School of Management Sciences, Lucknow. DSA coding round, solved within 15 minutes of a 1-hour window.',
    type: 'Achievement / Coding',
  },
  {
    title: 'First Runner Up — Design Dynamics, Ingenuity 2k24',
    details: 'SMS Lucknow. UI/UX designing for hybrid education and student mental health support.',
    type: 'Achievement / UI/UX Design',
  },
];

export const ExperienceSection = memo(function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 space-y-8">
      <TextReveal delay={0.1} className="w-full">
        <div className="flex items-center justify-between border-b-3 border-black pb-3">
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-ink flex items-center gap-3">
            <span>03 // EXPERIENCE</span>
            <span className="text-outline hidden sm:inline">& RECOGNITION</span>
          </h2>
          <span className="bg-btn-secondary text-btn-secondary-text font-extrabold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none uppercase">
            CAREER TRACK RECORD
          </span>
        </div>
      </TextReveal>

      <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none divide-y-3 divide-black">
        {internships.map((job, index) => (
          <BlurFade key={job.company} delay={0.2 + index * 0.1}>
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-3">
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-ink uppercase">
                    {job.role}
                  </h3>
                  <span className="text-ink font-bold text-sm uppercase">@ {job.company}</span>
                </div>
                <span className="bg-btn-primary text-btn-primary-text border-2 border-black font-mono font-bold text-xs px-3 py-1.5 shadow-[2px_2px_0px_#000] rounded-none w-fit">
                  {job.duration}
                </span>
              </div>

              {job.points && job.points.length > 0 && (
                <ul className="space-y-3 text-ink-dim text-sm font-medium leading-relaxed pt-2">
                  {job.points.map((point, idx) => {
                    const splitIndex = point.indexOf(':');
                    let title = '';
                    let desc = point;
                    if (splitIndex !== -1) {
                      title = point.slice(0, splitIndex);
                      desc = point.slice(splitIndex + 1);
                    }
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-ink shrink-0 mt-0.5" />
                        <span>
                          {title ? (
                            <>
                              <strong className="text-ink font-bold">{title}:</strong>
                              {desc}
                            </>
                          ) : (
                            desc
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Hackathon Wins & Awards */}
      <div className="space-y-4 pt-4">
        <h3 className="text-2xl font-black text-ink uppercase border-b-3 border-black pb-2 flex items-center gap-2">
          <span>Hackathon Victories & Industry Honors</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recognitions.map((award, index) => (
            <BlurFade key={index} delay={0.4 + index * 0.1}>
              <div className="border-3 border-black bg-bg-soft p-5 shadow-[4px_4px_0px_#000] rounded-none space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="bg-btn-primary text-btn-primary-text text-[10px] font-bold px-2 py-0.5 border border-black uppercase inline-block">
                    {award.type}
                  </span>
                  <h4 className="font-extrabold text-base text-ink uppercase leading-snug">
                    {award.title}
                  </h4>
                </div>
                <p className="text-xs text-ink-dim font-medium leading-relaxed border-t border-black/20 pt-2">
                  {award.details}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
});
