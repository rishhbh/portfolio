import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Github, ChevronLeft, ChevronRight, Terminal, Award } from 'lucide-react';
import { projects } from '../data/projects';

const stepLabels: Record<string, string> = {
  'homepage.webp': 'SCREEN 01 // PLATFORM HOMEPAGE & INGESTION',
  'about.webp': 'SCREEN 02 // ARCHITECTURE & HYBRID MODELS',
  'register.webp': 'SCREEN 03 // SECURE USER AUTHENTICATION',
  'login.webp': 'SCREEN 04 // JWT SESSION MANAGEMENT',
  'doc.webp': 'SCREEN 05 // MULTI-FORMAT DOCUMENT PARSING',
  'response.webp': 'SCREEN 06 // AI STREAMING & SSE TOKENS',
  'kaushal-1.webp': 'SCREEN 01 // KAUSHAL AI JOB MARKETPLACE',
  'kaushal-2.webp': 'SCREEN 02 // ADAPTIVE SKILL EVALUATIONS',
  'kaushal-3.webp': 'SCREEN 03 // VERIFIABLE CREDENTIALS & TRACKER',
  'deepsynth-one.webp': 'SCREEN 01 // DEEPSYNTH OFFLINE INTERFACE',
  'deepsynth-two.webp': 'SCREEN 02 // LOCAL LLM INFERENCE STREAM',
  'calculator-one.webp': 'SCREEN 01 // CALCULATOR INTERFACE',
  'calculator-two.webp': 'SCREEN 02 // STRIPE PAYMENT INTENT TRIGGER',
  'jaas-one.webp': 'SCREEN 01 // REPOSITORY INGESTION VIEW',
  'jaas-two.webp': 'SCREEN 02 // TWO-STEP FETCH & PARSE WORKBENCH',
  'jaas-three.webp': 'SCREEN 03 // GROQ GPT-120B EVALUATION',
  'jaas-four.webp': 'SCREEN 04 // ARCHITECTURE & SCHEMAS',
  'purgeport-one.webp': 'SCREEN 01 // PORT DETECTION & LSOF INSPECTION',
  'purgeport-two.webp': 'SCREEN 02 // MULTI-PORT BATCH TERMINATION',
  'purgeport-three.webp': 'SCREEN 03 // CLI COMMAND SPECIFICATIONS',
};

const renderFormattedText = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={idx} className="h-3" />;

    const numMatch = trimmed.match(/^(\d+)\.\s+(.*?)(:\s+.*)?$/);
    if (numMatch) {
      const num = numMatch[1];
      const title = numMatch[2];
      const rest = numMatch[3] ? numMatch[3].slice(2) : '';
      return (
        <div key={idx} className="border border-[#262626] p-4 bg-[#080808] my-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-semibold text-white border border-[#444] px-2 py-0.5">
              PHASE {num.padStart(2, '0')}
            </span>
            <span className="font-semibold text-sm sm:text-base text-white">{title}</span>
          </div>
          {rest && (
            <p className="text-[#a4a4a4] text-xs sm:text-sm leading-relaxed pt-2 mt-2 border-t border-[#1a1a1a]">
              {rest}
            </p>
          )}
        </div>
      );
    }

    if (trimmed.startsWith('- ')) {
      const content = trimmed.slice(2);
      const splitIndex = content.indexOf(':');
      let title = '';
      let desc = content;
      if (splitIndex !== -1) {
        title = content.slice(0, splitIndex);
        desc = content.slice(splitIndex + 1);
      }
      return (
        <div key={idx} className="flex gap-2.5 items-start py-1">
          <span className="text-[#666] select-none">›</span>
          <p className="text-[#a4a4a4] text-xs sm:text-sm leading-relaxed">
            {title ? (
              <>
                <strong className="text-white font-medium">{title}:</strong>
                {desc}
              </>
            ) : (
              desc
            )}
          </p>
        </div>
      );
    }

    return (
      <p key={idx} className="text-[#a4a4a4] text-xs sm:text-sm leading-relaxed py-1">
        {trimmed}
      </p>
    );
  });
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleImageError = (imgSrc: string) => {
    setFailedImages((prev) => ({ ...prev, [imgSrc]: true }));
  };

  const scrollToImage = (index: number) => {
    if (!galleryRef.current || !project) return;
    const container = galleryRef.current;
    const children = Array.from(container.children).slice(0, project.images.length) as HTMLElement[];
    if (children[index]) {
      const targetChild = children[index];
      const maxScroll = container.scrollWidth - container.clientWidth;
      const targetLeft = Math.min(targetChild.offsetLeft - container.offsetLeft, maxScroll);
      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
      setActiveImageIndex(index);
    }
  };

  const handleGalleryScroll = (direction: 'left' | 'right') => {
    if (!project || project.images.length === 0) return;
    const totalImages = project.images.length;
    let nextIndex = direction === 'left' ? activeImageIndex - 1 : activeImageIndex + 1;
    if (nextIndex < 0) nextIndex = totalImages - 1;
    else if (nextIndex >= totalImages) nextIndex = 0;
    scrollToImage(nextIndex);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="max-w-[1360px] mx-auto px-6 py-48 text-center space-y-6 dk">
        <h1 className="font-serif text-4xl sm:text-6xl text-white">Project Not Found</h1>
        <p className="text-[#9b9b9b]">The requested system architecture specification does not exist.</p>
        <Link to="/" className="b inline-block">
          Return to Overview
        </Link>
      </div>
    );
  }

  const previewImage = project.images.length > 0
    ? (project.images[0].startsWith('/') ? project.images[0] : `/${project.images[0]}`)
    : '/og-image.png';
  const fullImageUrl = `https://rishabhh.is-a.dev${previewImage}`;

  return (
    <div className="dk min-h-screen pt-28 pb-24 px-6 sm:px-12">
      <Helmet>
        <title>{`${project.name} — Technical Architecture | Rishabh Sharma`}</title>
        <meta name="title" content={`${project.name} — ${project.tagline} | Rishabh Sharma`} />
        <meta name="description" content={project.problem} />
        <link rel="canonical" href={`https://rishabhh.is-a.dev/projects/${project.slug}`} />
        <meta property="og:title" content={`${project.name} — ${project.tagline}`} />
        <meta property="og:description" content={project.problem} />
        <meta property="og:image" content={fullImageUrl} />
      </Helmet>

      <div className="max-w-[1200px] mx-auto space-y-12 blueprint-standalone">
        {/* Top Header / Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262626] pb-6">
          <Link
            to="/#systems"
            className="inline-flex items-center gap-2 text-xs uppercase text-[#9b9b9b] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Systems
          </Link>

          <span className="font-mono text-xs text-[#777] uppercase tracking-wider">
            ARCHITECTURE SPECIFICATION
          </span>
        </div>

        {/* Project Header */}
        <div className="space-y-4">
          <p className="eyebrow"><span className="eyebrow-line"></span> {project.category}</p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-normal tracking-tight">
            {project.name}
          </h1>
          <p className="lead text-[#9b9b9b] max-w-[50ch]">
            {project.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="b"
              >
                {project.liveUrl.includes('npmjs.com') ? 'NPM Package ↗' : 'Live Deployment ↗'}
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="b b2"
              >
                Source Code ↗
              </a>
            )}
          </div>

          {project.result && (
            <div className="p-4 border border-[#333] bg-[#0c0c0c] text-xs text-[#ccc] flex items-center gap-3 mt-4">
              <Award className="w-4 h-4 text-white shrink-0" />
              <span>{project.result}</span>
            </div>
          )}
        </div>

        {/* Visual Screenshots Track */}
        {project.images.length > 0 && (
          <div className="border border-[#262626] p-6 space-y-4 bg-[#050505]">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#888]">
                Screenshots & Working Interface
              </span>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#9b9b9b]">
                  {String(activeImageIndex + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
                </span>
                <button
                  onClick={() => handleGalleryScroll('left')}
                  className="p-1.5 border border-[#444] text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleGalleryScroll('right')}
                  className="p-1.5 border border-[#444] text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div
              ref={galleryRef}
              className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
            >
              {project.images.map((imgName, imgIdx) => (
                <div
                  key={imgName}
                  onClick={() => scrollToImage(imgIdx)}
                  className="w-[88%] sm:w-[75%] md:w-[680px] shrink-0 snap-start border border-[#333] bg-black p-2.5 cursor-pointer"
                >
                  <div className="font-mono text-[11px] text-[#888] pb-1.5 border-b border-[#222] mb-2 flex justify-between">
                    <span>{stepLabels[imgName] || imgName}</span>
                    <span>100% SCALE</span>
                  </div>

                  <div className="aspect-video bg-[#111] overflow-hidden flex items-center justify-center">
                    {failedImages[imgName] ? (
                      <div className="p-4 text-center space-y-1">
                        <Terminal className="w-6 h-6 text-[#777] mx-auto" />
                        <span className="font-mono text-xs text-[#777] block">
                          Asset Pending: {imgName}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={`/${imgName}`}
                        alt={`${project.name} ${imgName}`}
                        onError={() => handleImageError(imgName)}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Problem & Architecture Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[#262626] pt-8">
          <div className="lg:col-span-7 space-y-8">
            {/* The Problem */}
            <div>
              <p className="eyebrow"><span className="eyebrow-line"></span> 01 // THE BOTTLENECK</p>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Why this system needed to exist
              </h2>
              <p className="text-sm sm:text-base text-[#a4a4a4] leading-relaxed mt-3 border-l-2 border-[#444] pl-4">
                {project.problem}
              </p>
            </div>

            {/* Architecture */}
            <div className="pt-6 border-t border-[#262626]">
              <p className="eyebrow"><span className="eyebrow-line"></span> 02 // ARCHITECTURE & PIPELINE</p>
              <div className="space-y-2 mt-3">
                {renderFormattedText(project.howItWorks)}
              </div>
            </div>

            {/* Key Features */}
            <div className="pt-6 border-t border-[#262626]">
              <p className="eyebrow"><span className="eyebrow-line"></span> 03 // MEASURED HIGHLIGHTS</p>
              <div className="space-y-2 mt-3">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 py-1">
                    <span className="text-[#666] select-none">›</span>
                    <span className="text-xs sm:text-sm text-[#a4a4a4] leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Complete Tech Stack */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[#262626] p-6 bg-[#080808] space-y-4">
              <p className="eyebrow"><span className="eyebrow-line"></span> 04 // TECH STACK</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="c text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.githubUrl && (
              <div className="border border-[#262626] p-6 bg-[#080808] space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#888]">
                  Verified Codebase
                </span>
                <p className="text-xs text-[#a4a4a4] leading-relaxed">
                  Repository includes automated unit tests, Docker Compose container setups, and GitHub Actions CI pipelines.
                </p>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="b w-full justify-center text-xs mt-2"
                >
                  <Github className="w-3.5 h-3.5" /> Inspect Repository ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
