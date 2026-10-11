import { useMotionReveal } from '../hooks/useMotionReveal';

export default function SkillsPage() {
  useMotionReveal();

  return (
    <div className="w-full relative">

      {/* Section 1: Runtimes & APIs (.dk) */}
      <section className="s dk" id="runtimes" data-name="Runtimes & APIs">
        <div className="w">
          <div className="t">
            <p className="eyebrow">
              <span className="eyebrow-line"></span> 01 / RUNTIMES & APIS
            </p>
            <h2 className="max-w-[12ch]">
              Execution runtimes and API boundaries.
            </h2>
            <p className="lead">
              High-throughput asynchronous I/O, strict boundary validation, and real-time streaming protocols.
            </p>
          </div>

          <div className="v grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="pn p-5 border border-[#333]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#888]">LANGUAGES & RUNTIMES</span>
              <h3 className="font-serif text-xl text-white mt-1">Node.js (v18+) & Bun</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#aaa]">
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Node.js 18+</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Bun</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">TypeScript</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Python 3.12</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">C++</span>
              </div>
              <p className="text-xs text-[#888] mt-3">
                Async Event Loop • Libuv thread pool • stream.pipeline • Worker threads
              </p>
            </div>

            <div className="pn p-5 border border-[#333]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#888]">FRAMEWORKS & ROUTING</span>
              <h3 className="font-serif text-xl text-white mt-1">Express v5 & REST APIs</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#aaa]">
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Express v5</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">REST Architecture</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Zod</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">JSON Schema</span>
              </div>
              <p className="text-xs text-[#888] mt-3">
                Promise error forwarding • Schema validation boundaries • RFC 7807 payloads
              </p>
            </div>

            <div className="pn p-5 border border-[#333]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#888]">REAL-TIME PROTOCOLS</span>
              <h3 className="font-serif text-xl text-white mt-1">Server-Sent Events & Sockets</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#aaa]">
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">SSE (EventSource)</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">WebSockets</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Socket.io</span>
              </div>
              <p className="text-xs text-[#888] mt-3">
                Token-by-token LLM streaming • Auto-reconnect • Sub-500ms room dispatch
              </p>
            </div>

            <div className="pn p-5 border border-[#333]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#888]">AUTH & SECURITY</span>
              <h3 className="font-serif text-xl text-white mt-1">JWT, RBAC & Cookie State</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#aaa]">
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">JWT</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">HttpOnly Cookies</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">RBAC</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Bcrypt</span>
              </div>
              <p className="text-xs text-[#888] mt-3">
                Sliding-window token rotation • SameSite cookie flags • Zero browser storage exposure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Storage, Caching & Indexing (.lt) */}
      <section className="s lt" id="storage" data-name="Databases & Cache">
        <div className="w">
          <div className="t">
            <p className="eyebrow">
              <span className="eyebrow-line"></span> 02 / STORAGE & CACHING
            </p>
            <h2 className="max-w-[18ch] md:ml-auto">
              Databases, caching and spatial indexes.
            </h2>
            <p className="lead md:ml-auto">
              Schematized document stores, sub-millisecond distributed caches, and geometric indexes.
            </p>
          </div>

          <div className="v grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="pn p-5 border border-[#d4d4d4] bg-white">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#666]">DOCUMENT DATABASE</span>
              <h3 className="font-serif text-xl text-black mt-1">MongoDB Atlas 7.0</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#333]">
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">MongoDB 7.0</span>
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">Mongoose ODM</span>
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">Aggregations</span>
              </div>
              <p className="text-xs text-[#666] mt-3">
                Compound ESR index adherence • Atomic $set/$push mutations • Multi-document consistency
              </p>
            </div>

            <div className="pn p-5 border border-[#d4d4d4] bg-white">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#666]">DISTRIBUTED CACHE & RATE LIMITING</span>
              <h3 className="font-serif text-xl text-black mt-1">Upstash Redis & Redis Cloud</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#333]">
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">Upstash Redis</span>
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">Redis CLI</span>
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">Lua Scripts</span>
              </div>
              <p className="text-xs text-[#666] mt-3">
                Sliding-window rate limits • SHA-256 fingerprint caching • Expiring TTL keys
              </p>
            </div>

            <div className="pn p-5 border border-[#d4d4d4] bg-white">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#666]">GEOSPATIAL INDEXING</span>
              <h3 className="font-serif text-xl text-black mt-1">2dsphere Spatial Queries</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#333]">
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">2dsphere</span>
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">GeoJSON Point</span>
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">$near / $geoWithin</span>
              </div>
              <p className="text-xs text-[#666] mt-3">
                WGS84 spherical coordinate queries • Sub-second SOS responder proximity lookup
              </p>
            </div>

            <div className="pn p-5 border border-[#d4d4d4] bg-white">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#666]">OBJECT & FILE STORAGE</span>
              <h3 className="font-serif text-xl text-black mt-1">Cloudflare R2 (S3-Compatible)</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#333]">
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">Cloudflare R2</span>
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">AWS S3 SDK</span>
                <span className="bg-[#f0f0f0] px-2 py-0.5 border border-[#ddd]">Multipart Upload</span>
              </div>
              <p className="text-xs text-[#666] mt-3">
                Zero egress fees • Presigned URLs • Raw document & PDF chunk storage
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: AI Inference, Cloud & Linux Primitives (.dk) */}
      <section className="s dk" id="ai-infra" data-name="AI & Infra">
        <div className="w">
          <div className="t">
            <p className="eyebrow">
              <span className="eyebrow-line"></span> 03 / AI & INFRASTRUCTURE
            </p>
            <h2 className="max-w-[12ch]">
              Inference pipelines and system calls.
            </h2>
            <p className="lead">
              Ultra-low latency inference, dense vector retrieval, container topologies, and Linux kernel calls.
            </p>
          </div>

          <div className="v grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="pn p-5 border border-[#333]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#888]">AI INFERENCE ENGINES</span>
              <h3 className="font-serif text-xl text-white mt-1">Groq LPU, Gemini & Ollama</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#aaa]">
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Groq LPU</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Gemini Flash</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Ollama (Local)</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Llama 3 / Gemma 4</span>
              </div>
              <p className="text-xs text-[#888] mt-3">
                JSON schema contracts • Sub-2s inference • 4-bit local quantization • Zero-egress privacy
              </p>
            </div>

            <div className="pn p-5 border border-[#333]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#888]">VECTOR RETRIEVAL & RAG</span>
              <h3 className="font-serif text-xl text-white mt-1">Qwen3 Embeddings & RAG</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#aaa]">
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Qwen3-Embedding-8B</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Cosine Similarity</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">RAG Pipelines</span>
              </div>
              <p className="text-xs text-[#888] mt-3">
                4096-D dense embeddings • Page-level chunk metadata • Semantic document search
              </p>
            </div>

            <div className="pn p-5 border border-[#333]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#888]">CONTAINERS & DEPLOYMENT</span>
              <h3 className="font-serif text-xl text-white mt-1">Docker Compose & AWS EC2</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#aaa]">
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Docker</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Docker Compose</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">AWS EC2</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">GitHub Actions</span>
              </div>
              <p className="text-xs text-[#888] mt-3">
                Multi-stage Alpine builds • Isolated network bridges • Automated CI/CD pipelines
              </p>
            </div>

            <div className="pn p-5 border border-[#333]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#888]">OPERATING SYSTEMS & POSIX</span>
              <h3 className="font-serif text-xl text-white mt-1">Linux Kernel & POSIX Signals</h3>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-mono text-[#aaa]">
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Linux /proc FS</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">POSIX Signals</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">systemd</span>
                <span className="bg-[#1a1a1a] px-2 py-0.5 border border-[#333]">Bash</span>
              </div>
              <p className="text-xs text-[#888] mt-3">
                PID discovery (lsof -t) • Graceful SIGTERM/SIGKILL escalation • 0 npm dependencies
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
