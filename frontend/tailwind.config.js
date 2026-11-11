/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        krew: {
          bg: '#0B0B10',
          charcoal: '#15151D',
          surface: '#1A1A24',
          card: '#1F1F2C',
          cardHover: '#262637',
          border: '#2C2C3E',
          borderLight: '#3D3D54',
          purple: {
            DEFAULT: '#A855F7',
            glow: '#9333EA',
            deep: '#581C87',
            subtle: 'rgba(168, 85, 247, 0.12)',
            border: 'rgba(168, 85, 247, 0.35)',
          },
          lavender: {
            DEFAULT: '#C4B5FD',
            muted: '#A78BFA',
          },
          cyan: {
            DEFAULT: '#38BDF8',
            glow: '#0EA5E9',
            subtle: 'rgba(56, 189, 248, 0.12)',
            border: 'rgba(56, 189, 248, 0.3)',
          },
          text: {
            primary: '#F8FAFC',
            secondary: '#A1A1AA',
            muted: '#71717A',
          },
          status: {
            active: '#10B981',
            warning: '#F59E0B',
            idle: '#6B7280',
            planned: '#8B5CF6',
          }
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'purple-glow': '0 0 25px -5px rgba(168, 85, 247, 0.25)',
        'cyan-glow': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        'studio-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

