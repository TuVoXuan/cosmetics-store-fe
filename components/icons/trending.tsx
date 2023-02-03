import React, { SVGProps } from "react";

function Trending(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 32 32"
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M30 9L17.91 20.875l-6.364-6.25L2 24"
			></path>
			<path
				stroke={props.color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M22 9h8v8"
			></path>
		</svg>
	);
}

export default Trending;
