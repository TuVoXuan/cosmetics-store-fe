/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontSize: {
				"heading-1": ["4rem", "5.6rem"],
				"heading-2": ["3.2rem", "4.8rem"],
				"heading-3": ["2.4rem", "3.2rem"],
				"heading-4": ["2rem", "3.2rem"],
				"heading-5": ["1.6rem", "2.4rem"],
				"heading-6": ["1.4rem", "2.4rem"],
				"paragraph-1": ["2.4rem", "4rem"],
				"paragraph-2": ["2.2rem", "3.2rem"],
				"paragraph-3": ["1.8rem", "3.2rem"],
				"paragraph-4": ["1.6rem", "3.2rem"],
				"paragraph-5": ["1.4rem", "2.4rem"],
			},
		},
	},
	plugins: [],
};
