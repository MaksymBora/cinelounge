/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        main: ['"Montserrat", sans-serif'],
      },
      colors: {
        mainBgColor: '#212529',
        mainTextColo: '#f6f9ff',
        headerColor: '#1e2125',
        bgCard: '#3a4146',
        secondaryText: '#ddd',
        rateBg: '#081c22',
        navFooter: '#1e2125',
        movieAboutBg: 'rgba(0, 0, 0, 0.77)',
        imageGallery: 'rgba(0, 0, 0, 0.88)',
        line: 'rgba(150, 150, 150, 0.5)',
        authBtn: '#17b28e',
        clearAllBtn: 'rgb(242, 242, 242)',
      },
      spacing: {
        rateT: '-20px',
        rateL: '11px',
        sectionSearch: '2rem auto 3rem',
      },
      height: {
        navHeight: '70px',
        iframeH: 'clamp(1px, 990px, calc(88vw * 0.5625))',
        auth: 'calc(100vh - 80px)',
      },
      boxShadow: {
        navShadow:
          '0 0 20px -10px hsla(0,0%,59%,.2), 0 0 1px 1px hsla(0,0%,49%,.2)',
        cardShadow:
          'rgba(0, 0, 0, 0.07) 0px 1px 3px 0px, rgba(27, 31, 35, 0.12) 0px 0px 0px 1px',
        castShadow: '0 1px 12px -3px rgba(0, 0, 0, 0.1)',
        actorShadow: '1px 0 10px rgba(0, 0, 0, 0.2)',
        btnAuth: '0 0 20px -1px rgba(13, 13, 13, 0.2)',
        filterBtn: '0 0 4px -1px rgba(0, 0, 0, 0.5)',
      },
      gridTemplateColumns: {
        filmList: 'repeat(auto-fit, minmax(215px, 1fr))',
        search: 'repeat(auto-fit, minmax(215px, 1fr))',
      },
      borderRadius: {
        cardBr: '3px',
        rating: '50px',
      },
      padding: {
        150: '150%',
        details: '28px 20px 20px',
        actor: '14px 11px 12px',
      },
      minHeight: {
        100: '100px',
        watchlist: 'calc(100vh - 171px)',
      },
      fontSize: {
        13: ['13px', '20px'],
        8: ['8px', '16px'],
      },
      maxWidth: {
        xxl: 'clamp(1px, 1440px, 92vw)',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: 'opacity: 0',
          },
        },
      },
      width: {
        iframeW: 'clamp(1px, 1760px, 88vw)',
      },
      gap: {
        actorDetails: 'clamp(1px, 5vw, 3.5rem)',
      },
    },
  },
  plugins: [],
};
