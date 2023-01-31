import React, { SVGProps } from "react";

function Protection(props: SVGProps<SVGSVGElement>) {
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
				d="M16 30s11-5.6 11-14V6.2L16 2 5 6.2V16c0 8.4 11 14 11 14z"
			></path>
		</svg>
	);
}

export default Protection;
