import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../hooks/useSound';

export function ColorSchemePicker() {
  const { colorScheme, setScheme, schemes } = useTheme();
  const { playKeystroke } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentConfig = schemes.find((s) => s.id === colorScheme) || schemes[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Palette Trigger Button */}
      <button
        onClick={() => {
          playKeystroke();
          setIsOpen(!isOpen);
        }}
        className="bg-btn-primary text-btn-primary-text hover:bg-btn-secondary hover:text-btn-secondary-text border-2 border-black px-2.5 py-1 text-xs font-mono font-bold shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-none uppercase flex items-center gap-1.5"
        title="Select UI Color Scheme"
        aria-label="Color scheme selector"
      >
        <Palette className="w-3.5 h-3.5" />
        <span className="hidden sm:inline text-[11px] font-black">{currentConfig.name}</span>
        {/* Color preview dot */}
        <span
          className="w-3 h-3 rounded-none border border-black inline-block ml-0.5"
          style={{ backgroundColor: currentConfig.accentHex }}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 z-50 bg-bg-soft border-3 border-black shadow-[6px_6px_0px_#000] rounded-none p-3 space-y-2 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase text-ink flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-ink" /> COLOR SCHEMES
            </span>
            <span className="bg-black text-white px-1.5 py-0.2 font-mono text-[9px] uppercase">
              LOCALSTORAGE
            </span>
          </div>

          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {schemes.map((scheme) => {
              const isActive = scheme.id === colorScheme;
              return (
                <button
                  key={scheme.id}
                  onClick={() => {
                    playKeystroke();
                    setScheme(scheme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 border-2 ${
                    isActive
                      ? 'border-black bg-btn-primary text-btn-primary-text shadow-[2px_2px_0px_#000]'
                      : 'border-black/30 bg-bg-softer text-ink hover:border-black hover:bg-bg-soft'
                  } transition-all rounded-none flex items-center justify-between group`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 font-mono text-xs font-black uppercase">
                      {/* Swatch dots */}
                      <span className="flex items-center">
                        <span
                          className="w-3.5 h-3.5 border border-black inline-block"
                          style={{ backgroundColor: scheme.bgHex }}
                        />
                        <span
                          className="w-3.5 h-3.5 border border-black inline-block -ml-1"
                          style={{ backgroundColor: scheme.accentHex }}
                        />
                      </span>
                      <span>{scheme.name}</span>
                    </div>
                    <p className={`text-[10px] line-clamp-1 ${isActive ? 'text-btn-primary-text font-bold' : 'text-ink-dim'}`}>
                      {scheme.description}
                    </p>
                  </div>

                  {isActive && (
                    <span className="bg-black text-white p-1 border border-black shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-black/20 font-mono text-[10px] font-bold text-ink-dim text-center uppercase">
            Auto-saved to local browser storage
          </div>
        </div>
      )}
    </div>
  );
}
