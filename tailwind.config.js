module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			padding: {
				DEFAULT: '5%',
				sm: '32px',
			},
		},
		extend: {
			colors: {
				base: '#0e0130',
				primary: '#FFFFFF',
				theme: {
					orange: '#FF5B14',
					blue: '#2DA7FB',
					yellow: '#FFCB11',
					red: '#ec4141',
					green: '#67db8e',
					purple: '#BD77ED',
				},
			},
			fontFamily: {
				main: 'ProximaNova, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
			},
			screens: {
				'-2xl': { raw: '(max-width: 1535px)' },
				'-xl': { raw: '(max-width: 1279px)' },
				'-lg': { raw: '(max-width: 1023px)' },
				'-md': { raw: '(max-width: 767px)' },
				'-sm': { raw: '(max-width: 639px)' },
			},
		},
	},
	plugins: [],
};
// make custom color with -theme-
