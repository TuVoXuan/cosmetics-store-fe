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
				"heading-1": ["2.5rem", "3.5rem"],
				"heading-2": ["2rem", "3rem"],
				"heading-3": ["1.5rem", "2rem"],
				"heading-4": ["1.25rem", "2rem"],
				"heading-5": ["1rem", "1.5rem"],
				"heading-6": ["0.875rem", "1.5rem"],
				"paragraph-1": ["1.5rem", "2.5rem"],
				"paragraph-2": ["1.375rem", "2rem"],
				"paragraph-3": ["1.125rem", "2rem"],
				"paragraph-4": ["1rem", "2rem"],
				"paragraph-5": ["0.875rem", "1.5rem"],
			},
		},
	},
	plugins: [],
};