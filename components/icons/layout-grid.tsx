import * as React from "react";
import { SVGProps } from "react";

const LayoutGrid = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			d="M8.68 10.36H5.32c-.93 0-1.68-.75-1.68-1.68V5.32c0-.93.75-1.68 1.68-1.68h3.36c.93 0 1.68.75 1.68 1.68v3.36c0 .93-.75 1.68-1.68 1.68zM18.68 10.36h-3.36c-.93 0-1.68-.75-1.68-1.68V5.32c0-.93.75-1.68 1.68-1.68h3.36c.93 0 1.68.75 1.68 1.68v3.36c0 .93-.75 1.68-1.68 1.68zM8.68 20.36H5.32c-.93 0-1.68-.75-1.68-1.68v-3.36c0-.93.75-1.68 1.68-1.68h3.36c.93 0 1.68.75 1.68 1.68v3.36c0 .93-.75 1.68-1.68 1.68zM18.68 20.36h-3.36c-.93 0-1.68-.75-1.68-1.68v-3.36c0-.93.75-1.68 1.68-1.68h3.36c.93 0 1.68.75 1.68 1.68v3.36c0 .93-.75 1.68-1.68 1.68z"
		></path>
	</svg>
);

export default LayoutGrid;
