/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/enhancers/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#040c15'
        },
        tree: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bef3c9',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#066f38',
          800: '#044b29',
          900: '#03251a',
          950: '#01160f'
        }
      },
      fontSize: {
        xsmall: '0.75rem',
        small: '0.875rem',
        base: '1rem',
        large: '1.25rem',
        xlarge: '1.5rem',
        '2xlarge': '2rem',
        '3xlarge': '2.25rem',
        '4xlarge': '3rem'
      },
      fontWeight: {
        rg: 300,
        md: 400,
        sb: 500,
        bd: 600
      },
      lineHeight: {
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        none: '1rem',
        tight: '1.28rem',
        snug: '1.32rem',
        normal: '1.5rem',
        loose: '2rem'
      },
      letterSpacing: {
        'spacing-none': '0%',
        'spacing-normal': '-1%',
        'spacing-tight': '-2%'
      },
      borderRadius: {
        none: '0rem',
        '2xsmall': '0.125rem',
        xsmall: '0.25rem',
        small: '0.375rem',
        base: '0.5rem',
        large: '0.75rem',
        xlarge: '1rem',
        '2xlarge': '1.25rem',
        full: '50%'
      },
      borderWidth: {
        'border-1': '0.0625rem',
        'border-icon': '0.075rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar')]
};
