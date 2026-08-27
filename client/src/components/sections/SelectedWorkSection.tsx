import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, ArrowRight } from 'lucide-react';
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
            [ 04 FEATURED PROJECTS ]
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

      {/* Dynamic Project Display: Spotlight + 2-Column Grid */}
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

        const flagship = filteredProjects.find((p) => p.slug === 'layerzero') || filteredProjects[0];
        const gridProjects = selectedCategory === 'ALL'
          ? filteredProjects.filter((p) => p.slug !== flagship.slug)
          : filteredProjects;

        return (
          <div className="space-y-10">
            {/* Flagship Spotlight */}
            {(selectedCategory === 'ALL' || selectedCategory === flagship.category) && (
              <BlurFade delay={0.2}>
                <div className="border-3 border-black bg-bg-soft shadow-[8px_8px_0px_#000] hover:shadow-[10px_10px_0px_#000] transition-all rounded-none overflow-hidden relative">
                  
                  {/* Flagship Header Bar */}
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

                  {/* Flagship Body Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* Left: Info & Categorized Tech Stack */}
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

                      {/* Categorized Tech Stack Badges */}
                      <div className="space-y-3 pt-2 border-t-2 border-black/20">
                        <span className="font-extrabold text-xs text-ink uppercase tracking-wider block">
                          Categorized Architecture Stack
                        </span>
                        
                        {flagship.categorizedTags.ai && flagship.categorizedTags.ai.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">AI / LLM:</span>
                            {flagship.categorizedTags.ai.map((tag) => (
                              <span key={tag} className="font-bold text-xs bg-btn-primary text-btn-primary-text border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {flagship.categorizedTags.backend && flagship.categorizedTags.backend.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">BACKEND:</span>
                            {flagship.categorizedTags.backend.map((tag) => (
                              <span key={tag} className="font-bold text-xs bg-btn-secondary text-btn-secondary-text border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {flagship.categorizedTags.devops && flagship.categorizedTags.devops.length > 0 && (
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

                      {/* Features Checklist */}
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

                    {/* Right: Embedded Interactive Screenshot Carousel */}
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

                      <div className="p-4 border-2 border-black bg-btn-secondary text-btn-secondary-text shadow-[2px_2px_0px_#000] text-xs font-bold uppercase">
                        ⚡ Upstash Redis SHA-256 fingerprint caching reduces summary latency from 8.5s to 150ms.
                      </div>
                    </div>

                  </div>

                </div>
              </BlurFade>
            )}

            {/* 2-Column Grid & Bottom Full-Width Card */}
            {gridProjects.length > 0 && (
              <div className="space-y-8">
                {selectedCategory === 'ALL' && (
                  <div className="flex items-center justify-between border-b-2 border-black pb-2">
                    <h3 className="font-black text-xl text-ink uppercase tracking-tight flex items-center gap-2">
                      <span>OTHER FEATURED SYSTEMS</span>
                    </h3>
                    <span className="font-mono text-xs font-bold text-ink-dim uppercase">
                      [{gridProjects.length} ARCHITECTURES]
                    </span>
                  </div>
                )}

                {(() => {
                  const standardGridProjects = gridProjects.filter((p) => p.slug !== 'kaushal-ai');
                  const bottomProject = gridProjects.find((p) => p.slug === 'kaushal-ai');

                  return (
                    <>
                      {standardGridProjects.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {standardGridProjects.map((project, pIdx) => (
                            <BlurFade key={project.slug} delay={0.25 + pIdx * 0.1}>
                              <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000] transition-all rounded-none overflow-hidden flex flex-col justify-between h-full">
                                
                                {/* Card Header */}
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

                                {/* Embedded Project Carousel */}
                                <div className="p-4 border-b-3 border-black bg-black/5">
                                  <ProjectCarousel images={project.images} projectName={project.name} />
                                </div>

                                {/* Card Body */}
                                <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                                  <p className="text-ink-dim text-xs sm:text-sm font-medium leading-relaxed">
                                    {project.problem}
                                  </p>

                                  {/* Categorized Tech Stack Badges */}
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

                                  {/* Details Button */}
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
                      )}

                      {/* KaushalAI Bottom Full-Width Spotlight Card */}
                      {bottomProject && (
                        <BlurFade delay={0.4}>
                          <div className="border-3 border-black bg-bg-soft shadow-[8px_8px_0px_#000] hover:shadow-[10px_10px_0px_#000] transition-all rounded-none overflow-hidden relative">
                            
                            <div className="flex flex-wrap items-center justify-between bg-bg-softer border-b-3 border-black px-6 py-4 gap-4">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="bg-black text-white text-xs font-mono font-extrabold px-3 py-1 border-2 border-black rounded-none">
                                  AWARD WINNING SYSTEM
                                </span>
                                {bottomProject.badgeText && (
                                  <span className="bg-btn-primary text-btn-primary-text text-xs font-extrabold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase">
                                    {bottomProject.badgeText}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3">
                                {bottomProject.githubUrl && (
                                  <a
                                    href={bottomProject.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 bg-btn-secondary text-btn-secondary-text hover:bg-btn-primary hover:text-btn-primary-text border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none transition-colors"
                                  >
                                    <Github className="w-4 h-4" /> GitHub
                                  </a>
                                )}
                                {bottomProject.liveUrl && (
                                  <a
                                    href={bottomProject.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 bg-btn-primary text-btn-primary-text hover:bg-btn-accent hover:text-btn-accent-text border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_#000] uppercase rounded-none transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" /> Live System
                                  </a>
                                )}
                                <Link
                                  to={`/projects/${bottomProject.slug}`}
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
                                    {bottomProject.name}
                                    <ArrowRight className="w-7 h-7 text-ink" />
                                  </h3>
                                  <div className="text-xs font-bold text-ink uppercase mt-1">
                                    // {bottomProject.tagline}
                                  </div>
                                </div>

                                <p className="text-ink-dim text-sm sm:text-base font-medium leading-relaxed">
                                  {bottomProject.problem}
                                </p>

                                {bottomProject.result && (
                                  <div className="p-4 border-2 border-black bg-btn-primary text-btn-primary-text shadow-[3px_3px_0px_#000] text-xs font-black uppercase">
                                    🏆 {bottomProject.result}
                                  </div>
                                )}

                                <div className="space-y-3 pt-2 border-t-2 border-black/20">
                                  <span className="font-extrabold text-xs text-ink uppercase tracking-wider block">
                                    Categorized Architecture Stack
                                  </span>
                                  
                                  {bottomProject.categorizedTags.ai && bottomProject.categorizedTags.ai.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">AI / LLM:</span>
                                      {bottomProject.categorizedTags.ai.map((tag) => (
                                        <span key={tag} className="font-bold text-xs bg-btn-primary text-btn-primary-text border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {bottomProject.categorizedTags.backend && bottomProject.categorizedTags.backend.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">BACKEND:</span>
                                      {bottomProject.categorizedTags.backend.map((tag) => (
                                        <span key={tag} className="font-bold text-xs bg-btn-secondary text-btn-secondary-text border-2 border-black px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {bottomProject.categorizedTags.devops && bottomProject.categorizedTags.devops.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-mono text-[10px] font-black uppercase text-ink-dim w-16">DEVOPS:</span>
                                      {bottomProject.categorizedTags.devops.map((tag) => (
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
                                      {bottomProject.images.length} SCREENSHOT
                                    </span>
                                  </div>

                                  <ProjectCarousel images={bottomProject.images} projectName={bottomProject.name} />
                                </div>

                                <div className="p-4 border-2 border-black bg-btn-accent text-btn-accent-text shadow-[2px_2px_0px_#000] text-xs font-bold uppercase">
                                  🌐 Rural-optimized, mobile-first marketplace with dynamic QR-verifiable skill certifications.
                                </div>
                              </div>

                            </div>

                          </div>
                        </BlurFade>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        );
      })()}
    </section>
  );
});
