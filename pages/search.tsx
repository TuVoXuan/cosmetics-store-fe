import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { brandApi } from "../api/brand-api";
import productApi from "../api/product-api";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Button from "../components/buttons/button";
import ProductCard from "../components/card/product-card";
import Overlay from "../components/modal/overlay";
import TitlePage from "../components/title-page/title-page";
import APP_PATH from "../constants/app-path";
import Image from "next/image";
import FilterModal, { FilterRefType } from "../components/modal/filter-modal";
import Dropdown from "../components/inputs/dropdown";
import { SortPrice } from "../constants/enums";
import { useForm } from "react-hook-form";
import Filter from "../components/icons/filter";
import BrandDropdown from "../components/inputs/brand-dropdown";
import PriceRangeDropdown from "../components/inputs/price-range-dropdown";
import ProductCardLoader from "../components/card/skeleton-loader/product-card-loader";
import RemoveFilterButton from "../components/buttons/remove-filter-btn";

export default function Search() {
	// ref
	const overlayRef = useRef<HTMLDivElement>(null);
	const filterRef = useRef<FilterRefType>(null);

	// route
	const router = useRouter();
	const { search, from, to, brand, order } = router.query;

	// state
	const [products, setProducts] = useState<IProductItem[]>([]);
	const [brands, setBrands] = useState<IBrand[]>([]);
	const [after, setAfter] = useState<string>("");
	const [loading, setLoading] = useState<{
		brand: boolean;
		product: boolean;
	}>({
		brand: false,
		product: false,
	});

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

	const fetchBrands = async () => {
		if (search) {
			try {
				setLoading((value) => ({ ...value, brand: true }));
				const brands = await brandApi.getBrandsBySearchKey(search as string);
				setBrands(brands);
				setLoading((value) => ({ ...value, brand: false }));
			} catch (error) {
				setLoading((value) => ({ ...value, brand: false }));
			}
		}
	};

	const fetchProductsLoadMore = async (after: string) => {
		if (search && after !== "end") {
			try {
				setLoading((value) => ({ ...value, product: true }));
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
				setLoading((value) => ({ ...value, product: false }));
			} catch (error) {
				setLoading((value) => ({ ...value, product: false }));
			}
		}
	};

	const loadMore = () => {
		fetchProductsLoadMore(after);
	};

	const handleRemoveAllFilter = () => {
		router.push(`${APP_PATH.SEARCH}?search=${search}`, undefined, { shallow: true });
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
		setProducts([]);
		fetchBrands();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	return (
		<div>
			<div className="space-y-14 mt-14 mb-14 md:mb-[112px] xl:mb-[144px]">
				<Breadcrumb className="hidden xl:block xl:mt-[93px]" items={["Trang chủ", "Kết quả tìm kiếm"]} />
				<TitlePage
					className="capitalize mt-14 md:mt-16 xl:mt-12"
					subtitle="Kết quả tìm kiếm"
					title={(search as string) || ""}
				/>

				<div className="flex justify-between lg:justify-start gap-x-4">
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

					<BrandDropdown
						loading={loading.brand}
						className="w-[300px] hidden lg:block"
						options={brands.map((item) => ({ label: item.name, value: item._id }))}
					/>

					<PriceRangeDropdown className="w-[280px] hidden lg:block" />

					<Button className="lg:hidden" onClick={handleOpenFilter} type="secondary">
						<div className="flex items-center gap-x-3">
							<Filter className="dark:text-white" />
							<span className="font-normal dark:text-white">Lọc</span>
						</div>
					</Button>
				</div>

				{((from && to) || brand) && (
					<div className="hidden space-y-4 lg:block">
						<h5 className="text-paragraph-3">Đang lọc theo</h5>
						<div className="flex items-center flex-wrap gap-4">
							{from && to && (
								<RemoveFilterButton
									type="price-range"
									value={`${new Intl.NumberFormat("vn-VN").format(
										parseInt(from as string) / 1000
									)}k - ${new Intl.NumberFormat("vn-VN").format(parseInt(to as string) / 1000)}k`}
								/>
							)}
							{brand &&
								(brand as string).split(",").map((item) => {
									const brd = brands.find((e) => e._id === item);
									if (brd) {
										return <RemoveFilterButton key={brd._id} brandId={brd._id} type="brand" value={brd.name} />;
									}
									return <Fragment key={item}></Fragment>;
								})}
							<p onClick={handleRemoveAllFilter} className="text-red-accent text-paragraph-4 cursor-pointer">
								Xóa tất cả
							</p>
						</div>
					</div>
				)}

				{/* products */}
				<div className="mt-14 xl:mt-[72px] md:mt-16 lg:mt-14 mb-[104px] md:mb-28">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
						{products.length > 0 &&
							products.map((product) => <ProductCard key={product.itemId} productItem={product} />)}
						{loading.product && (
							<>
								<ProductCardLoader />
								<ProductCardLoader />
								<ProductCardLoader />
								<ProductCardLoader />
								<ProductCardLoader />
							</>
						)}
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
			<FilterModal ref={filterRef} overlay={overlayRef} brands={brands} />
			{/* overlay */}
			<Overlay ref={overlayRef} />
		</div>
	);
}
