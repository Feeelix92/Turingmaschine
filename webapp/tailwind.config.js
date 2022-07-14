module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        rollLeft: 'rollLeft 2s ease-in-out',
        rollRight: 'rollRight 2s ease-in-out',
        fadeIn: 'fadeIn 4s ease-in-out',
      },
      keyframes: {
        'rollLeft': {
          '0%': {transform: ['translateX(25vw)']},
          '100%': {transform: ['translateX(0px)']},
        },
        'rollRight': {
          '0%': {transform: ['translateX(-25vw)']},
          '100%': {transform: ['translateX(0px)']},
        },
        'fadeIn': {
          '0%': {opacity: '0.0'},
          '50%': {opacity: '0.2'},
          '100%': {opacity: '1.0'},
        },
      },
      colors: {
        // Configure your color palette here
        // THM Farben
        'thm': {
          primary: '#80ba24',
          primary2: '#4a5c66',
          secondary: '#9C132E',
          secondary2: '#F4AA00',
          secondary3: '#00B8E4',
          secondary4: '#002878',
          hover: '#5a811b',
          link: '#61dafb',
        },
      }
    }
  },
  plugins: [],
}