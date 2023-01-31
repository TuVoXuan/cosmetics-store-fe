import React, { SVGProps } from "react";

function EyeCare(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			fill="none"
			viewBox="0 0 32 32"
			{...props}
		>
			<path
				// stroke={props.color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M2 16S7.09 6 16 6s14 10 14 10-5.09 10-14 10S2 16 2 16z"
			></path>
			<path
				// stroke={props.color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M16 19.75c2.109 0 3.818-1.679 3.818-3.75 0-2.071-1.71-3.75-3.818-3.75-2.109 0-3.818 1.679-3.818 3.75 0 2.071 1.71 3.75 3.818 3.75z"
			></path>
		</svg>
	);
}

export default EyeCare;
