import React, { SVGProps } from "react";

function GoBack(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			stroke="none"
			fill="currentColor"
			viewBox="0 0 16 16"
			{...props}
		>
			<path
				// fill="#000"
				fillRule="evenodd"
				d="M11.707 1.293a1 1 0 010 1.414L6.414 8l5.293 5.293a1 1 0 01-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export default GoBack;
