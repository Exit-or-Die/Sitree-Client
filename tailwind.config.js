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
        xsmall: '1.2rem',
        small: '1.4rem',
        base: '1.6rem',
        large: '2rem',
        xlarge: '2.4rem',
        '2xlarge': '3.2rem',
        '3xlarge': '3.6rem',
        '4xlarge': '4.8rem'
      },
      fontWeight: {
        rg: 300,
        md: 400,
        sb: 500,
        bd: 600,
        lb: 700
      },
      lineHeight: {
        3: '1.2rem',
        4: '1.6rem',
        5: '2rem',
        6: '2.4rem',
        7: '2.8rem',
        8: '3.2rem',
        9: '3.6rem',
        10: '4rem',
        none: '1.6rem',
        tight: '2rem',
        snug: '2.12rem',
        normal: '2.4rem',
        loose: '3.2rem'
      },
      letterSpacing: {
        'spacing-none': '0%',
        'spacing-normal': '-1%',
        'spacing-tight': '-2%'
      },
      borderRadius: {
        none: '0rem',
        '2xsmall': '0.2rem',
        xsmall: '0.4rem',
        small: '0.6rem',
        base: '0.8rem',
        large: '1.2rem',
        xlarge: '1.6rem',
        '2xlarge': '2rem',
        full: '80%'
      },
      borderWidth: {
        'border-1': '0.1rem',
        'border-icon': '0.12rem'
      },
      spacing: {
        1: '0.4rem',
        1.5: '0.6rem',
        2: '0.8rem',
        3: '1.2rem',
        4: '1.6rem',
        5: '2rem',
        6: '2.4rem',
        8: '3.2rem',
        10: '4rem',
        12: '4.8rem',
        16: '6.4rem',
        20: '8rem',
        24: '9.6rem',
        32: '12.8rem',
        40: '16rem',
        48: '19.2rem',
        60: '24rem',
        64: '25.6rem',
        72: '28.8rem',
        80: '32rem',
        96: '38.4rem'
      },
      screens: {
        sm: '1080px',
        md: '1440px',
        lg: '1920px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar')]
};
