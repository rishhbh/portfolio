export function ProblemSection() {
  return (
    <section className="s lt" id="problem" data-name="Realities">
      <div className="w problem-layout">
        <div className="t">
          <p className="eyebrow">
            <span className="eyebrow-line"></span> ENGINEERING REALITIES
          </p>
          <h2 className="max-w-[18ch] md:ml-auto">
            It's easy to ship bloated code and call it modern.
          </h2>
        </div>

        <div className="v problem-copy">
          <p className="font-serif text-2xl sm:text-3xl leading-snug tracking-tight text-black max-w-[22ch]">
            More wrapper apps. More unhandled promises. More hype copied from landing pages.
          </p>

          <p className="lead">
            The hard part of backend engineering isn't calling a third-party API. It is knowing what happens when the network stalls, memory leaks under load, or an LLM returns unparseable JSON.
          </p>

          <div className="problem-list mt-9 border-t border-[#e4e4e4]">
            <div className="grid grid-cols-[40px_1fr] gap-3 py-4 border-b border-[#e4e4e4] items-start">
              <span className="font-mono text-xs font-semibold text-[#888] pt-1">01</span>
              <p className="text-sm sm:text-base text-[#333] max-w-[42ch]">
                <strong className="text-black font-semibold">Fragile wrappers masquerading as architectures:</strong> Forwarding browser queries straight to cloud LLMs without rate-limiting, schemas, or server-side caching.
              </p>
            </div>

            <div className="grid grid-cols-[40px_1fr] gap-3 py-4 border-b border-[#e4e4e4] items-start">
              <span className="font-mono text-xs font-semibold text-[#888] pt-1">02</span>
              <p className="text-sm sm:text-base text-[#333] max-w-[42ch]">
                <strong className="text-black font-semibold">Dependency bloat over native utilities:</strong> Adding 50MB of npm dependencies to find a network port when native POSIX system calls solve it in under 200 lines.
              </p>
            </div>

            <div className="grid grid-cols-[40px_1fr] gap-3 py-4 border-b border-[#e4e4e4] items-start">
              <span className="font-mono text-xs font-semibold text-[#888] pt-1">03</span>
              <p className="text-sm sm:text-base text-[#333] max-w-[42ch]">
                <strong className="text-black font-semibold">Missing deterministic validation:</strong> Relying on hope instead of automated unit tests, in-memory database mocks, and SHA-256 cache fingerprints.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
