/** @type {import('tailwindcss').Config} */
export default {
	purge: ['./src/**/*.svelte', './src/**/*.css'],
	content: ['./index.html', './src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {}
	},
	plugins: []
};
