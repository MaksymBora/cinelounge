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
      },
      height: {
        navHeight: '70px',
      },
      boxShadow: {
        headerShadow:
          '0 0 20px -10px hsla(0,0%,59%,.2), 0 0 1px 1px hsla(0,0%,49%,.2)',
      },
    },
  },
  plugins: [],
};
