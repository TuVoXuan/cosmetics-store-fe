/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
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
			},

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
