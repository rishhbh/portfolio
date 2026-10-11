export function TechStackSection() {
  return (
    <section className="s lt" id="decisions" data-name="Decisions">
      <div className="w tools-layout">
        {/* Right Column: Headline on desktop */}
        <div className="t">
          <p className="eyebrow">
            <span className="eyebrow-line"></span> ARCHITECTURAL DECISIONS & TOOLING
          </p>
          <h2 className="max-w-[12ch]">
            Tools chosen for failure modes, not hype.
          </h2>
          <p className="lead">
            Every layer introduced into a stack adds operational surface area. Here is the ledger of technologies vetted in production, and why each was chosen.
          </p>
        </div>

        {/* Left Column: Tool Grid */}
        <div className="v tool-grid">
          {/* Card 1: Runtimes & Server Engines */}
          <article className="tool-card tool-card-large">
            <span className="tool-kicker">01 / BACKEND RUNTIMES & APIS</span>
            <h3 className="font-serif">Node.js (v18+), Express v5 & Bun</h3>
            <p>
              High-throughput asynchronous I/O for API gateways and ingestion pipelines. Express v5 provides native Promise-based route error forwarding, preventing unhandled rejections from crashing the process without nested boilerplate. Bun powers sub-second script execution and fast local testing.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-[#555]">
              <span>[Node.js]</span>
              <span>[Express v5]</span>
              <span>[Bun]</span>
              <span>[Zod Validation]</span>
              <span>[JWT HttpOnly]</span>
            </div>
          </article>

          {/* Card 2: Persistence & Invalidation */}
          <article className="tool-card">
            <span className="tool-kicker">02 / STORAGE & CACHE INVALIDATION</span>
            <h3 className="font-serif">MongoDB Atlas & Upstash Redis</h3>
            <p>
              MongoDB handles schematized document persistence and geospatial 2dsphere indexing. Upstash Redis acts as a distributed gatekeeper for multi-tier sliding-window rate limiters and deterministic SHA-256 response caching with TTL expirations.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono text-[#555]">
              <span>[MongoDB Atlas]</span>
              <span>[2dsphere Indexing]</span>
              <span>[Upstash Redis]</span>
            </div>
          </article>

          {/* Card 3: Inference & Retrieval */}
          <article className="tool-card">
            <span className="tool-kicker">03 / INFERENCE & VECTOR RETRIEVAL</span>
            <h3 className="font-serif">Groq LPU, Qwen3 Embeddings & Ollama</h3>
            <p>
              Sub-second inference via Groq LPU with strict JSON schema constraints. 4096-dimensional dense embeddings with Qwen3-Embedding-8B for semantic chunk retrieval, paired with local 4-bit Ollama quantization for offline privacy.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-mono text-[#555]">
              <span>[Groq LPU]</span>
              <span>[Qwen3-8B]</span>
              <span>[SSE Streaming]</span>
              <span>[Ollama Local]</span>
            </div>
          </article>

          {/* Card 4: Infra & Operating Systems */}
          <article className="tool-card tool-card-large">
            <span className="tool-kicker">04 / INFRASTRUCTURE & OPERATING SYSTEMS</span>
            <h3 className="font-serif">Docker, AWS EC2, Cloudflare R2 & POSIX</h3>
            <p>
              Containerized multi-service topologies running via Docker Compose. Object storage managed through Cloudflare R2 to bypass egress fees, automated GitHub Actions CI/CD workflows, and native POSIX signal handling (/proc inspection, SIGTERM).
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-[#555]">
              <span>[Docker Compose]</span>
              <span>[AWS EC2]</span>
              <span>[Cloudflare R2]</span>
              <span>[GitHub Actions]</span>
              <span>[Linux POSIX]</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
