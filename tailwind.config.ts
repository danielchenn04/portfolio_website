import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base:     'var(--color-bg-base)',
          surface:  'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
          subtle:   'var(--color-bg-subtle)',
        },
        border: {
          default: 'var(--color-border-default)',
          strong:  'var(--color-border-strong)',
          accent:  'var(--color-border-accent)',
        },
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary:  'var(--color-text-tertiary)',
          accent:    'var(--color-text-accent)',
          'on-accent': 'var(--color-text-on-accent)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover:   'var(--color-accent-hover)',
          subtle:  'var(--color-accent-subtle)',
          border:  'var(--color-accent-border)',
        },
        semantic: {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          error:   'var(--color-error)',
          'error-subtle': 'var(--color-error-subtle)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'monospace'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1.4' }],
        'sm':   ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem',     { lineHeight: '1.6' }],
        'lg':   ['1.125rem', { lineHeight: '1.6' }],
        'xl':   ['1.25rem',  { lineHeight: '1.4' }],
        '2xl':  ['1.5rem',   { lineHeight: '1.3' }],
        '3xl':  ['1.875rem', { lineHeight: '1.2' }],
        '4xl':  ['2.25rem',  { lineHeight: '1.15' }],
        '5xl':  ['3rem',     { lineHeight: '1.1' }],
        '6xl':  ['3.75rem',  { lineHeight: '1.05' }],
      },
      spacing: {
        '1':  '0.25rem',
        '2':  '0.5rem',
        '3':  '0.75rem',
        '4':  '1rem',
        '5':  '1.25rem',
        '6':  '1.5rem',
        '8':  '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
      },
      borderRadius: {
        'sm':   '4px',
        'md':   '6px',
        'lg':   '8px',
        'full': '9999px',
      },
      transitionDuration: {
        fast:   '150ms',
        normal: '250ms',
        slow:   '400ms',
      },
      maxWidth: {
        'page': '1200px',
      },
      boxShadow: {
        'card':       'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'elevated':   'var(--shadow-elevated)',
      },
    },
  },
  plugins: [],
};

export default config;
