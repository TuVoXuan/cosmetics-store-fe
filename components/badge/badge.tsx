import React from "react";
import { primary } from "../../styles/color";

interface IBadge {
	size: "small" | "medium" | "large";
	children: string;
	color?: string;
	backgroundColor?: string;
}

export default function Badge({ size, children, color, backgroundColor }: IBadge) {
	let className = "font-bold w-fit ";
	switch (size) {
		case "small":
			className += "px-4 py-2 text-heading-6 rounded-3xl";
			break;
		case "medium":
			className += "px-6 py-3 text-heading-5 rounded-3xl";
		case "large":
			className += "px-8 py-3 text-heading-4 rounded-4xl";
		default:
			break;
	}

	return (
		<p
			className={className}
			style={{
				color: color ? color : primary[100],
				backgroundColor: backgroundColor ? backgroundColor : primary[10],
			}}
		>
			{children}
		</p>
	);
}
