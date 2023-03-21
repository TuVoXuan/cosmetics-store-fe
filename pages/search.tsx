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

export default function Search() {
	const overlayRef = useRef<HTMLDivElement>(null);
	const categoriesRef = useRef<CategoriesWindowRefType>(null);
	const priceRangRef = useRef<PriceRangeRefType>(null);

	const router = useRouter();
	const { search, from, to, brand, order } = router.query;

	const [products, setProducts] = useState<IProductItem[]>([]);
	const [brands, setBrands] = useState<IBrand[]>([]);
	const [after, setAfter] = useState<string>("");

	const handleOpenPriceRange = () => {
		if (priceRangRef.current) {
			priceRangRef.current.open();
		}
	};

	const handleOpenCategories = () => {
		if (categoriesRef.current) {
			categoriesRef.current.open();
		}
	};

	const fetchBrands = async () => {
		if (search) {
			const brands = await brandApi.getBrandsBySearchKey(search as string);
			setBrands(brands);
		}
	};

	const fetchProductsLoadMore = async (after: string) => {
		if (search && after !== "end") {
			const data = await productApi.search({
				search: search as string,
				limit: process.env.LIIMIT_PRODUCTS_BY_CATEGORY || "10",
				from: from as string,
				to: to as string,
				brand: brand as string,
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

	const handleClickOrder = (order: "asc" | "desc") => () => {
		let path = `${APP_PATH.SEARCH}?search=${search}&order=${order}`;

		if (from) {
			path += `&from=${from}`;
		}
		if (to) {
			path += `&to=${to}`;
		}
		if (brand) {
			path += `&brand=${brand}`;
		}

		router.push(path);
	};

	const handleClickBrand = (brand: string) => () => {
		let path = `${APP_PATH.SEARCH}?search=${search}&brand=${brand}`;

		if (from) {
			path += `&from=${from}`;
		}
		if (to) {
			path += `&to=${to}`;
		}
		if (order) {
			path += `&order=${order}`;
		}

		router.push(path);
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
			<Breadcrumb className="hidden xl:block xl:mt-[93px]" items={["Trang chủ", "Kết quả tìm kiếm"]} />
			<TitlePage
				className="capitalize mt-14 md:mt-16 xl:mt-12"
				subtitle="Kết quả tìm kiếm"
				title={(search as string) || ""}
			/>
			{/* <p className="mt-6 text-paragraph-4 md:text-paragraph-2 md:mt-12 dark:text-light-100">
				<span className="font-bold text-heading-5 md:text-heading-4 dark:text-light-100">6</span> sản phẩm phù hợp
			</p> */}

			<div className="space-y-4 xl:space-y-12 mt-14 md:mt-16 xl:mt-[72px] lg:mt-14">
				<div className="space-y-4 lg:flex lg:space-y-0 lg:gap-x-8">
					<div className="space-y-2 md:space-y-4 xl:space-y-8">
						<p className="font-bold md:text-heading-4 text-heading-5 xl:text-heading-3 dark:text-light-100">
							Chọn tiêu chí
						</p>
						<div className="flex space-x-2 md:gap-x-4 xl:gap-x-8">
							<OptionButton onClick={handleOpenCategories}>
								<LayoutGrid
									width={20}
									height={20}
									className="inline mr-1 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
								/>
								Phân loại
							</OptionButton>
							<div className="lg:relative">
								<OptionButton onClick={handleOpenPriceRange}>
									<Wallet
										width={20}
										height={20}
										className="inline mr-1 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
									/>
									Khoảng giá
								</OptionButton>

								{/* price range */}
								<PriceRange overlay={overlayRef} ref={priceRangRef} />
							</div>
						</div>
					</div>

					<div className="space-y-2 md:space-y-4 xl:space-y-8">
						<p className="font-bold md:text-heading-4 text-heading-5 xl:text-heading-3 dark:text-light-100">
							Sắp xếp theo
						</p>
						<div className="flex overflow-x-auto gap-x-2 md:gap-x-4 xl:gap-x-8">
							<OptionButton actived={order === "asc"} onClick={handleClickOrder("asc")}>
								<BarCharDown
									width={20}
									height={20}
									className="inline mr-1 -rotate-90 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
								/>
								Giá tăng dần
							</OptionButton>
							<OptionButton actived={order === "desc"} onClick={handleClickOrder("desc")}>
								<BarCharUp
									width={20}
									height={20}
									className="inline mr-1 -rotate-90 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
								/>
								Giá giảm dần
							</OptionButton>
						</div>
					</div>
				</div>
				{/* brand logos */}
				<div className="space-y-2 md:space-y-4 xl:space-y-8">
					<p className="font-bold md:text-heading-4 text-heading-5 xl:text-heading-3 dark:text-light-100">
						Thương hiệu
					</p>

					<div className="flex items-center overflow-x-auto xl:h-36 h-14 md:h-28 gap-x-4 md:gap-x-8 lg:gap-x-10">
						{brands.length > 0 &&
							brands.map((brd) => (
								<HyggeImage
									onClick={handleClickBrand(brd._id)}
									key={brd._id}
									actived={brd._id === (brand as string)}
									className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
									src={brd.logo}
									alt={brd.name}
								/>
							))}
					</div>
				</div>
			</div>

			{/* products */}
			<div className="mt-14 xl:mt-[72px] md:mt-16 lg:mt-14 mb-[104px] md:mb-28">
				<div className="space-y-14 md:grid md:grid-cols-3 md:space-y-0 gap-x-12 gap-y-16 lg:grid-cols-4 lg:gap-x-14">
					{products.length > 0 && products.map((product) => <ProductCard key={product.itemId} productItem={product} />)}
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

			{/* categories */}
			<CategoriesWindow ref={categoriesRef} overlay={overlayRef} />

			{/* overlay */}
			<Overlay ref={overlayRef} />
		</div>
	);
}
