import React from "react";
import { SVGProps } from "react";

const Sun = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={props.width}
		height={props.height}
		fill="none"
		viewBox="0 0 16 16"
		{...props}
	>
		<path
			stroke={props.color}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M8 10.727a2.727 2.727 0 100-5.454 2.727 2.727 0 000 5.454zM8 2v1.09M8 12.91V14M3.756 3.756l.775.775M11.47 11.47l.774.774M2 8h1.09M12.91 8H14M3.756 12.244l.775-.775M11.47 4.53l.774-.774"
		></path>
	</svg>
);

export default Sun;
