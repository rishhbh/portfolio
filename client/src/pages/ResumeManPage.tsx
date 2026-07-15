import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ResumeManPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg text-ink p-4 sm:p-8 md:p-12 font-mono text-sm sm:text-base leading-relaxed selection:bg-ink selection:text-bg pb-32"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between font-bold mb-8 text-ink-dim">
          <span>RISHABH(1)</span>
          <span>User Commands</span>
          <span>RISHABH(1)</span>
        </div>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Name</h2>
          <div className="pl-8 sm:pl-12">
            rishabh-sharma - Software Engineer focusing on Backend, APIs, and AI Systems
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Synopsis</h2>
          <div className="pl-8 sm:pl-12">
            <strong>rishabh</strong> [--backend] [--ai-integrations] [--devops]
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Description</h2>
          <div className="pl-8 sm:pl-12 space-y-4">
            <p>
              <strong>rishabh</strong> is a highly motivated software engineer with a strong foundation in backend architecture, containerization, and artificial intelligence. He specializes in designing robust APIs, optimizing database performance, and seamlessly integrating machine learning models into production systems.
            </p>
            <p>
              Currently completing his B.Tech in CSE (AI & ML) at the School of Management Sciences, Lucknow (2021-2025). He recently won the "Ideas to Impact 2026" hackathon with KaushalAI.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Experience</h2>
          
          <div className="pl-8 sm:pl-12 mb-6">
            <div className="font-bold">KaushalAI - Lead Backend Developer</div>
            <div className="text-ink-dim text-sm italic mb-2">May 2024 - Present</div>
            <ul className="list-[square] list-inside space-y-2 ml-4">
              <li>Architected the primary RESTful API using Node.js and Express.</li>
              <li>Integrated Python-based ML models via microservices and message queues.</li>
              <li>Reduced query latency by 40% through MongoDB indexing and Redis caching.</li>
              <li>Led a team of 4 to win the national "Ideas to Impact 2026" hackathon.</li>
            </ul>
          </div>

          <div className="pl-8 sm:pl-12 mb-6">
            <div className="font-bold">LayerZero - Core Maintainer</div>
            <div className="text-ink-dim text-sm italic mb-2">Jan 2024 - Apr 2024</div>
            <ul className="list-[square] list-inside space-y-2 ml-4">
              <li>Developed a high-throughput webhook processing engine processing 1k req/sec.</li>
              <li>Implemented comprehensive test coverage using Jest and Supertest.</li>
              <li>Containerized the application using Docker, simplifying the deployment pipeline.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Skills & Environment</h2>
          <div className="pl-8 sm:pl-12">
            <dl className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <dt className="font-bold">LANGUAGES</dt>
              <dd className="sm:col-span-3">JavaScript, TypeScript, Python, C++, SQL, Bash</dd>
              
              <dt className="font-bold">FRAMEWORKS</dt>
              <dd className="sm:col-span-3">Node.js, Express, React, Next.js, FastAPI</dd>
              
              <dt className="font-bold">DATABASES</dt>
              <dd className="sm:col-span-3">MongoDB, PostgreSQL, Redis, Supabase</dd>
              
              <dt className="font-bold">TOOLS</dt>
              <dd className="sm:col-span-3">Docker, Git, AWS (EC2, S3), Linux, Nginx</dd>
            </dl>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">Files</h2>
          <div className="pl-8 sm:pl-12 space-y-2">
            <div>
              <code>~/.github</code>
              <a href="https://github.com/rishhbh" target="_blank" rel="noreferrer" className="block pl-4 text-ink hover:underline">https://github.com/rishhbh</a>
            </div>
            <div>
              <code>~/.linkedin</code>
              <a href="https://linkedin.com/in/rishabhh-sharma" target="_blank" rel="noreferrer" className="block pl-4 text-ink hover:underline">https://linkedin.com/in/rishabhh-sharma</a>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-bold mb-4 uppercase">See Also</h2>
          <div className="pl-8 sm:pl-12">
            <p>layerzero(1), kaushal-ai(1), deepsynth(1)</p>
          </div>
        </section>

        <section>
          <h2 className="font-bold mb-4 uppercase">Author</h2>
          <div className="pl-8 sm:pl-12">
            Written by Rishabh Sharma &lt;root@server.com&gt;
          </div>
        </section>

        <div className="mt-16 pt-4 border-t border-glass-border flex justify-between text-ink-dim">
          <span>Linux</span>
          <span>July 2026</span>
          <span>RISHABH(1)</span>
        </div>
      </div>
    </motion.div>
  );
}
