import React from "react";
import { Icon } from "../../types/icon";

function Instargram({ size, color }: Icon) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox={`0 0 ${size} ${size}`}>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M16.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0016.5 3z"
			></path>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M15.6 11.432a3.6 3.6 0 11-7.121 1.057 3.6 3.6 0 017.121-1.057zM16.95 7.05h.008"
			></path>
		</svg>
	);
}

export default Instargram;
