import React, { SVGProps } from "react";

function BarCharDown(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M17.139 18.683h4.11v-5.94h-4.11v5.94zM9.944 18.681h4.01v-9.65h-4.01v9.65zM2.751 18.68h4.11V5.32h-4.11v13.36z"
			></path>
		</svg>
	);
}

export default BarCharDown;
