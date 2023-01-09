import React, { SVGProps } from "react";

function GoBack(props: SVGProps<SVGSVGElement>) {
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
				stroke={props.color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M16.5 21l-9-9 9-9"
			></path>
		</svg>
	);
}

export default GoBack;
