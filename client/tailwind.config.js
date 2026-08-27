/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-soft': 'var(--bg-soft)',
        'bg-softer': 'var(--bg-softer)',
        ink: 'var(--ink)',
        'ink-dim': 'var(--ink-dim)',
        'ink-faint': 'var(--ink-faint)',
        line: 'var(--line)',
        brutal: {
          yellow: 'var(--accent-yellow, #FFEB3B)',
          'yellow-text': 'var(--accent-yellow-text, #000000)',
          red: 'var(--accent-red, #FF5252)',
          'red-text': 'var(--accent-red-text, #FFFFFF)',
          blue: 'var(--accent-blue, #2196F3)',
          'blue-text': 'var(--accent-blue-text, #FFFFFF)',
          black: '#000000',
          dark: '#121212',
          light: '#F5F5F0',
        },
        btn: {
          primary: 'var(--btn-primary)',
          'primary-text': 'var(--btn-primary-text)',
          secondary: 'var(--btn-secondary)',
          'secondary-text': 'var(--btn-secondary-text)',
          accent: 'var(--btn-accent)',
          'accent-text': 'var(--btn-accent-text)',
          'badge-1': 'var(--btn-badge-1)',
          'badge-1-text': 'var(--btn-badge-1-text)',
          'badge-2': 'var(--btn-badge-2)',
          'badge-2-text': 'var(--btn-badge-2-text)',
          'badge-3': 'var(--btn-badge-3)',
          'badge-3-text': 'var(--btn-badge-3-text)',
        }
      },
      borderWidth: {
        3: '3px',
        4: '4px',
      },
      boxShadow: {
        brutal: '4px 4px 0px var(--shadow-color, #000000)',
        'brutal-lg': '6px 6px 0px var(--shadow-color, #000000)',
        'brutal-sm': '2px 2px 0px var(--shadow-color, #000000)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['Libertinus Serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      }
    },
  },
  plugins: [],
}
