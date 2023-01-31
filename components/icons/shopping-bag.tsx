import React, { SVGProps } from "react";

function ShoppingBag(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			fill="none"
			viewBox="0 0 32 32"
			{...props}
		>
			<path
				// stroke={props.color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M8.167 2L4 7.6v19.6c0 .743.293 1.455.814 1.98.52.525 1.227.82 1.964.82h19.444c.737 0 1.444-.295 1.964-.82.521-.525.814-1.237.814-1.98V7.6L24.833 2H8.167zM4 7.6h25"
			></path>
			<path
				// stroke={props.color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
				d="M22.056 13.2c0 1.485-.586 2.91-1.628 3.96A5.533 5.533 0 0116.5 18.8a5.533 5.533 0 01-3.928-1.64 5.623 5.623 0 01-1.627-3.96"
			></path>
		</svg>
	);
}

export default ShoppingBag;
