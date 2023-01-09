import React, { SVGProps } from "react";

function Zoom(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width}
			height={props.height}
			fill="none"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill={props.color}
				fillRule="evenodd"
				d="M3 11a8 8 0 1116 0 8 8 0 01-16 0zm8-10C5.477 1 1 5.477 1 11s4.477 10 10 10a9.959 9.959 0 006.329-2.257l3.964 3.964a1 1 0 001.414-1.414l-3.964-3.964A9.958 9.958 0 0021 10.999C21 5.478 16.523 1 11 1zm0 6a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H8a1 1 0 110-2h2V8a1 1 0 011-1z"
				clipRule="evenodd"
			></path>
		</svg>
	);
}

export default Zoom;
