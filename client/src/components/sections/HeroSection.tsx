import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MarqueeTicker } from '../MarqueeTicker';
import { BlurFade } from '../BlurFade';
import { TextReveal } from '../TextReveal';
import { GithubBadges } from '../GithubBadges';

export const HeroSection = memo(function HeroSection() {
  return (
    <>
      {/* ==========================================
          1. HERO SECTION — MAXIMALIST BENTO MATRIX
         ========================================== */}
      <section id="hero" className="space-y-6 pt-4">
        {/* Top Continuous Marquee Ticker */}
        <div className="border-3 border-black shadow-[4px_4px_0px_#000]">
          <MarqueeTicker variant="yellow" />
        </div>

        <BlurFade delay={0.1} forceAnimate={true} className="w-full space-y-6">
          
          {/* Giant Display Headline */}
          <div className="border-b-3 border-black pb-6 space-y-4">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-ink-dim uppercase">
              <span className="bg-black text-white px-2.5 py-1 border border-black">[SYSTEM MATRIX v2.4]</span>
              <span className="text-ink font-mono font-extrabold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-btn-primary border border-black animate-ping" /> MAXIMALIST BRUTALISM
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-black uppercase tracking-tighter leading-none flex flex-wrap items-baseline gap-x-4">
              <span className="text-ink">RISHABH</span>
              <span className="text-outline">SHARMA</span>
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-black/20 mt-4">
              <span className="text-xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-ink flex items-center gap-3">
                SOFTWARE ENGINEER <span className="inline-flex items-center justify-center w-9 h-9 rounded-none border-2 border-black bg-btn-primary text-btn-primary-text text-base shadow-[2px_2px_0px_#000]">→</span>
              </span>

              {/* GitHub Badges Quick Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <GithubBadges compact={true} />
                <span className="bg-btn-primary text-btn-primary-text px-3 py-1 border-2 border-black font-mono text-xs font-bold uppercase flex items-center gap-1.5 rounded-none shadow-[2px_2px_0px_#000]">
                  <span className="w-2 h-2 bg-black animate-pulse" /> OPEN FOR ROLES
                </span>
              </div>
            </div>
          </div>

          {/* Hero Grid Bento Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none">
            
            {/* Left Column: Directives */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-6 border-b-3 md:border-b-0 md:border-r-3 border-black">
              <div className="text-xs font-black uppercase tracking-widest text-ink border-b-2 border-black pb-2 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-btn-accent border border-black" /> Engineering Directives
                </span>
                <span className="font-mono text-[10px] text-ink-faint">SPEC #01</span>
              </div>
              
              <div className="space-y-3.5">
                <div className="border-b border-black/20 pb-2.5">
                  <span className="text-[11px] font-bold text-ink-faint block uppercase">Primary Focus</span>
                  <span className="text-sm sm:text-base font-extrabold text-ink uppercase">Backend Systems & LLM Integration Pipelines</span>
                </div>

                <div className="border-b border-black/20 pb-2.5">
                  <span className="text-[11px] font-bold text-ink-faint block uppercase">Academic Degree</span>
                  <span className="text-sm sm:text-base font-extrabold text-ink uppercase">B.Tech CSE (AI & ML) — SMS Lucknow</span>
                </div>

                <div className="border-b border-black/20 pb-2.5">
                  <span className="text-[11px] font-bold text-ink-faint block uppercase">Core Infrastructure</span>
                  <span className="text-sm sm:text-base font-extrabold text-ink uppercase">Node.js · Express v5 · MongoDB · Upstash Redis</span>
                </div>

                <div className="border-b border-black/20 pb-2.5">
                  <span className="text-[11px] font-bold text-ink-faint block uppercase">Deployment & Testing</span>
                  <span className="text-sm sm:text-base font-extrabold text-ink uppercase">Docker · AWS EC2 · Cloudflare R2 · Jest Unit Tests</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                  className="brutal-btn py-3 px-6 text-xs uppercase flex items-center gap-2 rounded-none cursor-pointer"
                >
                  EXPLORE WORK <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </button>
                <a
                  href="https://drive.google.com/file/d/1_TSEuYMucfqFTDUs2-YR2tvL9uXo5ZBh/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-btn-secondary text-btn-secondary-text border-2 border-black shadow-[2px_2px_0px_#000] font-bold text-xs py-3 px-6 uppercase hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-none flex items-center gap-1.5 cursor-pointer"
                >
                  RESUME PDF <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </a>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-btn-accent text-btn-accent-text border-2 border-black shadow-[2px_2px_0px_#000] font-bold text-xs py-3 px-6 uppercase hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none rounded-none cursor-pointer"
                >
                  GET IN TOUCH
                </button>
              </div>
            </div>

            {/* Right Column: Metrics Matrix */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between bg-bg-softer space-y-6">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <span className="font-extrabold text-xs text-ink uppercase tracking-wider">Engineering Impact Matrix</span>
                <span className="bg-btn-primary text-btn-primary-text font-black text-[10px] px-2 py-0.5 border border-black uppercase rounded-none">ACTIVE METRICS</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-black bg-bg-soft p-4 shadow-[2px_2px_0px_#000] rounded-none">
                  <div className="text-3xl sm:text-4xl font-black text-ink">04+</div>
                  <div className="text-xs font-bold text-ink-dim uppercase mt-1">Software Internships</div>
                </div>
                <div className="border-2 border-black bg-bg-soft p-4 shadow-[2px_2px_0px_#000] rounded-none">
                  <div className="text-3xl sm:text-4xl font-black text-ink">150+</div>
                  <div className="text-xs font-bold text-ink-dim uppercase mt-1">REST API Endpoints</div>
                </div>
                <div className="border-2 border-black bg-bg-soft p-4 shadow-[2px_2px_0px_#000] rounded-none">
                  <div className="text-3xl sm:text-4xl font-black text-ink">1st</div>
                  <div className="text-xs font-bold text-ink-dim uppercase mt-1">Ideas to Impact Winner</div>
                </div>
                <div className="border-2 border-black bg-bg-soft p-4 shadow-[2px_2px_0px_#000] rounded-none">
                  <div className="text-3xl sm:text-4xl font-black text-ink">&lt;2s</div>
                  <div className="text-xs font-bold text-ink-dim uppercase mt-1">Emergency SOS Latency</div>
                </div>
              </div>

              <div className="p-4 border-2 border-black bg-btn-primary text-btn-primary-text space-y-1 shadow-[2px_2px_0px_#000] rounded-none">
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
            <span className="bg-btn-secondary text-btn-secondary-text font-extrabold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none uppercase">
              RISHABH SHARMA
            </span>
          </div>
        </TextReveal>

        <BlurFade delay={0.1}>
          <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none grid grid-cols-1 lg:grid-cols-12">
            {/* Bio Left Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 border-b-3 lg:border-b-0 lg:border-r-3 border-black">
              <div className="text-xs font-black uppercase tracking-wider text-ink border-b-2 border-black pb-2">
                // System Developer Statement
              </div>
              
              <p className="text-lg sm:text-xl font-bold text-ink leading-relaxed tracking-tight">
                Backend-focused Software Engineer specializing in <span className="bg-btn-primary text-btn-primary-text px-1.5 py-0.5 border border-black">scalable API design</span>, microservices, and hybrid LLM orchestration pipelines.
              </p>

              <p className="text-ink-dim leading-relaxed font-medium text-sm sm:text-base">
                Final year B.Tech student in Computer Science (AI & ML) at SMS Lucknow. I design deterministic systems that handle high throughput under tight performance budgets, prioritizing unit test coverage, automated CI/CD pipelines, and defensive security layers.
              </p>

              <div className="pt-4 border-t-2 border-black/20 flex flex-wrap gap-2">
                {['Node.js', 'Express v5', 'MongoDB', 'Docker', 'AWS EC2', 'Cloudflare R2', 'Jest', 'Upstash Redis'].map((item, idx) => {
                  const badgeClasses = [
                    'bg-btn-badge-1 text-btn-badge-1-text',
                    'bg-btn-badge-2 text-btn-badge-2-text',
                    'bg-btn-badge-3 text-btn-badge-3-text',
                  ];
                  return (
                    <span key={item} className={`font-bold text-xs ${badgeClasses[idx % 3]} border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000] rounded-none`}>
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Core Competencies Right Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 space-y-6 bg-bg-softer flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-black uppercase tracking-wider text-ink border-b-2 border-black pb-2 flex items-center justify-between">
                  <span>Architecture Principles</span>
                  <span className="font-mono text-[10px] text-ink-faint">CORE</span>
                </div>

                <div className="space-y-3 font-mono text-xs text-ink-dim font-medium">
                  <div className="p-3 border-2 border-black bg-bg-soft shadow-[2px_2px_0px_#000] flex items-center justify-between">
                    <span>API Performance</span>
                    <span className="font-extrabold text-ink">&lt; 150ms P99 Latency</span>
                  </div>
                  <div className="p-3 border-2 border-black bg-bg-soft shadow-[2px_2px_0px_#000] flex items-center justify-between">
                    <span>Security Layer</span>
                    <span className="font-extrabold text-ink">JWT + Dual OTP Auth</span>
                  </div>
                  <div className="p-3 border-2 border-black bg-bg-soft shadow-[2px_2px_0px_#000] flex items-center justify-between">
                    <span>Real-Time Engine</span>
                    <span className="font-extrabold text-ink">Socket.io + Upstash PubSub</span>
                  </div>
                  <div className="p-3 border-2 border-black bg-bg-soft shadow-[2px_2px_0px_#000] flex items-center justify-between">
                    <span>Containerization</span>
                    <span className="font-extrabold text-ink">Docker + AWS EC2 Compose</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-black">
                <a
                  href="/resume"
                  className="w-full bg-btn-secondary text-btn-secondary-text border-2 border-black px-4 py-3 text-xs font-extrabold shadow-[3px_3px_0px_#000] uppercase rounded-none flex items-center justify-center gap-2 hover:bg-btn-primary hover:text-btn-primary-text transition-colors"
                >
                  Inspect Full Resume Specs <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </a>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>
    </>
  );
});
