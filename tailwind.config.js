/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
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
        'text-xsmall': '0.75rem',
        'text-small': '0.875rem',
        'text-base': '1rem',
        'text-large': '1.25rem',
        'text-xlarge': '1.5rem',
        'text-2xlarge': '2rem',
        'text-3xlarge': '2.25rem',
        'text-4xlarge': '3rem'
      },
      fontWeight: {
        'font-rg': 300,
        'font-md': 400,
        'font-sb': 500,
        'font-bd': 600
      },
      lineHeight: {
        'leading-3': '0.75rem',
        'leading-4': '1rem',
        'leading-5': '1.25rem',
        'leading-6': '1.5rem',
        'leading-7': '1.75rem',
        'leading-8': '2rem',
        'leading-9': '2.25rem',
        'leading-10': '2.5rem',
        'leading-none': '1rem',
        'leading-tight': '1.28rem',
        'leading-snug': '1.32rem',
        'leading-normal': '1.5rem',
        'leading-loose': '2rem'
      },
      letterSpacing: {
        'spacing-none': '0%',
        'spacing-normal': '-1%',
        'spacing-tight': '-2%'
      },
      borderRadius: {
        'rounded-none': '0rem',
        'rounded-2xsmall': '0.125rem',
        'rounded-xsmall': '0.25rem',
        'rounded-small': '0.375rem',
        'rounded-base': '0.5rem',
        'rounded-large': '0.75rem',
        'rounded-xlarge': '1rem',
        'rounded-2xlarge': '1.25rem',
        'rounded-full': '50%'
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
