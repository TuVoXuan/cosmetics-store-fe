import React, { MouseEvent } from "react";

interface Props {
	children?: React.ReactNode | React.ReactNode[];
	type: "primary" | "secondary" | "danger";
	className?: string;
	btnType?: "submit" | "reset" | "button";
	form?: string;
	disable?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
	children,
	type,
	className,
	form,
	disable = false,
	btnType = "button",
	onClick,
}: Props) {
	const getCSSType = () => {
		if (type === "primary") {
			return "bg-primary-100 text-light-100";
		} else if (type === "danger") {
			return "bg-red-accent text-light-100";
		}
		return "border-2 border-gray-accent text-dark-100 dark:text-white-light dark:border-black-dark-2 hover:!border-dark-100 dark:hover:!border-white";
	};

	return (
		<button
			onClick={onClick}
			disabled={disable}
			form={form}
			type={btnType}
			className={`rounded-[32px] font-bold px-6 py-3 text-heading-5 md:px-10 md:py-4 md:text-heading-4 
			hover:border-primary-100 transition-colors ease-linear select-none
				disabled:cursor-not-allowed
			${getCSSType()} ${className}`}
		>
			{children}
		</button>
	);
}
