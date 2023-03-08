import React, { SVGProps } from "react";

function Return(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			fill="none"
			viewBox="0 0 32 32"
			height={24}
			width={24}
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M29 21.521V10.364a2.798 2.798 0 00-1.389-2.412L17.89 2.374a2.77 2.77 0 00-2.778 0L5.39 7.952A2.784 2.784 0 004 10.364v11.157a2.798 2.798 0 001.389 2.412l9.722 5.579a2.77 2.77 0 002.778 0l9.722-5.579A2.782 2.782 0 0029 21.521z"
			></path>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M4.375 8.914L16.5 15.957l12.125-7.043M16.5 30V15.943"
			></path>
		</svg>
	);
}

export default Return;
