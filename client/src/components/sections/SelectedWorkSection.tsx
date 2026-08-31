import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, ArrowRight, Gavel, Award, Zap } from 'lucide-react';
import { projects } from '../../data/projects';
import { BlurFade } from '../BlurFade';
import { TextReveal } from '../TextReveal';
import ProjectCarousel from '../ProjectCarousel';

interface SelectedWorkSectionProps {
  playKeystroke?: () => void;
}

export const SelectedWorkSection = memo(function SelectedWorkSection({ playKeystroke }: SelectedWorkSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  return (
    <section id="work" className="scroll-mt-24 space-y-8">
      <TextReveal delay={0.1} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-3 border-black pb-4 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-ink flex items-center gap-3">
              <span>01 // SELECTED WORK</span>
              <span className="text-outline hidden sm:inline">& SYSTEMS</span>
            </h2>
            <p className="text-xs font-bold text-ink-dim uppercase mt-1">
              ENGINEERED BACKEND ARCHITECTURES • HYBRID AI PIPELINES • PRODUCTION SYSTEMS
            </p>
          </div>

          <span className="bg-btn-primary text-btn-primary-text font-extrabold text-xs px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none uppercase self-start sm:self-auto">
            [ 05 FEATURED PROJECTS ]
          </span>
        </div>
      </TextReveal>

      {/* Category Filter Pills */}
      <BlurFade delay={0.15}>
        <div className="flex flex-wrap gap-2 pt-1 pb-3 border-b-2 border-black/10">
          {['ALL', 'AI Infrastructure', 'Full-Stack AI', 'Offline AI', 'Fintech & Tooling'].map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  if (playKeystroke) playKeystroke();
                  setSelectedCategory(cat);
                }}
                className={`font-mono text-xs font-bold px-3 py-1.5 border-2 border-black uppercase rounded-none transition-all ${
                  isActive
                    ? 'bg-btn-primary text-btn-primary-text shadow-[3px_3px_0px_#000] -translate-y-0.5'
                    : 'bg-bg-softer text-ink hover:bg-btn-secondary hover:text-btn-secondary-text shadow-[2px_2px_0px_#000]'
                }`}
              >
                {cat === 'ALL' ? `ALL PROJECTS [${projects.length}]` : `${cat}`}
              </button>
            );
          })}
        </div>
      </BlurFade>

      {/* Dynamic Project Display: Custom Bento Grid for ALL, Standard Grid for Filtered */}
      {(() => {
        const filteredProjects = selectedCategory === 'ALL'
          ? projects
          : projects.filter((p) => p.category === selectedCategory);

        if (filteredProjects.length === 0) {
          return (
            <div className="p-8 border-3 border-black bg-bg-soft text-center font-bold text-ink uppercase">
              No projects found in this category.
            </div>
          );
        }

        // Custom Bento Layout for ALL Projects
        if (selectedCategory === 'ALL') {
          const flagship = projects.find((p) => p.slug === 'layerzero') || projects[0];
          const jaasProject = projects.find((p) => p.slug === 'jaas');
          const deepsynthProject = projects.find((p) => p.slug === 'deepsynth');
          const calculatorProject = projects.find((p) => p.slug === 'calculator');
          const kaushalProject = projects.find((p) => p.slug === 'kaushal-ai');

          return (
            <div className="space-y-10">
              
              {/* 1. TOP SPOTLIGHT CARD: LAYERZERO */}
              <BlurFade delay={0.2}>
                <div className="border-3 border-black bg-bg-soft shadow-[8px_8px_0px_#000] hover:shadow-[10px_10px_0px_#000] transition-all rounded-none overflow-hidden relative">
                  
                  {/* Header Bar */}
                  <div className="flex flex-wrap items-center justify-between bg-bg-softer border-b-3 border-black px-6 py-4 gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-black text-white text-xs font-mono font-extrabold px-3 py-1 border-2 border-black rounded-none">
                        FLAGSHIP SPOTLIGHT
                      </span>
                      {flagship.badgeText && (
                        <span className="bg-btn-primary text-btn-primary-text text-xs font-extrabold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase">
                          {flagship.badgeText}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {flagship.githubUrl && (
                        <a
                          href={flagship.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-btn-secondary text-btn-secondary-text hover:bg-btn-primary hover:text-btn-primary-text border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none transition-colors"
                        >
                          <Github className="w-4 h-4" /> GitHub
                        </a>
                      )}
                      {flagship.liveUrl && (
                        <a
                          href={flagship.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-btn-primary text-btn-primary-text hover:bg-btn-accent hover:text-btn-accent-text border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" /> Live System
                        </a>
                      )}
                      <Link
                        to={`/projects/${flagship.slug}`}
                        className="bg-btn-accent text-btn-accent-text border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none flex items-center gap-1 hover:translate-x-0.5 transition-transform"
                      >
                        Details <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                      </Link>
                    </div>
                  </div>

                  {/* Body Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b-3 lg:border-b-0 lg:border-r-3 border-black">
                      <div>
                        <h3 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight flex items-center gap-2">
                          {flagship.name}
                          <ArrowRight className="w-7 h-7 text-ink" />
                        </h3>
                        <div className="text-xs font-bold text-ink uppercase mt-1">
                          // {flagship.tagline}
                        </div>
                      </div>

                      <p className="text-ink-dim text-sm sm:text-base font-medium leading-relaxed">
                        {flagship.problem}
                      </p>

                      <div className="space-y-3 pt-2 border-t-2 border-black/20">
                        <span className="font-extrabold text-xs text-ink uppercase tracking-wider block">
                          Categorized Architecture Stack
                        </span>
                        
                        {flagship.categorizedTags.ai && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">AI / LLM:</span>
                            {flagship.categorizedTags.ai.map((tag) => (
                              <span key={tag} className="font-bold text-xs bg-btn-primary text-btn-primary-text border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {flagship.categorizedTags.backend && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">BACKEND:</span>
                            {flagship.categorizedTags.backend.map((tag) => (
                              <span key={tag} className="font-bold text-xs bg-btn-secondary text-btn-secondary-text border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {flagship.categorizedTags.devops && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">DEVOPS:</span>
                            {flagship.categorizedTags.devops.map((tag) => (
                              <span key={tag} className="font-bold text-xs bg-btn-accent text-btn-accent-text border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 pt-2 border-t-2 border-black/20">
                        <span className="font-extrabold text-xs text-ink uppercase tracking-wider block">
                          Key System Highlights
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {flagship.keyFeatures.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-btn-primary border border-black rounded-none mt-1.5 shrink-0" />
                              <span className="text-xs font-medium text-ink-dim leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-6 bg-bg-softer flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
                          <span className="font-extrabold text-xs text-ink uppercase">
                            LIVE UI SCREENSHOT PREVIEW
                          </span>
                          <span className="font-mono text-xs font-bold bg-btn-accent text-btn-accent-text px-2 py-0.5 border border-black">
                            {flagship.images.length} SCREENSHOTS
                          </span>
                        </div>
                        <ProjectCarousel images={flagship.images} projectName={flagship.name} />
                      </div>

                      <div className="p-4 border-2 border-black bg-btn-secondary text-btn-secondary-text shadow-[2px_2px_0px_#000] text-xs font-bold uppercase flex items-center gap-2">
                        <Zap className="w-4 h-4 shrink-0" /> Upstash Redis SHA-256 fingerprint caching reduces summary latency from 8.5s to 150ms.
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>


              {/* 2. MIDDLE BENTO GRID: JAAS + DEEPSYNTH & CALCULATOR */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                
                {/* LEFT: JAAS (VERTICAL SPAN) */}
                {jaasProject && (
                  <BlurFade delay={0.25} className="lg:col-span-1 lg:row-span-2 flex">
                    <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all rounded-none overflow-hidden flex flex-col justify-between w-full h-full">
                      
                      {/* Card Header */}
                      <div className="p-5 border-b-3 border-black bg-bg-softer space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="bg-black text-white text-xs font-mono font-extrabold px-2.5 py-0.5 border border-black uppercase flex items-center gap-1">
                            <Gavel className="w-3.5 h-3.5 text-btn-primary" /> {jaasProject.category}
                          </span>
                          {jaasProject.badgeText && (
                            <span className="bg-btn-primary text-btn-primary-text text-[11px] font-extrabold px-2.5 py-0.5 border border-black shadow-[1px_1px_0px_#000] uppercase">
                              {jaasProject.badgeText}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <h4 className="text-3xl font-black text-ink uppercase tracking-tight">
                            {jaasProject.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            {jaasProject.githubUrl && (
                              <a
                                href={jaasProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-btn-secondary text-btn-secondary-text hover:bg-btn-primary hover:text-btn-primary-text border-2 border-black p-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase transition-colors"
                                title="View GitHub Repository"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {jaasProject.liveUrl && (
                              <a
                                href={jaasProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-btn-primary text-btn-primary-text hover:bg-btn-accent hover:text-btn-accent-text border-2 border-black p-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase transition-colors"
                                title="View Live System"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="text-xs font-bold text-ink-dim uppercase">
                          // {jaasProject.tagline}
                        </div>
                      </div>

                      {/* Embedded Project Carousel */}
                      <div className="p-4 border-b-3 border-black bg-black/5">
                        <ProjectCarousel images={jaasProject.images} projectName={jaasProject.name} />
                      </div>

                      {/* Card Body */}
                      <div className="p-6 space-y-5 flex-grow flex flex-col justify-between">
                        <p className="text-ink-dim text-xs sm:text-sm font-medium leading-relaxed">
                          {jaasProject.problem}
                        </p>

                        {/* Categorized Tech Stack Badges */}
                        <div className="space-y-3 pt-3 border-t-2 border-black/20">
                          <span className="font-extrabold text-xs text-ink uppercase block tracking-wider">
                            COURTROOM ARCHITECTURE STACK
                          </span>

                          <div className="space-y-2">
                            {jaasProject.categorizedTags.ai && (
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">AI / LLM:</span>
                                {jaasProject.categorizedTags.ai.map((tag) => (
                                  <span key={tag} className="font-bold text-[11px] bg-btn-primary text-btn-primary-text border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {jaasProject.categorizedTags.backend && (
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">BACKEND:</span>
                                {jaasProject.categorizedTags.backend.map((tag) => (
                                  <span key={tag} className="font-bold text-[11px] bg-btn-secondary text-btn-secondary-text border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {jaasProject.categorizedTags.devops && (
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">DEVOPS:</span>
                                {jaasProject.categorizedTags.devops.map((tag) => (
                                  <span key={tag} className="font-bold text-[11px] bg-btn-accent text-btn-accent-text border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Highlights Checklist */}
                        <div className="space-y-2 pt-3 border-t-2 border-black/20">
                          <span className="font-extrabold text-xs text-ink uppercase block tracking-wider">
                            Key Judicial Features
                          </span>
                          <ul className="space-y-1.5">
                            {jaasProject.keyFeatures.slice(0, 4).map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <span className="w-2 h-2 bg-btn-primary border border-black rounded-none mt-1 shrink-0" />
                                <span className="text-xs font-medium text-ink-dim leading-tight">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 border-2 border-black bg-btn-primary text-btn-primary-text shadow-[2px_2px_0px_#000] text-xs font-bold uppercase flex items-center gap-2">
                          <Zap className="w-4 h-4 shrink-0" /> Upstash Redis sliding rate limits (1 guest / 67 auth per 24h) & SHA-256 fingerprint caching.
                        </div>

                        {/* Details Button */}
                        <div className="pt-2 border-t-2 border-black/20">
                          <Link
                            to={`/projects/${jaasProject.slug}`}
                            className="w-full bg-btn-accent text-btn-accent-text border-2 border-black px-4 py-2.5 text-xs font-bold shadow-[3px_3px_0px_#000] uppercase rounded-none flex items-center justify-center gap-2 hover:bg-btn-primary hover:text-btn-primary-text transition-colors"
                          >
                            View System Specification & Details <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </BlurFade>
                )}


                {/* RIGHT TOP: DEEPSYNTH */}
                {deepsynthProject && (
                  <BlurFade delay={0.3} className="lg:col-span-1">
                    <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all rounded-none overflow-hidden flex flex-col justify-between h-full">
                      
                      <div className="p-5 border-b-3 border-black bg-bg-softer space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="bg-black text-white text-xs font-mono font-extrabold px-2.5 py-0.5 border border-black">
                            {deepsynthProject.category}
                          </span>
                          {deepsynthProject.badgeText && (
                            <span className="bg-btn-primary text-btn-primary-text text-[11px] font-extrabold px-2.5 py-0.5 border border-black shadow-[1px_1px_0px_#000] uppercase">
                              {deepsynthProject.badgeText}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <h4 className="text-2xl font-black text-ink uppercase tracking-tight">
                            {deepsynthProject.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            {deepsynthProject.githubUrl && (
                              <a
                                href={deepsynthProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-btn-secondary text-btn-secondary-text hover:bg-btn-primary hover:text-btn-primary-text border-2 border-black p-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase transition-colors"
                                title="View GitHub Repository"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="text-xs font-bold text-ink-dim uppercase">
                          // {deepsynthProject.tagline}
                        </div>
                      </div>

                      <div className="p-4 border-b-3 border-black bg-black/5">
                        <ProjectCarousel images={deepsynthProject.images} projectName={deepsynthProject.name} />
                      </div>

                      <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                        <p className="text-ink-dim text-xs sm:text-sm font-medium leading-relaxed">
                          {deepsynthProject.problem}
                        </p>

                        <div className="space-y-2 pt-3 border-t-2 border-black/20">
                          <span className="font-extrabold text-[11px] text-ink uppercase block">
                            ARCHITECTURE STACK
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {deepsynthProject.categorizedTags.ai?.map((tag) => (
                              <span key={tag} className="font-bold text-[11px] bg-btn-primary text-btn-primary-text border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                                {tag}
                              </span>
                            ))}
                            {deepsynthProject.categorizedTags.backend?.map((tag) => (
                              <span key={tag} className="font-bold text-[11px] bg-btn-secondary text-btn-secondary-text border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t-2 border-black/20">
                          <Link
                            to={`/projects/${deepsynthProject.slug}`}
                            className="w-full bg-btn-accent text-btn-accent-text border-2 border-black px-4 py-2 text-xs font-bold shadow-[3px_3px_0px_#000] uppercase rounded-none flex items-center justify-center gap-2 hover:bg-btn-primary hover:text-btn-primary-text transition-colors"
                          >
                            View System Specification & Details <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </BlurFade>
                )}


                {/* RIGHT BOTTOM: CALCULATOR */}
                {calculatorProject && (
                  <BlurFade delay={0.35} className="lg:col-span-1">
                    <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all rounded-none overflow-hidden flex flex-col justify-between h-full">
                      
                      <div className="p-5 border-b-3 border-black bg-bg-softer space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="bg-black text-white text-xs font-mono font-extrabold px-2.5 py-0.5 border border-black">
                            {calculatorProject.category}
                          </span>
                          {calculatorProject.badgeText && (
                            <span className="bg-btn-primary text-btn-primary-text text-[11px] font-extrabold px-2.5 py-0.5 border border-black shadow-[1px_1px_0px_#000] uppercase">
                              {calculatorProject.badgeText}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <h4 className="text-2xl font-black text-ink uppercase tracking-tight">
                            {calculatorProject.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            {calculatorProject.githubUrl && (
                              <a
                                href={calculatorProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-btn-secondary text-btn-secondary-text hover:bg-btn-primary hover:text-btn-primary-text border-2 border-black p-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase transition-colors"
                                title="View GitHub Repository"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {calculatorProject.liveUrl && (
                              <a
                                href={calculatorProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-btn-primary text-btn-primary-text hover:bg-btn-accent hover:text-btn-accent-text border-2 border-black p-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase transition-colors"
                                title="View Live System"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="text-xs font-bold text-ink-dim uppercase">
                          // {calculatorProject.tagline}
                        </div>
                      </div>

                      <div className="p-4 border-b-3 border-black bg-black/5">
                        <ProjectCarousel images={calculatorProject.images} projectName={calculatorProject.name} />
                      </div>

                      <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                        <p className="text-ink-dim text-xs sm:text-sm font-medium leading-relaxed">
                          {calculatorProject.problem}
                        </p>

                        <div className="space-y-2 pt-3 border-t-2 border-black/20">
                          <span className="font-extrabold text-[11px] text-ink uppercase block">
                            ARCHITECTURE STACK
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {calculatorProject.categorizedTags.backend?.map((tag) => (
                              <span key={tag} className="font-bold text-[11px] bg-btn-secondary text-btn-secondary-text border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                                {tag}
                              </span>
                            ))}
                            {calculatorProject.categorizedTags.devops?.map((tag) => (
                              <span key={tag} className="font-bold text-[11px] bg-btn-accent text-btn-accent-text border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t-2 border-black/20">
                          <Link
                            to={`/projects/${calculatorProject.slug}`}
                            className="w-full bg-btn-accent text-btn-accent-text border-2 border-black px-4 py-2 text-xs font-bold shadow-[3px_3px_0px_#000] uppercase rounded-none flex items-center justify-center gap-2 hover:bg-btn-primary hover:text-btn-primary-text transition-colors"
                          >
                            View System Specification & Details <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </BlurFade>
                )}

              </div>


              {/* 3. BOTTOM SPOTLIGHT CARD: KAUSHAL AI */}
              {kaushalProject && (
                <BlurFade delay={0.4}>
                  <div className="border-3 border-black bg-bg-soft shadow-[8px_8px_0px_#000] hover:shadow-[10px_10px_0px_#000] transition-all rounded-none overflow-hidden relative">
                    
                    <div className="flex flex-wrap items-center justify-between bg-bg-softer border-b-3 border-black px-6 py-4 gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-black text-white text-xs font-mono font-extrabold px-3 py-1 border-2 border-black rounded-none">
                          AWARD WINNING SYSTEM
                        </span>
                        {kaushalProject.badgeText && (
                          <span className="bg-btn-primary text-btn-primary-text text-xs font-extrabold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase">
                            {kaushalProject.badgeText}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        {kaushalProject.githubUrl && (
                          <a
                            href={kaushalProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-btn-secondary text-btn-secondary-text hover:bg-btn-primary hover:text-btn-primary-text border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none transition-colors"
                          >
                            <Github className="w-4 h-4" /> GitHub
                          </a>
                        )}
                        {kaushalProject.liveUrl && (
                          <a
                            href={kaushalProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 bg-btn-primary text-btn-primary-text hover:bg-btn-accent hover:text-btn-accent-text border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" /> Live System
                          </a>
                        )}
                        <Link
                          to={`/projects/${kaushalProject.slug}`}
                          className="bg-btn-accent text-btn-accent-text border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none flex items-center gap-1 hover:translate-x-0.5 transition-transform"
                        >
                          Details <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      
                      <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b-3 lg:border-b-0 lg:border-r-3 border-black">
                        <div>
                          <h3 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight flex items-center gap-2">
                            {kaushalProject.name}
                            <ArrowRight className="w-7 h-7 text-ink" />
                          </h3>
                          <div className="text-xs font-bold text-ink uppercase mt-1">
                            // {kaushalProject.tagline}
                          </div>
                        </div>

                        <p className="text-ink-dim text-sm sm:text-base font-medium leading-relaxed">
                          {kaushalProject.problem}
                        </p>

                        {kaushalProject.result && (
                          <div className="p-4 border-2 border-black bg-btn-primary text-btn-primary-text shadow-[3px_3px_0px_#000] text-xs font-black uppercase flex items-center gap-2">
                            <Award className="w-5 h-5 shrink-0" /> {kaushalProject.result}
                          </div>
                        )}

                        <div className="space-y-3 pt-2 border-t-2 border-black/20">
                          <span className="font-extrabold text-xs text-ink uppercase tracking-wider block">
                            Categorized Architecture Stack
                          </span>
                          
                          {kaushalProject.categorizedTags.ai && (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">AI / LLM:</span>
                              {kaushalProject.categorizedTags.ai.map((tag) => (
                                <span key={tag} className="font-bold text-xs bg-btn-primary text-btn-primary-text border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {kaushalProject.categorizedTags.backend && (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">BACKEND:</span>
                              {kaushalProject.categorizedTags.backend.map((tag) => (
                                <span key={tag} className="font-bold text-xs bg-btn-secondary text-btn-secondary-text border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {kaushalProject.categorizedTags.devops && (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">DEVOPS:</span>
                              {kaushalProject.categorizedTags.devops.map((tag) => (
                                <span key={tag} className="font-bold text-xs bg-btn-accent text-btn-accent-text border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="lg:col-span-5 p-6 bg-bg-softer flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-4">
                            <span className="font-extrabold text-xs text-ink uppercase">
                              LIVE UI SCREENSHOT PREVIEW
                            </span>
                            <span className="font-mono text-xs font-bold bg-btn-accent text-btn-accent-text px-2 py-0.5 border border-black">
                              {kaushalProject.images.length} SCREENSHOT
                            </span>
                          </div>

                          <ProjectCarousel images={kaushalProject.images} projectName={kaushalProject.name} />
                        </div>

                        <div className="p-4 border-2 border-black bg-btn-accent text-btn-accent-text shadow-[2px_2px_0px_#000] text-xs font-bold uppercase">
                          🌐 Rural-optimized, mobile-first marketplace with dynamic QR-verifiable skill certifications.
                        </div>
                      </div>

                    </div>

                  </div>
                </BlurFade>
              )}

            </div>
          );
        }

        // Standard grid rendering for filtered categories (when not 'ALL')
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, pIdx) => (
              <BlurFade key={project.slug} delay={0.2 + pIdx * 0.1}>
                <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all rounded-none overflow-hidden flex flex-col justify-between h-full">
                  <div className="p-5 border-b-3 border-black bg-bg-softer space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="bg-black text-white text-xs font-mono font-extrabold px-2.5 py-0.5 border border-black">
                        {project.category}
                      </span>
                      {project.badgeText && (
                        <span className="bg-btn-primary text-btn-primary-text text-[11px] font-extrabold px-2.5 py-0.5 border border-black shadow-[1px_1px_0px_#000] uppercase">
                          {project.badgeText}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-2xl font-black text-ink uppercase tracking-tight">
                        {project.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-btn-secondary text-btn-secondary-text hover:bg-btn-primary hover:text-btn-primary-text border-2 border-black p-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase transition-colors"
                            title="View GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-btn-primary text-btn-primary-text hover:bg-btn-accent hover:text-btn-accent-text border-2 border-black p-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase transition-colors"
                            title="View Live System"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-ink-dim uppercase">
                      // {project.tagline}
                    </div>
                  </div>

                  <div className="p-4 border-b-3 border-black bg-black/5">
                    <ProjectCarousel images={project.images} projectName={project.name} />
                  </div>

                  <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                    <p className="text-ink-dim text-xs sm:text-sm font-medium leading-relaxed">
                      {project.problem}
                    </p>

                    <div className="space-y-2 pt-3 border-t-2 border-black/20">
                      <span className="font-extrabold text-[11px] text-ink uppercase block">
                        ARCHITECTURE STACK
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.categorizedTags.ai?.map((tag) => (
                          <span key={tag} className="font-bold text-[11px] bg-btn-primary text-btn-primary-text border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                            {tag}
                          </span>
                        ))}
                        {project.categorizedTags.backend?.map((tag) => (
                          <span key={tag} className="font-bold text-[11px] bg-btn-secondary text-btn-secondary-text border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                            {tag}
                          </span>
                        ))}
                        {project.categorizedTags.devops?.map((tag) => (
                          <span key={tag} className="font-bold text-[11px] bg-btn-accent text-btn-accent-text border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t-2 border-black/20">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="w-full bg-btn-accent text-btn-accent-text border-2 border-black px-4 py-2 text-xs font-bold shadow-[3px_3px_0px_#000] uppercase rounded-none flex items-center justify-center gap-2 hover:bg-btn-primary hover:text-btn-primary-text transition-colors"
                      >
                        View System Specification & Details <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        );
      })()}
    </section>
  );
});
