import React, { useState, useEffect, useRef } from 'react';

export const DEFAULT_PURGEPORT_OUTPUT = [
  'Port 3000 is being used by PID 4821.',
  '',
  'User: hecker',
  'Command: node server.js',
  'Process: /home/hecker/.nvm/versions/node/v24.19.0/bin/node',
  '',
  'Kill this process? [y/n]: y',
  'Process 4821 terminated successfully.',
  '-----------------------------------------',
];

interface TerminalClipProps {
  isHot?: boolean;
  command?: string;
  outputLines?: string[];
  interactive?: boolean;
}

export const TerminalClip: React.FC<TerminalClipProps> = ({
  isHot = false,
  command = 'purgeport 3000',
  outputLines = DEFAULT_PURGEPORT_OUTPUT,
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
        t += line === '' ? 120 : 180;
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

    if (trimmed === 'clear') {
      setHistory([]);
      setCustomInput('');
      return;
    }

    let out: string[] = [];
    const args = trimmed.split(/\s+/);
    const cmd = args[0];
    const subArgs = args.slice(1);

    if (cmd === 'purgeport') {
      const hasHelp = subArgs.includes('-h') || subArgs.includes('--help');
      const hasVersion = subArgs.includes('-v') || subArgs.includes('--version');
      const skipConfirm = subArgs.includes('-y') || subArgs.includes('--yes');

      if (hasVersion) {
        out = ['0.1.0'];
      } else if (hasHelp || subArgs.length === 0) {
        out = [
          'purgeport - Kill processes using network ports',
          '',
          'Usage:',
          '  purgeport <port>...',
          '  purgeport all',
          '',
          'Options:',
          '  -h, --help       Show help',
          '  -v, --version    Show version',
          '  -y, --yes        Skip confirmation prompts',
        ];
      } else if (subArgs.includes('42997')) {
        out = [
          'Port 42997 is being used by PID 2365849.',
          '',
          'User: hecker',
          'Command: agy',
          'Process: /home/hecker/.local/bin/agy',
          '',
          'Kill this process? [y/n]: n',
          'Process 2365849 was not terminated.',
          '------------------------------------',
        ];
      } else if (subArgs.includes('all')) {
        out = [
          'Port 3000 is being used by PID 4821.',
          '',
          'User: hecker',
          'Command: node server.js',
          'Process: /home/hecker/.nvm/versions/node/v24.19.0/bin/node',
          '',
          ...(skipConfirm
            ? [
                'Process 4821 terminated successfully.',
                '-----------------------------------------',
              ]
            : [
                'Kill this process? [y/n]: y',
                'Process 4821 terminated successfully.',
                '-----------------------------------------',
              ]),
          'Port 8080 is being used by PID 9120.',
          '',
          'User: hecker',
          'Command: vite --port 8080',
          'Process: /home/hecker/.nvm/versions/node/v24.19.0/bin/vite',
          '',
          ...(skipConfirm
            ? [
                'Process 9120 terminated successfully.',
                '-----------------------------------------',
              ]
            : [
                'Kill this process? [y/n]: y',
                'Process 9120 terminated successfully.',
                '-----------------------------------------',
              ]),
        ];
      } else if (subArgs.includes('3000')) {
        out = [
          'Port 3000 is being used by PID 4821.',
          '',
          'User: hecker',
          'Command: node server.js',
          'Process: /home/hecker/.nvm/versions/node/v24.19.0/bin/node',
          '',
          ...(skipConfirm
            ? [
                'Process 4821 terminated successfully.',
                '-----------------------------------------',
              ]
            : [
                'Kill this process? [y/n]: y',
                'Process 4821 terminated successfully.',
                '-----------------------------------------',
              ]),
        ];
      } else if (subArgs.includes('8080')) {
        out = [
          'Port 8080 is being used by PID 9120.',
          '',
          'User: hecker',
          'Command: vite --port 8080',
          'Process: /home/hecker/.nvm/versions/node/v24.19.0/bin/vite',
          '',
          ...(skipConfirm
            ? [
                'Process 9120 terminated successfully.',
                '-----------------------------------------',
              ]
            : [
                'Kill this process? [y/n]: y',
                'Process 9120 terminated successfully.',
                '-----------------------------------------',
              ]),
        ];
      } else {
        const portArg = subArgs.find(arg => !arg.startsWith('-')) || '5000';
        const portNum = parseInt(portArg, 10);
        if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
          out = [`Invalid port: ${portArg}.`];
        } else {
          const pseudoPid = 3000 + (portNum % 4000);
          out = [
            `Port ${portArg} is being used by PID ${pseudoPid}.`,
            '',
            'User: hecker',
            `Command: python app.py --port ${portArg}`,
            'Process: /usr/bin/python3',
            '',
            ...(skipConfirm
              ? [
                  `Process ${pseudoPid} terminated successfully.`,
                  '-----------------------------------------',
                ]
              : [
                  'Kill this process? [y/n]: y',
                  `Process ${pseudoPid} terminated successfully.`,
                  '-----------------------------------------',
                ]),
          ];
        }
      }
    } else {
      out = [`command not recognized: ${trimmed}. Try 'purgeport 3000' or 'purgeport --help'`];
    }

    setHistory((prev) => [...prev, { cmd: trimmed, out }]);
    setCustomInput('');
  };

  const totalHistoryLines = history.reduce((sum, h) => sum + 1 + h.out.length, 0);
  const totalLines = outputLines.length + 3 + totalHistoryLines;

  return (
    <div className={`term ${isHot || interactive ? 'is-expanded' : ''}`} aria-hidden={!isHot && !interactive}>
      <div>
        <pre
          style={{
            '--lines': totalLines,
          } as React.CSSProperties}
          className="max-h-[36rem] overflow-y-auto"
        >
          {/* Default or First Execution */}
          <span className="term-line">
            <span className="prompt">$ </span>
            <span className="typed">{typedText}</span>
            {!showTrailingPrompt && !interactive && <i className="cur" />}
          </span>

          {displayedOutput.map((line, i) => (
            <span key={i} className="term-out min-h-[1.7em]">
              {line || '\u00A0'}
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
                    <span key={lIdx} className="term-out min-h-[1.7em]">
                      {line || '\u00A0'}
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
                  placeholder="type 'purgeport 3000' or '--help'"
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
