export interface ColorSchemeConfig {
  id: string;
  name: string;
  description: string;
  bgHex: string;
  accentHex: string;
  isDark: boolean;
}

export const COLOR_SCHEMES = [
  {
    id: 'dark-brutal',
    name: 'CLASSIC DARK',
    description: 'Obsidian dark neubrutalism with signature yellow & red accents',
    bgHex: '#0e0e10',
    accentHex: '#FFEB3B',
    isDark: true,
  },
  {
    id: 'light-brutal',
    name: 'CLASSIC LIGHT',
    description: 'Paper white neubrutalism with high contrast solid borders',
    bgHex: '#f8f8f5',
    accentHex: '#FFEB3B',
    isDark: false,
  },
  {
    id: 'cyber-matrix',
    name: 'CYBER MATRIX',
    description: 'Terminal green phosphor aesthetic with neon matrix accents',
    bgHex: '#050a05',
    accentHex: '#00FF66',
    isDark: true,
  },
  {
    id: 'synth-cyberpunk',
    name: 'SYNTH CYBERPUNK',
    description: 'Hot pink and cyan retro synthwave palette',
    bgHex: '#100821',
    accentHex: '#FF007F',
    isDark: true,
  },
  {
    id: 'solar-amber',
    name: 'SOLAR AMBER',
    description: 'Warm sepia dark mode with golden amber highlights',
    bgHex: '#1c1917',
    accentHex: '#F59E0B',
    isDark: true,
  },
  {
    id: 'stark-mono',
    name: 'STARK MONO',
    description: 'Ultra high-contrast raw monochrome editorial style',
    bgHex: '#000000',
    accentHex: '#FFFFFF',
    isDark: true,
  },
  {
    id: 'tokyo-night',
    name: 'TOKYO NIGHT',
    description: 'Deep midnight indigo with vibrant neon coral highlights',
    bgHex: '#1a1b26',
    accentHex: '#FF9E64',
    isDark: true,
  },
  {
    id: 'acid-lime',
    name: 'ACID LIME',
    description: 'High voltage toxic lime & electric orange accents',
    bgHex: '#0b120a',
    accentHex: '#CCFF00',
    isDark: true,
  },
  {
    id: 'dracula-goth',
    name: 'DRACULA GOTH',
    description: 'Deep vampire slate purple with hot orchid accents',
    bgHex: '#1e1f29',
    accentHex: '#FF79C6',
    isDark: true,
  },
  {
    id: 'nordic-frost',
    name: 'NORDIC FROST',
    description: 'Arctic navy with icy glacier blue highlights',
    bgHex: '#151d28',
    accentHex: '#88C0D0',
    isDark: true,
  },
  {
    id: 'gameboy-retro',
    name: 'GAMEBOY RETRO',
    description: 'Nostalgic dot-matrix green & sage palette',
    bgHex: '#0f170b',
    accentHex: '#9BBC0F',
    isDark: true,
  },
  {
    id: 'hyper-pink',
    name: 'HYPER PINK',
    description: 'Electric magenta pink with vibrant turquoise accents',
    bgHex: '#180613',
    accentHex: '#FF1493',
    isDark: true,
  },
];