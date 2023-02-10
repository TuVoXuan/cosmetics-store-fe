import clsx from "clsx";
import error from "next/error";
import React, { useEffect, useRef, useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
	children: React.ReactNode;
	name: string;
	register: UseFormRegister<any>;
	option?: RegisterOptions;
	error?: string;
	value: string;
	selected?: boolean;
	onClick?: (value: string) => void;
}

export default function Radio({
	children,
	name,
	option,
	error,
	value,
	selected = false,
	onClick,
	register,
}: Props) {
	const radioRef = useRef<HTMLInputElement | null>(null);
	const { ref, ...rest } = register(name, { ...option });

	const handleClick = () => {
		if (radioRef.current) {
			radioRef.current.click();
			onClick && onClick(value);
		}
	};

	return (
		<div className="flex items-start select-none gap-x-4 group dark:text-white-light">
			<input
				{...rest}
				ref={(e) => {
					ref(e);
					radioRef.current = e;
				}}
				name={name}
				value={value}
				type="radio"
				className="hidden"
			/>
			<div
				onClick={handleClick}
				className={clsx(
					"w-6 h-6 transition-all duration-300 ease-linear  rounded-full cursor-pointer shrink-0 group-hover:border-primary-100 dark:group-hover:border-primary-100",
					selected ? "checkboxActive" : "checkboxNoActiveBold",
					error && "!border-red-accent"
				)}
			></div>
			{children}
		</div>
	);
}
