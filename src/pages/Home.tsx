import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Award, Briefcase, Code2 } from 'lucide-react';
import { projects } from '../data/projects';
import { BlurFade } from '../components/BlurFade';

export default function Home() {
  const location = useLocation();

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
      items: ['Docker', 'Docker Compose', 'GitHub Actions', 'Cloudflare Pages/Workers', 'Render', 'Vercel', 'Linux']
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
      points: [],
    },
    {
      company: 'Walk Reward',
      role: 'Software Developer Intern',
      duration: 'Mar 2026 – Apr 2026',
      points: [
        'Web Development: Built and maintained production websites using the MERN stack and WordPress, including a split-domain architecture with a React SPA and WordPress blog hosted on the same domain.',
        'CI/CD and Automation: Implemented a CI/CD pipeline using GitHub Actions to automate Vite + React builds and FTP-based deployment to production on every Git push.',
        'Performance Optimization: Improved website performance using Lighthouse and Chrome DevTools, achieving measurable gains in page load speed, SEO scores, and mobile responsiveness.'
      ],
    },
    {
      company: 'RevLabz Solutions',
      role: 'MERN Developer Intern',
      duration: 'Nov 2025 – Feb 2026',
      points: [
        'MERN Development: Contributed to the development and maintenance of 2 production-grade MERN applications using TypeScript.',
        'API Development: Built and maintained RESTful APIs powering a production Chrome extension and web application.',
        'OAuth & Backend Architecture: Designed 12+ API endpoints across multi-provider OAuth (Google, Microsoft) and dashboard data layers.',
        'Cross-Functional Collaboration: Collaborated cross-functionally to deliver end-to-end features from backend to deployment.'
      ],
    },
  ];

  const recognitions = [
    {
      title: '1st Place — Ideas to Impact 2026 Innovation Hackathon',
      details: 'Awadh Incubation Foundation, KMCLU Lucknow. Built KaushalAI, placing 1st among 50+ teams from 14+ institutions.',
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
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-36">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="min-h-[70vh] flex flex-col justify-center space-y-8 py-12">
        <BlurFade delay={0.1}>
          <div className="font-mono text-xs tracking-[0.2em] text-ink-dim uppercase">
            SOFTWARE ENGINEER — AI / ML
          </div>
        </BlurFade>

        <BlurFade delay={0.2} className="relative">
          <h1 className="font-display font-bold leading-[0.95] tracking-tight text-ink relative z-10" style={{ fontSize: 'clamp(3.2rem, 8.5vw, 7.5rem)' }}>
            SHAPING CODE.<br />
            SHIPPING CLARITY.
          </h1>
          {/* Subtle background glow block - pure grayscale */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-white/5 filter blur-[100px] pointer-events-none -z-10" />
        </BlurFade>

        <BlurFade delay={0.3} className="max-w-2xl space-y-6">
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

        <BlurFade delay={0.4} className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => {
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="bg-ink hover:bg-ink-dim text-bg font-mono text-xs tracking-widest font-bold py-4 px-8 transition-colors flex items-center gap-2"
          >
            VIEW WORK <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="glass hover:bg-glass-strong text-ink border border-glass-border font-mono text-xs tracking-widest py-4 px-8 transition-colors"
          >
            GET IN TOUCH
          </button>
        </BlurFade>
      </section>

      {/* 2. SELECTED WORK SECTION */}
      <section id="work" className="space-y-12 scroll-mt-24">
        <BlurFade delay={0.1}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ink-faint">01 // PROJECTS</span>
            <div className="h-px flex-1 bg-line" />
            <h2 className="font-display font-bold text-2xl tracking-wide uppercase text-ink">
              Selected Work
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <BlurFade key={project.slug} delay={0.2 + index * 0.1}>
              <Link
                to={`/projects/${project.slug}`}
                className="group block glass bg-glass hover:bg-glass-strong border border-glass-border p-8 transition-all duration-300 relative h-full flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Eyebrow / Link indicator */}
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] tracking-widest text-ink-faint">
                      PROJECT_0{index + 1}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-ink transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl tracking-tight text-ink group-hover:translate-x-1 transition-transform duration-300">
                      {project.name}
                    </h3>
                    <p className="font-mono text-xs text-ink-dim">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-ink-faint text-sm leading-relaxed font-sans line-clamp-3">
                    {project.problem}
                  </p>
                </div>

                {/* Tech chips footer */}
                <div className="flex flex-wrap gap-2 pt-8">
                  {project.homeTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wide bg-white/5 border border-line text-ink-dim py-1 px-2.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* 3. STACK / SKILLS SECTION */}
      <section id="stack" className="space-y-12 scroll-mt-24">
        <BlurFade delay={0.1}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ink-faint">02 // CAPABILITIES</span>
            <div className="h-px flex-1 bg-line" />
            <h2 className="font-display font-bold text-2xl tracking-wide uppercase text-ink">
              Core Stack
            </h2>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="glass border border-glass-border p-6 space-y-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] filter blur-[40px] pointer-events-none" />
                <h3 className="font-display font-bold text-sm tracking-wider text-ink uppercase border-b border-line pb-2">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] tracking-wide bg-white/5 border border-line text-ink-dim hover:text-ink py-1 px-2.5 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </BlurFade>
      </section>

      {/* 4. EXPERIENCE & RECOGNITION */}
      <section id="experience" className="space-y-12 scroll-mt-24">
        <BlurFade delay={0.1}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ink-faint">03 // TIMELINE</span>
            <div className="h-px flex-1 bg-line" />
            <h2 className="font-display font-bold text-2xl tracking-wide uppercase text-ink">
              Experience & Recognition
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Internships Column */}
          <div className="space-y-8">
            <BlurFade delay={0.2}>
              <div className="flex items-center gap-2 pb-4 border-b border-line">
                <Briefcase className="w-4 h-4 text-ink-dim" />
                <h3 className="font-display font-bold text-lg tracking-wider text-ink uppercase">
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
                <h3 className="font-display font-bold text-lg tracking-wider text-ink uppercase">
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
        <BlurFade delay={0.2}>
          <div className="glass border border-glass-border p-8 sm:p-16 text-center space-y-8 relative overflow-hidden">
            {/* Subtle center background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/[0.015] filter blur-[80px] pointer-events-none" />

            <div className="space-y-4 max-w-xl mx-auto">
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink-faint uppercase">
                GET IN TOUCH
              </span>
              <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-ink">
                Let's build something that ships.
              </h2>
              <p className="text-ink-dim text-sm sm:text-base font-light max-w-md mx-auto leading-relaxed">
                Whether you have an interesting AI routing project or need a robust full-stack architect, let's start the conversation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 max-w-md mx-auto">
              <a
                href="mailto:rishabh223300@gmail.com"
                className="w-full sm:w-auto bg-ink hover:bg-ink-dim text-bg font-mono text-xs tracking-widest font-bold py-4 px-8 transition-colors"
              >
                EMAIL ME
              </a>
              <div className="flex gap-4 w-full sm:w-auto justify-center">
                <a
                  href="https://github.com/render-TheVoid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass border border-glass-border hover:bg-glass-strong text-ink font-mono text-xs tracking-widest py-4 px-6 transition-colors flex items-center justify-center gap-2"
                >
                  GITHUB <Code2 className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com/in/rishabhh-sharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass border border-glass-border hover:bg-glass-strong text-ink font-mono text-xs tracking-widest py-4 px-6 transition-colors flex items-center justify-center gap-2"
                >
                  LINKEDIN <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

    </div>
  );
}
