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
          98: '#F8F9FC',
          95: '#F2F4F8',
          90: '#E2E7EE',
          80: '#C8D0DD',
          70: '#B3BDCC',
          60: '#959EB2',
          50: '#778195',
          40: '#566070',
          30: '#414752',
          20: '#2F333D',
          10: '#16181D'
        },
        tree: {
          97: '#F0FCF2',
          93: '#DFF7E5',
          90: '#C7F2D4',
          80: '#A0EBD9',
          70: '#6AE597',
          60: '#2CDE76',
          50: '#08C767',
          40: '#04AB5D',
          30: '#03854E',
          20: '#015939',
          10: '#003322',
          'tint-80': 'rgba(8, 199, 103, 0.8)',
          'tint-50': 'rgba(8, 199, 103, 0.5)',
          'tint-24': 'rgba(8, 199, 103, 0.24)',
          'tint-12': 'rgba(8, 199, 103, 0.12)'
        },
        black: {
          100: '#000000',
          80: 'rgba(0, 0, 0, 0.8)',
          60: 'rgba(0, 0, 0, 0.6)',
          40: 'rgba(0, 0, 0, 0.4)',
          20: 'rgba(0, 0, 0, 0.2)',
          12: 'rgba(0, 0, 0, 0.12)',
          8: 'rgba(0, 0, 0, 0.08)'
        },
        white: {
          100: '#FFFFFF',
          80: 'rgba(255, 255, 255, 0.8)',
          60: 'rgba(255, 255, 255, 0.6)',
          40: 'rgba(255, 255, 255, 0.4)',
          20: 'rgba(255, 255, 255, 0.2)',
          12: 'rgba(255, 255, 255, 0.12)',
          8: 'rgba(255, 255, 255, 0.08)'
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
