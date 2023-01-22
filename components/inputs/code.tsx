import clsx from "clsx";
import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
	register: UseFormRegister<any>;
	option?: RegisterOptions;
	name: string;
	label?: string;
	className?: string;
	error?: string;
}

export default function CodeInput({ className, error, label, name, option, register }: Props) {
	return (
		<div>
			<p className="mb-2 text-dark-100 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">
				{label}
			</p>
			<div className="relative">
				<input
					{...register(name, { ...option })}
					className={clsx(
						"border-[2px] border-gray-accent font-semibold placeholder:text-dark-40 text-dark-100 focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 dark:focus:outline-none px-6 py-3 text-heading-5 rounded-3xl md:px-6 md:py-4 md:text-heading-4 md:rounded-4xl dark:border-black-dark-2 dark:bg-transparent dark:text-white-light dark:placeholder:text-light-40",
						error && "border-red-accent dark:border-red-accent focus:border-red-accent",
						className
					)}
					type="text"
					placeholder="1234"
					maxLength={6}
				/>
				<button className="absolute py-3 pl-4 pr-6 rounded-r-full whitespace-nowrap bottom-[2px] right-0  bg-primary-100 text-white-light font-semibold">
					Lấy mã
				</button>
			</div>
			{error && (
				<p className="pl-6 mt-1 text-red-accent text-paragraph-5 md:text-paragraph-4 md:mt-2">
					{error}
				</p>
			)}
		</div>
	);
}
