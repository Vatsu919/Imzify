module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing:{
        100: '40rem',
        97: '32rem',
        98: '34rem',
        99:'36rem',
        101 :'28rem',
      },
      screens:{
        xsm:'425px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
}
