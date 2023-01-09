import React, { SVGProps } from "react";

function Cart(props: SVGProps<SVGSVGElement>) {
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
				stroke={props.color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M9.273 22c.502 0 .909-.405.909-.905s-.407-.905-.91-.905a.907.907 0 00-.908.905c0 .5.407.905.909.905zM19.273 22c.502 0 .909-.405.909-.905s-.407-.905-.91-.905a.907.907 0 00-.909.905c0 .5.407.905.91.905z"
			></path>
			<path
				stroke={props.color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M2 3h3.636l2.437 12.115c.083.416.31.79.643 1.057.332.266.748.408 1.175.4h8.836c.427.008.843-.134 1.175-.4.333-.267.56-.64.643-1.057L22 7.524H6.545"
			></path>
		</svg>
	);
}

export default Cart;
