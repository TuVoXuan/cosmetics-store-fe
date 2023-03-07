import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import clsx from "clsx";

interface IInput {
	placeholder?: string;
	register?: UseFormRegister<any>;
	option?: RegisterOptions;
	name?: string;
	type?: "text" | "password" | "number";
	label?: string;
	className?: string;
	error?: string;
	disabled?: boolean;
}

export default function Input({
	label,
	placeholder,
	register,
	name,
	option,
	disabled,
	type = "text",
	className,
	error,
}: IInput) {
	if (register && name) {
		return (
			<div>
				<p className="mb-2 text-dark-100 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">{label}</p>
				<input
					{...register(name, { ...option })}
					className={clsx(
						"border-[2px] border-gray-accent font-semibold placeholder:text-dark-40 text-dark-100 focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 dark:focus:outline-none px-6 py-3 text-heading-5 rounded-3xl md:px-6 md:py-4 md:text-heading-4 md:rounded-4xl dark:border-black-dark-2 dark:bg-transparent dark:text-white-light dark:placeholder:text-light-40",
						error && "border-red-accent dark:border-red-accent focus:border-red-accent",
						disabled && "cursor-not-allowed dark:text-light-40 text-dark-40",
						className
					)}
					disabled={disabled}
					type={type}
					placeholder={placeholder ? placeholder : "Placeholder"}
				/>
				{error && <p className="pl-6 mt-1 text-red-accent text-paragraph-5 md:text-paragraph-4 md:mt-2">{error}</p>}
			</div>
		);
	}

	return (
		<div>
			<p className="mb-2 text-dark-100 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">{label}</p>
			<input
				className={clsx(
					"border-[2px] border-gray-accent placeholder:text-dark-40 font-semibold text-dark-100 focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 dark:focus:outline-none px-6 py-3 text-heading-5 rounded-3xl md:px-6 md:py-4 md:text-heading-4 md:rounded-4xl dark:border-black-dark-2 dark:bg-transparent dark:text-white-light dark:placeholder:text-light-40",
					className
				)}
				type={type}
				placeholder={placeholder ? placeholder : "Placeholder"}
			/>
		</div>
	);
}
