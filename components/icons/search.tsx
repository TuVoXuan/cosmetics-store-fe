import React, { SVGProps } from "react";

function Search(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			fill="none"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M10.889 19.778a8.889 8.889 0 100-17.778 8.889 8.889 0 000 17.778zM22 22l-4.834-4.833"
			></path>
		</svg>
	);
}

export default Search;
