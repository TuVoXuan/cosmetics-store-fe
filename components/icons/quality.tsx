import React, { SVGProps } from "react";

function Quality(props: SVGProps<SVGSVGElement>) {
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
				d="M16 3l4.326 8.557L30 12.938l-7 6.657L24.652 29 16 24.557 7.348 29 9 19.595l-7-6.657 9.674-1.38L16 3z"
			></path>
		</svg>
	);
}

export default Quality;
