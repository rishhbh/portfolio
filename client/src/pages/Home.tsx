import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Award, Briefcase } from 'lucide-react';
import { projects } from '../data/projects';
import { BlurFade } from '../components/BlurFade';
import { TextReveal } from '../components/TextReveal';
import { SpotlightCard } from '../components/SpotlightCard';
import { GithubActivity } from '../components/GithubActivity';

export default function Home() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to connect to the server.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Magnetic Button state
  const btnX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const btnY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    btnX.set((e.clientX - centerX) * 0.15); // Max ~10-15px displacement
    btnY.set((e.clientY - centerY) * 0.15);
  };

  const handleMagneticLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  // Scroll to hash targets if specified in location (e.g. from hash navigation)
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        // Delay slightly to allow full render
        const timer = setTimeout(() => {
          const offset = 90; // Fixed header offset
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
      title: 'DevOps & Infra',
      items: ['AWS EC2', 'Docker', 'Docker Compose', 'GitHub Actions', 'Cloudflare Pages/Workers', 'Render', 'Linux']
    },
    {
      title: 'Databases & Cache',
      items: ['MongoDB', 'Redis']
    },
    {
      title: 'AI/ML & Tools',
      items: ['Ollama', 'Gemma', 'Gemini API', 'Stripe', 'Git/GitHub', 'Chrome DevTools', 'Postman']
    }
  ];

  const internships = [
    {
      company: 'Decoders Entity',
      role: 'Backend Developer Intern',
      duration: 'June 2026 – Present',
      points: [
        "Backend Architecture: Architected and developed the complete backend for HerShield, an AI-powered women's safety platform, using Node.js, Express.js, MongoDB, and Socket.io",
        "Secure Authentication: Built dual-channel OTP authentication system with phone (D7 Networks SMS) and email (Nodemailer SMTP) verification, bcrypt hashing, and JWT-based stateless auth",
        "Emergency Pipeline: Engineered a sub-2s SOS emergency pipeline that simultaneously triggers Socket.io guardian alerts, Firebase Cloud Messaging push notifications, and D7 SMS via Promise.allSettled",
        "Real-Time Tracking: Implemented real-time live location tracking and journey monitoring using Socket.io rooms with guardian fan-out architecture"
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
    },
    {
      title: 'Winner — CodeSprint',
      details: 'School of Management Sciences, Lucknow. Solved within 15 minutes of a 1-hour window.',
    },
    {
      title: 'First Runner Up — Design Dynamics, Ingenuity 2k24',
      details: 'SMS Lucknow. UI/UX design for hybrid education and student mental health support.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-36 lowercase">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="min-h-[70vh] flex flex-col justify-center space-y-8 py-12">
        <BlurFade delay={0.1} forceAnimate={true}>
          <div className="font-mono text-xs tracking-tight text-ink-dim lowercase">
            SOFTWARE ENGINEER — AI / ML
          </div>
        </BlurFade>

        <TextReveal delay={0.2} forceAnimate={true} className="relative w-full">
          <h1 className="font-display font-bold leading-[0.8] tracking-[-0.06em] text-ink relative z-10 gradient-heading pb-4 pt-2" style={{ fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)' }}>
            SHAPING CODE.<br />
            SHIPPING CLARITY.
          </h1>
          {/* Subtle background glow block removed (now global) */}
        </TextReveal>

        <BlurFade delay={0.3} forceAnimate={true} className="max-w-2xl space-y-6">
          <p className="text-ink-dim text-lg sm:text-xl leading-relaxed font-sans font-light">
            I build robust, containerized backends and intelligent interfaces. 
            My focus centers on combining large language model capabilities with secure, 
            rate-limited application layers that perform at scale.
          </p>
          <div className="font-mono text-xs text-ink-faint border-l border-line pl-4 py-1 leading-relaxed">
            Final-year B.Tech CSE (AI & ML)
            <br />
            School of Management Sciences, Lucknow
          </div>
        </BlurFade>

        <BlurFade delay={0.4} forceAnimate={true} className="flex flex-wrap gap-4 pt-4">
          <motion.button
            style={{ x: btnX, y: btnY }}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onClick={() => {
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="bg-ink hover:bg-ink-dim text-bg font-mono text-xs tracking-tight font-bold py-4 px-8 transition-colors flex items-center gap-2"
          >
            VIEW WORK <ArrowRight className="w-4 h-4" />
          </motion.button>
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="glass hover:bg-glass-strong text-ink border border-glass-border font-mono text-xs tracking-tight py-4 px-8 transition-colors"
          >
            GET IN TOUCH
          </button>
        </BlurFade>
      </section>

      {/* 2. SELECTED WORK SECTION */}
      <section id="work" className="space-y-12 scroll-mt-24">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center gap-4 pb-2">
            <span className="font-mono text-xs text-ink-faint">01 // PROJECTS</span>
            <div className="h-px flex-1 bg-line" />
            <h2 className="font-display font-bold text-2xl tracking-tight lowercase text-ink gradient-heading">
              Selected Work
            </h2>
          </div>
        </TextReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const isLayerZero = index === 0;
            const isKaushal = index === 1;

            let gridClass = "col-span-1";
            if (isLayerZero) gridClass = "md:col-span-2 md:row-start-1 md:col-start-1";
            if (isKaushal) gridClass = "md:row-span-2 md:col-start-1 md:row-start-2";
            if (index === 2) gridClass = "md:col-span-1 md:col-start-2 md:row-start-2";
            if (index === 3) gridClass = "md:col-span-1 md:col-start-2 md:row-start-3";

            return (
              <BlurFade 
                key={project.slug} 
                delay={0.1 + index * 0.12} // Smooth cascade stagger
                className={gridClass}
              >
                <SpotlightCard className="group glass bg-glass hover:bg-glass-strong border border-glass-border transition-all duration-300 h-full flex flex-col">
                  <Link
                    to={`/projects/${project.slug}`}
                    className={`p-8 h-full flex flex-col relative ${isLayerZero ? 'md:flex-row md:gap-12 md:items-stretch' : 'justify-between'}`}
                  >
                    <ArrowUpRight className="absolute top-8 right-8 w-4 h-4 text-ink-faint group-hover:text-ink transition-colors" />

                    <div className={`space-y-6 ${isLayerZero ? 'md:w-1/2 flex flex-col' : ''}`}>
                      <span className="block font-mono text-[10px] tracking-tight text-ink-faint">
                        PROJECT_0{index + 1}
                      </span>

                      <div className="space-y-2 pr-6">
                        <h3 className="font-display font-bold text-2xl tracking-tighter text-ink group-hover:translate-x-1 transition-transform duration-300">
                          {project.name}
                        </h3>
                        <p className="font-mono text-xs text-ink-dim">
                          {project.tagline}
                        </p>
                      </div>

                      {!isLayerZero && (
                        <p className="text-ink-faint text-sm leading-relaxed font-sans line-clamp-3">
                          {project.problem}
                        </p>
                      )}

                      {/* Extra features for KaushalAI tall card */}
                      {isKaushal && (
                        <div className="hidden md:block space-y-3 mt-4 pt-6 border-t border-line">
                          <p className="font-mono text-[10px] tracking-tight text-ink-dim lowercase">Platform Highlights</p>
                          <ul className="space-y-3">
                            {project.keyFeatures.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="w-1 h-1 bg-ink-faint rounded-full mt-1.5 shrink-0"></span>
                                <span className="text-xs text-ink-faint font-sans leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {isLayerZero ? (
                      <div className="md:w-1/2 flex flex-col justify-end mt-8 md:mt-0">
                        <p className="text-ink-faint text-sm sm:text-base leading-relaxed font-sans line-clamp-4 pr-6">
                          {project.problem}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-8">
                          {project.homeTags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] tracking-tight bg-[var(--glow)] border border-line text-ink-dim py-1 px-2.5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 pt-8 mt-auto pr-6">
                        {project.homeTags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] tracking-tight bg-[var(--glow)] border border-line text-ink-dim py-1 px-2.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </SpotlightCard>
              </BlurFade>
            );
          })}
        </div>
      </section>

      {/* 3. STACK / SKILLS SECTION */}
      <section id="stack" className="space-y-12 scroll-mt-24">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center gap-4 pb-2">
            <span className="font-mono text-xs text-ink-faint">02 // CAPABILITIES</span>
            <div className="h-px flex-1 bg-line" />
            <h2 className="font-display font-bold text-2xl tracking-tight lowercase text-ink gradient-heading">
              Core Stack
            </h2>
          </div>
        </TextReveal>

        <BlurFade delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <BlurFade
                key={category.title}
                delay={0.15 + index * 0.1}
                className="col-span-1"
              >
                  <SpotlightCard
                  className="glass border border-glass-border p-6 space-y-4 relative overflow-hidden h-full"
                >
                <h3 className="font-display font-bold text-sm tracking-tight text-ink lowercase border-b border-line pb-2">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] tracking-tight bg-[var(--glow)] border border-line text-ink-dim hover:text-ink py-1 px-2.5 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <GithubActivity />
        </BlurFade>
      </section>

      {/* 4. EXPERIENCE & RECOGNITION */}
      <section id="experience" className="space-y-12 scroll-mt-24">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center gap-4 pb-2">
            <span className="font-mono text-xs text-ink-faint">03 // TIMELINE</span>
            <div className="h-px flex-1 bg-line" />
            <h2 className="font-display font-bold text-2xl tracking-tight lowercase text-ink gradient-heading">
              Experience & Recognition
            </h2>
          </div>
        </TextReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Internships Column */}
          <div className="space-y-8">
            <BlurFade delay={0.2}>
              <div className="flex items-center gap-2 pb-4 border-b border-line">
                <Briefcase className="w-4 h-4 text-ink-dim" />
                <h3 className="font-display font-bold text-lg tracking-tight text-ink lowercase">
                  Professional Experience
                </h3>
              </div>
            </BlurFade>

            <div className="space-y-8">
              {internships.map((job, index) => (
                <BlurFade key={job.company} delay={0.3 + index * 0.1}>
                  <div className="relative pl-8 border-l border-line space-y-3">
                    {/* Number Timeline node */}
                    <div className="absolute -left-3.5 top-0 w-7 h-7 bg-bg border border-line flex items-center justify-center font-mono text-xs text-ink-dim font-bold">
                      {index + 1}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-display font-bold text-lg text-ink">
                          {job.company}
                        </h4>
                        <span className="font-mono text-xs text-ink-faint">
                          {job.duration}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-ink-dim">{job.role}</p>
                    </div>

                    {job.points && job.points.length > 0 && (
                      <ul className="space-y-2.5 pt-1">
                        {job.points.map((point, idx) => {
                          const splitIndex = point.indexOf(':');
                          let title = '';
                          let desc = point;
                          if (splitIndex !== -1) {
                            title = point.slice(0, splitIndex);
                            desc = point.slice(splitIndex + 1);
                          }
                          return (
                            <li key={idx} className="flex items-start gap-2.5 text-sm font-sans font-light text-ink-dim leading-relaxed">
                              <span className="font-mono text-[9px] text-ink-faint mt-1.5">•</span>
                              <span>
                                {title ? (
                                  <>
                                    <strong className="font-display font-semibold text-ink">{title}:</strong>
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
          </div>

          {/* Hackathons / Competition Column */}
          <div className="space-y-8">
            <BlurFade delay={0.2}>
              <div className="flex items-center gap-2 pb-4 border-b border-line">
                <Award className="w-4 h-4 text-ink-dim" />
                <h3 className="font-display font-bold text-lg tracking-tight text-ink lowercase">
                  Hackathons & Contests
                </h3>
              </div>
            </BlurFade>

            <div className="space-y-6">
              {recognitions.map((award, index) => (
                <BlurFade key={index} delay={0.3 + index * 0.1}>
                  <div className="glass border border-glass-border p-6 space-y-2 relative hover:bg-glass transition-colors">
                    <h4 className="font-display font-bold text-base text-ink leading-tight">
                      {award.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-ink-dim leading-relaxed font-light">
                      {award.details}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="scroll-mt-24">
        <TextReveal delay={0.2} className="w-full">
          <div className="glass border border-glass-border p-6 sm:p-8 text-center space-y-5 relative overflow-hidden">

            <div className="space-y-1.5 max-w-xl mx-auto">
              <span className="font-mono text-[10px] tracking-tight text-ink-faint lowercase block">
                GET IN TOUCH
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tighter text-ink gradient-heading">
                Let's build something that ships.
              </h2>
              <p className="text-ink-dim text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed pt-1">
                Whether you have an interesting AI routing project or need a robust full-stack architect, let's start the conversation.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-2 max-w-xl mx-auto text-left">
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="name" className="font-mono text-[10px] tracking-tight text-ink-dim lowercase block">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-bg glass border border-glass-border p-2 text-sm font-sans text-ink focus:outline-none focus:border-ink-dim transition-colors rounded-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="font-mono text-[10px] tracking-tight text-ink-dim lowercase block">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-bg glass border border-glass-border p-2 text-sm font-sans text-ink focus:outline-none focus:border-ink-dim transition-colors rounded-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="message" className="font-mono text-[10px] tracking-tight text-ink-dim lowercase block">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={2}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-bg glass border border-glass-border p-2 text-sm font-sans text-ink focus:outline-none focus:border-ink-dim transition-colors rounded-none resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-ink hover:bg-ink-dim text-bg font-mono text-xs tracking-tight font-bold py-3 px-8 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                >
                  {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>

                {status === 'success' && (
                  <p className="font-mono text-xs text-green-500 mt-2 text-center">Message sent successfully!</p>
                )}
                {status === 'error' && (
                  <p className="font-mono text-xs text-red-500 mt-2 text-center">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>
        </TextReveal>
      </section>

    </div>
  );
}
