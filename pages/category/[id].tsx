import React, { Fragment, LegacyRef, useEffect, useRef, useState } from "react";
import Badge from "../../components/badge/badge";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Button from "../../components/buttons/button";
import CategoryItem from "../../components/category/category";
import Close from "../../components/icons/close";
import Delete from "../../components/icons/delete";
import LayoutGrid from "../../components/icons/layout-grid";
import Wallet from "../../components/icons/wallet";
import HyggeImage from "../../components/Image/image";
import Dropdown from "../../components/inputs/dropdown";
import Input from "../../components/inputs/input";
import TitlePage from "../../components/title-page/title-page";
import Image from "next/image";
import BarCharUp from "../../components/icons/bar-char-up";
import BarCharDown from "../../components/icons/bar-char-down";
import ProductCard from "../../components/card/product-card";
import OptionButton from "../../components/buttons/option-button";
import PriceRange, { PriceRangeRefType } from "../../components/modal/price-range";
import Overlay from "../../components/modal/overlay";
import CategoriesWindow, { CategoriesWindowRefType } from "../../components/modal/categories-window";
import { useRouter } from "next/router";
import productApi from "../../api/product-api";
import { useAppSelector } from "../../store/hooks";
import { selectCategories } from "../../redux/slices/category-slice";
import { brandApi } from "../../api/brand-api";
import APP_PATH from "../../constants/app-path";
import Expand from "../../components/icons/expand";
import Categories, { CategoriesRefType } from "../../components/modal/categories";
import { useForm } from "react-hook-form";
import { SortPrice } from "../../constants/enums";
import Filter from "../../components/icons/filter";
import FilterModal, { FilterRefType } from "../../components/modal/filter-modal";
import { PathCategoryProvider } from "../../context/path-category.context";
import MultipleSelectDropdown from "../../components/inputs/multiple-select-dropdown";
import BrandDropdown from "../../components/inputs/brand-dropdown";
import PriceRangeDropdown from "../../components/inputs/price-range-dropdown";
import RemoveFilterButton from "../../components/buttons/remove-filter-btn";
import { toastError } from "../../util/toast";

export default function Category() {
	const router = useRouter();
	const { register } = useForm();

	const { id, from, to, brand, order } = router.query;

	const categories = useAppSelector(selectCategories).categories;

	const [products, setProducts] = useState<IProductItem[]>([]);
	const [category, setCategory] = useState<ICategory>();
	const [brands, setBrands] = useState<IBrand[]>([]);
	const [after, setAfter] = useState<string>("");
	const [selectedBrands, setSelectedBrands] = useState<IBrand[]>([]);
	const [priceRange, setPriceRange] = useState<IPriceRange>();

	const overlayRef = useRef<HTMLDivElement>(null);
	const categoryRef = useRef<CategoriesRefType>(null);
	const filterRef = useRef<FilterRefType>(null);

	const handleSortByChange = (value: string) => {
		console.log("value: ", value);
		let path = `${APP_PATH.CATEGORY}/${id}?order=${value}`;
		if (from && to) {
			path += `&from=${from}&to=${to}`;
		}
		if (brand) {
			path += `&brand=${brand}`;
		}
		router.push(path);
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

	const handleOpenCategoriesModel = () => {
		if (categoryRef.current) {
			categoryRef.current.open();
		}
	};

	const handleOpenFilter = () => {
		if (filterRef.current) {
			filterRef.current.open();
		}
	};

	const findCategory = (id: string) => {
		for (const cate of categories) {
			if (cate._id === id) {
				setCategory(cate);
				return;
			}

			if (!cate.children) {
				continue;
			}

			for (const child of cate.children) {
				if (child._id === id) {
					setCategory(child);
					return;
				}

				if (!child.children) {
					continue;
				}

				for (const grandChild of child.children) {
					if (grandChild._id === id) {
						setCategory(grandChild);
						return;
					}
				}
			}
		}
	};

	const loadMore = () => {
		fetchProductsLoadMore(after);
	};

	const fetchBrands = async (id: string) => {
		if (id) {
			const brands = await brandApi.getBrandsByCategory(id);
			setBrands(brands);
		}
	};

	const fetchProductsLoadMore = async (after: string) => {
		if (id && after !== "end") {
			const data = await productApi.getProductItemsByCategoryAndOptions({
				id: id as string,
				limit: process.env.LIIMIT_PRODUCTS_BY_CATEGORY || "10",
				from: from as string,
				to: to as string,
				brands: brand as string,
				after: after,
				order: order ? (order as "desc" | "asc") : undefined,
			});

			if (after === "") {
				setProducts(data.data);
			} else {
				setProducts((values) => [...values, ...data.data]);
			}
			setAfter(data.after);
		}
	};

	useEffect(() => {
		setProducts([]);
		setAfter("");
		fetchProductsLoadMore("");
		fetchBrands(id as string);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		if (brand) {
			const listBrandIds = (brand as string).split(",");
			const selectedBrandsName = brands.filter((item) => listBrandIds.includes(item._id));
			setSelectedBrands(selectedBrandsName);
		}
	}, [brands]);

	useEffect(() => {
		if (id) {
			findCategory(id as string);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categories, id]);

	useEffect(() => {
		if (from && to) {
			const queryPriceRange = { from: parseInt(from as string), to: parseInt(to as string) };
			setPriceRange(queryPriceRange);
		}
		fetchProductsLoadMore("");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [from, to, brand, order]);

	return (
		<div>
			<div className="space-y-14 mt-14 mb-14 md:mb-[112px] xl:mb-[144px]">
				<Breadcrumb className="hidden xl:block xl:mt-24" items={["Trang chủ", "Trang điểm"]} />

				<TitlePage
					className="mt-14 xl:mt-12 md:mt-16 lg:mt-14"
					subtitle={category ? category.name.filter((item) => item.language === "vi")[0].value : ""}
					title={`Khám phá các sản phẩm ${
						category ? category.name.filter((item) => item.language === "vi")[0].value.toLocaleLowerCase() : ""
					}`}
				/>

				<div className="mt-10 lg:grid lg:grid-cols-4">
					<div className="hidden lg:block">
						<h5 className="font-semibold text-heading-4">Danh mục</h5>
						<PathCategoryProvider>
							<div className="mt-2 space-y-3">
								{categories.length > 0 &&
									categories.map((category) => <CategoryItem key={category._id} category={category} />)}
							</div>
						</PathCategoryProvider>
					</div>
					<div className="space-y-6 lg:col-span-3">
						<div className="space-y-6 md:space-y-0 md:flex gap-x-4 lg:block">
							<div
								className="flex shrink-0 gap-x-4 w-full justify-between md:w-fit border-2 rounded-[32px] border-gray-accent dark:border-black-dark-2 px-6 py-3 items-center lg:hidden"
								onClick={handleOpenCategoriesModel}
							>
								<p className="capitalize text-paragraph-5 dark:text-light-100">
									{category ? category.name.filter((item) => item.language === "vi")[0].value.toLocaleLowerCase() : ""}
								</p>
								<Expand
									width={16}
									height={16}
									className="transition-transform duration-300 ease-linear dark:text-light-100"
								/>
							</div>

							<div className="flex justify-between md:w-full">
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
									className="w-[300px]"
									options={brands.map((item) => ({ label: item.name, value: item._id }))}
								/>

								<PriceRangeDropdown className="w-[300px]" />

								<Button onClick={handleOpenFilter} type="secondary" className="lg:hidden">
									<div className="flex items-center gap-x-3">
										<Filter className="dark:text-white" />
										<span className="font-normal dark:text-white">Lọc</span>
									</div>
								</Button>
							</div>
						</div>

						{((from && to) || brand) && (
							<div className="space-y-4">
								<h5 className="text-paragraph-3">Đang lọc theo</h5>
								<div className="flex gap-x-4">
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
								</div>
							</div>
						)}

						{/* products */}
						<div className="mt-14 xl:mt-[72px] md:mt-16 lg:mt-14 mb-[104px] md:mb-28">
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
								{products.length > 0 &&
									products.map((product) => <ProductCard key={product.itemId} productItem={product} />)}
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
				</div>
			</div>

			{/* categories */}
			<Categories overlay={overlayRef} ref={categoryRef} />
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
