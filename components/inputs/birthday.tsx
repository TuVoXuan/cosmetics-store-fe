import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";
import Calendar from "../icons/calendar";

interface Props {
	register: UseFormRegister<any>;
	option?: RegisterOptions;
	name: string;
	label?: string;
	className?: string;
	error?: string;
	defaultValue?: string;
}

export default function Birthday({ className, error, label, defaultValue, name, option, register }: Props) {
	const { ref, onChange, ...rest } = register(name, { ...option });

	const inputDateRef = useRef<HTMLInputElement | null>(null);
	const [selectedDate, setSelectedDate] = useState<string>("");

	const handleSelectedDate = (e: any) => {
		console.log("e.target.value: ", e.target.value);
		if (e.target.value) {
			const date = new Date(e.target.value);
			setSelectedDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
		} else {
			setSelectedDate("");
		}
	};

	const handleClickCalendarIcon = () => {
		if (inputDateRef.current) {
			inputDateRef.current.showPicker();
		}
	};

	useEffect(() => {
		if (defaultValue) {
			const date = new Date(defaultValue);
			setSelectedDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
		}
	}, [defaultValue]);

	return (
		<div className="relative">
			<p className="mb-2 text-dark-100 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">{label}</p>

			<input
				{...rest}
				ref={(e) => {
					ref(e);
					inputDateRef.current = e;
				}}
				className="absolute z-0 translate-y-1/2 bg-transparent left-1"
				type="date"
				onChange={(e) => {
					onChange(e);
					handleSelectedDate(e);
				}}
			/>
			<div className="relative dark:bg-black-dark-3">
				<input
					className={clsx(
						"border-[2px] border-gray-accent font-semibold placeholder:text-dark-40 text-dark-100 focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 dark:focus:outline-none px-6 py-3 text-heading-5 rounded-3xl md:px-6 md:py-4 md:text-heading-4 md:rounded-4xl dark:border-black-dark-2 dark:bg-transparent dark:text-white-light dark:placeholder:text-light-40 ",
						error && "border-red-accent dark:border-red-accent focus:border-red-accent",
						className
					)}
					type="text"
					placeholder={"dd/mm/yyyy"}
					value={selectedDate}
					readOnly
				/>

				<Calendar
					onClick={handleClickCalendarIcon}
					height={24}
					width={24}
					className="absolute translate-y-1/2 text-dark-64 bottom-1/2 right-4 dark:text-white-light"
				/>
			</div>
			{error && <p className="pl-6 mt-1 text-red-accent text-paragraph-5 md:text-paragraph-4 md:mt-2">{error}</p>}
		</div>
	);
}
