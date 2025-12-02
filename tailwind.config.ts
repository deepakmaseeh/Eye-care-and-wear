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
        // Background Colors - Clean & Modern
        bg: {
          primary: '#FFFFFF',
          secondary: '#FAFBFC',
          tertiary: '#F8F9FA',
          hover: '#F0F4F8',
          active: '#E8EDF2',
        },
        // Brand Colors - Vibrant & Eye-Catching
        brand: {
          primary: '#0EA5E9', // Sky Blue
          'primary-hover': '#0284C7',
          'primary-active': '#0369A1',
          'primary-light': '#E0F2FE',
          secondary: '#F59E0B', // Amber
          'secondary-hover': '#D97706',
          'secondary-active': '#B45309',
          'secondary-light': '#FEF3C7',
          accent: '#8B5CF6', // Purple
          'accent-hover': '#7C3AED',
          'accent-light': '#EDE9FE',
        },
        // Text Colors - High Contrast
        text: {
          primary: '#0F172A', // Slate 900
          secondary: '#475569', // Slate 600
          tertiary: '#94A3B8', // Slate 400
          inverse: '#FFFFFF',
          brand: '#0EA5E9',
        },
        // Semantic Colors - Vibrant & Clear
        success: {
          DEFAULT: '#10B981', // Emerald
          bg: 'rgba(16, 185, 129, 0.1)',
          light: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber
          bg: 'rgba(245, 158, 11, 0.1)',
          light: '#FEF3C7',
        },
        error: {
          DEFAULT: '#EF4444', // Red
          bg: 'rgba(239, 68, 68, 0.1)',
          light: '#FEE2E2',
        },
        info: {
          DEFAULT: '#3B82F6', // Blue
          bg: 'rgba(59, 130, 246, 0.1)',
          light: '#DBEAFE',
        },
        // Border Colors
        border: {
          primary: 'rgba(15, 23, 42, 0.1)',
          secondary: 'rgba(15, 23, 42, 0.06)',
          hover: 'rgba(15, 23, 42, 0.15)',
          brand: 'rgba(14, 165, 233, 0.3)',
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
        'soft-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'soft-md': '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)',
        'soft-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
        'brand': '0 4px 14px 0 rgba(14, 165, 233, 0.2)',
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

