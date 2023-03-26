import { useState, useRef, useEffect } from "react";
import Expand from "../icons/expand";
import Selected from "../icons/selected";
import clsx from "clsx";
import { RegisterOptions, useForm, UseFormRegister } from "react-hook-form";
import { useRouter } from "next/router";
import Button from "../buttons/button";

interface Props {
	options: IOption[];
	className?: string;
}

interface FormValue {
	brands: string[];
}

export default function MultipleSelectDropdown({ options, className }: Props) {
	const router = useRouter();
	const { register, reset, getValues } = useForm<FormValue>({
		defaultValues: {
			brands: [],
		},
	});
	const { brands } = router.query;

	const [selectedValue, setSelectedValue] = useState<IOption[]>([]);
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
			// listBoxButtonRef.current.classList.toggle("border-b-transparent");
		}

		if (expandIconRef.current) {
			expandIconRef.current.classList.toggle("rotate-180");
		}
	};

	const handleOnchange = (option: IOption) => {
		if (!selectedValue.find((item) => item.value === option.value)) {
			setSelectedValue([...selectedValue, option]);
		} else {
			setSelectedValue(selectedValue.filter((item) => item.value !== option.value));
		}
	};

	const handleReset = () => {
		reset();
		setSelectedValue([]);
		handleClick();
	};

	const handleApply = () => {
		const result = getValues("brands");
		console.log("result: ", result);
		handleClick();
	};

	useEffect(() => {
		if (brands) {
			setSelectedValue(options.filter((item) => (brands as string).split(",")?.includes(item.value)));
			setDefaultValue((brands as string).split(","));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [brands]);

	return (
		<div>
			<div className="hidden">
				{options.length > 0 &&
					options.map((item) => (
						<input
							{...register("brands")}
							key={item.value}
							value={item.value}
							type="checkbox"
							id={item.value}
							defaultChecked={defaultValue?.includes(item.value)}
						/>
					))}
			</div>

			<div className={clsx("relative", className)}>
				<button
					ref={listBoxButtonRef}
					onClick={handleClick}
					type="button"
					className={clsx(
						"flex items-center justify-between text-left w-full cursor-pointer border-2",
						"border-gray-accent dark:border-black-dark-2 py-3 px-6 rounded-[32px] gap-x-4"
					)}
				>
					<p className={clsx("select-none capitalize dark:text-white-light text-heading-6 md:text-heading-5")}>
						{selectedValue.length > 0 ? `Đã chọn ${selectedValue.length} thương hiệu` : "Chọn thương hiệu"}
					</p>
					<div ref={expandIconRef} className="duration-300 ease-linear">
						<Expand width={16} height={16} className="dark:text-light-100" />
					</div>
				</button>

				<div
					ref={listBoxRef}
					className={clsx(
						"hidden absolute w-full left-0 right-0 z-[1] bg-white border-x-2 border-primary-100 dark:bg-black-dark-3 dark:text-white-light max-h-80",
						"top-[100%] rounded-b-[32px] border-b-2 shadow-lg dark:shadow-primary-100/50 flex flex-col"
					)}
				>
					<ul className="overflow-y-auto grow">
						{options.map((item) => {
							if (selectedValue.find((e) => e.value === item.value)) {
								return (
									<li
										key={item.value}
										className={clsx(
											"flex items-center gap-x-4 font-medium select-none capitalize",
											"text-heading-6 px-6 py-3 md:text-heading-5 hover:bg-gray-accent hover:dark:bg-black-dark-2"
										)}
									>
										<div className="p-1 border-2 rounded-md border-black-dark-1">
											<Selected width={12} height={12} color="#1A202C" className="dark:text-light-100" />
										</div>
										<label className="cursor-pointer" onClick={() => handleOnchange(item)} htmlFor={item.value}>
											{item.label}
										</label>
									</li>
								);
							}
							return (
								<li
									key={item.value}
									className={clsx(
										"flex items-center gap-x-4  select-none capitalize",
										"text-heading-6 px-6 py-3 md:text-heading-5 hover:bg-gray-accent hover:dark:bg-black-dark-2"
									)}
								>
									<div className="p-1 border-2 rounded-md">
										<Selected width={12} height={12} color="#1A202C" className="text-light-100" />
									</div>
									<label className="cursor-pointer" onClick={() => handleOnchange(item)} htmlFor={item.value}>
										{item.label}
									</label>
								</li>
							);
						})}
					</ul>
					<div className="flex justify-between p-4">
						<Button type="primary" className="w-fit !px-6 !py-2 text-paragraph-5 font-medium" onClick={handleApply}>
							Áp dụng
						</Button>
						<Button type="secondary" className="w-fit !px-6 !py-2 text-paragraph-5 font-medium" onClick={handleReset}>
							Bỏ chọn
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}