import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight, Terminal, Award } from 'lucide-react';
import { projects } from '../data/projects';
import { BlurFade } from '../components/BlurFade';

const stepLabels: Record<string, string> = {
  'homepage.webp': 'STEP 01 // PLATFORM HOMEPAGE & HERO',
  'about.webp': 'STEP 02 // ARCHITECTURE & HYBRID MODELS',
  'register.webp': 'STEP 03 // SECURE USER REGISTRATION',
  'login.webp': 'STEP 04 // JWT AUTHENTICATION LOGIN',
  'doc.webp': 'STEP 05 // MULTI-FORMAT DOCUMENT INGESTION',
  'response.webp': 'STEP 06 // AI SUMMARY RESPONSE & SSE STREAMING',
  'kaushal.webp': 'STEP 01 // KAUSHAL AI JOB MARKETPLACE',
  'kaushal-1.webp': 'STEP 01 // KAUSHAL AI JOB MARKETPLACE',
  'kaushal-2.webp': 'STEP 02 // ADAPTIVE SKILL ASSESSMENTS',
  'kaushal-3.webp': 'STEP 03 // VERIFIABLE CREDENTIALS & TRACKER',
  'kaushal-1.png': 'STEP 01 // KAUSHAL AI JOB MARKETPLACE',
  'kaushal-2.png': 'STEP 02 // ADAPTIVE SKILL ASSESSMENTS',
  'kaushal-3.png': 'STEP 03 // VERIFIABLE CREDENTIALS & TRACKER',
  'deepsynth-one.webp': 'STEP 01 // DEEPSYNTH LOCAL LLM INTERFACE',
  'deepsynth-two.webp': 'STEP 02 // DEEPSYNTH CHAT INTERFACE',
  'calculator-one.webp': 'STEP 01 // CALCULATOR INTERFACE',
  'calculator-two.webp': 'STEP 02 // STRIPE PAYMENT INTENT TRIGGER',
  'jaas-one.webp': 'STEP 01 // PLATFORM HOME & LANDING VIEW',
  'jaas-two.webp': 'STEP 02 // TWO-STEP FETCH & ROAST WORKBENCH',
  'jaas-three.webp': 'STEP 03 // AI ROAST EVALUATION OUTPUT',
  'jaas-four.webp': 'STEP 04 // SYSTEM ARCHITECTURE & TECH SPECS',
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
            <span className="font-mono text-xs font-black bg-btn-primary text-btn-primary-text px-2.5 py-0.5 border border-black">
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
          <span className="w-2 h-2 bg-btn-primary border border-black shrink-0 mt-1.5" />
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
        behavior: 'smooth'
      });
      setActiveImageIndex(index);
    }
  };

  const handleGalleryScroll = (direction: 'left' | 'right') => {
    if (!project || project.images.length === 0) return;
    const totalImages = project.images.length;
    let nextIndex = direction === 'left' ? activeImageIndex - 1 : activeImageIndex + 1;
    
    if (nextIndex < 0) {
      nextIndex = totalImages - 1; // Wrap around to end
    } else if (nextIndex >= totalImages) {
      nextIndex = 0; // Wrap around to start
    }
    
    scrollToImage(nextIndex);
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

  const previewImage = project.images.length > 0
    ? (project.images[0].startsWith('/') ? project.images[0] : `/${project.images[0]}`)
    : '/og-image.png';
  const fullImageUrl = `https://rishabhh.is-a.dev${previewImage}`;

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.name,
    "abstract": project.tagline,
    "description": project.problem,
    "codeRepository": project.githubUrl || undefined,
    "programmingLanguage": project.techStack,
    "author": {
      "@type": "Person",
      "name": "Rishabh Sharma",
      "url": "https://rishabhh.is-a.dev"
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{`${project.name} — ${project.tagline} | Rishabh Sharma`}</title>
        <meta name="title" content={`${project.name} — ${project.tagline} | Rishabh Sharma`} />
        <meta name="description" content={project.problem} />
        <meta name="keywords" content={`${project.name}, ${project.category}, ${project.homeTags.join(', ')}, ${project.techStack.slice(0, 6).join(', ')}, Rishabh Sharma`} />
        <link rel="canonical" href={`https://rishabhh.is-a.dev/projects/${project.slug}`} />

        {/* Open Graph / Facebook / LinkedIn / Discord Card Previews */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://rishabhh.is-a.dev/projects/${project.slug}`} />
        <meta property="og:title" content={`${project.name} — ${project.tagline}`} />
        <meta property="og:description" content={project.problem} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${project.name} preview`} />
        <meta property="og:site_name" content="Rishabh Sharma — Portfolio" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://rishabhh.is-a.dev/projects/${project.slug}`} />
        <meta name="twitter:title" content={`${project.name} — ${project.tagline}`} />
        <meta name="twitter:description" content={project.problem} />
        <meta name="twitter:image" content={fullImageUrl} />
        <meta name="twitter:image:alt" content={`${project.name} preview`} />
        <meta name="twitter:creator" content="@rishhbh" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify(schemaJsonLd)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-24 space-y-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b-3 border-black pb-4">
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 bg-btn-secondary text-btn-secondary-text border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-btn-primary hover:text-btn-primary-text font-bold text-xs uppercase px-3.5 py-2 rounded-none transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
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
                <span className="bg-btn-primary text-btn-primary-text font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] py-1 px-3 inline-block uppercase">
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
                    className="bg-btn-secondary text-btn-secondary-text border-3 border-black shadow-[4px_4px_0px_#000] font-extrabold text-xs py-3 px-5 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-2 uppercase"
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
              <div className="p-4 border-2 border-black bg-btn-primary text-btn-primary-text font-extrabold text-xs uppercase flex items-center gap-3 shadow-[3px_3px_0px_#000]">
                <Award className="w-5 h-5 shrink-0" />
                <span>{project.result}</span>
              </div>
            )}
          </div>
        </BlurFade>

        {/* Sticky System Sub-Navigation Bar */}
        <div className="sticky top-20 z-40 bg-bg-soft border-3 border-black p-2.5 shadow-[4px_4px_0px_#000] flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase font-extrabold rounded-none">
          <div className="flex items-center gap-2 px-2 text-ink">
            <span className="w-2.5 h-2.5 bg-btn-primary border border-black animate-pulse" />
            <span className="text-ink font-mono font-black text-xs">QUICK JUMP MATRIX</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => document.getElementById('sec-gallery')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-btn-badge-1 text-btn-badge-1-text hover:bg-btn-primary hover:text-btn-primary-text border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-none cursor-pointer"
            >
              01 // GALLERY
            </button>
            <button
              onClick={() => document.getElementById('sec-problem')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-btn-badge-2 text-btn-badge-2-text hover:bg-btn-secondary hover:text-btn-secondary-text border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-none cursor-pointer"
            >
              02 // OVERVIEW
            </button>
            <button
              onClick={() => document.getElementById('sec-workflow')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-btn-badge-3 text-btn-badge-3-text hover:bg-btn-accent hover:text-btn-accent-text border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-none cursor-pointer"
            >
              03 // WORKFLOW
            </button>
            <button
              onClick={() => document.getElementById('sec-techstack')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black text-white hover:bg-btn-primary hover:text-btn-primary-text border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-none cursor-pointer"
            >
              04 // TECH STACK
            </button>
          </div>
        </div>

        {/* Visual Workflow Image Step Carousel */}
        {project.images.length > 0 && (
          <BlurFade delay={0.2}>
            <div id="sec-gallery" className="scroll-mt-32 border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none overflow-hidden space-y-4 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between border-b-3 border-black pb-4 gap-4">
                <div>
                  <span className="font-extrabold text-sm text-ink uppercase flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-ink" /> Interactive Interface & Workflow Flow
                  </span>
                  <span className="text-xs text-ink-dim font-medium">Horizontal sequence of platform screens</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black bg-black text-white px-3 py-1 border-2 border-black">
                    {String(activeImageIndex + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
                  </span>
                  <button
                    onClick={() => handleGalleryScroll('left')}
                    className="p-2 bg-btn-primary text-btn-primary-text border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[3]" />
                  </button>
                  <button
                    onClick={() => handleGalleryScroll('right')}
                    className="p-2 bg-btn-primary text-btn-primary-text border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
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
                  const maxScroll = target.scrollWidth - target.clientWidth;
                  if (maxScroll <= 0) return;

                  // If scrolled to the end wall, activate last image
                  if (target.scrollLeft >= maxScroll - 15) {
                    const lastIdx = project.images.length - 1;
                    if (activeImageIndex !== lastIdx) {
                      setActiveImageIndex(lastIdx);
                    }
                    return;
                  }

                  const children = Array.from(target.children).slice(0, project.images.length) as HTMLElement[];
                  if (children.length === 0) return;
                  const currentScrollLeft = target.scrollLeft;
                  let closestIndex = 0;
                  let minDiff = Infinity;
                  children.forEach((child, idx) => {
                    const childPos = child.offsetLeft - target.offsetLeft;
                    const diff = Math.abs(currentScrollLeft - childPos);
                    if (diff < minDiff) {
                      minDiff = diff;
                      closestIndex = idx;
                    }
                  });
                  if (closestIndex !== activeImageIndex) {
                    setActiveImageIndex(closestIndex);
                  }
                }}
                className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 pr-[50vw]"
              >
                {project.images.map((imgName, imgIdx) => (
                  <div 
                    key={imgName} 
                    onClick={() => scrollToImage(imgIdx)}
                    className="w-[90%] sm:w-[80%] md:w-[720px] shrink-0 snap-start border-3 border-black bg-bg-softer shadow-[4px_4px_0px_#000] overflow-hidden space-y-2 p-3 cursor-pointer"
                  >
                    <div className="bg-black text-white font-mono text-xs font-bold px-3 py-1.5 border-2 border-black uppercase flex items-center justify-between">
                      <span>{stepLabels[imgName] || `SCREENSHOT // ${imgName.toUpperCase()}`}</span>
                      <span className="text-[10px] text-btn-primary-text">100% SCALE</span>
                    </div>

                    <div className="border-2 border-black overflow-hidden bg-black/5 aspect-video relative flex items-center justify-center">
                      {failedImages[imgName] ? (
                        <div className="w-full h-full bg-black/85 flex flex-col items-center justify-center p-6 text-center space-y-2">
                          <Terminal className="w-8 h-8 text-btn-primary animate-pulse" />
                          <span className="font-mono text-xs font-bold text-white uppercase">
                            SCREENSHOT {String(imgIdx + 1).padStart(2, '0')} ASSET PENDING
                          </span>
                          <span className="font-mono text-[10px] text-btn-primary-text font-bold">
                            Add "{imgName}" to client/public/
                          </span>
                        </div>
                      ) : (
                        <img
                          src={`/${imgName}`}
                          alt={`${project.name} ${imgName}`}
                          onError={() => handleImageError(imgName)}
                          className="w-full h-full object-contain bg-black/40"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
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
              <div id="sec-problem" className="scroll-mt-32 space-y-3">
                <span className="bg-btn-primary text-btn-primary-text text-xs font-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase inline-block">
                  01 // THE PROBLEM STATEMENT
                </span>
                <p className="text-ink-dim text-sm sm:text-base font-medium leading-relaxed border-l-3 border-ink pl-4 py-1">
                  {project.problem}
                </p>
              </div>

              {/* How It Works Section */}
              <div id="sec-workflow" className="scroll-mt-32 space-y-4 pt-4 border-t-2 border-black/20">
                <span className="bg-btn-secondary text-btn-secondary-text text-xs font-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase inline-block">
                  02 // HOW IT WORKS & ARCHITECTURE
                </span>
                <div className="space-y-2">
                  {renderFormattedText(project.howItWorks)}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-4 pt-4 border-t-2 border-black/20">
                <span className="bg-btn-accent text-btn-accent-text text-xs font-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase inline-block">
                  03 // KEY SYSTEM HIGHLIGHTS
                </span>
                <div className="space-y-2">
                  {project.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 border-b border-black/10 pb-2">
                      <span className="w-2.5 h-2.5 bg-btn-primary border border-black shrink-0 mt-1" />
                      <span className="text-xs sm:text-sm font-medium text-ink-dim leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Spec Ledger & Complete Tech Stack */}
            <div id="sec-techstack" className="scroll-mt-32 lg:col-span-5 p-6 sm:p-8 bg-bg-softer space-y-8 flex flex-col justify-between">
              
              {/* Stack Ledger */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-black pb-2">
                  <span className="bg-btn-primary text-btn-primary-text text-xs font-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase">
                    04 // COMPLETE TECH STACK
                  </span>
                  <span className="font-mono text-xs font-bold text-ink">
                    [{project.techStack.length} MODULES]
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.map((tech, tIdx) => {
                    const badgeClasses = [
                      'bg-btn-badge-1 text-btn-badge-1-text',
                      'bg-btn-badge-2 text-btn-badge-2-text',
                      'bg-btn-badge-3 text-btn-badge-3-text',
                    ];
                    return (
                      <span
                        key={tech}
                        className={`font-bold text-xs ${badgeClasses[tIdx % 3]} border-2 border-black py-1.5 px-3 shadow-[2px_2px_0px_#000] uppercase hover:bg-btn-primary hover:text-btn-primary-text transition-colors`}
                      >
                        {tech}
                      </span>
                    );
                  })}
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
