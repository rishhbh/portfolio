import React, { useMemo } from 'react';

interface SplitTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
  className?: string;
  delay?: number;
  trigger?: string | number | boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  tag: Tag = 'h1',
  className = '',
  delay = 120,
  trigger,
}) => {
  const cleanAriaLabel = useMemo(
    () => text.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim(),
    [text]
  );

  let charCounter = 0;
  const segments = text.split(/(<br\s*\/?>)/gi);

  return (
    <Tag
      key={typeof trigger !== 'undefined' ? String(trigger) : undefined}
      className={`split-container split play ${className}`}
      aria-label={cleanAriaLabel}
      style={{ '--d': `${delay}ms` } as React.CSSProperties}
    >
      {segments.map((segment, segIdx) => {
        if (segment.match(/<br\s*\/?>/i)) {
          return <br key={`br-${segIdx}`} />;
        }

        const words = segment.split(/(\s+)/);
        return words.map((part, partIdx) => {
          if (!part) return null;
          if (/^\s+$/.test(part)) {
            return ' ';
          }

          const wordIndex = `word-${segIdx}-${partIdx}`;
          const chars = Array.from(part);

          return (
            <span key={wordIndex} className="word" aria-hidden="true">
              {chars.map((ch, chIdx) => {
                const i = charCounter++;
                return (
                  <span
                    key={`${wordIndex}-ch-${chIdx}`}
                    className="char"
                    style={{ '--i': i } as React.CSSProperties}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          );
        });
      })}
    </Tag>
  );
};

export default SplitText;
