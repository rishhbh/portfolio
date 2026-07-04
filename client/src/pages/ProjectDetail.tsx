import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Github, Globe, EyeOff, LayoutGrid } from 'lucide-react';
import { projects } from '../data/projects';
import { BlurFade } from '../components/BlurFade';

const renderFormattedText = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return <div key={idx} className="h-4" />;

    // 1. Check if it's a numbered step, e.g. "1. Website URL Flow: Scrapes..."
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*?)(:\s+.*)?$/);
    if (numMatch) {
      const num = numMatch[1];
      const title = numMatch[2];
      const rest = numMatch[3] ? numMatch[3].slice(2) : ''; // remove leading ': '
      return (
        <div key={idx} className="flex gap-4 items-start pl-1 py-1">
          <div className="font-mono text-[10px] font-bold bg-white/5 border border-line text-ink py-1 px-2.5 min-w-[32px] text-center">
            {num.padStart(2, '0')}
          </div>
          <div className="space-y-1">
            <span className="font-display font-semibold text-sm sm:text-base text-ink">{title}</span>
            {rest && (
              <p className="text-ink-dim text-sm leading-relaxed font-sans font-light">
                {rest}
              </p>
            )}
          </div>
        </div>
      );
    }

    // 2. Check if it's a bullet item, e.g. "- Gemini 2.5 Flash (Cloud)"
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
        <div key={idx} className="flex gap-3 items-start pl-4 py-0.5">
          <span className="font-mono text-[10px] text-ink-faint mt-2">•</span>
          <p className="text-ink-dim text-sm sm:text-base leading-relaxed font-sans font-light">
            {title ? (
              <>
                <strong className="font-display font-semibold text-ink">{title}:</strong>
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
      <p key={idx} className="text-ink-dim text-sm sm:text-base leading-relaxed font-sans font-light">
        {trimmed}
      </p>
    );
  });
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (imgSrc: string) => {
    setFailedImages((prev) => ({ ...prev, [imgSrc]: true }));
  };

  // Scroll to top when loading a project page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-48 text-center space-y-6">
        <BlurFade delay={0.1}>
          <h1 className="font-display font-bold text-4xl text-ink gradient-heading">Project Not Found</h1>
          <p className="text-ink-dim font-mono text-sm">The project you're looking for doesn't exist.</p>
        </BlurFade>
        <BlurFade delay={0.2}>
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-ink hover:text-ink-dim font-mono text-xs tracking-tight"
          >
            <ArrowLeft className="w-4 h-4" /> RETURN HOME
          </Link>
        </BlurFade>
      </div>
    );
  }

  return (
    <>
      {/* Dynamic SEO Tags */}
      <Helmet>
        <title>{`${project.name} | Rishabh Sharma — Portfolio`}</title>
        <meta name="description" content={`${project.name}: ${project.tagline}`} />
        <meta property="og:title" content={`${project.name} | Rishabh Sharma`} />
        <meta property="og:description" content={project.tagline} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-12">
        {/* Back navigation */}
        <BlurFade delay={0.05}>
          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-ink-dim hover:text-ink transition-colors font-mono text-xs tracking-tight lowercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
          >
            <ArrowLeft className="w-4 h-4" /> Back to work
          </Link>
        </BlurFade>

        {/* Title & Tagline Header */}
        <header className="space-y-4">
          <BlurFade delay={0.1}>
            {project.result && (
              <span className="font-mono text-[10px] tracking-tight bg-white/5 border border-line text-ink py-1 px-3 mb-2 inline-block">
                🏆 {project.result.toUpperCase()}
              </span>
            )}
            <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tighter text-ink gradient-heading">
              {project.name}
            </h1>
          </BlurFade>

          <BlurFade delay={0.15}>
            <p className="text-ink-dim font-mono text-xs sm:text-sm tracking-tight leading-relaxed">
              {project.tagline}
            </p>
          </BlurFade>
        </header>

        {/* Buttons / CTAs */}
        <BlurFade delay={0.2} className="flex flex-wrap gap-4 pt-2 border-b border-line pb-8">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink hover:bg-ink-dim text-bg font-mono text-xs tracking-tight font-bold py-3.5 px-6 transition-colors flex items-center gap-2"
            >
              VIEW CODE <Github className="w-4 h-4" />
            </a>
          ) : (
            <div className="glass border border-glass-border font-mono text-xs tracking-tight text-ink-faint py-3.5 px-6 flex items-center gap-2">
              PRIVATE REPOSITORY <EyeOff className="w-4 h-4" />
            </div>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass border border-glass-border hover:bg-glass-strong text-ink font-mono text-xs tracking-tight py-3.5 px-6 transition-colors flex items-center gap-2"
            >
              VIEW LIVE <Globe className="w-4 h-4" />
            </a>
          )}
        </BlurFade>

        {/* Screenshot / Media block */}
        <BlurFade delay={0.25}>
          <div className={`grid gap-6 ${project.images.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {project.images.map((imgName) => {
              const imgSrc = `${import.meta.env.BASE_URL}${imgName}`;
              const hasFailed = failedImages[imgSrc];

              if (hasFailed) {
                return (
                  <div key={imgName} className="w-full aspect-video border border-dashed border-line bg-glass flex flex-col items-center justify-center p-6 text-center space-y-3 hover:bg-glass-strong transition-colors group">
                    <LayoutGrid className="w-6 h-6 text-ink-faint group-hover:text-ink-dim transition-colors" />
                    <div className="font-mono text-xs text-ink-dim tracking-tight lowercase">
                      Missing Media
                    </div>
                    <div className="text-[10px] text-ink-faint font-mono truncate max-w-full">
                      {imgName}
                    </div>
                  </div>
                );
              }

              return (
                <div key={imgName} className="w-full aspect-video border border-line bg-glass overflow-hidden relative group">
                  <img 
                    src={imgSrc}
                    alt={`${project.name} Screenshot`}
                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    onError={() => handleImageError(imgSrc)}
                  />
                </div>
              );
            })}
          </div>
        </BlurFade>

        {/* Overview & How it works */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
          {/* Main content (Left 2 cols) */}
          <div className="md:col-span-2 space-y-12">
            
            {/* Overview */}
            <BlurFade delay={0.3} className="space-y-4">
              <h2 className="font-mono text-xs tracking-tight text-ink lowercase pb-2 border-b border-line flex items-center gap-2">
                <span className="text-ink-faint">01 //</span> OVERVIEW
              </h2>
              <p className="text-ink-dim text-sm sm:text-base leading-relaxed font-sans font-light">
                {project.problem}
              </p>
            </BlurFade>

            {/* How it works */}
            <BlurFade delay={0.35} className="space-y-6">
              <h2 className="font-mono text-xs tracking-tight text-ink lowercase pb-2 border-b border-line flex items-center gap-2">
                <span className="text-ink-faint">02 //</span> HOW IT WORKS
              </h2>
              <div className="space-y-4">
                {renderFormattedText(project.howItWorks)}
              </div>
            </BlurFade>

            {/* Key Features */}
            <BlurFade delay={0.4} className="space-y-6">
              <h2 className="font-mono text-xs tracking-tight text-ink lowercase pb-2 border-b border-line flex items-center gap-2">
                <span className="text-ink-faint">03 //</span> KEY FEATURES
              </h2>
              <ul className="space-y-3 font-sans font-light text-sm sm:text-base text-ink-dim">
                {project.keyFeatures.map((feature, idx) => {
                  const splitIndex = feature.indexOf(':');
                  let title = '';
                  let desc = feature;
                  if (splitIndex !== -1) {
                    title = feature.slice(0, splitIndex);
                    desc = feature.slice(splitIndex + 1);
                  }
                  return (
                    <li key={idx} className="flex items-start gap-3 pl-1">
                      <span className="font-mono text-xs text-ink-faint mt-1.5">•</span>
                      <span className="leading-relaxed">
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
            </BlurFade>
          </div>

          {/* Tech stack sidebar (Right 1 col) */}
          <div className="md:border-l md:border-line md:pl-10 space-y-12">
            <BlurFade delay={0.3} className="space-y-4">
              <h2 className="font-mono text-xs tracking-tight text-ink lowercase pb-2 border-b border-line flex items-center gap-2">
                <span className="text-ink-faint">04 //</span> TECHNOLOGIES
              </h2>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] tracking-tight bg-white/5 border border-line text-ink-dim py-1.5 px-2.5 transition-colors hover:text-ink hover:border-ink-dim"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </BlurFade>

            {project.result && (
              <BlurFade delay={0.35} className="space-y-3">
                <h3 className="font-mono text-xs tracking-tight text-ink lowercase pb-2 border-b border-line flex items-center gap-2">
                  <span className="text-ink-faint">05 //</span> RECOGNITION
                </h3>
                <p className="font-sans text-xs text-ink-dim leading-relaxed font-light">
                  {project.result}
                </p>
              </BlurFade>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
