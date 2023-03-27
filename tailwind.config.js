/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./layout/**/*.{js,ts,jsx,tsx}",
		"./views/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#00CC96",
					10: "rgba(0, 204, 150, 0.1)",
				},
				secondary: {
					100: "#2975FF",
					10: "rgba(41, 117, 255, 0.1)",
				},
				"yellow-tertiary": {
					100: "#FFC123",
					10: "rgba(255, 193, 35, 0.1)",
				},
				"pink-tertiary": {
					100: "#FF66A0",
					10: "rgba(255, 102, 160, 0.1)",
				},
				"gray-accent": "#F6F7FB",
				"red-accent": "#FF0000",
				dark: {
					100: "#1A202C",
					64: "rgba(26, 32, 44, 0.64)",
					40: "rgba(26, 32, 44, 0.4)",
					24: "rgba(26, 32, 44, 0.24)",
				},
				light: {
					100: "#F7FAFC",
					64: "rgba(247, 250, 252, 0.64)",
					40: "rgba(247, 250, 252, 0.4)",
					24: "rgba(247, 250, 252, 0.24)",
				},
				"black-dark": {
					1: "#000000",
					2: "#1E1E27",
					3: "#14141B",
					4: "#2C2C37",
				},
				"white-light": "#ffffff",
			},

			fontFamily: {
				sans: ["var(--font-montserrat)"],
			},

			fontSize: {
				"heading-1": ["2.5rem", "3.5rem"], //40px
				"heading-2": ["2rem", "3rem"], //32px
				"heading-3": ["1.5rem", "2rem"], //24px
				"heading-4": ["1.25rem", "2rem"], //20px
				"heading-5": ["1rem", "1.5rem"], //16px
				"heading-6": ["0.875rem", "1.5rem"], //14px
				"paragraph-1": ["1.5rem", "2.5rem"], //24px
				"paragraph-2": ["1.25rem", "2rem"], //20px
				"paragraph-3": ["1.125rem", "2rem"], //18px
				"paragraph-4": ["1rem", "2rem"], //16px
				"paragraph-5": ["0.875rem", "1.5rem"], //14px
				"paragraph-6": ["0.75rem", "1.125rem"], //12px
				"paragraph-7": ["0.625rem", "1.125rem"], //10px
			},

			borderRadius: {
				"4xl": "2rem",
				"5xl": "3rem",
			},

			screens: {
				xl: "1440px",
			},

			maxWidth: {
				"2/3": "66.666667%",
			},
			maxHeight: {
				"2/3": "66.666667%",
			},

			width: {
				"screen-4/5": "80vw",
				"screen-1/2": "50vw",
				"screen-1/3": "33.333333vw",
			},

			boxShadow: {
				"t-sm": "0 -1px 2px 0 rgba(0, 0, 0, 0.05)",
				"t-md": "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
				"t-lg": "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
				"t-xl": "0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
				"t-2xl": "0 -25px 50px -12px rgba(0, 0, 0, 0.25)",
				"t-3xl": "0 -35px 60px -15px rgba(0, 0, 0, 0.3)",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
