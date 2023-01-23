import clsx from "clsx";
import React, { useRef, useState } from "react";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface Props {
	children: React.ReactNode;
	name: string;
	register: UseFormRegister<any>;
	option?: RegisterOptions;
	error?: string;
}

export default function Checkbox({ children, name, option, error, register }: Props) {
	const checkboxRef = useRef<HTMLInputElement | null>(null);
	const { ref, onChange, ...rest } = register(name, { ...option });

	const [checked, setChecked] = useState<boolean>(false);

	const handleClick = () => {
		if (checkboxRef.current) {
			checkboxRef.current.click();
		}
	};

	return (
		<div className="flex items-center select-none gap-x-4 group dark:text-white-light">
			<input
				{...rest}
				ref={(e) => {
					ref(e);
					checkboxRef.current = e;
				}}
				onChange={(e) => {
					onChange(e);
					setChecked(!checked);
				}}
				type="checkbox"
				className="hidden"
			/>
			<div
				onClick={handleClick}
				className={clsx(
					"w-6 h-6 transition-all duration-300 ease-linear rounded-full cursor-pointer shrink-0 group-hover:border-primary-100 dark:group-hover:border-primary-100",
					checked ? "checkboxActive" : "checkboxNoActive",
					error && "!border-red-accent"
				)}
			></div>
			{children}
		</div>
	);
}
