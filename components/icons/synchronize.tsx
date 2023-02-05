import React, { SVGProps } from "react";

function Synchronize(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M5.39 14.64L8.03 12M5.39 14.64L2.75 12M18.61 9.78l-2.64 2.64M18.61 9.78l2.64 2.64M18.61 10.28v5.49c0 1.56-1.27 2.83-2.83 2.83H8.22M5.39 14.31V8.22c0-1.56 1.27-2.83 2.83-2.83h7.55"
			></path>
		</svg>
	);
}

export default Synchronize;
