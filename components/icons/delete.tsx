import React, { SVGProps } from "react";

function Delete(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			fill="none"
			viewBox="0 0 32 32"
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M6.667 6.667l18.666 18.666M6.667 25.334L25.333 6.667"
			></path>
		</svg>
	);
}

export default Delete;
