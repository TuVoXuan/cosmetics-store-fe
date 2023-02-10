import React, { SVGProps } from "react";

function GoogleLine(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M21.25 12.23c0-.61-.08-1.06-.15-1.55h-8.95v3.22h5.31c-.19 1.4-1.59 4.06-5.31 4.06-3.22 0-5.84-2.65-5.84-5.95 0-5.27 6.22-7.7 9.55-4.47l2.58-2.46c-1.63-1.52-3.79-2.46-6.29-2.46-5.23 0-9.4 4.21-9.4 9.4 0 5.23 4.17 9.4 9.4 9.4 5.42-.02 9.1-3.81 9.1-9.19z"
			></path>
		</svg>
	);
}

export default GoogleLine;
