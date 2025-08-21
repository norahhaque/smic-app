/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blue: {
          dark: '#152B52',
          main: '#1F4D9D',
          light: '#7D9ACB',
          extralight: '#F4F9FE',
          sky: '#8EC6E6',
        },
        green: {
          dark: '#2B6225',
          main: '#54B84C',
          light: '#A4D089',
          mint: '#C8E6C9',
        },
        gray: {
          almostBlack: '#1A1A1A',
          dark: '#4A4A4A',
          main: '#7D7D7D',
          medium: 'A1A4B2',
          light: '#BFBFBF',
          extralight: '#F5F5F5',
        },
        accent: {
          orange: '#F29E2E',
          red: '#E63946',
          yellow: '#F4D35E',
        },
      },
      fontFamily: {
        dmserif: ['DMSerifDisplay-Regular', 'sans-serif'],

        // Lato
        'lato-thin': ['Lato-Thin', 'sans-serif'],
        'lato-light': ['Lato-Light', 'sans-serif'],
        'lato': ['Lato-Regular', 'sans-serif'],
        'lato-bold': ['Lato-Bold', 'sans-serif'],
        'lato-italic': ['Lato-Italic', 'sans-serif'],

        // Raleway
        'raleway-thin': ['Raleway-Thin', 'sans-serif'],
        'raleway-light': ['Raleway-Light', 'sans-serif'],
        'raleway': ['Raleway-Regular', 'sans-serif'],
        'raleway-medium': ['Raleway-Medium', 'sans-serif'],
        'raleway-semibold': ['Raleway-SemiBold', 'sans-serif'],
        'raleway-bold': ['Raleway-Bold', 'sans-serif'],
        'raleway-italic': ['Raleway-Italic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
