import React, { SVGProps } from "react";

function Lock(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M3.76 18.11v-3.99a3.16 3.16 0 013.16-3.16h10.17a3.16 3.16 0 013.16 3.16v3.99a3.16 3.16 0 01-3.16 3.16H6.92c-1.75 0-3.16-1.41-3.16-3.16z"
			></path>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M6.85 10.97V7.92c0-2.84 2.31-5.15 5.15-5.15 2.84 0 5.15 2.31 5.15 5.15v3.05H6.85zM12 18.18V15.6"
			></path>
			<path
				fill="currentColor"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M12 16.12a1.03 1.03 0 100-2.06 1.03 1.03 0 000 2.06z"
			></path>
		</svg>
	);
}

export default Lock;
