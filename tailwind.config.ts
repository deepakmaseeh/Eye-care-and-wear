import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme Background Colors
        bg: {
          primary: '#121212',
          secondary: '#1E1E1E',
          tertiary: '#2A2A2A',
          hover: '#353535',
          active: '#404040',
        },
        // Brand Accent Colors
        brand: {
          primary: '#32B8C6',
          'primary-hover': '#3DD5E3',
          'primary-active': '#28A5B1',
          secondary: '#E8A55C',
          'secondary-hover': '#F0B572',
          'secondary-active': '#D89447',
        },
        // Text Colors
        text: {
          primary: '#E8E8E8',
          secondary: '#B4B4B4',
          tertiary: '#8A8A8A',
          inverse: '#1A1A1A',
        },
        // Semantic Colors
        success: {
          DEFAULT: '#4CAF50',
          bg: 'rgba(76, 175, 80, 0.15)',
        },
        warning: {
          DEFAULT: '#FFA726',
          bg: 'rgba(255, 167, 38, 0.15)',
        },
        error: {
          DEFAULT: '#EF5350',
          bg: 'rgba(239, 83, 80, 0.15)',
        },
        info: {
          DEFAULT: '#42A5F5',
          bg: 'rgba(66, 165, 245, 0.15)',
        },
        // Border Colors
        border: {
          primary: 'rgba(232, 232, 232, 0.12)',
          secondary: 'rgba(232, 232, 232, 0.08)',
          hover: 'rgba(232, 232, 232, 0.20)',
        },
        // Frame Colors
        frame: {
          tortoise: '#8B5A3C',
          black: '#1F1F1F',
          crystal: 'rgba(232, 232, 232, 0.25)',
          gold: '#D4AF37',
          silver: '#C0C0C0',
          blue: '#4A90E2',
          pink: '#E06B9F',
          green: '#6FAF6B',
        },
      },
      fontFamily: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.5' }],
        sm: ['clamp(0.875rem, 0.825rem + 0.25vw, 1rem)', { lineHeight: '1.5' }],
        base: ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.5' }],
        lg: ['clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)', { lineHeight: '1.5' }],
        xl: ['clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)', { lineHeight: '1.2' }],
        '2xl': ['clamp(1.5rem, 1.35rem + 0.75vw, 2rem)', { lineHeight: '1.2' }],
        '3xl': ['clamp(2rem, 1.75rem + 1.25vw, 3rem)', { lineHeight: '1.2' }],
        '4xl': ['clamp(2.5rem, 2rem + 2.5vw, 4rem)', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'dark-sm': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 8px rgba(0, 0, 0, 0.4)',
        'dark-lg': '0 8px 16px rgba(0, 0, 0, 0.5)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}

export default config

