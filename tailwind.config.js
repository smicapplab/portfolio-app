/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			zIndex: {
				10: '10',
				50: '50',
				100: '100'
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#FF69B4', // Orange as primary color
					'primary-content': '#ffffff', // White text on primary color
					secondary: '#008080', // Light grey as secondary color
					'secondary-content': '#ffffff',
					neutral: '#3d4451', // Default neutral color for other elements
					'base-100': '#ffffff' // Base background color
				}
			},
			'dark'
		]
	}
};
