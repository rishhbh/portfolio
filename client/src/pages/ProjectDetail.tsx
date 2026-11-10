import React, { useState } from 'react';
import { SplitText } from '../components/SplitText';
import { TerminalClip } from '../components/TerminalClip';
import { useNpmDownloads } from '../hooks/useNpmDownloads';
import { projects, type Project } from '../data/projects';

interface ProjectDetailProps {
  slug: string;
  onNavigate: (id: string, path: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ slug, onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cacheSimState, setCacheSimState] = useState<'cold' | 'hot'>('hot');
  const purgeportDownloads = useNpmDownloads('purgeport');

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project: Project | undefined = projects[currentIndex];

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  if (!project) {
    return (
      <div className="wrap pt-20">
        <h1 className="font-serif text-3xl">Project Not Found</h1>
        <p className="mt-4 text-[var(--muted)]">The requested architecture specification does not exist.</p>
        <button
          type="button"
          onClick={() => onNavigate('projects', '/projects')}
          className="link-ink mt-6 inline-block font-mono text-sm"
        >
          ← Return to Projects
        </button>
      </div>
    );
  }

  // Parse "How It Works" phases
  const renderPhases = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return null;

      const numMatch = trimmed.match(/^(\d+)\.\s+(.*?)(:\s+.*)?$/);
      if (numMatch) {
        const num = numMatch[1];
        const title = numMatch[2];
        const rest = numMatch[3] ? numMatch[3].slice(2) : '';
        return (
          <div key={idx} className="phase-card">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] border border-[var(--rule)] px-2 py-0.5">
                PHASE {num.padStart(2, '0')}
              </span>
              <span className="font-medium text-base text-[var(--ink)]">{title}</span>
            </div>
            {rest && (
              <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                {rest}
              </p>
            )}
          </div>
        );
      }

      return (
        <p key={idx} className="text-sm text-[var(--muted)] leading-relaxed py-1">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="wrap">
      {/* Top Back Navigation */}
      <div className="pt-8 sm:pt-12 pb-2 flex items-center justify-between border-b border-[var(--rule)]">
        <button
          type="button"
          onClick={() => onNavigate('projects', '/projects')}
          className="link-ink inline-flex items-center gap-2 font-mono text-xs text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer bg-transparent border-none p-0"
        >
          ← All Projects
        </button>
        <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider">
          SYSTEM ARCHITECTURE SPECIFICATION
        </span>
      </div>

      {/* Project Title with SplitText */}
      <header className="pt-4 pb-8">
        <SplitText
          tag="h1"
          text={project.name}
          className="page-title !pt-6 !pb-3"
          delay={120}
          trigger={project.slug}
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--rule)] pb-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--muted)]">
            <span className="border border-[var(--rule)] px-2.5 py-1">
              {project.category}
            </span>
            {project.badgeText && (
              <span className="text-[var(--ink)] font-medium">
                {project.slug === 'purgeport' && purgeportDownloads
                  ? `ZERO-DEPENDENCY NPM CLI // ${purgeportDownloads.toLocaleString()} LIVE DOWNLOADS`
                  : project.badgeText}
              </span>
            )}
          </div>

          <div className="flex items-center gap-5 font-mono text-xs">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ink"
              >
                GitHub Repository ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-ink"
              >
                {project.slug === 'purgeport' ? 'npm Registry ↗' : 'Live System ↗'}
              </a>
            )}
          </div>
        </div>

        <p className="mt-6 font-serif text-2xl sm:text-3xl leading-snug tracking-tight text-[var(--ink)] max-w-3xl">
          {project.tagline}
        </p>
      </header>

      {/* Interactive Project-Specific Demonstration */}
      {project.slug === 'purgeport' && (
        <section className="mb-12 border border-[var(--rule)] p-6 bg-[var(--panel)]">
          <div className="flex items-center justify-between mb-3 border-b border-[var(--rule)] pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              INTERACTIVE POSIX TERMINAL SIMULATOR
            </span>
            <span className="font-mono text-[11px] text-[var(--muted)]">
              Pure ESM • Zero Dependencies
            </span>
          </div>
          <p className="text-xs text-[var(--muted)] mb-4">
            Type any command below (e.g. <code className="font-mono text-[var(--ink)]">purgeport 3000</code> or <code className="font-mono text-[var(--ink)]">purgeport --help</code>) to simulate kernel socket inspection:
          </p>
          <TerminalClip
            isHot={true}
            interactive={true}
            command="purgeport 3000"
            outputLines={[
              'port 3000 was held by node (pid 4821)',
              'freed port 3000',
            ]}
          />
        </section>
      )}

      {project.slug === 'layerzero' && (
        <section className="mb-12 border border-[var(--rule)] p-6 bg-[var(--panel)]">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--rule)] pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              SHA-256 REDIS CACHE LATENCY BENCHMARK
            </span>
            <span className="font-mono text-xs text-[var(--muted)]">
              ~98% LATENCY REDUCTION
            </span>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => setCacheSimState('hot')}
              className={`editorial-btn-outline ${cacheSimState === 'hot' ? '!border-[var(--ink)] !text-[var(--ink)] font-semibold' : ''}`}
            >
              Hot Cache Hit (SHA-256 Redis)
            </button>
            <button
              type="button"
              onClick={() => setCacheSimState('cold')}
              className={`editorial-btn-outline ${cacheSimState === 'cold' ? '!border-[var(--ink)] !text-[var(--ink)] font-semibold' : ''}`}
            >
              Cold Cache Miss (Direct LLM)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className={`p-4 border ${cacheSimState === 'hot' ? 'border-[var(--ink)]' : 'border-[var(--rule)]'}`}>
              <span className="text-[var(--muted)] block">RESPONSE LATENCY</span>
              <span className="text-2xl font-serif text-[var(--ink)] mt-1 block">
                {cacheSimState === 'hot' ? '150 ms' : '8,500 ms'}
              </span>
              <p className="mt-2 text-[var(--muted)] text-[11px]">
                {cacheSimState === 'hot'
                  ? 'SHA-256 cache match retrieved directly from Upstash Redis memory.'
                  : 'Full multi-modal PDF parsing and cloud GPU token inference iteration.'}
              </p>
            </div>
            <div className="p-4 border border-[var(--rule)]">
              <span className="text-[var(--muted)] block">TOKEN & INFERENCE COST</span>
              <span className="text-2xl font-serif text-[var(--ink)] mt-1 block">
                {cacheSimState === 'hot' ? '$0.00 / 0 Tokens' : '~4,200 Tokens Billed'}
              </span>
              <p className="mt-2 text-[var(--muted)] text-[11px]">
                Deterministic hashing prevents duplicate document processing across all sessions.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Visual Artifacts / Screenshots Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--rule)] pb-2">
            <h2 className="font-serif text-2xl">Visual Artifacts & Interfaces</h2>
            <span className="font-mono text-xs text-[var(--muted)]">
              {project.images.length} Captured Screens
            </span>
          </div>

          <div className={project.images.length === 1 ? 'max-w-2xl' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}>
            {project.images.map((imgName, imgIdx) => {
              const isExternal = imgName.startsWith('http://') || imgName.startsWith('https://');
              const isPurgeportPng = imgName === 'purgeport.png';
              const imgSrc = isExternal
                ? imgName
                : isPurgeportPng
                ? '/purgeport.png'
                : `/${imgName.replace(/\.png$/, '.webp')}`;
              const fallbackSrc = isExternal
                ? imgName
                : isPurgeportPng
                ? 'https://raw.githubusercontent.com/rishhbh/purgeport/main/assets/purgeport.png'
                : `/${imgName}`;

              return (
                <div
                  key={imgIdx}
                  onClick={() => setSelectedImage(imgSrc)}
                  className="group relative border border-[var(--rule)] bg-[var(--panel)] overflow-hidden cursor-pointer aspect-video transition-all hover:border-[var(--ink)]"
                >
                  <img
                    src={imgSrc}
                    alt={`${project.name} screen ${imgIdx + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== fallbackSrc) {
                        target.src = fallbackSrc;
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="font-mono text-xs text-white bg-black/75 px-3 py-1 border border-white/20">
                      View Fullscreen ↗
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Problem Specification */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl border-b border-[var(--rule)] pb-2 mb-4">
          The Problem
        </h2>
        <p className="text-base text-[var(--muted)] leading-relaxed max-w-3xl">
          {project.problem}
        </p>
      </section>

      {/* Architecture & How It Works */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl border-b border-[var(--rule)] pb-2 mb-4">
          System Architecture & Mechanics
        </h2>
        <div className="space-y-2 max-w-3xl">
          {renderPhases(project.howItWorks)}
        </div>
      </section>

      {/* Key Architectural Features */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <section className="mb-12">
          <h2 className="font-serif text-2xl border-b border-[var(--rule)] pb-2 mb-4">
            Key Engineering Specifications
          </h2>
          <ul className="space-y-3 max-w-3xl list-none p-0">
            {project.keyFeatures.map((feat, fIdx) => (
              <li key={fIdx} className="flex items-start gap-3 text-sm text-[var(--muted)] leading-relaxed">
                <span className="font-mono text-xs text-[var(--ink)] mt-0.5 select-none">—</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Technical Stack & Categorized Tags */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl border-b border-[var(--rule)] pb-2 mb-4">
          Technology Matrix
        </h2>

        {project.categorizedTags && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 max-w-3xl">
            {project.categorizedTags.ai && project.categorizedTags.ai.length > 0 && (
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] block mb-2">
                  AI & INFERENCE
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.categorizedTags.ai.map((t, idx) => (
                    <span key={idx} className="font-mono text-xs border border-[var(--rule)] px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.categorizedTags.backend && project.categorizedTags.backend.length > 0 && (
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] block mb-2">
                  BACKEND & STORAGE
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.categorizedTags.backend.map((t, idx) => (
                    <span key={idx} className="font-mono text-xs border border-[var(--rule)] px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.categorizedTags.devops && project.categorizedTags.devops.length > 0 && (
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] block mb-2">
                  INFRASTRUCTURE & DEVOPS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.categorizedTags.devops.map((t, idx) => (
                    <span key={idx} className="font-mono text-xs border border-[var(--rule)] px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2 max-w-3xl">
          {project.techStack.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="font-mono text-xs text-[var(--muted)] bg-[var(--panel)] border border-[var(--rule)] px-2.5 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Results / Awards if present */}
      {project.result && (
        <section className="mb-14 border border-[var(--rule)] p-5 bg-[var(--panel)] max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] block mb-1">
            BENCHMARK & VERIFIED OUTCOME
          </span>
          <p className="font-serif text-xl text-[var(--ink)]">
            {project.slug === 'purgeport' && purgeportDownloads
              ? `Published to npm registry with zero runtime dependencies (v0.1.0) • ${purgeportDownloads.toLocaleString()} live downloads • Runnable instantly via npx purgeport`
              : project.result}
          </p>
        </section>
      )}

      {/* Bottom Navigation between Projects */}
      <footer className="pt-8 border-t border-[var(--rule)] flex flex-wrap items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => onNavigate('project-detail', `/projects/${prevProject.slug}`)}
          className="link-ink text-left font-serif text-lg cursor-pointer bg-transparent border-none p-0"
        >
          <span className="font-mono text-xs text-[var(--muted)] block">← Previous System</span>
          {prevProject.name}
        </button>

        <button
          type="button"
          onClick={() => onNavigate('project-detail', `/projects/${nextProject.slug}`)}
          className="link-ink text-right font-serif text-lg cursor-pointer bg-transparent border-none p-0 ml-auto"
        >
          <span className="font-mono text-xs text-[var(--muted)] block">Next System →</span>
          {nextProject.name}
        </button>
      </footer>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="lightbox-backdrop"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Screenshot full view"
              className="lightbox-content"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/80 text-white font-mono text-sm px-3 py-1 border border-white/20 cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
