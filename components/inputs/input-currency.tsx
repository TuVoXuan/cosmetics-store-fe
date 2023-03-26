import React, { useRef } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import clsx from "clsx";
import { convertPrice, numberWithDots } from "../../util/product";

interface IInput {
	placeholder?: string;
	register?: UseFormRegister<any>;
	option?: RegisterOptions;
	name?: string;
	label?: string;
	className?: string;
	error?: string;
	disabled?: boolean;
}

export default function InputCurrency({
	label,
	placeholder,
	register,
	name,
	option,
	disabled,
	className,
	error,
}: IInput) {
	const hiddenInputRef = useRef<HTMLInputElement | null>(null);
	const showedInputRef = useRef<HTMLInputElement>(null);
	if (register && name) {
		const { ref, ...rest } = register(name, { ...option });

		const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			const numberString = value.replaceAll(".", "");
			if (showedInputRef.current && hiddenInputRef.current && numberString) {
				if (/^(\d+.)*(\d+)$/.test(numberString)) {
					showedInputRef.current.value = new Intl.NumberFormat("vn-VN").format(parseInt(numberString));
					hiddenInputRef.current.value = numberString;
				} else {
					const newNumberString = numberString.slice(0, -1);
					hiddenInputRef.current.value = newNumberString;

					if (newNumberString) {
						showedInputRef.current.value = new Intl.NumberFormat("vn-VN").format(parseInt(newNumberString));
					} else {
						showedInputRef.current.value = "";
					}
				}
			}
		};

		return (
			<div className="relative">
				{label && (
					<p className="mb-2 text-dark-100 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">
						{label}
					</p>
				)}
				<input
					// className="border-[2px] outline-none border-transparent px-6 py-3 text-heading-6 rounded-3xl md:px-6 md:text-heading-5 md:rounded-4xl text-transparent bg-transparent"
					// ref={(e) => {
					// 	ref(e);
					// 	hiddenInputRef.current = e;
					// }}
					type="text"
					// {...rest}
					{...register(name, { ...option })}
					value="100"
					name={name}
				/>
				<input
					ref={showedInputRef}
					onBlur={() => {
						if (hiddenInputRef.current) {
							hiddenInputRef.current.click();
							hiddenInputRef.current.blur();
						}
					}}
					onChange={onChange}
					className={clsx(
						// "absolute left-0",
						"border-[2px] border-gray-accent font-semibold placeholder:text-dark-40 text-dark-100 focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 dark:focus:outline-none px-6 py-3 text-heading-6 rounded-3xl md:px-6 md:text-heading-5 md:rounded-4xl dark:border-black-dark-2 dark:bg-transparent dark:text-white-light dark:placeholder:text-light-40",
						error && "border-red-accent dark:border-red-accent focus:border-red-accent",
						disabled && "cursor-not-allowed dark:text-light-40 text-dark-40",
						className
					)}
					disabled={disabled}
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
					"border-[2px] border-gray-accent placeholder:text-dark-40 font-semibold text-dark-100",
					"focus:border-primary-100 focus:outline-none dark:focus:border-primary-100",
					"dark:focus:outline-none px-6 py-3 text-heading-6 rounded-3xl md:px-6",
					"md:text-heading-5 md:rounded-4xl dark:border-black-dark-2 dark:bg-transparent",
					"dark:text-white-light dark:placeholder:text-light-40",
					className
				)}
				placeholder={placeholder ? placeholder : "Placeholder"}
			/>
		</div>
	);
}
