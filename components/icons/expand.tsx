import React, { SVGProps } from "react";

function Expand(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width}
			height={props.height}
			fill="none"
			viewBox="0 0 16 16"
			{...props}
		>
			<path stroke={props.color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 5l6 6 6-6"></path>
		</svg>
	);
}

export default Expand;