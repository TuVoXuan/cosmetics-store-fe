import React from "react";
import GoBack from "../icons/go-back";
import GoForward from "../icons/go-forward";

interface Props {
	size: "large" | "small";
}

export default function QuantityBtn({ size }: Props) {
	return (
		<div
			className={`flex items-center border-2 border-gray-accent rounded-[32px] w-fit ${
				size === "large" ? "gap-x-11 px-6 py-4" : "gap-x-8 py-2 px-4"
			}`}
		>
			<GoBack className="cursor-pointer" width={16} height={16} color="#1A202C" />
			<span
				className={`font-bold text-dark-100 ${
					size === "large" ? "text-heading-3" : "text-heading-4"
				}`}
			>
				1
			</span>
			<GoForward className="cursor-pointer" width={16} height={16} color="#1A202C" />
		</div>
	);
}
