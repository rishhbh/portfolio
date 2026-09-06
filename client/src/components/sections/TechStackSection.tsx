import { memo } from 'react';
import { Terminal } from 'lucide-react';
import { BlurFade } from '../BlurFade';
import { TextReveal } from '../TextReveal';
import { GithubBadges } from '../GithubBadges';
import { GithubActivity } from '../GithubActivity';
import { MarqueeTicker } from '../MarqueeTicker';

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
    items: ['Node.js', 'Express.js', 'REST APIs', 'Microservices', 'OAuth 2.0', 'JWT', 'Auth0', 'Rate Limiting', 'RBAC', 'Zod']
  },
  {
    title: 'Testing',
    items: ['Jest', 'Supertest', 'mongodb-memory-server']
  },
  {
    title: 'DevOps & Infra',
    items: ['AWS EC2', 'Docker', 'Docker Compose', 'GitHub Actions', 'Cloudflare Pages/Workers', 'Cloudflare R2', 'Render', 'Linux']
  },
  {
    title: 'Databases & Cache',
    items: ['MongoDB (Vector Search)', 'Redis']
  },
  {
    title: 'AI/ML & Tools',
    items: ['Groq SDK', 'GPT-OSS 120B', 'Qwen3-Embedding-8B', 'RAG & Vector Retrieval', 'Gemini API', 'Ollama', 'Gemma 4', 'Postman']
  }
];

export const TechStackSection = memo(function TechStackSection() {
  return (
    <section id="stack" className="scroll-mt-24 space-y-8">
      <TextReveal delay={0.1} className="w-full">
        <div className="flex items-center justify-between border-b-3 border-black pb-3">
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-ink flex items-center gap-3">
            <span>02 // TECHNICAL STACK</span>
            <span className="text-outline hidden sm:inline">& TOOLING MATRIX</span>
          </h2>
          <span className="bg-btn-accent text-btn-accent-text font-extrabold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none uppercase">
            CATEGORIZED LEDGER
          </span>
        </div>
      </TextReveal>

      <BlurFade delay={0.2}>
        <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, idx) => (
              <div 
                key={category.title} 
                className={`p-6 space-y-4 border-b-3 border-black ${
                  idx % 3 !== 2 ? 'lg:border-r-3' : ''
                }`}
              >
                <div className="flex items-center justify-between border-b-2 border-black pb-2">
                  <span className="font-extrabold text-sm text-ink uppercase">{category.title}</span>
                  <span className="font-mono text-xs font-bold bg-btn-primary text-btn-primary-text px-2 py-0.5 border border-black">
                    [{category.items.length}]
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, sIdx) => {
                    const badgeClasses = [
                      'bg-btn-badge-1 text-btn-badge-1-text',
                      'bg-btn-badge-2 text-btn-badge-2-text',
                      'bg-btn-badge-3 text-btn-badge-3-text',
                    ];
                    return (
                      <span
                        key={skill}
                        className={`font-bold text-xs ${badgeClasses[sIdx % 3]} border-2 border-black py-1.5 px-3 shadow-[2px_2px_0px_#000] rounded-none hover:bg-btn-primary hover:text-btn-primary-text transition-colors`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlurFade>

      {/* GitHub Achievement Badges */}
      <BlurFade delay={0.3}>
        <GithubBadges />
      </BlurFade>

      {/* GitHub Activity */}
      <BlurFade delay={0.4}>
        <div className="border-3 border-black bg-bg-soft p-6 shadow-[6px_6px_0px_#000] rounded-none space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <span className="font-extrabold text-sm text-ink uppercase flex items-center gap-2">
              <Terminal className="w-4 h-4 text-ink" /> Continuous Commit Activity
            </span>
            <span className="font-mono text-xs font-bold text-ink-dim uppercase">GITHUB TELEMETRY</span>
          </div>
          <GithubActivity />
        </div>
      </BlurFade>

      {/* Section Marquee Banner */}
      <div className="border-3 border-black shadow-[4px_4px_0px_#000] mt-8">
        <MarqueeTicker variant="secondary" direction="right" items={['BACKEND SDE', 'SYSTEMS ARCHITECTURE', 'DOCKER CONTAINERIZATION', 'LLM ORCHESTRATION', 'RESTFUL APIS', 'DATABASE GEO-INDEXING']} />
      </div>
    </section>
  );
});
