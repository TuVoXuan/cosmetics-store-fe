import React from "react";

interface Props {
	children?: React.ReactNode | React.ReactNode[];
	type: "primary" | "secondary";
	className?: string;
	btnType?: "submit" | "reset" | "button";
	onClick?: () => void;
}

export default function Button({ children, type, className, btnType = "button", onClick }: Props) {
	const getCSSType = () => {
		if (type === "primary") {
			return "bg-primary-100 text-light-100";
		}
		return "border-2 border-gray-accent text-dark-100 dark:text-white-light";
	};

	return (
		<button
			onClick={onClick}
			type={btnType}
			className={`rounded-[32px] font-bold px-6 py-3 text-heading-5 md:px-10 md:py-4 md:text-heading-4 hover:border-primary-100 ${getCSSType()} ${className}`}
		>
			{children}
		</button>
	);
}
