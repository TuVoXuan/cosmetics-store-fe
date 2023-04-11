import { useState, useRef, useEffect } from "react";
import Expand from "../icons/expand";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Button from "../buttons/button";
import InputCurrency from "./input-currency";
import Input from "./input";
import { useRouter } from "next/router";
import APP_PATH from "../../constants/app-path";
import { useSettings } from "../../store/hooks";

interface Props {
	className?: string;
}

interface FormValue {
	from: number;
	to: number;
}

export default function PriceRangeDropdown({ className }: Props) {
	const listBoxButtonRef = useRef<HTMLButtonElement>(null);
	const listBoxRef = useRef<HTMLDivElement>(null);
	const expandIconRef = useRef<HTMLDivElement>(null);

	const router = useRouter();
	const { language } = useSettings();
	const { id, from, to, brand, order, search } = router.query;

	const {
		register,
		reset,
		getValues,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormValue>({
		defaultValues: {
			from: undefined,
			to: undefined,
		},
	});

	const watchFrom = watch("from");
	const watchTo = watch("to");

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

	const onSubmit = (data: FormValue) => {
		const pathName = router.pathname;

		let url = "";

		if (pathName.startsWith(APP_PATH.SEARCH)) {
			url = `${APP_PATH.SEARCH}?search=${search}&from=${data.from}&to=${data.to}`;
		} else if (pathName.startsWith(APP_PATH.CATEGORY)) {
			url = `${APP_PATH.CATEGORY}/${id}?from=${data.from}&to=${data.to}`;
		} else {
			url = `${APP_PATH.BRAND}/${id}?from=${data.from}&to=${data.to}`;
		}

		if (brand) {
			url += `&brand=${brand}`;
		}
		if (order) {
			url += `&order=${order}`;
		}

		handleClick();
		router.push(url, undefined, { shallow: true });
	};

	const handleReset = () => {
		reset();
	};

	useEffect(() => {
		if (from && to) {
			setValue("from", parseInt(from as string));
			setValue("to", parseInt(to as string));
		} else {
			reset();
		}
	}, [from, to]);

	return (
		<div>
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
						{watchFrom && watchTo
							? `${new Intl.NumberFormat("vn-VN").format(watchFrom / 1000)}k - ${new Intl.NumberFormat("vn-VN").format(
									watchTo / 1000
							  )}k`
							: language.component_ui.price_range}
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
					<form id="form-price-range" onSubmit={handleSubmit(onSubmit)} className="px-4 space-y-2">
						<div className="flex items-center gap-x-2">
							<Input
								register={register}
								name="from"
								option={{
									required: {
										value: watchTo ? true : false,
										message: language.component_ui.rule_required_price_range,
									},
									min: {
										value: 1000,
										message: language.component_ui.rule_min_price_range,
									},
								}}
								type="number"
								error={errors.from?.message}
								className="w-full"
								placeholder={language.component_ui.from}
							/>
							<p className="font-medium text-paragraph-4">đ</p>
						</div>
						<div className="flex items-center gap-x-2">
							<Input
								register={register}
								name="to"
								option={{
									required: {
										value: watchFrom ? true : false,
										message: language.component_ui.rule_required_price_range,
									},
									validate: () =>
										Number(getValues("to")) >= Number(getValues("from")) ||
										language.component_ui.rule_required_price_range,
								}}
								type="number"
								error={errors.to?.message}
								className="w-full"
								placeholder={language.component_ui.to}
							/>
							<p className="font-medium text-paragraph-4">đ</p>
						</div>
					</form>
					<div className="flex justify-between p-4">
						<Button
							type="primary"
							className="w-fit !px-6 text-paragraph-5 font-medium py-2"
							btnType="submit"
							form="form-price-range"
							disable={!watchFrom || !watchTo}
						>
							{language.component_ui.apply}
						</Button>
						<Button type="secondary" className="w-fit !px-6 text-paragraph-5 font-medium py-2" onClick={handleReset}>
							{language.component_ui.clear}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
