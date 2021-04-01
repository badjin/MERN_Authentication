module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        'full': 'calc(100vh - 112px)',
        'full-mobile': 'calc(100vh - 192px)'
      },
      colors: {
        primary: '#FF6363',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        }
      },
      fontFamily: {
        body: ['Nunito']
      },
      height: theme => ({
        "content1": "calc(100vh - 64px)", // Navbar 64px
        "content2": "calc(100vh - 112px)", // Navbar 64px + Footer 48px
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
        "screen/10": "calc(100vh / 10)",
        "screen90": "90vh",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
