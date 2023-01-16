import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { text } from "stream/consumers";

interface IInput {
	placeholder?: string;
	register?: UseFormRegister<any>;
	option?: RegisterOptions;
	name?: string;
	type?: "text" | "password";
	label?: string;
}

export default function Input({ label, placeholder, register, name, option, type = "text" }: IInput) {
	if (register && name) {
		return (
			<div>
				<p className="text-dark-100 mb-2 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">{label}</p>
				<input
					{...register(name, { ...option })}
					className="border-[2px] border-gray-accent font-semibold placeholder:text-dark-100 text-dark-100 focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 dark:focus:outline-none px-6 py-3 text-heading-5 rounded-3xl md:px-6 md:py-4 md:text-heading-4 md:rounded-4xl dark:border-black-dark-2 dark:bg-transparent dark:text-white-light dark:placeholder:text-white-light"
					type={type}
					placeholder={placeholder ? placeholder : "Placeholder"}
				/>
			</div>
		);
	}

	return (
		<div>
			<p className="text-dark-100 mb-2 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">{label}</p>
			<input
				className="border-[2px] border-gray-accent font-semibold placeholder:text-dark-100 text-dark-100 focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 dark:focus:outline-none px-6 py-3 text-heading-5 rounded-3xl md:px-6 md:py-4 md:text-heading-4 md:rounded-4xl dark:border-black-dark-2 dark:bg-transparent dark:text-white-light dark:placeholder:text-white-light"
				type={type}
				placeholder={placeholder ? placeholder : "Placeholder"}
			/>
		</div>
	);
}
