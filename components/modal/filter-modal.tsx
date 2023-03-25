import clsx from "clsx";
import React, { MouseEventHandler, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSettings } from "../../store/hooks";
import Button from "../buttons/button";
import BrandCard from "../card/brand-card";
import Delete from "../icons/delete";
import GoBack from "../icons/go-back";
import GoForward from "../icons/go-forward";
import Search from "../icons/search";
import Input from "../inputs/input";

export type FilterRefType = {
	current: HTMLDivElement | null;
	open: () => void;
};

interface Props {
	overlay?: React.RefObject<HTMLDivElement>;
	brands: IBrand[];
}

interface FormValues {
	priceFrom: number;
	priceTo: number;
}

const FilterModal = React.forwardRef<FilterRefType, Props>(({ overlay, brands }, ref) => {
	// ref
	const FilterContainerRef = useRef<HTMLDivElement>(null);

	// state
	const [moreBrands, setMoreBrands] = useState<boolean>(false);

	// context
	const { toggleLayout } = useSettings();

	// react-hook form
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		formState: { errors },
	} = useForm<FormValues>();
	const priceFromWatch = watch("priceFrom");
	const priceToWatch = watch("priceTo");

	// handle model function
	const onSubmit = (value: FormValues) => {
		console.log("value: ", value);
	};

	const handleMoreBrands = () => {
		setMoreBrands((value) => !value);
	};

	const handleOpen = () => {
		toggleLayout(true);
		document.addEventListener("click", handleClickOutside, true);
		if (FilterContainerRef.current && overlay && overlay.current) {
			FilterContainerRef.current.classList.replace("translate-y-full", "translate-y-0");
			overlay.current.classList.replace("hidden", "block");
		}
	};

	const handleClose = () => {
		toggleLayout(false);
		setMoreBrands(false);
		if (FilterContainerRef.current && overlay && overlay.current) {
			FilterContainerRef.current.classList.replace("translate-y-0", "translate-y-full");

			overlay.current.classList.replace("block", "hidden");
		}
		document.removeEventListener("click", handleClickOutside, true);
	};

	const handleClickOutside = (event: any) => {
		const { target } = event;

		if (FilterContainerRef.current && target && "nodeType" in target) {
			if (!FilterContainerRef.current.contains(target)) {
				handleClose();
			}
		}
	};

	useImperativeHandle(ref, () => ({
		current: FilterContainerRef.current,
		open: handleOpen,
	}));

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);

		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			ref={FilterContainerRef}
			className="fixed h-[90%] flex flex-col rounded-t-2xl left-0 bottom-0 translate-y-full z-20 w-[100%] bg-white dark:bg-black-dark-3 transition-transform duration-500 ease-in-out"
		>
			<div className="relative p-4 border-b-2 md:p-5">
				{moreBrands && (
					<button
						onClick={handleMoreBrands}
						className="absolute top-[50%] -translate-y-1/2 left-4 md:right-5"
					>
						<GoBack className="dark:text-white" />
					</button>
				)}

				<h3 className="text-center text-heading-5 lg:text-heading-4 dark:text-white">
					{moreBrands ? "Thương hiệu" : "Lọc sản phẩm"}
				</h3>

				<button
					onClick={handleClose}
					className="absolute top-[50%] -translate-y-1/2 right-4 md:right-5"
				>
					<Delete width={20} height={20} className="dark:text-white" />
				</button>
			</div>

			<form
				id="filterForm"
				onSubmit={handleSubmit(onSubmit)}
				className="p-4 space-y-6 overflow-y-auto grow"
			>
				{moreBrands ? (
					<>
						<div className="relative flex items-center gap-x-3">
							<Search className="absolute w-4 h-4 left-3 dark:text-white" />
							<input
								type="text"
								name="search"
								id="search"
								className="w-full p-3 border-2 pl-9 border-gray-accent rounded-3xl focus:outline-none focus:border-primary-100"
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							{brands.map((item) => (
								<BrandCard key={item._id} brandName={item.name} />
							))}
						</div>
					</>
				) : (
					<>
						<div>
							<h6 className="font-medium uppercase text-heading-6">Mức giá</h6>
							<div className="flex items-center justify-between">
								<div className="w-[45%]">
									<Input
										register={register}
										name="priceFrom"
										option={{
											required: {
												value: priceToWatch ? true : false,
												message: "Price from is requited",
											},
											min: { value: 1000, message: "price must be greater than 1000" },
										}}
										type="number"
										placeholder="Từ"
										className="w-full"
									/>
								</div>

								<div className="col-start-6 shrink-0 w-3 border-t-2 border-dark-40 h-[1px]"></div>

								<div className="w-[45%]">
									<Input
										register={register}
										name="priceTo"
										option={{
											required: {
												value: priceFromWatch ? true : false,
												message: "Price to is requited",
											},
											validate: () =>
												Number(getValues("priceTo")) >=
													Number(getValues("priceFrom")) || "Đến phải lớn hơn Từ",
										}}
										type="number"
										placeholder="Đến"
										className="w-full"
									/>
								</div>
							</div>
							{errors.priceFrom?.message && (
								<p className="text-red-accent text-heading-6">{errors.priceFrom.message}</p>
							)}
							{errors.priceTo?.message && (
								<p className="text-red-accent text-heading-6">{errors.priceTo.message}</p>
							)}
						</div>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<h6 className="font-medium uppercase text-heading-6">Thương hiệu</h6>

								{brands.length > 10 && (
									<button
										onClick={handleMoreBrands}
										type="button"
										className="flex items-center gap-x-1"
									>
										<p className="text-paragraph-5 text-dark-64">
											Tất cả ({brands.length})
										</p>
										<GoForward className="w-3 h-3 text-dark-24" />
									</button>
								)}
							</div>
							<div className="grid grid-cols-2 gap-3">
								{brands.slice(0, 10).map((item) => (
									<BrandCard key={item._id} brandName={item.name} />
								))}
							</div>
						</div>
					</>
				)}
			</form>

			<div className="flex p-4 shadow-t-md gap-x-4">
				{moreBrands ? (
					<Button type="primary" className="flex-1">
						Chọn
					</Button>
				) : (
					<>
						<Button type="secondary" className="flex-1">
							Thiết lập lại
						</Button>
						<Button form="filterForm" btnType="submit" type="primary" className="flex-1">
							Áp dụng
						</Button>
					</>
				)}
			</div>
		</div>
	);
});
export default FilterModal;
