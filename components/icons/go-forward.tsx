import React, { SVGProps } from "react";

function GoForward(props: SVGProps<SVGSVGElement>) {
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
				d="M4.293 1.293a1 1 0 000 1.414L9.586 8l-5.293 5.293a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414l-6-6a1 1 0 00-1.414 0z"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export default GoForward;
