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
        fg: 'var(--fg)',
        mut: 'var(--mut)',
        line: 'var(--line)',
        st: 'var(--st)',
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(.22, 1, .36, 1)',
        'ease-inout-custom': 'cubic-bezier(.76, 0, .24, 1)',
      },
      keyframes: {
        pop: {
          'from': { opacity: '0', transform: 'translateY(-16px)', filter: 'blur(10px)', clipPath: 'inset(0 0 100% 0)' },
          'to': { opacity: '1', transform: 'none', filter: 'blur(0)', clipPath: 'inset(0 0 0 0)' },
        },
      },
      animation: {
        pop: 'pop .9s cubic-bezier(.22, 1, .36, 1) backwards',
      }
    },
  },
  plugins: [],
}

