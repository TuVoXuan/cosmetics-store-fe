import React, { LegacyRef, useEffect, useRef, useState } from "react";
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
	const categoriesRef = useRef<CategoriesWindowRefType>(null);
	const priceRangRef = useRef<PriceRangeRefType>(null);
	const categoryRef = useRef<CategoriesRefType>(null);
	const filterRef = useRef<FilterRefType>(null);

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

	const fetchProductItemsRandom = async (previous?: string[]) => {
		if (id) {
			const body: IGetProductByCategory = {
				id: id as string,
				limit: process.env.LIIMIT_PRODUCTS_BY_CATEGORY || "10",
			};
			if (previous) {
				body.previous = previous;
			}
			const response = await productApi.getProductItemsByCategory(body);
			if (response.length === 0) {
				setAfter("end");
			}
			setProducts((values) => [...values, ...response]);
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
		if (from || to || brand || order) {
			fetchProductsLoadMore(after);
		} else {
			fetchProductItemsRandom(products.map((item) => item.itemId));
		}
	};

	const fetchBrands = async (id: string) => {
		if (id) {
			const brands = await brandApi.getBrandsByCategory(id);
			setBrands(brands);
		}
	};

	const handleClickOrder = (order: "asc" | "desc") => () => {
		let path = `${APP_PATH.CATEGORY}/${id}?order=${order}`;

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
		let path = `${APP_PATH.CATEGORY}/${id}?brand=${brand}`;

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

	const fetchProductsLoadMore = async (after: string) => {
		if (id && after !== "end") {
			const data = await productApi.getProductItemsByCategoryAndOptions({
				id: id as string,
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

	useEffect(() => {
		if (!from && !to && !brand && !order) {
			fetchProductItemsRandom();
		}
		setProducts([]);
		setAfter("");
		fetchBrands(id as string);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	useEffect(() => {
		if (id) {
			findCategory(id as string);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categories, id]);

	useEffect(() => {
		if (from || to || brand || order) {
			setProducts([]);
			setAfter("");
			fetchProductsLoadMore("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [from, to, brand, order]);

	return (
		<div>
			<Breadcrumb className="hidden xl:block xl:mt-24" items={["Trang chủ", "Trang điểm"]} />

			<TitlePage
				className="mt-14 xl:mt-12 md:mt-16 lg:mt-14"
				subtitle={category ? category.name.filter((item) => item.language === "vi")[0].value : ""}
				title={`Khám phá các sản phẩm ${
					category
						? category.name.filter((item) => item.language === "vi")[0].value.toLocaleLowerCase()
						: ""
				}`}
			/>

			<div className="space-y-4 lg:flex lg:space-y-0 lg:gap-x-8">
				<div
					className="flex gap-x-4 w-fit border-2 rounded-[32px] border-gray-accent dark:border-black-dark-2 px-6 py-3 items-center"
					onClick={handleOpenCategoriesModel}
				>
					<p className="capitalize text-paragraph-5 dark:text-light-100">
						{category
							? category.name
									.filter((item) => item.language === "vi")[0]
									.value.toLocaleLowerCase()
							: ""}
					</p>
					<Expand
						width={16}
						height={16}
						className="transition-transform duration-300 ease-linear dark:text-light-100"
					/>
				</div>
			</div>

			<div className="flex justify-between">
				<Dropdown
					defaulValue={SortPrice.Default}
					register={register}
					name={"orderStatus"}
					className="w-fit"
					// onChange={handleSelectChange}
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
				<div className="grid grid-cols-2 lg:grid-cols-4 ">
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

			{/* categories */}
			<CategoriesWindow ref={categoriesRef} overlay={overlayRef} />

			{/* categories */}
			<Categories overlay={overlayRef} ref={categoryRef} />
			{/* filter modal */}
			<FilterModal
				ref={filterRef}
				overlay={overlayRef}
				brands={brands}
				selectedBrands={selectedBrands.map((item) => item._id)}
				onSelectBrand={handleSelectBrand}
				priceRange={priceRange}
				onSelectPriceRange={handleSelectPriceRange}
			/>
			{/* overlay */}
			<Overlay ref={overlayRef} />
		</div>
	);
}
