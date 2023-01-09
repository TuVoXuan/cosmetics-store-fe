import React, { SVGProps } from "react";

function Moon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width}
			height={props.height}
			fill="none"
			viewBox="0 0 32 32"
			{...props}
		>
			<path
				stroke={props.color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M28 17.081A12.026 12.026 0 1114.919 4a9.353 9.353 0 006.826 14.887c2.234.166 4.453-.862 6.255-2.193v.387z"
			></path>
		</svg>
	);
}

export default Moon;
