import React from "react";

interface Props {
	title: string;
	type: "primary" | "secondary";
	className?: string;
	btnType?: "submit" | "reset" | "button";
	form?: string;
	onClick?: () => void;
}

export default function Button({ title, type, className, form, onClick, btnType = "button" }: Props) {
	const getCSSType = () => {
		if (type === "primary") {
			return "bg-primary-100 text-light-100";
		}
		return "border-2 border-gray-accent text-dark-100 dark:text-white-light dark:border-black-dark-2";
	};

	return (
		<button
			onClick={onClick}
			form={form}
			type={btnType}
			className={`rounded-[32px] font-bold px-6 py-3 text-heading-5 md:px-10 md:py-4 md:text-heading-4 ${getCSSType()} ${className}`}
		>
			{title}
		</button>
	);
}
