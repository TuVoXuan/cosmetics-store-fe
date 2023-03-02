import React, { useEffect, useRef, useState } from "react";
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
import PriceRange, { PriceRangeRefType } from "../../components/model/price-range";
import Overlay from "../../components/model/overlay";
import CategoriesWindow, { CategoriesWindowRefType } from "../../components/model/categories-window";
import { useRouter } from "next/router";
import productApi from "../../api/product-api";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "../../redux/slices/category-slice";
import { brandApi } from "../../api/brand-api";

export default function Category() {
	const router = useRouter();
	const { id } = router.query;

	const categories = useAppSelector(selectCategories).categories;

	const [products, setProducts] = useState<IProductItem[]>([]);
	const [category, setCategory] = useState<ICategory>();
	const [brands, setBrands] = useState<IBrand[]>([]);

	const overlayRef = useRef<HTMLDivElement>(null);
	const categoriesRef = useRef<CategoriesWindowRefType>(null);
	const priceRangRef = useRef<PriceRangeRefType>(null);

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

	const fetchProductItems = async (previous?: string[]) => {
		if (id) {
			const body: IGetProductByCategory = {
				id: id as string,
				limit: process.env.LIIMIT_PRODUCTS_BY_CATEGORY || "10",
			};
			if (previous) {
				body.previous = previous;
			}
			const response = await productApi.getProductItemsByCategory(body);
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
		fetchProductItems(products.map((item) => item.itemId));
	};

	const fetchBrands = async (id: string) => {
		if (id) {
			const brands = await brandApi.getBrandsByCategory(id);
			setBrands(brands);
		}
	};

	useEffect(() => {
		setProducts([]);
		fetchProductItems();
		fetchBrands(id as string);
		findCategory(id as string);
	}, [id]);

	return (
		<div>
			<Breadcrumb className="hidden xl:block xl:mt-24" items={["Trang chủ", "Trang điểm"]} />

			<TitlePage
				className="mt-14 xl:mt-12 md:mt-16 lg:mt-14"
				subtitle={category ? category.name.filter((item) => item.language === "vi")[0].value : ""}
				title={`Khám phá các sản phẩm ${
					category ? category.name.filter((item) => item.language === "vi")[0].value.toLocaleLowerCase() : ""
				}`}
			/>

			<div className="space-y-4 xl:space-y-12 mt-14 md:mt-16 xl:mt-[72px] lg:mt-14">
				<div className="space-y-2 md:space-y-4 xl:space-y-8">
					<p className="font-bold md:text-heading-4 text-heading-5 xl:text-heading-3 dark:text-light-100">
						Chọn tiêu chí
					</p>
					<div className="space-x-2 md:space-x-4 xl:space-x-8">
						<OptionButton onClick={handleOpenCategories}>
							<LayoutGrid
								width={20}
								height={20}
								className="inline mr-1 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
							/>
							Phân loại
						</OptionButton>
						<div className="inline lg:relative">
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
						<OptionButton>
							<BarCharUp
								width={20}
								height={20}
								className="inline mr-1 -rotate-90 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
							/>
							Giá tăng dần
						</OptionButton>
						<OptionButton>
							<BarCharDown
								width={20}
								height={20}
								className="inline mr-1 -rotate-90 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
							/>
							Giá giảm dần
						</OptionButton>
					</div>
				</div>
				{/* brand logos */}
				<div className="space-y-2 md:space-y-4 xl:space-y-8">
					<p className="font-bold md:text-heading-4 text-heading-5 xl:text-heading-3 dark:text-light-100">
						Thương hiệu
					</p>

					<div className="flex items-center overflow-x-auto xl:h-36 h-14 md:h-28 gap-x-4 md:gap-x-8 lg:gap-x-10">
						{brands.length > 0 &&
							brands.map((brand) => (
								<HyggeImage
									key={brand._id}
									className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
									src={brand.logo}
									alt={brand.name}
								/>
							))}
						{/* <HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/Eucerin_logo.png"
							alt="eucerin"
						/>
						<HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/La-Roche-Posay-Logo-PNG-1.png"
							alt="larocheposay"
						/>
						<HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/Laneige_Logo.svg.png"
							alt="laneige"
						/>
						<HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/Pantene-Logo-2012-2016.png"
							alt="pantene"
						/>
						<HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/Vichy-Logo.png"
							alt="vichy"
						/> */}
					</div>
				</div>
			</div>

			{/* products */}
			<div className="mt-14 xl:mt-[72px] md:mt-16 lg:mt-14 mb-[104px] md:mb-28">
				<div className="space-y-14 md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-4 ">
					{products.length > 0 && products.map((product) => <ProductCard key={product.itemId} productItem={product} />)}
				</div>

				<div className="flex justify-center mt-14 md:mt-16">
					<Button onClick={loadMore} type="primary">
						Xem thêm
					</Button>
				</div>
			</div>

			{/* categories */}
			<CategoriesWindow ref={categoriesRef} overlay={overlayRef} />

			{/* overlay */}
			<Overlay ref={overlayRef} />
		</div>
	);
}
