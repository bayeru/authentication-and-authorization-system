/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./**/*.html"],
	theme: {
	  extend: {},
	  fontFamily: {
		sans: ['Inter']
	  }
	},
	plugins: [
	  require('@tailwindcss/forms')
	],
  }
  