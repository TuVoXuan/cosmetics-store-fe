import clsx from "clsx";
import { useRouter } from "next/dist/client/router";
import React, {
	ChangeEvent,
	MouseEvent,
	MouseEventHandler,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { useForm } from "react-hook-form";
import APP_PATH from "../../constants/app-path";
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
	// selectedBrands: string[];
	// onSelectBrand: (brandIds: string[]) => void;
	// priceRange: IPriceRange | undefined;
	// onSelectPriceRange: (price: IPriceRange | undefined) => void;
}

interface FormValues {
	priceFrom: number;
	priceTo: number;
}

const FilterModal = React.forwardRef<FilterRefType, Props>(({ overlay, brands }, ref) => {
	// ref
	const FilterContainerRef = useRef<HTMLDivElement>(null);

	// router
	const router = useRouter();
	const pathName = router.pathname;
	const { id, order, search, brand, from, to } = router.query;

	// state
	const [brandsList, setBrandsList] = useState<IBrand[]>(brands);
	const [moreBrands, setMoreBrands] = useState<boolean>(false);
	const [tempSelectedBrands, setTempSelectedBrands] = useState<string[]>([]);
	const [searchBrand, setSearchBrand] = useState<string>("");

	// context
	const { toggleLayout, language } = useSettings();

	// react-hook form
	const {
		register,
		handleSubmit,
		watch,
		reset,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			priceFrom: from ? parseInt(from as string) : undefined,
			priceTo: to ? parseInt(to as string) : undefined,
		},
	});

	const priceFromWatch = watch("priceFrom");
	const priceToWatch = watch("priceTo");

	// handle model function
	const resetForm = () => {
		reset();
		setTempSelectedBrands([]);
		setBrandsList(brands);
	};

	const handleSelectBrand = (brandId: string) => {
		if (tempSelectedBrands.find((item) => item === brandId)) {
			setTempSelectedBrands((brands) => brands.filter((item) => item !== brandId));
		} else {
			setTempSelectedBrands((value) => [...value, brandId]);
		}
	};

	const onSubmit = (value: FormValues) => {
		// onSelectBrand(tempSelectedBrands);
		let url: string = "";

		if (pathName.startsWith(APP_PATH.CATEGORY)) {
			url = `${APP_PATH.CATEGORY}/${id}?`;
		} else if (pathName.startsWith(APP_PATH.SEARCH)) {
			url = `${APP_PATH.SEARCH}?search=${search}&`;
		} else {
			url = `${APP_PATH.BRAND}/${id}?`;
		}

		if (value.priceFrom && value.priceTo) {
			// onSelectPriceRange({ from: value.priceFrom, to: value.priceTo });
			if (tempSelectedBrands.length > 0) {
				url += `from=${value.priceFrom}&to=${value.priceTo}&brand=${tempSelectedBrands.join(",")}`;
			} else {
				url += `from=${value.priceFrom}&to=${value.priceTo}`;
			}
		} else {
			if (tempSelectedBrands.length > 0) {
				url += `brand=${tempSelectedBrands.join(",")}`;
			}
			// onSelectPriceRange(undefined);
		}

		if (order) {
			if (value.priceFrom || value.priceTo || tempSelectedBrands.length > 0) {
				url += `&order=${order}`;
			} else {
				url += `order=${order}`;
			}
		}

		handleClose();
		router.push(url);
	};

	const handleMoreBrands = () => {
		handleSortBrands();
		setMoreBrands((value) => !value);
		setSearchBrand("");
	};

	const handleSortBrands = () => {
		const selectedBrandsName = brands.filter((brand) => tempSelectedBrands.includes(brand._id));
		const notSelectedBrandsName = brands.filter((brand) => !tempSelectedBrands.includes(brand._id));
		setBrandsList([...selectedBrandsName, ...notSelectedBrandsName]);
	};

	const handleGetSelectedBrandFromRoute = () => {
		if (brand) {
			const brandIdsList = (brand as string).split(",");
			setTempSelectedBrands(brandIdsList);
		} else {
			setTempSelectedBrands([]);
		}
	};

	const handleGetPriceRangeFromRoute = () => {
		if (from && to) {
			setValue("priceFrom", parseInt(from as string));
			setValue("priceTo", parseInt(to as string));
		} else {
			reset();
		}
	};

	const handleOpen = () => {
		toggleLayout(true);
		handleGetSelectedBrandFromRoute();
		handleGetPriceRangeFromRoute();
		handleSortBrands();
		setMoreBrands(false);
		document.addEventListener("click", handleClickOutside, true);
		if (FilterContainerRef.current && overlay && overlay.current) {
			FilterContainerRef.current.classList.replace("translate-y-full", "translate-y-0");
			overlay.current.classList.replace("hidden", "block");
		}
	};

	const handleClose = () => {
		toggleLayout(false);

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

	useEffect(() => {
		handleGetSelectedBrandFromRoute();
	}, [brand]);

	useEffect(() => {
		handleGetPriceRangeFromRoute();
	}, [from, to]);

	return (
		<div
			ref={FilterContainerRef}
			className="fixed h-[90%] flex flex-col rounded-t-2xl left-0 bottom-0 translate-y-full z-20 w-[100%] bg-white dark:bg-black-dark-3 transition-transform duration-500 ease-in-out"
		>
			<div className="relative p-4 border-b-2 md:p-5">
				{moreBrands && (
					<button onClick={handleMoreBrands} className="absolute top-[50%] -translate-y-1/2 left-4 md:right-5">
						<GoBack className="dark:text-white" />
					</button>
				)}

				<h3 className="text-center text-heading-5 lg:text-heading-4 dark:text-white">
					{moreBrands ? language.component_ui.brands : language.component_ui.filter_products}
				</h3>

				<button onClick={handleClose} className="absolute top-[50%] -translate-y-1/2 right-4 md:right-5">
					<Delete width={20} height={20} className="dark:text-white" />
				</button>
			</div>

			<form id="filterForm" onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6 overflow-y-auto grow">
				{moreBrands ? (
					<>
						<div className="relative  flex items-center gap-x-3">
							<Search className="absolute w-4 h-4 left-3 dark:text-white" />
							<input
								type="text"
								name="search"
								id="search"
								onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchBrand(event.target.value)}
								className="w-full p-3 border-2 pl-9 dark:bg-transparent dark:border-black-dark-2 dark:text-light-100 border-gray-accent rounded-3xl focus:outline-none focus:border-primary-100"
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							{brandsList
								.filter((item) => item.name.toLowerCase().includes(searchBrand.toLowerCase()))
								.map((item) => (
									<BrandCard
										active={tempSelectedBrands.includes(item._id)}
										onClick={() => handleSelectBrand(item._id)}
										key={item._id}
										brandName={item.name}
									/>
								))}
						</div>
					</>
				) : (
					<>
						<div>
							<h6 className="font-medium dark:text-light-100 uppercase text-heading-6">
								{language.component_ui.price_range}
							</h6>
							<div className="flex items-center justify-between">
								<div className="w-[45%]">
									<Input
										register={register}
										name="priceFrom"
										option={{
											required: {
												value: priceToWatch ? true : false,
												message: language.component_ui.rule_required_price_range,
											},
											min: {
												value: 1000,
												message: language.component_ui.rule_min_price_range,
											},
										}}
										type="number"
										placeholder={language.component_ui.from}
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
												message: language.component_ui.rule_required_price_range,
											},
											validate: () =>
												Number(getValues("priceTo")) >= Number(getValues("priceFrom")) ||
												language.component_ui.rule_required_price_range,
										}}
										type="number"
										placeholder={language.component_ui.to}
										className="w-full"
									/>
								</div>
							</div>
							{errors.priceFrom?.message && (
								<p className="text-red-accent text-heading-6">{errors.priceFrom.message}</p>
							)}
							{errors.priceTo?.message && <p className="text-red-accent text-heading-6">{errors.priceTo.message}</p>}
						</div>
						{brandsList.length > 0 && (
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									<h6 className="font-medium dark:text-light-100 uppercase text-heading-6">
										{language.component_ui.brands}
									</h6>

									{brandsList.length > 10 && (
										<button onClick={handleMoreBrands} type="button" className="flex items-center gap-x-1">
											<p className="text-paragraph-5 dark:text-light-100 text-dark-64">
												{language.product_detail_page.all} ({brands.length})
											</p>
											<GoForward className="w-3 h-3 text-dark-24" />
										</button>
									)}
								</div>
								<div className="grid grid-cols-2 gap-3">
									{brandsList.slice(0, 10).map((item) => (
										<BrandCard
											active={tempSelectedBrands.includes(item._id)}
											onClick={() => handleSelectBrand(item._id)}
											key={item._id}
											brandName={item.name}
										/>
									))}
								</div>
							</div>
						)}
					</>
				)}
			</form>

			{moreBrands ? (
				<div className="flex p-4 shadow-t-md">
					<Button btnType="button" onClick={handleMoreBrands} type="primary" className="flex-1">
						{language.category_page.choose}
					</Button>
				</div>
			) : (
				<div className="flex p-4 shadow-t-md gap-x-4">
					<Button onClick={resetForm} btnType="button" type="secondary" className="flex-1">
						{language.component_ui.clear}
					</Button>
					<Button form="filterForm" btnType="submit" type="primary" className="flex-1">
						{language.component_ui.apply}
					</Button>
				</div>
			)}
		</div>
	);
});

FilterModal.displayName = "FilterModal";

export default FilterModal;
