import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, ArrowRight, CheckCircle2, Send, Terminal } from 'lucide-react';
import { projects } from '../data/projects';
import { BlurFade } from '../components/BlurFade';
import { TextReveal } from '../components/TextReveal';
import { GithubActivity } from '../components/GithubActivity';
import { useSound } from '../hooks/useSound';

export default function Home() {
  const location = useLocation();
  const { playKeystroke } = useSound();

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Failed to connect to the server.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    playKeystroke();
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Scroll to hash targets if specified in location
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const skillCategories = [
    {
      title: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'C']
    },
    {
      title: 'Frontend',
      items: ['React.js', 'Tailwind CSS', 'Zustand', 'i18next', 'jsPDF', 'html2canvas']
    },
    {
      title: 'Backend & APIs',
      items: ['Node.js', 'Express.js', 'REST APIs', 'OAuth 2.0', 'JWT', 'Auth0', 'Rate Limiting']
    },
    {
      title: 'Testing',
      items: ['Jest', 'Supertest', 'mongodb-memory-server']
    },
    {
      title: 'DevOps & Infra',
      items: ['AWS EC2', 'Docker', 'Docker Compose', 'GitHub Actions', 'Cloudflare Pages/Workers', 'Cloudflare R2', 'Render', 'Linux']
    },
    {
      title: 'Databases & Cache',
      items: ['MongoDB', 'Redis']
    },
    {
      title: 'AI/ML & Tools',
      items: ['Ollama', 'Gemma', 'Gemini API', 'Git/GitHub', 'Chrome DevTools', 'Postman']
    }
  ];

  const internships = [
    {
      company: 'foundertruth',
      role: 'SDE Intern & Tech Lead',
      duration: 'Jul 2026 – Present',
      points: [
        "Document Upload Pipeline: Engineered a document upload pipeline using Multer supporting 3+ formats (DOCX, PDF, PPTX) and concurrent multi-file batching (5+ files per upload), persisting assets to Cloudflare R2.",
        "Authentication & OAuth: Added JWT authentication and Google OAuth login with email verification links using Resend, featuring account linking with existing session flows."
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-24 space-y-24">
      
      {/* ==========================================
          1. HERO SECTION — RAW EDITORIAL BRUTALISM
         ========================================== */}
      <section id="hero" className="space-y-8 pt-4">
        <BlurFade delay={0.1} forceAnimate={true} className="w-full space-y-8">
          
          {/* Giant Display Headline */}
          <div className="border-b-3 border-black pb-8">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-black uppercase tracking-tighter leading-none flex flex-wrap items-baseline gap-x-4">
              <span className="text-ink">RISHABH</span>
              <span className="text-outline">SHARMA</span>
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-black/20 mt-4">
              <span className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-ink flex items-center gap-3">
                SOFTWARE ENGINEER <span className="inline-flex items-center justify-center w-10 h-10 rounded-none border-2 border-black bg-brutal-yellow text-black text-lg shadow-[2px_2px_0px_#000]">→</span>
              </span>
              <div className="flex items-center gap-3 font-mono text-xs font-bold uppercase">
                <span className="bg-black text-white px-3 py-1 border-2 border-black rounded-none">LUCKNOW, INDIA</span>
                <span className="bg-emerald-400 text-black px-3 py-1 border-2 border-black flex items-center gap-1.5 rounded-none shadow-[2px_2px_0px_#000]">
                  <span className="w-2 h-2 bg-emerald-950 animate-pulse" /> OPEN FOR ROLES
                </span>
              </div>
            </div>
          </div>

          {/* Hero Grid Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none">
            
            {/* Left Column: Directives */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-6 border-b-3 md:border-b-0 md:border-r-3 border-black">
              <div className="text-xs font-black uppercase tracking-widest text-brutal-red border-b-2 border-black pb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-brutal-red border border-black" /> Architecture & Engineering Directives
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-black/20 pb-3">
                  <span className="text-[11px] font-bold text-ink-faint block uppercase">Primary Focus</span>
                  <span className="text-sm sm:text-base font-extrabold text-ink uppercase">Backend Systems & LLM Integration Pipelines</span>
                </div>

                <div className="border-b border-black/20 pb-3">
                  <span className="text-[11px] font-bold text-ink-faint block uppercase">Academic Degree</span>
                  <span className="text-sm sm:text-base font-extrabold text-ink uppercase">B.Tech CSE (AI & ML) — SMS Lucknow</span>
                </div>

                <div className="border-b border-black/20 pb-3">
                  <span className="text-[11px] font-bold text-ink-faint block uppercase">Core Infrastructure</span>
                  <span className="text-sm sm:text-base font-extrabold text-ink uppercase">Node.js · Express v5 · MongoDB · Upstash Redis</span>
                </div>

                <div className="border-b border-black/20 pb-3">
                  <span className="text-[11px] font-bold text-ink-faint block uppercase">Deployment & Testing</span>
                  <span className="text-sm sm:text-base font-extrabold text-ink uppercase">Docker · AWS EC2 · Cloudflare R2 · Jest Unit Tests</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="brutal-btn py-3 px-6 text-xs uppercase flex items-center gap-2 rounded-none"
                >
                  EXPLORE WORK <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </button>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-brutal-red text-white border-2 border-black shadow-[2px_2px_0px_#000] font-bold text-xs py-3 px-6 uppercase hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-none"
                >
                  GET IN TOUCH
                </button>
              </div>
            </div>

            {/* Right Column: Metrics Matrix */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-bg-softer space-y-6">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <span className="font-extrabold text-xs text-ink uppercase tracking-wider">Engineering Impact Matrix</span>
                <span className="bg-brutal-yellow text-black font-black text-[10px] px-2 py-0.5 border border-black uppercase rounded-none">ACTIVE METRICS</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-black bg-bg-soft p-4 shadow-[2px_2px_0px_#000] rounded-none">
                  <div className="text-3xl sm:text-4xl font-black text-ink">04+</div>
                  <div className="text-xs font-bold text-ink-dim uppercase mt-1">Software Internships</div>
                </div>
                <div className="border-2 border-black bg-bg-soft p-4 shadow-[2px_2px_0px_#000] rounded-none">
                  <div className="text-3xl sm:text-4xl font-black text-brutal-red">15+</div>
                  <div className="text-xs font-bold text-ink-dim uppercase mt-1">REST API Modules</div>
                </div>
                <div className="border-2 border-black bg-bg-soft p-4 shadow-[2px_2px_0px_#000] rounded-none">
                  <div className="text-3xl sm:text-4xl font-black text-brutal-blue">1st</div>
                  <div className="text-xs font-bold text-ink-dim uppercase mt-1">Ideas to Impact Winner</div>
                </div>
                <div className="border-2 border-black bg-bg-soft p-4 shadow-[2px_2px_0px_#000] rounded-none">
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400">&lt;2s</div>
                  <div className="text-xs font-bold text-ink-dim uppercase mt-1">Emergency SOS Latency</div>
                </div>
              </div>

              <div className="p-4 border-2 border-black bg-brutal-yellow text-black space-y-1 shadow-[2px_2px_0px_#000] rounded-none">
                <div className="font-black text-xs uppercase flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-none" /> Recent System Milestone
                </div>
                <div className="text-xs font-bold leading-relaxed">
                  Architected multi-format document ingestion pipeline with Multer batching & Cloudflare R2 object storage.
                </div>
              </div>
            </div>

          </div>
        </BlurFade>
      </section>

      {/* ==========================================
          2. SECTION 00 // OVERVIEW & BIOGRAPHY
         ========================================== */}
      <section id="about" className="scroll-mt-24 space-y-6">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center justify-between border-b-3 border-black pb-3">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-ink flex items-center gap-3">
              <span>00 // OVERVIEW</span>
              <span className="text-outline hidden sm:inline">& BIOGRAPHY</span>
            </h2>
            <span className="bg-brutal-blue text-white font-extrabold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none uppercase">
              RISHABH SHARMA
            </span>
          </div>
        </TextReveal>

        <BlurFade delay={0.1}>
          <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none grid grid-cols-1 lg:grid-cols-12">
            {/* Bio Left Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 border-b-3 lg:border-b-0 lg:border-r-3 border-black">
              <div className="text-xs font-black uppercase tracking-wider text-brutal-red border-b-2 border-black pb-2">
                // System Developer Statement
              </div>
              
              <p className="text-lg sm:text-xl font-bold text-ink leading-relaxed tracking-tight">
                Backend-focused Software Engineer specializing in <span className="bg-brutal-yellow text-black px-1.5 py-0.5 border border-black">scalable API design</span>, microservices, and hybrid LLM orchestration pipelines.
              </p>

              <p className="text-ink-dim leading-relaxed font-medium text-sm sm:text-base">
                Final year B.Tech student in Computer Science (AI & ML) at SMS Lucknow. I design deterministic systems that handle high throughput under tight performance budgets, prioritizing unit test coverage, automated CI/CD pipelines, and defensive security layers.
              </p>

              <div className="pt-4 border-t-2 border-black/20 flex flex-wrap gap-2">
                {['Node.js', 'Express v5', 'MongoDB', 'Docker', 'AWS EC2', 'Cloudflare R2', 'Jest', 'Upstash Redis'].map((item) => (
                  <span key={item} className="font-bold text-xs bg-bg-softer text-ink border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000] rounded-none">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Spec Matrix Right Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-bg-softer space-y-6 flex flex-col justify-between">
              <div className="text-xs font-black uppercase tracking-wider text-ink border-b-2 border-black pb-2 flex items-center justify-between">
                <span>Developer Spec Sheet</span>
                <span className="font-mono text-[10px] text-ink-faint">ID: RS-2026</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 border-2 border-black bg-bg-soft shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] font-bold text-ink-faint block uppercase">Role</span>
                  <span className="text-xs font-extrabold text-ink uppercase">Backend SDE / AI Lead</span>
                </div>
                <div className="p-3.5 border-2 border-black bg-bg-soft shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] font-bold text-ink-faint block uppercase">Location</span>
                  <span className="text-xs font-extrabold text-ink uppercase">Lucknow, UP, India</span>
                </div>
                <div className="p-3.5 border-2 border-black bg-bg-soft shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] font-bold text-ink-faint block uppercase">Education</span>
                  <span className="text-xs font-extrabold text-ink uppercase">B.Tech CSE (AI & ML)</span>
                </div>
                <div className="p-3.5 border-2 border-black bg-bg-soft shadow-[2px_2px_0px_#000]">
                  <span className="text-[10px] font-bold text-ink-faint block uppercase">Institution</span>
                  <span className="text-xs font-extrabold text-ink uppercase">SMS Lucknow (2026)</span>
                </div>
              </div>

              <div className="p-4 border-2 border-black bg-brutal-blue text-white space-y-1 shadow-[2px_2px_0px_#000]">
                <div className="font-black text-xs uppercase">Core Engineering Motto</div>
                <div className="text-xs font-medium leading-tight">"If it cannot be monitored, rate-limited, and tested, it does not belong in production."</div>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ==========================================
          3. SECTION 01 // SELECTED WORK SHOWCASE
         ========================================== */}
      <section id="work" className="scroll-mt-24 space-y-8">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center justify-between border-b-3 border-black pb-3">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-ink flex items-center gap-3">
              <span>01 // SELECTED WORK</span>
              <span className="text-outline hidden sm:inline">& SYSTEMS</span>
            </h2>
            <span className="bg-brutal-yellow text-black font-extrabold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none uppercase">
              [ 04 FEATURED PROJECTS ]
            </span>
          </div>
        </TextReveal>

        {/* Editorial Project Rows */}
        <div className="space-y-8">
          {projects.map((project, index) => {
            const indexStr = String(index + 1).padStart(2, '0');

            return (
              <BlurFade key={project.slug} delay={0.1 + index * 0.1}>
                <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all rounded-none overflow-hidden">
                  
                  {/* Top Bar Header */}
                  <div className="flex flex-wrap items-center justify-between bg-bg-softer border-b-3 border-black px-6 py-4 gap-4">
                    <div className="flex items-center gap-4">
                      <span className="bg-black text-white text-sm font-mono font-extrabold px-3 py-1 border-2 border-black rounded-none">
                        PROJECT {indexStr}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-ink uppercase tracking-tight flex items-center gap-2">
                        {project.name}
                        <ArrowRight className="w-6 h-6 text-brutal-red" />
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-bg-soft text-ink hover:bg-brutal-yellow hover:text-black border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none transition-colors"
                        >
                          <Github className="w-4 h-4" /> GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-brutal-yellow text-black border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> Live System
                        </a>
                      )}
                      <Link
                        to={`/projects/${project.slug}`}
                        className="bg-brutal-red text-white border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none flex items-center gap-1 hover:translate-x-0.5 transition-transform"
                      >
                        Details <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                      </Link>
                    </div>
                  </div>

                  {/* Body Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* Left: Problem & Description */}
                    <div className="lg:col-span-7 p-6 sm:p-8 space-y-4 border-b-3 lg:border-b-0 lg:border-r-3 border-black">
                      <div className="inline-block font-bold text-xs text-brutal-red uppercase tracking-wider">
                        // {project.tagline}
                      </div>
                      <p className="text-ink-dim text-sm sm:text-base font-medium leading-relaxed">
                        {project.problem}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-2">
                        {project.homeTags.map((tag) => (
                          <span
                            key={tag}
                            className="font-bold text-xs bg-bg-softer text-ink border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000] rounded-none"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Key Features Highlights */}
                    <div className="lg:col-span-5 p-6 sm:p-8 bg-bg-softer space-y-3">
                      <span className="font-extrabold text-xs text-ink uppercase tracking-wider block border-b-2 border-black pb-2">
                        Key Architectural Features
                      </span>
                      <ul className="space-y-2.5">
                        {project.keyFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="w-2 h-2 bg-brutal-yellow border border-black rounded-none mt-1.5 shrink-0" />
                            <span className="text-xs font-medium text-ink-dim leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                </div>
              </BlurFade>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          4. SECTION 02 // TECHNICAL STACK GRID
         ========================================== */}
      <section id="stack" className="scroll-mt-24 space-y-8">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center justify-between border-b-3 border-black pb-3">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-ink flex items-center gap-3">
              <span>02 // TECHNICAL STACK</span>
              <span className="text-outline hidden sm:inline">& TOOLING MATRIX</span>
            </h2>
            <span className="bg-brutal-red text-white font-extrabold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none uppercase">
              CATEGORIZED LEDGER
            </span>
          </div>
        </TextReveal>

        <BlurFade delay={0.2}>
          <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {skillCategories.map((category, idx) => (
                <div 
                  key={category.title} 
                  className={`p-6 space-y-4 border-b-3 border-black ${
                    idx % 3 !== 2 ? 'lg:border-r-3' : ''
                  }`}
                >
                  <div className="flex items-center justify-between border-b-2 border-black pb-2">
                    <span className="font-extrabold text-sm text-ink uppercase">{category.title}</span>
                    <span className="font-mono text-xs font-bold bg-brutal-yellow text-black px-2 py-0.5 border border-black">
                      [{category.items.length}]
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="font-bold text-xs text-ink bg-bg-softer border-2 border-black py-1.5 px-3 shadow-[2px_2px_0px_#000] rounded-none hover:bg-brutal-yellow hover:text-black transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>

        {/* GitHub Activity */}
        <BlurFade delay={0.4}>
          <div className="border-3 border-black bg-bg-soft p-6 shadow-[6px_6px_0px_#000] rounded-none space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <span className="font-extrabold text-sm text-ink uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brutal-red" /> Continuous Commit Activity
              </span>
              <span className="font-mono text-xs font-bold text-ink-dim uppercase">GITHUB TELEMETRY</span>
            </div>
            <GithubActivity />
          </div>
        </BlurFade>
      </section>

      {/* ==========================================
          5. SECTION 03 // EXPERIENCE & RECOGNITION
         ========================================== */}
      <section id="experience" className="scroll-mt-24 space-y-8">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center justify-between border-b-3 border-black pb-3">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-ink flex items-center gap-3">
              <span>03 // EXPERIENCE</span>
              <span className="text-outline hidden sm:inline">& RECOGNITION</span>
            </h2>
            <span className="bg-brutal-blue text-white font-extrabold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none uppercase">
              CAREER TRACK RECORD
            </span>
          </div>
        </TextReveal>

        <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none divide-y-3 divide-black">
          {/* Internships List */}
          {internships.map((job, index) => (
            <BlurFade key={job.company} delay={0.2 + index * 0.1}>
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-3">
                  <div>
                    <h3 className="font-extrabold text-xl sm:text-2xl text-ink uppercase">
                      {job.role}
                    </h3>
                    <span className="text-brutal-red font-bold text-sm uppercase">@ {job.company}</span>
                  </div>
                  <span className="bg-brutal-yellow text-black border-2 border-black font-mono font-bold text-xs px-3 py-1.5 shadow-[2px_2px_0px_#000] rounded-none w-fit">
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
                          <CheckCircle2 className="w-4 h-4 text-brutal-blue shrink-0 mt-0.5" />
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
                    <span className="bg-brutal-yellow text-black text-[10px] font-bold px-2 py-0.5 border border-black uppercase inline-block">
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

      {/* ==========================================
          6. SECTION 04 // CONTACT & DISPATCH
         ========================================== */}
      <section id="contact" className="scroll-mt-24 mb-24 space-y-8">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center justify-between border-b-3 border-black pb-3">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-ink flex items-center gap-3">
              <span>04 // CONTACT</span>
              <span className="text-outline hidden sm:inline">& DIRECT DISPATCH</span>
            </h2>
            <span className="bg-brutal-yellow text-black font-extrabold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none uppercase">
              COMMUNICATION CHANNEL
            </span>
          </div>
        </TextReveal>

        <BlurFade delay={0.2}>
          <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 p-6 sm:p-10 space-y-6 border-b-3 lg:border-b-0 lg:border-r-3 border-black bg-bg-softer flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-brutal-red border-b-2 border-black pb-2">
                  // Initiate Connection
                </div>

                <h3 className="font-black text-3xl sm:text-4xl text-ink uppercase leading-tight">
                  Let's Build Scale.
                </h3>

                <p className="text-ink-dim text-sm font-medium leading-relaxed">
                  Open to software engineering roles, backend consulting, or technical collaborations. Feel free to drop a message or send an email directly.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t-2 border-black">
                <div className="border-b border-black/20 pb-3">
                  <span className="text-[10px] font-bold text-ink-faint block uppercase">Email Address</span>
                  <a href="mailto:rishabh223300@gmail.com" className="text-sm font-extrabold text-brutal-red underline hover:text-ink transition-colors">
                    rishabh223300@gmail.com
                  </a>
                </div>

                <div className="border-b border-black/20 pb-3">
                  <span className="text-[10px] font-bold text-ink-faint block uppercase">Base Location</span>
                  <span className="text-sm font-extrabold text-ink uppercase">Lucknow, India (UTC +5:30)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dispatch Form */}
            <div className="lg:col-span-7 p-6 sm:p-10">
              {status === 'success' ? (
                <div className="p-8 border-3 border-black bg-emerald-400 text-black font-bold shadow-[4px_4px_0px_#000] rounded-none space-y-3">
                  <div className="font-black text-2xl uppercase">Message Dispatched Successfully</div>
                  <div className="text-sm text-black/90 font-mono">Thank you for reaching out. I will respond to your message promptly.</div>
                </div>
              ) : (
                <form 
                  ref={formRef}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-ink uppercase mb-1.5">Your Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-bg-softer border-3 border-black p-3.5 text-sm text-ink font-bold focus:outline-none focus:bg-brutal-yellow focus:text-black transition-colors rounded-none shadow-[3px_3px_0px_#000]"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-ink uppercase mb-1.5">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-bg-softer border-3 border-black p-3.5 text-sm text-ink font-bold focus:outline-none focus:bg-brutal-yellow focus:text-black transition-colors rounded-none shadow-[3px_3px_0px_#000]"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-ink uppercase mb-1.5">Message / Inquiry Details</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-bg-softer border-3 border-black p-3.5 text-sm text-ink font-bold focus:outline-none focus:bg-brutal-yellow focus:text-black transition-colors resize-none rounded-none shadow-[3px_3px_0px_#000]"
                        placeholder="Write your project details or job opportunity..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {status === 'error' && <span className="text-xs font-bold text-brutal-red">Error: {errorMessage}</span>}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="brutal-btn py-4 px-8 text-sm uppercase tracking-wide ml-auto flex items-center gap-2 rounded-none"
                    >
                      {status === 'loading' ? 'Dispatching...' : 'Dispatch Message'} <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </BlurFade>
      </section>

    </div>
  );
}
