import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../buttons/button";
import Delete from "../icons/delete";
import Input from "../inputs/input";

export type PriceRangeRefType = {
	current: HTMLDivElement | null;
	open: () => void;
};

interface Props {
	overlay?: React.RefObject<HTMLDivElement>;
}

interface FormValue {
	from: string;
	to: string;
}

const PriceRange = React.forwardRef<PriceRangeRefType, Props>(({ overlay }, ref) => {
	const priceRangeRef = useRef<HTMLDivElement>(null);
	const priceRangeChidrenRef = useRef<HTMLDivElement>(null);

	const {
		register,
		getValues,
		formState: { errors },
		handleSubmit,
	} = useForm<FormValue>();

	const handleClose = () => {
		if (window.innerWidth >= 1024) {
			if (priceRangeRef.current) {
				priceRangeRef.current.classList.remove("border-2");
				priceRangeRef.current.style.height = "0";
			}
			if (overlay && overlay.current) {
				overlay.current.classList.add("bg-opacity-40");
				overlay.current.classList.replace("bg-transparent", "bg-black-dark-4");
				overlay.current.classList.add("dark:bg-light-24", "bg-transparent");
			}
		}
		if (priceRangeRef.current && overlay && overlay.current) {
			priceRangeRef.current.classList.replace("left-1/2", "left-0");
			priceRangeRef.current.classList.replace("-translate-x-1/2", "-translate-x-full");
			overlay.current.classList.replace("block", "hidden");
		}
		document.removeEventListener("click", handleClickOutside, true);
	};

	const handleClickOutside = (event: any) => {
		const { target } = event;

		if (priceRangeRef.current && target && "nodeType" in target) {
			if (!priceRangeRef.current.contains(target)) {
				handleClose();
			}
		}
	};

	const hanedleOpen = () => {
		document.addEventListener("click", handleClickOutside, true);

		if (priceRangeRef.current && overlay && overlay.current) {
			if (window.innerWidth >= 1024) {
				if (priceRangeChidrenRef.current) {
					priceRangeRef.current.style.height = priceRangeChidrenRef.current.clientHeight + "px";
				}
				overlay.current.classList.remove("bg-opacity-40");
				overlay.current.classList.replace("bg-black-dark-4", "bg-transparent");
				overlay.current.classList.remove("dark:bg-light-24");
				priceRangeRef.current.classList.add("border-2");
			}
			priceRangeRef.current.classList.replace("left-0", "left-1/2");
			priceRangeRef.current.classList.replace("-translate-x-full", "-translate-x-1/2");
			overlay.current.classList.replace("hidden", "block");
		}
	};

	const onSubmit = (value: FormValue) => {
		console.log("value: ", value);
	};

	useImperativeHandle(ref, () => ({
		current: priceRangeRef.current,
		open: hanedleOpen,
	}));

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);

		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	return (
		<div
			id="price-range"
			className="fixed left-0 z-20 flex-col transition-all duration-300 ease-linear 
								delay-200 -translate-x-full -translate-y-1/2 bg-white h-fit lg:w-screen-1/3 
								top-1/2 md:w-screen-1/2 w-screen-4/5 rounded-3xl lg:absolute lg:top-full 
								lg:left-0 lg:translate-x-0  lg:translate-y-[10%] xl:translate-y-[15%] lg:shadow-md lg:border-gray-300 
								lg:overflow-hidden lg:h-0 dark:bg-black-dark-3 lg:dark:border-black-dark-2"
			ref={priceRangeRef}
		>
			<div ref={priceRangeChidrenRef} className="relative p-4 space-y-4">
				<form id="price-range-form" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4 lg:grid lg:grid-cols-2 lg:space-y-0 lg:gap-x-4">
						<Input
							register={register}
							name="from"
							// type="number"
							error={errors.from?.type === "validate" ? "Giá trị từ không lớn hơn giá trị đến" : errors.from?.message}
							option={{
								required: {
									value: true,
									message: "Vui lòng nhập giá trị từ",
								},
								min: {
									value: 0,
									message: "Giá trị bắt đầu phải lớn hơn 0",
								},
								validate: () => Number(getValues("from")) <= Number(getValues("to")),
							}}
							className="w-full"
							placeholder="20.000 đ"
							label="Từ"
						/>
						<Input
							register={register}
							name="to"
							// type="number"
							error={errors.to?.type === "validate" ? "Giá trị đến không nhỏ hơn giá trị từ" : errors.to?.message}
							option={{
								required: {
									value: true,
									message: "Vui lòng nhập giá trị đến",
								},
								min: {
									value: 0,
									message: "Giá trị bắt đầu phải lớn hơn 0",
								},
								validate: () => Number(getValues("from")) <= Number(getValues("to")),
							}}
							className="w-full"
							placeholder="30.000 đ"
							label="Đến"
						/>
					</div>
				</form>
				<div className="flex justify-center lg:block">
					<Button form="price-range-form" btnType="submit" type={"primary"}>
						Áp dụng
					</Button>
				</div>
				<div
					onClick={handleClose}
					className="absolute p-4 -translate-x-1/2 bg-white rounded-full cursor-pointer dark:bg-black-dark-3 lg:hidden -top-1/3 left-1/2"
				>
					<Delete width={20} height={20} className="text-black-dark-4 dark:text-light-100" />
				</div>
			</div>
		</div>
	);
});

PriceRange.displayName = "PriceRange";

export default PriceRange;
