import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			d="M16 21.455a5.454 5.454 0 1 0 0-10.91 5.454 5.454 0 0 0 0 10.91ZM16 4v2.182M16 25.818V28M7.513 7.513l1.549 1.549M22.938 22.938l1.55 1.55M4 16h2.182M25.818 16H28M7.513 24.487l1.549-1.549M22.938 9.062l1.55-1.55"
			// stroke="#00CC96"
			strokeWidth={2.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default SvgComponent;
