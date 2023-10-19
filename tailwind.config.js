/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mainBgColor: '#212529',
        mainTextColo: '#f6f9ff',
        headerColor: '#1e2125',
        bgCard: '#3a4146',
        secondaryText: '#ddd',
        rateBg: '#081c22',
        navFooter: '#1e2125',
        movieAboutBg: 'rgba(0, 0, 0, 0.77)',
      },
      spacing: {
        rateT: '-20px',
        rateL: '11px',
      },
      height: {
        navHeight: '70px',
      },
      boxShadow: {
        navShadow:
          '0 0 20px -10px hsla(0,0%,59%,.2), 0 0 1px 1px hsla(0,0%,49%,.2)',
        cardShadow:
          'rgba(0, 0, 0, 0.07) 0px 1px 3px 0px rgba(27, 31, 35, 0.12) 0px 0px 0px 1px;',
      },
      gridTemplateColumns: {
        filmList: 'repeat(auto-fit, minmax(215px, 1fr))',
      },
      borderRadius: {
        cardBr: '3px',
        rating: '50px',
      },
      padding: {
        150: '150%',
        details: '28px 20px 20px',
      },
      minHeight: {
        100: '100px',
      },
      fontSize: {
        13: ['13px', '20px'],
        8: ['8px', '16px'],
      },
      maxWidth: {
        xxl: 'clamp(1px, 1440px, 92vw)',
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
};
