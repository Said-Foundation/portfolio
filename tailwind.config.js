/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				card: 'var(--card)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				border: 'var(--border)',
				accent: 'var(--accent)',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				xl: '0.5rem',
			},
			boxShadow: {
				accent: '0 0 15px var(--accent)',
			},
		},
	},
	plugins: [],
	safelist: [
		{
			pattern: /bg-(accent|border)\/\d+/,
		},
		{
			pattern: /shadow-(accent|border)/,
			variants: ['hover'],
		},
	],
};
