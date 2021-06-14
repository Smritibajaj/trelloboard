module.exports = {
  purge: {},
  darkMode: false, // or 'media' or 'class'
  theme: {
    rotate: {
      270: '270deg',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1366px',
    },
    extend: {
      fontFamily: {
        nunito: ['nunito', 'sans-serif'],
      },
      screens: {
        xs: '375px',
      },
      background: {
        default: '#E5E5E5',
      },
      boxShadow: {
        card: '0px 0px 1px rgba(12, 26, 75, 0.24), 0px 3px 8px -1px rgba(50, 50, 71, 0.05)',
      },
      colors: {
        brand: {
          default: '#7A38FF',
          hover: '#6528DF',
          disable: '#E0E0E0',
          focus: '#2F80ED',
          focus1: '#BDBDBD',
          error: '#A41C4E',
          iconred: '#EB5757',
          green: '#27AE60',
          red: '#EB5757',
          light: '#945FFF',
        },
        gray: {
          1: '#333333',
          2: '#4F4F4F',
          3: '#828282',
          4: '#BDBDBD',
          5: '#F5F5F5',
          6: '#F2F2F2',
          7: '#E4E4E4',
          8: '#6B7280',
          9: '#F7F8FB',
          10: '#fbfbfd'
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      borderWidth: ['first', 'last'],
      borderRadius: ['first', 'last'],
      margin: ['first', 'last']
    },
  },
  plugins: [],
};
