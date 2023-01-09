import React from "react";

interface Props {
	title: string;
	type: "primary" | "secondary";
	size: "large" | "small";
	className?: string;
}

export default function PrimaryBtn({ title, size, type, className }: Props) {
	const getCSSType = () => {
		if (type === "primary") {
			return "bg-primary-100 text-light-100";
		}
		return "border-2 border-gray-accent text-dark-100";
	};

	const getSize = () => {
		if (size === "large") {
			return "px-10 py-4 text-heading-4";
		}

		return "px-6 py-3 text-heading-5";
	};

	return (
		<button className={`rounded-[32px] font-bold ${getCSSType()} ${getSize()} ${className}`}>
			{title}
		</button>
	);
}
