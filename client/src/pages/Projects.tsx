import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SplitText } from '../components/SplitText';
import { TerminalClip } from '../components/TerminalClip';
import { useNpmDownloads } from '../hooks/useNpmDownloads';
import { projects } from '../data/projects';

interface ProjectsProps {
  onNavigate: (id: string, path: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const purgeportDownloads = useNpmDownloads('purgeport');

  return (
    <div className="wrap">
      <SplitText tag="h1" text="Projects" className="page-title" delay={120} />

      <div className="items">
        {projects.map((project, idx) => {
          const isPurgeport = project.slug === 'purgeport';
          const isHot = hoveredSlug === project.slug;

          const metaString = project.homeTags && project.homeTags.length > 0
            ? project.homeTags.join(', ')
            : project.techStack.slice(0, 5).join(', ');

          return (
            <motion.article
              key={project.slug}
              className={`item ${isPurgeport && isHot ? 'hot' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.05,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.1,
              }}
              onPointerEnter={() => setHoveredSlug(project.slug)}
              onPointerLeave={() => setHoveredSlug(null)}
              onFocus={() => setHoveredSlug(project.slug)}
              onBlur={() => setHoveredSlug(null)}
            >
              <div className="meta">
                <p>{metaString}</p>
                {isPurgeport && purgeportDownloads ? (
                  <span className="block mt-1 text-[11px] font-mono text-[var(--ink)] opacity-90">
                    {purgeportDownloads.toLocaleString()} live downloads
                  </span>
                ) : project.badgeText ? (
                  <span className="block mt-1 text-[11px] opacity-75">
                    {project.category}
                  </span>
                ) : null}
              </div>

              <div className="body">
                <h3>
                  <button
                    type="button"
                    onClick={() => onNavigate('project-detail', `/projects/${project.slug}`)}
                    className="link-ink text-left font-serif text-[1.85rem] leading-[1.2] text-inherit bg-transparent border-none p-0 cursor-pointer"
                  >
                    {project.name}
                  </button>
                </h3>

                <p>
                  {isPurgeport
                    ? `A command-line tool for developers, and my first. Published on npm with ${purgeportDownloads ? `${purgeportDownloads.toLocaleString()} downloads` : 'over 480 downloads'}.`
                    : project.tagline}
                </p>

                {/* For purgeport, display the interactive terminal typing clip */}
                {isPurgeport && (
                  <div className="mt-2">
                    <TerminalClip
                      isHot={isHot}
                      command="purgeport 3000"
                    />
                  </div>
                )}

                <div className="mt-3 flex items-center gap-4 text-xs font-mono text-[var(--muted)]">
                  <button
                    type="button"
                    onClick={() => onNavigate('project-detail', `/projects/${project.slug}`)}
                    className="link-ink text-inherit bg-transparent border-none p-0 cursor-pointer"
                  >
                    View system specs →
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-ink text-inherit"
                    >
                      GitHub ↗
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-ink text-inherit"
                    >
                      Live system ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-16 pt-8 border-t border-[var(--rule)] flex justify-between items-center text-sm">
        <button
          type="button"
          onClick={() => onNavigate('skills', '/skills')}
          className="link-ink font-mono text-xs cursor-pointer bg-transparent border-none p-0"
        >
          View Skills &amp; Architecture →
        </button>

        <button
          type="button"
          onClick={() => onNavigate('experience', '/experience')}
          className="link-ink font-mono text-xs cursor-pointer bg-transparent border-none p-0"
        >
          View Track Record →
        </button>
      </div>
    </div>
  );
};

export default Projects;
