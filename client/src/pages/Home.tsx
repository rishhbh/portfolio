import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import { BlurFade } from '../components/BlurFade';
import { TextReveal } from '../components/TextReveal';
import { SpotlightCard } from '../components/SpotlightCard';
import { GithubActivity } from '../components/GithubActivity';
import { useSound } from '../hooks/useSound';

export default function Home() {
  const location = useLocation();
    const { playKeystroke } = useSound();

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [vimMode, setVimMode] = useState<'NORMAL' | 'INSERT' | 'COMMAND'>('INSERT');
  const [vimCommand, setVimCommand] = useState('');
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
  const handleVimKeydown = (e: React.KeyboardEvent) => {
    playKeystroke();
    if (e.key === 'Escape') {
      setVimMode('NORMAL');
      setVimCommand('');
      if (formRef.current) {
        formRef.current.focus();
      }
    } else if (vimMode === 'NORMAL' && e.key === ':') {
      setVimMode('COMMAND');
      setVimCommand(':');
      e.preventDefault();
    } else if (vimMode === 'COMMAND') {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (vimCommand === ':wq') {
          if (formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }
          setVimMode('NORMAL');
          setVimCommand('');
        } else if (vimCommand === ':q' || vimCommand === ':q!') {
          setFormData({ name: '', email: '', message: '' });
          setVimMode('NORMAL');
          setVimCommand('');
        } else {
          setVimMode('NORMAL');
          setVimCommand('');
        }
      } else if (e.key === 'Backspace') {
        setVimCommand(prev => prev.slice(0, -1));
        if (vimCommand.length <= 1) setVimMode('NORMAL');
      } else if (e.key.length === 1) {
        setVimCommand(prev => prev + e.key);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    playKeystroke();
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Magnetic Button state
  
  

  

  

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
      items: ['Ollama', 'Gemma', 'Gemini API', 'Git/GitHub', 'Chrome DevTools', 'Postman']
    }
  ];

  const internships = [
    {
      company: 'foundertruth',
      role: 'SDE & Tech Lead Intern',
      duration: 'Jul 2026 – Present',
    },
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
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-36 lowercase">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="min-h-[85vh] flex flex-col justify-center space-y-8 py-12">
        <BlurFade delay={0.1} forceAnimate={true} className="w-full">
          <div className="glass bg-bg-soft border border-glass-border p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 border-b border-glass-border pb-4 mb-6">
               <div className="w-2.5 h-2.5 bg-ink-faint rounded-full opacity-50 hover:bg-red-500 transition-colors" />
               <div className="w-2.5 h-2.5 bg-ink-faint rounded-full opacity-50 hover:bg-yellow-500 transition-colors" />
               <div className="w-2.5 h-2.5 bg-ink-faint rounded-full opacity-50 hover:bg-green-500 transition-colors" />
               <span className="ml-4 font-mono text-[10px] tracking-widest text-ink-faint">bash — rishabh@server: ~</span>
            </div>
            
            {/* Terminal Content */}
            <div className="font-mono text-xs sm:text-sm text-ink-dim space-y-6">
              <div className="space-y-2">
                <div>
                  <span className="text-green-500/70">guest@server</span>:<span className="text-blue-400/70">~</span>$ <span className="text-ink">whoami</span>
                </div>
                <div className="text-ink font-bold tracking-tight">rishabh sharma</div>
              </div>
              
              <BlurFade delay={0.3} forceAnimate={true}>
                <div className="space-y-2">
                  <div>
                    <span className="text-green-500/70">guest@server</span>:<span className="text-blue-400/70">~</span>$ <span className="text-ink">cat role.txt</span>
                  </div>
                  <div>Software Engineer — AI / ML</div>
                  <div className="text-ink-faint border-l border-line pl-4 py-1 mt-2">
                    Final-year B.Tech CSE (AI & ML)<br />
                    School of Management Sciences, Lucknow
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.5} forceAnimate={true}>
                <div className="space-y-4">
                  <div>
                    <span className="text-green-500/70">guest@server</span>:<span className="text-blue-400/70">~</span>$ <span className="text-ink">./execute_mission.sh</span>
                  </div>
                  <div>
                    <h1 className="font-display font-bold leading-[0.85] tracking-[-0.04em] text-ink relative z-10 py-4 gradient-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                      SHAPING CODE.<br />
                      SHIPPING CLARITY.
                    </h1>
                  </div>
                  <p className="max-w-2xl leading-relaxed font-light pb-2 font-sans text-sm sm:text-base">
                    I build robust, containerized backends and intelligent interfaces. 
                    My focus centers on combining large language model capabilities with secure, 
                    rate-limited application layers that perform at scale.
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.8} forceAnimate={true}>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-green-500/70">guest@server</span>:<span className="text-blue-400/70">~</span>$ <span className="animate-blink bg-ink w-2.5 h-4 inline-block align-middle" />
                </div>
              </BlurFade>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={1.0} forceAnimate={true} className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={() => {
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="bg-ink hover:bg-ink-dim text-bg font-mono text-xs tracking-tight font-bold py-4 px-8 transition-colors flex items-center gap-2"
          >
            [ EXECUTE DEPLOYMENTS ]
          </button>
          
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="glass hover:bg-bg-softer text-ink border border-glass-border font-mono text-xs tracking-tight py-4 px-8 transition-colors"
          >
            ./contact.sh
          </button>
        </BlurFade>
      </section>

      {/* 1.5 ABOUT */}
      <section id="about" className="scroll-mt-24">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center gap-4 pb-8">
            <span className="font-mono text-xs text-ink-faint">00 // WHOAMI</span>
            <div className="h-px flex-1 bg-line" />
          </div>
        </TextReveal>

        <BlurFade delay={0.1}>
          <div className="glass bg-bg-soft border border-glass-border p-6 sm:p-8 relative overflow-hidden shadow-2xl font-mono text-xs sm:text-sm">
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Fake ASCII Logo (like fastfetch) */}
              <div className="hidden md:block text-ink-faint leading-[1.1] whitespace-pre select-none">
{`   _____ 
  / __  \\
 | |  | |
 | |  | |
 | |__| |
  \\____/ 
         
  SYS_ID `}
              </div>

              {/* System Specs */}
              <div className="flex-1 space-y-6">
                <div>
                  <span className="text-green-500/70">guest@server</span>:<span className="text-blue-400/70">~</span>$ <span className="text-ink">fastfetch --user rishabh</span>
                </div>
                
                <div className="space-y-1 text-ink-dim">
                  <div className="text-ink font-bold border-b border-glass-border pb-2 mb-2 inline-block">rishabh@backend-dev</div>
                  <div className="flex"><span className="w-24 text-ink-faint">OS:</span> <span>Fedora 44</span></div>
                  <div className="flex"><span className="w-24 text-ink-faint">Kernel:</span> <span>x86_64 Linux 7.0.0</span></div>
                  <div className="flex"><span className="w-24 text-ink-faint">Uptime:</span> <span>20 years</span></div>
                  <div className="flex"><span className="w-24 text-ink-faint">Packages:</span> <span>NPM, Pip, Docker</span></div>
                  <div className="flex"><span className="w-24 text-ink-faint">Shell:</span> <span>bash 5.1.16</span></div>
                  <div className="flex"><span className="w-24 text-ink-faint">Role:</span> <span className="text-ink">Backend Engineer (AI/ML)</span></div>
                  <div className="flex"><span className="w-24 text-ink-faint">Location:</span> <span>Lucknow, IN</span></div>
                </div>

                <div className="space-y-2 pt-2 border-t border-glass-border">
                  <div className="flex flex-wrap gap-2">
                    <div className="w-4 h-4 bg-[#080808] border border-glass-border"></div>
                    <div className="w-4 h-4 bg-red-500/80"></div>
                    <div className="w-4 h-4 bg-green-500/80"></div>
                    <div className="w-4 h-4 bg-yellow-500/80"></div>
                    <div className="w-4 h-4 bg-blue-500/80"></div>
                    <div className="w-4 h-4 bg-purple-500/80"></div>
                    <div className="w-4 h-4 bg-cyan-500/80"></div>
                    <div className="w-4 h-4 bg-white/80"></div>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <div>
                    <span className="text-green-500/70">guest@server</span>:<span className="text-blue-400/70">~</span>$ <span className="text-ink">cat ~/.skills.json</span>
                  </div>
                  <div className="text-ink-dim">
                    <pre className="font-mono text-xs overflow-x-auto text-ink-dim leading-relaxed">
{`{
  "backend_apis": ["Node.js", "Express.js", "REST APIs", "OAuth 2.0", "JWT"],
  "devops_infra": ["AWS EC2", "Docker", "GitHub Actions", "Cloudflare", "Linux"],
  "databases_ai": ["MongoDB", "Redis", "Ollama", "Gemma", "Gemini API"]
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* 2. SELECTED WORK SECTION */}
      <section id="work" className="space-y-12 scroll-mt-24">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center gap-4 pb-2">
            <span className="font-mono text-xs text-ink-faint">01 // ls -la ~/deployments</span>
            <div className="h-px flex-1 bg-line" />
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
                <SpotlightCard className="group glass bg-bg-soft hover:bg-bg-softer border border-glass-border transition-all duration-300 h-full flex flex-col relative font-mono">
                  <div className={`absolute top-6 right-6 flex items-center gap-4 z-20 pointer-events-none ${isLayerZero ? 'flex-col' : ''}`}>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-ink-faint hover:text-ink transition-colors pointer-events-auto" aria-label="GitHub">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-ink-faint hover:text-ink transition-colors pointer-events-auto" aria-label="Live Site">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-ink transition-colors" />
                  </div>
                  
                  <Link
                    to={`/projects/${project.slug}`}
                    className={`p-6 sm:p-8 h-full flex flex-col relative ${isLayerZero ? 'md:flex-row md:gap-12 md:items-stretch' : 'justify-between'}`}
                  >
                    <div className={`space-y-6 ${isLayerZero ? 'md:w-1/2 flex flex-col' : ''}`}>
                      <div className="space-y-1">
                        <span className="block font-mono text-[10px] tracking-tight text-ink-faint">
                          drwxr-xr-x rishabh root 4096 {project.slug}
                        </span>
                      </div>

                      <div className={`space-y-2 ${isLayerZero ? 'pr-12 md:pr-6' : 'pr-28'}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500/70 text-xs">➜</span>
                          <h3 className="font-display font-bold text-xl tracking-tighter text-ink group-hover:translate-x-1 transition-transform duration-300">
                            {project.name}
                          </h3>
                        </div>
                        <p className="font-mono text-[11px] text-ink-dim">
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
                        <p className="text-ink-faint text-sm sm:text-base leading-relaxed font-sans line-clamp-4 pr-6 md:pr-12">
                          {project.problem}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-8">
                          {project.homeTags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] tracking-tight bg-bg-softer border border-line text-ink-dim py-1 px-2.5"
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
                            className="font-mono text-[10px] tracking-tight bg-bg-softer border border-line text-ink-dim py-1 px-2.5"
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
            <span className="font-mono text-xs text-ink-faint">02 // ./scan_capabilities.sh</span>
            <div className="h-px flex-1 bg-line" />
          </div>
        </TextReveal>

        <BlurFade delay={0.2}>
          <div className="glass bg-bg-soft border border-glass-border p-6 sm:p-8 font-mono text-xs sm:text-sm shadow-2xl">
            <div className="text-ink-dim mb-8">
              <span className="text-green-500/70">guest@server</span>:<span className="text-blue-400/70">~</span>$ <span className="text-ink">cat /opt/stack/modules.conf</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillCategories.map((category) => (
                <div key={category.title} className="space-y-4">
                  <div className="text-yellow-500/80 font-bold border-b border-line pb-2">[{category.title.toUpperCase()}]</div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-ink bg-glass border border-glass-border py-1 px-3 hover:bg-ink hover:text-bg transition-colors cursor-default"
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

        <BlurFade delay={0.4}>
          <GithubActivity />
        </BlurFade>
      </section>

      {/* 4. EXPERIENCE & RECOGNITION */}
      <section id="experience" className="space-y-12 scroll-mt-24">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center gap-4 pb-2">
            <span className="font-mono text-xs text-ink-faint">03 // git log --oneline --graph</span>
            <div className="h-px flex-1 bg-line" />
          </div>
        </TextReveal>

        <div className="glass bg-bg-soft border border-glass-border p-6 sm:p-8 font-mono text-xs sm:text-sm shadow-2xl overflow-x-auto">
          
          <BlurFade delay={0.2}>
            <div className="text-ink-dim mb-8">
              <span className="text-green-500/70">guest@server</span>:<span className="text-blue-400/70">~</span>$ <span className="text-ink">git log --author="rishabh" --all</span>
            </div>
          </BlurFade>

          <div className="space-y-12">
            {/* Internships as Commits */}
            {internships.map((job, index) => (
              <BlurFade key={job.company} delay={0.3 + index * 0.1}>
                <div className="flex gap-4">
                  {/* Git branch line */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full border-2 border-green-500 bg-bg z-10"></div>
                    <div className="w-px h-full bg-line -mt-1"></div>
                  </div>
                  
                  {/* Commit Content */}
                  <div className="space-y-3 pb-8 flex-1">
                    <div className="text-yellow-500/80">commit {((index + 1) * 9876543).toString(16).slice(0, 7)} (HEAD -&gt; {job.company.toLowerCase().replace(/\s+/g, '-')})</div>
                    <div><span className="text-ink-faint">Author:</span> rishabh &lt;sys@rishabh.dev&gt;</div>
                    <div><span className="text-ink-faint">Date:</span>   {job.duration}</div>
                    
                    <div className="pt-4 pl-4 space-y-4">
                      <div className="font-bold text-ink text-base">
                        feat(role): {job.role}
                      </div>

                      {job.points && job.points.length > 0 && (
                        <div className="space-y-2 text-ink-dim leading-relaxed">
                          {job.points.map((point, idx) => {
                            const splitIndex = point.indexOf(':');
                            let title = '';
                            let desc = point;
                            if (splitIndex !== -1) {
                              title = point.slice(0, splitIndex);
                              desc = point.slice(splitIndex + 1);
                            }
                            return (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="text-ink-faint mt-1">*</span>
                                <span>
                                  {title ? (
                                    <>
                                      <span className="text-ink font-semibold">{title}:</span>
                                      {desc}
                                    </>
                                  ) : (
                                    desc
                                  )}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}

            {/* Hackathons as merges/tags */}
            {recognitions.map((award, index) => (
              <BlurFade key={index} delay={0.6 + index * 0.1}>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 border-2 border-blue-500 bg-bg z-10 rotate-45"></div>
                    {index !== recognitions.length - 1 && <div className="w-px h-full bg-line -mt-1"></div>}
                  </div>
                  
                  <div className="space-y-3 pb-8 flex-1">
                    <div className="text-yellow-500/80">tag {award.title.split(' ')[0].toLowerCase()}-{((index + 1) * 12345).toString(16).slice(0, 4)}</div>
                    <div><span className="text-ink-faint">Type:</span>  {award.type}</div>
                    
                    <div className="pt-4 pl-4 space-y-2">
                      <div className="font-bold text-ink">
                        {award.title}
                      </div>
                      <div className="text-ink-dim leading-relaxed">
                        {award.details}
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
            
            <BlurFade delay={1.0}>
               <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full border-2 border-ink-faint bg-bg z-10"></div>
                  </div>
                  <div className="text-ink-faint italic">initial commit</div>
               </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="scroll-mt-24 mb-24">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center gap-4 pb-8">
            <span className="font-mono text-xs text-ink-faint">04 // ./contact.sh</span>
            <div className="h-px flex-1 bg-line" />
          </div>
        </TextReveal>

        <TextReveal delay={0.2} className="w-full">
          <div className="glass bg-bg-soft border border-glass-border p-6 sm:p-8 font-mono text-xs sm:text-sm shadow-2xl overflow-hidden">
            
            <div className="text-ink-dim mb-8 space-y-2">
              <div>
                <span className="text-green-500/70">guest@server</span>:<span className="text-blue-400/70">~</span>$ <span className="text-ink">./contact.sh</span>
              </div>
              <div className="text-ink-faint">[SYS] Initializing secure comms channel...</div>
              <div className="text-ink-faint">[SYS] Waiting for user input.</div>
            </div>

            <div className="max-w-3xl">
              {status === 'success' ? (
                <div className="space-y-4 py-8">
                  <div className="text-green-500">➜ <span className="text-ink font-bold">SUCCESS:</span> Payload delivered securely.</div>
                  <div className="text-ink-dim">Connection closed by foreign host.</div>
                </div>
              ) : (
                <form 
                  ref={formRef}
                  onSubmit={handleSubmit} 
                  className="w-full flex flex-col border border-glass-border bg-bg-soft outline-none focus:ring-1 focus:ring-glass-border"
                  onKeyDownCapture={handleVimKeydown}
                  tabIndex={-1}
                >
                  <div className="bg-bg border-b border-glass-border px-4 py-1 text-xs text-ink-dim flex justify-between">
                    <span>~ contact.txt</span>
                    <span>{formData.name || formData.email || formData.message ? '[Modified]' : ''}</span>
                  </div>
                  
                  <div className="p-4 sm:p-6 space-y-6 flex-1">
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 group">
                        <label htmlFor="name" className="text-ink-dim w-32 shrink-0 select-none">Name:</label>
                        <div className="flex-1 relative flex items-center">
                          <span className="absolute left-3 text-green-500 font-bold opacity-0 group-focus-within:opacity-100 transition-opacity">&gt;</span>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            onFocus={() => setVimMode('INSERT')}
                            className="w-full bg-transparent border-b border-glass-border py-2 px-3 pl-8 font-mono text-ink hover:bg-bg-softer focus:bg-bg-softer focus:outline-none focus:border-green-500 transition-all rounded-none placeholder-ink-faint/30"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 group">
                        <label htmlFor="email" className="text-ink-dim w-32 shrink-0 select-none">Email:</label>
                        <div className="flex-1 relative flex items-center">
                          <span className="absolute left-3 text-green-500 font-bold opacity-0 group-focus-within:opacity-100 transition-opacity">&gt;</span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={() => setVimMode('INSERT')}
                            className="w-full bg-transparent border-b border-glass-border py-2 px-3 pl-8 font-mono text-ink hover:bg-bg-softer focus:bg-bg-softer focus:outline-none focus:border-green-500 transition-all rounded-none placeholder-ink-faint/30"
                            placeholder="root@server.com"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 pt-2 group">
                        <label htmlFor="message" className="text-ink-dim select-none">Payload:</label>
                        <div className="relative">
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            onFocus={() => setVimMode('INSERT')}
                            className="w-full bg-transparent border border-glass-border p-3 pl-8 font-mono text-ink hover:bg-bg-softer focus:bg-bg-softer focus:outline-none focus:border-green-500 transition-all rounded-none resize-none placeholder-ink-faint/30"
                            placeholder="Type your message here..."
                          ></textarea>
                          <span className="absolute left-3 top-3 text-green-500 font-bold opacity-0 group-focus-within:opacity-100 transition-opacity">&gt;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Vim Status Bar */}
                  <div className="bg-bg border-t border-glass-border px-4 py-1 text-xs font-mono flex items-center gap-4 min-h-[32px]">
                    {vimMode === 'INSERT' && (
                      <span className="font-bold text-ink">-- INSERT --</span>
                    )}
                    {vimMode === 'COMMAND' && (
                      <span className="text-ink">{vimCommand}<span className="animate-blink inline-block w-2 h-3 bg-ink align-middle" /></span>
                    )}
                    {vimMode === 'NORMAL' && (
                      <span className="text-ink-dim">Press <kbd className="text-ink">ESC</kbd> to enter normal mode, then type <kbd className="text-ink">:wq</kbd> and hit <kbd className="text-ink">ENTER</kbd> to submit.</span>
                    )}
                    
                    {status === 'loading' && <span className="ml-auto text-yellow-500">EXECUTING...</span>}
                    {status === 'error' && <span className="ml-auto text-red-500">ERR: {errorMessage}</span>}
                    {/* Hidden fallback submit button for accessibility / standard enter key on form */}
                    <button type="submit" className="hidden" disabled={status === 'loading'}>Submit</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </TextReveal>
      </section>

    </div>
  );
}
