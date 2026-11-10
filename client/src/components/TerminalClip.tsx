import React, { useState, useEffect, useRef } from 'react';

interface TerminalClipProps {
  isHot?: boolean;
  command?: string;
  outputLines?: string[];
  interactive?: boolean;
}

export const TerminalClip: React.FC<TerminalClipProps> = ({
  isHot = false,
  command = 'purgeport 3000',
  outputLines = ['port 3000 was held by node (pid 4821)', 'freed port 3000'],
  interactive = false,
}) => {
  const [typedText, setTypedText] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);
  const [showTrailingPrompt, setShowTrailingPrompt] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; out: string[] }>>([]);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    clearAllTimers();

    const startTimer = setTimeout(() => {
      if (!isHot && !interactive) {
        setTypedText('');
        setDisplayedOutput([]);
        setShowTrailingPrompt(false);
        return;
      }

      const reduce = typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduce) {
        setTypedText(command);
        setDisplayedOutput(outputLines);
        setShowTrailingPrompt(true);
        return;
      }

      setTypedText('');
      setDisplayedOutput([]);
      setShowTrailingPrompt(false);

      let t = 0;
      const at = (fn: () => void) => {
        const timer = setTimeout(fn, t);
        timersRef.current.push(timer);
      };

      // Type character by character
      Array.from(command).forEach((_, i) => {
        t += 50;
        at(() => {
          setTypedText(command.slice(0, i + 1));
        });
      });

      t += 260;
      // Output line by line
      outputLines.forEach((line) => {
        t += 200;
        at(() => {
          setDisplayedOutput((prev) => [...prev, line]);
        });
      });

      t += 180;
      at(() => {
        setShowTrailingPrompt(true);
      });
    }, 0);

    timersRef.current.push(startTimer);

    return clearAllTimers;
  }, [isHot, command, outputLines, interactive]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;

    let out: string[] = [];
    if (trimmed.startsWith('purgeport 3000')) {
      out = ['port 3000 was held by node (pid 4821)', 'freed port 3000'];
    } else if (trimmed.startsWith('purgeport 8080')) {
      out = ['port 8080 was held by vite (pid 9120)', 'freed port 8080'];
    } else if (trimmed.includes('--help')) {
      out = [
        'Usage: purgeport <port...>',
        'Options:',
        '  -v, --version  output version number (0.1.0)',
        '  -h, --help     display help for command',
        'Zero-dependency POSIX port terminator'
      ];
    } else if (trimmed.startsWith('purgeport')) {
      const port = trimmed.split(' ')[1] || 'PORT';
      out = [`port ${port} held by process (pid ${Math.floor(1000 + Math.random() * 8000)})`, `freed port ${port}`];
    } else {
      out = [`command not recognized: ${trimmed}. Try 'purgeport 3000' or 'purgeport --help'`];
    }

    setHistory((prev) => [...prev, { cmd: trimmed, out }]);
    setCustomInput('');
  };

  return (
    <div className={`term ${isHot || interactive ? 'is-expanded' : ''}`} aria-hidden={!isHot && !interactive}>
      <div>
        <pre
          style={{
            '--lines': (outputLines.length + 3 + history.length * 3),
          } as React.CSSProperties}
        >
          {/* Default or First Execution */}
          <span className="term-line">
            <span className="prompt">$ </span>
            <span className="typed">{typedText}</span>
            {!showTrailingPrompt && !interactive && <i className="cur" />}
          </span>

          {displayedOutput.map((line, i) => (
            <span key={i} className="term-out">
              {line}
            </span>
          ))}

          {showTrailingPrompt && !interactive && (
            <span className="term-line">
              <span className="prompt">$ </span>
              <i className="cur" />
            </span>
          )}

          {/* Interactive Shell Mode if enabled */}
          {interactive && (
            <>
              {history.map((item, hIdx) => (
                <React.Fragment key={hIdx}>
                  <span className="term-line">
                    <span className="prompt">$ </span>
                    <span>{item.cmd}</span>
                  </span>
                  {item.out.map((line, lIdx) => (
                    <span key={lIdx} className="term-out">
                      {line}
                    </span>
                  ))}
                </React.Fragment>
              ))}

              <form onSubmit={handleCustomSubmit} className="flex items-center inline-block">
                <span className="prompt">$ </span>
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="type 'purgeport 8080' or '--help'"
                  className="bg-transparent border-none outline-none font-mono text-inherit w-full pl-1 focus:ring-0"
                  autoComplete="off"
                  spellCheck={false}
                />
                <i className="cur" />
              </form>
            </>
          )}
        </pre>
      </div>
    </div>
  );
};
