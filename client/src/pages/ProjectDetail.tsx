import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight, Terminal, Award } from 'lucide-react';
import { projects } from '../data/projects';
import { BlurFade } from '../components/BlurFade';

const stepLabels: Record<string, string> = {
  'homepage.png': 'STEP 01 // PLATFORM HOMEPAGE & HERO',
  'about.png': 'STEP 02 // ARCHITECTURE & HYBRID MODELS',
  'register.png': 'STEP 03 // SECURE USER REGISTRATION',
  'login.png': 'STEP 04 // JWT AUTHENTICATION LOGIN',
  'doc.png': 'STEP 05 // MULTI-FORMAT DOCUMENT INGESTION',
  'response.png': 'STEP 06 // AI SUMMARY RESPONSE & SSE STREAMING',
  'kaushal.png': 'STEP 01 // KAUSHAL AI JOB MARKETPLACE',
  'deepsynth.png': 'STEP 01 // DEEPSYNTH LOCAL LLM INTERFACE',
  'hershield.png': 'STEP 01 // HERSHIELD EMERGENCY MONITORING',
};

const renderFormattedText = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={idx} className="h-4" />;

    // 1. Numbered step: "1. Website URL Flow: Scrapes..."
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*?)(:\s+.*)?$/);
    if (numMatch) {
      const num = numMatch[1];
      const title = numMatch[2];
      const rest = numMatch[3] ? numMatch[3].slice(2) : '';
      return (
        <div key={idx} className="border-2 border-black bg-bg-soft p-4 shadow-[3px_3px_0px_#000] space-y-1.5 my-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black bg-brutal-yellow text-black px-2.5 py-0.5 border border-black">
              PHASE {num.padStart(2, '0')}
            </span>
            <span className="font-extrabold text-sm sm:text-base text-ink uppercase">{title}</span>
          </div>
          {rest && (
            <p className="text-ink-dim text-xs sm:text-sm font-medium leading-relaxed pt-1 border-t border-black/10">
              {rest}
            </p>
          )}
        </div>
      );
    }

    // 2. Bullet item: "- Gemini 2.5 Flash (Cloud)"
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
        <div key={idx} className="flex gap-3 items-start py-1">
          <span className="w-2 h-2 bg-brutal-red border border-black shrink-0 mt-1.5" />
          <p className="text-ink-dim text-xs sm:text-sm font-medium leading-relaxed">
            {title ? (
              <>
                <strong className="font-bold text-ink uppercase">{title}:</strong>
                {desc}
              </>
            ) : (
              desc
            )}
          </p>
        </div>
      );
    }

    // 3. Regular paragraph
    return (
      <p key={idx} className="text-ink-dim text-xs sm:text-sm font-medium leading-relaxed py-1">
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

  const handleGalleryScroll = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.clientWidth * 0.9;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to top when loading page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-48 text-center space-y-6">
        <h1 className="text-4xl font-black uppercase text-ink">404 // PROJECT NOT FOUND</h1>
        <p className="text-ink-dim font-medium">The requested project architecture entry does not exist.</p>
        <Link to="/" className="brutal-btn py-3 px-6 text-xs uppercase inline-block">
          RETURN TO HOME
        </Link>
      </div>
    );
  }

  const validImages = project.images.filter(img => !failedImages[img]);

  return (
    <>
      <Helmet>
        <title>{`${project.name} — Architecture Deep Dive | Rishabh Sharma`}</title>
        <meta name="title" content={`${project.name} — Architecture Deep Dive | Rishabh Sharma`} />
        <meta name="description" content={project.tagline} />
        <link rel="canonical" href={`https://rishabhh.is-a.dev/projects/${project.slug}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://rishabhh.is-a.dev/projects/${project.slug}`} />
        <meta property="og:title" content={`${project.name} — ${project.tagline}`} />
        <meta property="og:description" content={project.problem} />
        {project.images.length > 0 && (
          <meta property="og:image" content={`https://rishabhh.is-a.dev/${project.images[0]}`} />
        )}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://rishabhh.is-a.dev/projects/${project.slug}`} />
        <meta name="twitter:title" content={`${project.name} — ${project.tagline}`} />
        <meta name="twitter:description" content={project.problem} />
        {project.images.length > 0 && (
          <meta name="twitter:image" content={`https://rishabhh.is-a.dev/${project.images[0]}`} />
        )}
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-24 space-y-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b-3 border-black pb-4">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 bg-bg-softer text-ink border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-brutal-yellow hover:text-black font-bold text-xs uppercase px-3.5 py-2 rounded-none transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Selected Work
          </Link>
          <span className="font-mono text-xs font-bold bg-black text-white px-3 py-1 border-2 border-black uppercase">
            SYSTEM SPECIFICATION ENTRY
          </span>
        </div>

        {/* Project Header Banner */}
        <BlurFade delay={0.1}>
          <div className="border-3 border-black bg-bg-soft p-6 sm:p-10 shadow-[6px_6px_0px_#000] rounded-none space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-black pb-6">
              <div className="space-y-2">
                <span className="bg-brutal-yellow text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] py-1 px-3 inline-block uppercase">
                  SYSTEM MODULE
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-ink tracking-tighter flex items-center gap-3">
                  <span>{project.name}</span>
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn py-3 px-5 text-xs uppercase flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" /> REPOSITORY
                  </a>
                )}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brutal-blue text-white border-3 border-black shadow-[4px_4px_0px_#000] font-extrabold text-xs py-3 px-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-2 uppercase"
                  >
                    <ExternalLink className="w-4 h-4" /> LIVE PRODUCTION DEPLOYMENT
                  </a>
                ) : (
                  <div className="bg-bg-softer text-ink-faint border-2 border-black font-bold text-xs py-3 px-5 flex items-center gap-2 shadow-[2px_2px_0px_#000] uppercase">
                    PROPRIETARY / INTERNAL SYSTEM
                  </div>
                )}
              </div>
            </div>

            <div className="text-lg sm:text-xl font-bold text-ink uppercase tracking-tight">
              // {project.tagline}
            </div>

            {project.result && (
              <div className="p-4 border-2 border-black bg-brutal-yellow text-black font-extrabold text-xs uppercase flex items-center gap-3 shadow-[3px_3px_0px_#000]">
                <Award className="w-5 h-5 shrink-0" />
                <span>{project.result}</span>
              </div>
            )}
          </div>
        </BlurFade>

        {/* Visual Workflow Image Step Carousel */}
        {validImages.length > 0 && (
          <BlurFade delay={0.2}>
            <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none overflow-hidden space-y-4 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between border-b-3 border-black pb-4 gap-4">
                <div>
                  <span className="font-extrabold text-sm text-ink uppercase flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-brutal-red" /> Interactive Interface & Workflow Flow
                  </span>
                  <span className="text-xs text-ink-dim font-medium">Horizontal sequence of platform screens</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black bg-black text-white px-3 py-1 border-2 border-black">
                    {String(activeImageIndex + 1).padStart(2, '0')} / {String(validImages.length).padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => handleGalleryScroll('left')}
                    className="p-2 bg-brutal-yellow text-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[3]" />
                  </button>
                  <button
                    onClick={() => handleGalleryScroll('right')}
                    className="p-2 bg-brutal-yellow text-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Track */}
              <div 
                ref={galleryRef} 
                onScroll={(e) => {
                  const target = e.currentTarget;
                  const index = Math.round(target.scrollLeft / (target.clientWidth * 0.8));
                  if (index >= 0 && index < validImages.length) {
                    setActiveImageIndex(index);
                  }
                }}
                className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
              >
                {validImages.map((imgName) => (
                  <div 
                    key={imgName} 
                    className="w-[90%] sm:w-[80%] md:w-[720px] shrink-0 snap-start border-3 border-black bg-bg-softer shadow-[4px_4px_0px_#000] overflow-hidden space-y-2 p-3"
                  >
                    <div className="bg-black text-white font-mono text-xs font-bold px-3 py-1.5 border-2 border-black uppercase flex items-center justify-between">
                      <span>{stepLabels[imgName] || `SCREENSHOT // ${imgName.toUpperCase()}`}</span>
                      <span className="text-[10px] text-brutal-yellow">100% SCALE</span>
                    </div>

                    <div className="border-2 border-black overflow-hidden bg-black/5 aspect-video relative">
                      <img
                        src={`/${imgName}`}
                        alt={`${project.name} ${imgName}`}
                        onError={() => handleImageError(imgName)}
                        className="w-full h-full object-contain bg-black/40"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        )}

        {/* Split Technical Breakdown */}
        <BlurFade delay={0.3}>
          <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Problem & Engineering Strategy */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 border-b-3 lg:border-b-0 lg:border-r-3 border-black">
              
              {/* Problem Section */}
              <div className="space-y-3">
                <span className="bg-brutal-yellow text-black text-xs font-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase inline-block">
                  01 // THE PROBLEM STATEMENT
                </span>
                <p className="text-ink-dim text-sm sm:text-base font-medium leading-relaxed border-l-3 border-brutal-red pl-4 py-1">
                  {project.problem}
                </p>
              </div>

              {/* How It Works Section */}
              <div className="space-y-4 pt-4 border-t-2 border-black/20">
                <span className="bg-brutal-red text-white text-xs font-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase inline-block">
                  02 // HOW IT WORKS & ARCHITECTURE
                </span>
                <div className="space-y-2">
                  {renderFormattedText(project.howItWorks)}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-4 pt-4 border-t-2 border-black/20">
                <span className="bg-brutal-blue text-white text-xs font-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase inline-block">
                  03 // KEY SYSTEM HIGHLIGHTS
                </span>
                <div className="space-y-2">
                  {project.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 border-b border-black/10 pb-2">
                      <span className="w-2.5 h-2.5 bg-brutal-yellow border border-black shrink-0 mt-1" />
                      <span className="text-xs sm:text-sm font-medium text-ink-dim leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Spec Ledger & Complete Tech Stack */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-bg-softer space-y-8 flex flex-col justify-between">
              
              {/* Stack Ledger */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black pb-2">
                  <span className="bg-brutal-yellow text-black text-xs font-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase">
                    04 // COMPLETE TECH STACK
                  </span>
                  <span className="font-mono text-xs font-bold text-ink">
                    [{project.techStack.length} MODULES]
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-bold text-xs bg-bg-soft text-ink border-2 border-black py-1.5 px-3 shadow-[2px_2px_0px_#000] uppercase hover:bg-brutal-yellow hover:text-black transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer Callout */}
              <div className="p-5 border-2 border-black bg-bg-soft space-y-3 shadow-[3px_3px_0px_#000]">
                <div className="font-black text-xs uppercase text-ink flex items-center justify-between border-b border-black/20 pb-2">
                  <span>System Repository</span>
                  <span className="font-mono text-[10px] text-ink-faint">VERIFIED BUILD</span>
                </div>
                <p className="text-xs text-ink-dim font-medium leading-relaxed">
                  Full codebase is maintained with automated tests and Docker deployment workflows.
                </p>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-btn py-2.5 px-4 text-xs uppercase flex items-center justify-center gap-2 w-full mt-2"
                  >
                    <Github className="w-4 h-4" /> VIEW ON GITHUB
                  </a>
                )}
              </div>

            </div>

          </div>
        </BlurFade>

      </div>
    </>
  );
}
