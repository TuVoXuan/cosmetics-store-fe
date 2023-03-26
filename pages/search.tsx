import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { brandApi } from "../api/brand-api";
import productApi from "../api/product-api";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Button from "../components/buttons/button";
import OptionButton from "../components/buttons/option-button";
import ProductCard from "../components/card/product-card";
import BarCharDown from "../components/icons/bar-char-down";
import BarCharUp from "../components/icons/bar-char-up";
import LayoutGrid from "../components/icons/layout-grid";
import Wallet from "../components/icons/wallet";
import HyggeImage from "../components/Image/image";
import CategoriesWindow, { CategoriesWindowRefType } from "../components/modal/categories-window";
import Overlay from "../components/modal/overlay";
import PriceRange, { PriceRangeRefType } from "../components/modal/price-range";
import TitlePage from "../components/title-page/title-page";
import APP_PATH from "../constants/app-path";
import Image from "next/image";
import FilterModal, { FilterRefType } from "../components/modal/filter-modal";
import Dropdown from "../components/inputs/dropdown";
import { SortPrice } from "../constants/enums";
import { useForm } from "react-hook-form";
import Filter from "../components/icons/filter";

export default function Search() {
	// ref
	const overlayRef = useRef<HTMLDivElement>(null);
	const categoriesRef = useRef<CategoriesWindowRefType>(null);
	const priceRangRef = useRef<PriceRangeRefType>(null);
	const filterRef = useRef<FilterRefType>(null);

	// route
	const router = useRouter();
	const { search, from, to, brand, order } = router.query;

	// state
	const [products, setProducts] = useState<IProductItem[]>([]);
	const [brands, setBrands] = useState<IBrand[]>([]);
	const [after, setAfter] = useState<string>("");
	const [selectedBrands, setSelectedBrands] = useState<IBrand[]>([]);
	const [priceRange, setPriceRange] = useState<IPriceRange>();

	// react hook form
	const { register } = useForm();

	// function
	const handleSortByChange = (value: string) => {
		console.log("value: ", value);
		let path = `${APP_PATH.SEARCH}?search=${search}&order=${value}`;
		if (from && to) {
			path += `&from=${from}&to=${to}`;
		}
		if (brand) {
			path += `&brand=${brand}`;
		}
		router.push(path);
	};

	const handleOpenFilter = () => {
		if (filterRef.current) {
			filterRef.current.open();
		}
	};

	const handleSelectBrand = (brandIds: string[]) => {
		const selectdBrandsName: IBrand[] = [];
		for (let i = 0; i < brandIds.length; i++) {
			const brandId = brandIds[i];
			const brand = brands.find((item) => item._id === brandId);
			if (brand) {
				selectdBrandsName.push(brand);
			}
		}
		setSelectedBrands(selectdBrandsName);
	};

	const handleSelectPriceRange = (price: IPriceRange | undefined) => {
		setPriceRange(price);
	};

	const fetchBrands = async () => {
		if (search) {
			const brands = await brandApi.getBrandsBySearchKey(search as string);
			setBrands(brands);
		}
	};

	const fetchProductsLoadMore = async (after: string) => {
		if (search && after !== "end") {
			console.log("search: ", search);
			const data = await productApi.search({
				search: search as string,
				limit: process.env.LIIMIT_PRODUCTS_BY_CATEGORY || "10",
				from: from as string,
				to: to as string,
				brands: brand as string,
				after: after,
				order: order ? (order as "desc" | "asc") : undefined,
			});

			setProducts((values) => [...values, ...data.data]);
			setAfter(data.after);
		}
	};

	const loadMore = () => {
		fetchProductsLoadMore(after);
	};

	useEffect(() => {
		if (search || from || to || brand || order) {
			setProducts([]);
			setAfter("");
			fetchProductsLoadMore("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, from, to, brand, order]);

	useEffect(() => {
		fetchBrands();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	return (
		<div>
			<div className="space-y-14 mt-14 mb-14 md:mb-[112px] xl:mb-[144px]">
				<Breadcrumb
					className="hidden xl:block xl:mt-[93px]"
					items={["Trang chủ", "Kết quả tìm kiếm"]}
				/>
				<TitlePage
					className="capitalize mt-14 md:mt-16 xl:mt-12"
					subtitle="Kết quả tìm kiếm"
					title={(search as string) || ""}
				/>
				{/* <p className="mt-6 text-paragraph-4 md:text-paragraph-2 md:mt-12 dark:text-light-100">
				<span className="font-bold text-heading-5 md:text-heading-4 dark:text-light-100">6</span> sản phẩm phù hợp
			</p> */}

				<div className="flex justify-between">
					<Dropdown
						defaulValue={order ? (order as string) : SortPrice.Default}
						register={register}
						name={"orderStatus"}
						className="w-fit"
						onChange={handleSortByChange}
						options={[
							{ label: "Mặc định", value: SortPrice.Default },
							{ label: "Tăng dần", value: SortPrice.Ascending },
							{ label: "giảm dần", value: SortPrice.Descending },
						]}
					/>

					<Button onClick={handleOpenFilter} type="secondary">
						<div className="flex items-center gap-x-3">
							<Filter className="dark:text-white" />
							<span className="font-normal dark:text-white">Lọc</span>
						</div>
					</Button>
				</div>

				{/* products */}
				<div className="mt-14 xl:mt-[72px] md:mt-16 lg:mt-14 mb-[104px] md:mb-28">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-14">
						{products.length > 0 &&
							products.map((product) => (
								<ProductCard key={product.itemId} productItem={product} />
							))}
					</div>
					{products.length === 0 && (
						<>
							<Image
								src="/not_found_dark.png"
								alt="not found"
								width={200}
								height={200}
								className="hidden mx-auto dark:block"
							/>

							<Image
								src="/not_found_light.png"
								alt="not found"
								width={200}
								height={200}
								className="mx-auto dark:hidden"
							/>
						</>
					)}

					{after !== "end" && (
						<div className="flex justify-center mt-14 md:mt-16">
							<Button onClick={loadMore} type="primary">
								Xem thêm
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* categories */}
			{/* <CategoriesWindow ref={categoriesRef} overlay={overlayRef} /> */}

			{/* filter modal */}
			<FilterModal
				ref={filterRef}
				overlay={overlayRef}
				brands={brands}
				// selectedBrands={selectedBrands.map((item) => item._id)}
				// onSelectBrand={handleSelectBrand}
				// priceRange={priceRange}
				// onSelectPriceRange={handleSelectPriceRange}
			/>
			{/* overlay */}
			<Overlay ref={overlayRef} />
		</div>
	);
}
