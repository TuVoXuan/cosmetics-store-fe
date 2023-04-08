import { useState, useRef, useEffect } from "react";
import Expand from "../icons/expand";
import Selected from "../icons/selected";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

interface Props {
	className?: string;
}

interface FormValue {
	language: string;
}

export default function LanguageDropdown({ className }: Props) {
	const options: IOption[] = [
		{ label: "vi", value: "vn" },
		{ label: "en", value: "gb" },
	];
	const router = useRouter();
	const { locale } = router;

	const { register } = useForm<FormValue>({
		defaultValues: {
			language: locale,
		},
	});

	const [selectedValue, setSelectedValue] = useState<IOption>();
	const [defaultValue, setDefaultValue] = useState<string[]>([]);

	const listBoxButtonRef = useRef<HTMLButtonElement>(null);
	const listBoxRef = useRef<HTMLDivElement>(null);
	const expandIconRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		if (listBoxButtonRef.current && listBoxRef.current) {
			listBoxButtonRef.current.classList.toggle("border-primary-100");
			listBoxButtonRef.current.classList.toggle("dark:border-primary-100");

			if (listBoxRef.current.classList.contains("hidden")) {
				listBoxRef.current.classList.remove("hidden");
			} else {
				listBoxRef.current.classList.add("hidden");
			}

			if (listBoxButtonRef.current.classList.contains("rounded-3xl")) {
				listBoxButtonRef.current.classList.replace("rounded-3xl", "rounded-t-3xl");
			} else {
				listBoxButtonRef.current.classList.replace("rounded-t-3xl", "rounded-3xl");
			}

			if (listBoxButtonRef.current.classList.contains("border-2")) {
				listBoxButtonRef.current.classList.remove("border-2");
				listBoxButtonRef.current.classList.add("border-t-2", "border-x-2");
			} else {
				listBoxButtonRef.current.classList.remove("border-t-2", "border-x-2");
				listBoxButtonRef.current.classList.add("border-2");
			}
			// listBoxButtonRef.current.classList.toggle("border-b-transparent");
		}

		if (expandIconRef.current) {
			expandIconRef.current.classList.toggle("rotate-180");
		}
	};

	const handleOnchange = (option: IOption) => {
		handleClick();
		setSelectedValue(option);
		localStorage.setItem("language", option.label);

		router.push(router.asPath, router.asPath, { locale: option.label });
	};

	useEffect(() => {
		setSelectedValue(options.find((item) => item.label === locale));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locale]);

	return (
		<div>
			<div className="hidden">
				{options.length > 0 &&
					options.map((item) => (
						<input
							{...register("language")}
							key={item.value}
							value={item.value}
							type="checkbox"
							id={item.value}
							defaultChecked={defaultValue?.includes(item.value)}
						/>
					))}
			</div>

			<div className={clsx("relative w-fit", className)}>
				<button
					ref={listBoxButtonRef}
					onClick={handleClick}
					type="button"
					className={clsx(
						"flex items-center justify-between text-left w-fit cursor-pointer border-2",
						"border-gray-accent dark:border-black-dark-2 py-1 px-2 lg:py-2 lg:px-4 rounded-3xl gap-x-2 lg:gap-x-4"
					)}
				>
					<p className={clsx("select-none capitalize dark:text-white-light")}>
						{selectedValue ? (
							<span
								className={`block h-5 w-5 lg:h-6 lg:w-6 rounded-full text-heading-3 fib fis fi-${selectedValue.value}`}
							></span>
						) : (
							"Chọn ngôn ngữ"
						)}
					</p>
					<div ref={expandIconRef} className="duration-300 ease-linear">
						<Expand width={16} height={16} className="dark:text-light-100" />
					</div>
				</button>

				<div
					ref={listBoxRef}
					className={clsx(
						"hidden overflow-hidden absolute w-full left-0 right-0 z-[1] bg-white border-x-2 border-primary-100 dark:bg-black-dark-3 dark:text-white-light",
						"top-[100%] rounded-b-3xl border-b-2 shadow-lg dark:shadow-primary-100/50 flex flex-col"
					)}
				>
					<ul>
						{options.map((item) => {
							if (selectedValue?.value === item.value) {
								return (
									<li
										key={item.value}
										className={clsx(
											"flex items-center justify-between font-medium select-none capitalize",
											"py-1 px-2 lg:py-2 lg:px-4 hover:bg-gray-accent hover:dark:bg-black-dark-2"
										)}
									>
										<label className="cursor-pointer" onClick={() => handleOnchange(item)} htmlFor={item.value}>
											<p className={`h-5 w-5 lg:h-6 lg:w-6 rounded-full text-heading-3 fib fis fi-${item.value}`}></p>
										</label>
										<Selected width={16} height={16} color="#1A202C" className="dark:text-light-100" />
									</li>
								);
							}
							return (
								<li
									key={item.value}
									className={clsx(
										"flex items-center gap-x-4 select-none capitalize",
										"py-1 px-2 lg:py-2 lg:px-4 hover:bg-gray-accent hover:dark:bg-black-dark-2"
									)}
								>
									<label className="cursor-pointer" onClick={() => handleOnchange(item)} htmlFor={item.value}>
										<p className={`h-5 w-5 lg:h-6 lg:w-6 rounded-full text-heading-3 fib fis fi-${item.value}`}></p>
									</label>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}
