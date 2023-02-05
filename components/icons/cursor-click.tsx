import React, { SVGProps } from "react";

function CursorClick(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M21.2 21.2l-3.52-3.52M10.85 12.22l2.69 8.28c.29.88 1.47 1.02 1.96.24.53-.85 1.05-1.7 1.58-2.56.28-.45.65-.83 1.1-1.1.85-.53 1.7-1.05 2.56-1.58.79-.49.64-1.67-.24-1.96l-8.28-2.69c-.84-.27-1.64.53-1.37 1.37zM6.5 6.5L5.22 5.22M4.56 11.1H2.75M6.44 15.73l-1.28 1.28M11.1 4.56V2.75M15.73 6.44l1.28-1.28"
			></path>
		</svg>
	);
}

export default CursorClick;
