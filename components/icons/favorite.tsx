import React, { SVGProps } from "react";

function Favorite(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width}
			height={props.height}
			fill="none"
			viewBox="0 0 32 32"
			{...props}
		>
			<path
				stroke={props.color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M27.84 6.122a7.376 7.376 0 00-2.39-1.57 7.48 7.48 0 00-5.64 0 7.378 7.378 0 00-2.39 1.57L16 7.517l-1.42-1.395A7.436 7.436 0 009.369 4a7.435 7.435 0 00-5.21 2.12A7.179 7.179 0 002 11.243c0 1.921.776 3.763 2.158 5.121l1.42 1.396L16 28 26.42 17.759l1.42-1.396a7.233 7.233 0 001.598-2.35 7.132 7.132 0 000-5.542 7.234 7.234 0 00-1.598-2.35v0z"
			></path>
		</svg>
	);
}

export default Favorite;
