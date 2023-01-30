import { useState, useRef } from "react";
import Expand from "../icons/expand";
import Selected from "../icons/selected";
import clsx from "clsx";

interface Props {
	options: IOption[];
	size: "large" | "small";
	label?: string;
	className?: string;
	error?: string;
	onChange: (value: string) => void;
}

export default function Dropdown({ options, size, className, label, error, onChange }: Props) {
	const [selectedValue, setSelectedValue] = useState<IOption>(options[0]);
	const listBoxButtonRef = useRef<HTMLButtonElement>(null);
	const listBoxRef = useRef<HTMLUListElement>(null);

	const handleClick = () => {
		if (listBoxRef.current) {
			if (listBoxRef.current.classList.contains("hidden")) {
				listBoxRef.current.classList.remove("hidden");
			} else {
				listBoxRef.current.classList.add("hidden");
			}
		}

		if (size === "large") {
			if (listBoxButtonRef.current) {
				if (listBoxButtonRef.current.classList.contains("rounded-[32px]")) {
					listBoxButtonRef.current.classList.replace("rounded-[32px]", "rounded-t-[32px]");
				} else {
					listBoxButtonRef.current.classList.replace("rounded-t-[32px]", "rounded-[32px]");
				}
			}
		} else {
			if (listBoxButtonRef.current) {
				if (listBoxButtonRef.current.classList.contains("rounded-[24px]")) {
					listBoxButtonRef.current.classList.replace("rounded-[24px]", "rounded-t-[24px]");
				} else {
					listBoxButtonRef.current.classList.replace("rounded-t-[24px]", "rounded-[24px]");
				}
			}
		}
	};

	const handleOnchange = (option: IOption) => {
		handleClick();
		setSelectedValue(option);
		onChange(option.value);
	};

	return (
		<div>
			<p className="mb-2 text-dark-100 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">
				{label}
			</p>
			<div className={clsx("relative", className)}>
				<button
					ref={listBoxButtonRef}
					onClick={handleClick}
					type="button"
					className={clsx(
						"flex items-center justify-between text-left w-full cursor-pointer border-2 border-gray-accent",
						size === "large" ? "py-4 px-6 rounded-[32px]" : "px-4 py-3 rounded-3xl",
						error && "border-red-accent"
					)}
				>
					<p
						className={clsx(
							"select-none capitalize",
							size === "large" ? "text-heading-4" : "text-heading-5"
						)}
					>
						{selectedValue.label}
					</p>
					<Expand width={16} height={16} color="#1A202C" />
				</button>
				<ul
					ref={listBoxRef}
					className={clsx(
						"hidden absolute left-0 right-0 bg-white-light border-x-2 border-b-2 border-gray-accent",
						size === "large"
							? "pb-4 px-6 top-[calc(100%-16px)] rounded-b-[32px]"
							: "px-4 pb-3 top-[calc(100%-12px)] rounded-b-3xl",
						error && "border-red-accent"
					)}
				>
					{options.map((option) => {
						if (option === selectedValue) {
							return (
								<li
									key={option.value}
									onClick={() => handleOnchange(option)}
									className={clsx(
										"flex items-center justify-between font-semibold cursor-pointer select-none capitalize",
										size === "large" ? "text-heading-4 mt-8" : "text-heading-5 mt-6"
									)}
								>
									{option.label}
									<Selected width={16} height={16} color="#1A202C" />
								</li>
							);
						}
						return (
							<li
								key={option.value}
								onClick={() => handleOnchange(option)}
								className={clsx(
									"flex items-center justify-between cursor-pointer select-none capitalize",
									size === "large" ? "text-heading-4 mt-8" : "text-heading-5 mt-6"
								)}
							>
								{option.label}
							</li>
						);
					})}
				</ul>
			</div>
			{error && (
				<p className="pl-6 mt-1 text-red-accent text-paragraph-5 md:text-paragraph-4 md:mt-2">
					{error}
				</p>
			)}
		</div>
	);
}
