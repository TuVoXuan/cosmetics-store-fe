import React, { SVGProps } from "react";

function Natural(props: SVGProps<SVGSVGElement>) {
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
				d="M15.993 2l7.783 8.203a11.801 11.801 0 013.012 5.937 12.18 12.18 0 01-.625 6.7c-.832 2.12-2.242 3.931-4.051 5.205A10.603 10.603 0 0116 30c-2.176 0-4.303-.68-6.112-1.955-1.81-1.274-3.219-3.085-4.051-5.205a12.179 12.179 0 01-.625-6.7 11.801 11.801 0 013.012-5.937L15.994 2z"
			></path>
		</svg>
	);
}

export default Natural;
