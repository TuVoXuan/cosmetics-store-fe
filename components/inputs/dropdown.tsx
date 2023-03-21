import { useState, useRef, useEffect } from "react";
import Expand from "../icons/expand";
import Selected from "../icons/selected";
import clsx from "clsx";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
	options: IOption[];
	label?: string;
	className?: string;
	register: UseFormRegister<any>;
	option?: RegisterOptions;
	name: string;
	defaulValue?: string;
	error?: string;
	onChange?: (value: string) => void;
	watch?: string;
}

export default function Dropdown({
	options,
	className,
	label,
	error,
	name,
	defaulValue,
	option,
	watch,
	register,
	onChange,
}: Props) {
	const [selectedValue, setSelectedValue] = useState<IOption>();
	const listBoxButtonRef = useRef<HTMLButtonElement>(null);
	const listBoxRef = useRef<HTMLUListElement>(null);

	const handleClick = () => {
		if (listBoxButtonRef.current && listBoxRef.current) {
			if (listBoxRef.current.classList.contains("hidden")) {
				listBoxRef.current.classList.remove("hidden");
			} else {
				listBoxRef.current.classList.add("hidden");
			}

			if (listBoxButtonRef.current.classList.contains("rounded-[32px]")) {
				listBoxButtonRef.current.classList.replace("rounded-[32px]", "rounded-t-[32px]");
			} else {
				listBoxButtonRef.current.classList.replace("rounded-t-[32px]", "rounded-[32px]");
			}

			if (listBoxButtonRef.current.classList.contains("border-2")) {
				listBoxButtonRef.current.classList.remove("border-2");
				listBoxButtonRef.current.classList.add("border-t-2", "border-x-2");
			} else {
				listBoxButtonRef.current.classList.remove("border-t-2", "border-x-2");
				listBoxButtonRef.current.classList.add("border-2");
			}
		}
	};

	const handleOnchange = (option: IOption) => {
		handleClick();
		setSelectedValue(option);
		onChange && onChange(option.value);
	};

	useEffect(() => {
		setSelectedValue(undefined);
	}, [watch]);

	useEffect(() => {
		setSelectedValue(options.find((item) => item.value === defaulValue));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaulValue]);

	return (
		<div>
			<div className="hidden">
				{options.length > 0 ? (
					options.map((item) => (
						<input
							{...register(name, option)}
							key={item.value}
							value={item.value}
							type="radio"
							name={name}
							id={item.value}
							// defaultChecked={defaulValue === item.value}
						/>
					))
				) : (
					<input {...register(name, option)} value={""} type="radio" name={name} checked={false} />
				)}
			</div>
			{label && (
				<p className="mb-2 text-dark-100 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">{label}</p>
			)}

			<div className={clsx("relative", className)}>
				<button
					ref={listBoxButtonRef}
					onClick={handleClick}
					type="button"
					className={clsx(
						"flex items-center justify-between text-left w-full cursor-pointer border-2",
						"border-gray-accent dark:border-black-dark-2 py-3 px-6 rounded-[32px] md:py-4",
						error && "border-red-accent dark:border-red-accent"
					)}
				>
					<p className={clsx("select-none capitalize dark:text-white-light text-heading-5 md:text-heading-4")}>
						{selectedValue ? selectedValue.label : "Chọn giá trị"}
					</p>
					<Expand width={16} height={16} className="dark:text-light-100" />
				</button>
				<ul
					ref={listBoxRef}
					className={clsx(
						"hidden md:pb-4 absolute left-0 right-0 z-[1] bg-white border-x-2 border-gray-accent dark:border-black-dark-2 dark:bg-black-dark-3 dark:text-white-light max-h-56 overflow-y-auto",
						"top-[100%] rounded-b-[32px] border-b-2",
						error && "border-red-accent dark:border-red-accent"
					)}
				>
					{options.map((item) => {
						if (selectedValue && item.value === selectedValue.value) {
							return (
								<li
									key={item.value}
									className={clsx(
										"flex items-center justify-between font-semibold select-none capitalize",
										"text-heading-5 px-6 py-3 md:text-heading-4 md:py-4 hover:bg-gray-accent hover:dark:bg-black-dark-2"
									)}
								>
									<label className="cursor-pointer" onClick={() => handleOnchange(item)} htmlFor={item.value}>
										{item.label}
									</label>
									<Selected width={16} height={16} color="#1A202C" className="dark:text-light-100" />
								</li>
							);
						}
						return (
							<li
								key={item.value}
								className={clsx(
									"flex items-center justify-between select-none capitalize",
									"text-heading-5 px-6 py-3 md:text-heading-4 md:py-4 hover:bg-gray-accent hover:dark:bg-black-dark-2"
								)}
							>
								<label className="cursor-pointer" onClick={() => handleOnchange(item)} htmlFor={item.value}>
									{item.label}
								</label>
							</li>
						);
					})}
				</ul>
			</div>
			{error && <p className="pl-6 mt-1 text-red-accent text-paragraph-5 md:text-paragraph-4 md:mt-2">{error}</p>}
		</div>
	);
}
