import React, { SVGProps } from "react";

function Selected(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			fill="currentColor"
			viewBox="0 0 16 16"
			{...props}
		>
			<path
				fillRule="evenodd"
				d="M14.762 3.353a1 1 0 01-.115 1.41l-8.25 7.005a1 1 0 01-1.294 0l-3.75-3.184a1 1 0 011.294-1.525L5.75 9.694l7.603-6.456a1 1 0 011.41.115z"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export default Selected;
