import React, { SVGProps } from "react";

function BarCharUp(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M6.86 12.74H2.75v5.94h4.11v-5.94zM14.06 9.03h-4.01v9.65h4.01V9.03zM21.25 5.32h-4.11v13.36h4.11V5.32z"
			></path>
		</svg>
	);
}

export default BarCharUp;
