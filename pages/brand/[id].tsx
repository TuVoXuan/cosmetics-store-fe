import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { brandApi } from "../../api/brand-api";
import productApi from "../../api/product-api";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Button from "../../components/buttons/button";
import RemoveFilterButton from "../../components/buttons/remove-filter-btn";
import ProductCard from "../../components/card/product-card";
import ProductCardLoader from "../../components/card/skeleton-loader/product-card-loader";
import Filter from "../../components/icons/filter";
import Dropdown from "../../components/inputs/dropdown";
import PriceRangeDropdown from "../../components/inputs/price-range-dropdown";
import FilterModal, { FilterRefType } from "../../components/modal/filter-modal";
import Overlay from "../../components/modal/overlay";
import TitlePage from "../../components/title-page/title-page";
import APP_PATH from "../../constants/app-path";
import { SortPrice } from "../../constants/enums";
import Image from "next/image";
import { toastError } from "../../util/toast";
import { useSettings } from "../../store/hooks";

export default function Brand() {
	// ref
	const overlayRef = useRef<HTMLDivElement>(null);
	const filterRef = useRef<FilterRefType>(null);

	// route
	const router = useRouter();
	const { id, from, to, order } = router.query;
	console.log("id: ", id);

	// state
	const [products, setProducts] = useState<IProductBrandItem[]>([]);
	const [brands, setBrands] = useState<IBrand[]>([]);
	const [after, setAfter] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [brandName, setBrandName] = useState<string>("");

	// react hook form
	const { register } = useForm();

	//context
	const { language } = useSettings();

	// function
	const handleSortByChange = (value: string) => {
		console.log("value: ", value);
		let path = `${APP_PATH.BRAND}/${id}?order=${value}`;
		if (from && to) {
			path += `&from=${from}&to=${to}`;
		}
		router.push(path);
	};

	const handleOpenFilter = () => {
		if (filterRef.current) {
			filterRef.current.open();
		}
	};

	const fetchProductsLoadMore = async (after: string) => {
		if (after !== "end") {
			try {
				setLoading(true);
				const data = await productApi.paginateProductBrand({
					id: id as string,
					limit: process.env.LIIMIT_PRODUCTS_BY_CATEGORY || "10",
					from: from as string,
					to: to as string,
					after: after,
					order: order ? (order as "desc" | "asc") : undefined,
				});

				setProducts((values) => [...values, ...data.data]);
				setAfter(data.after);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				toastError((error as IResponseError).error);
			}
		}
	};

	const loadMore = () => {
		fetchProductsLoadMore(after);
	};

	const handleRemoveAllFilter = () => {
		router.push(`${APP_PATH.BRAND}/${id}`, undefined, { shallow: true });
	};

	const handleGetBrandName = async () => {
		try {
			const response = await brandApi.getBrandName(id as string);
			setBrandName(response);
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	useEffect(() => {
		if (from || to || id || order) {
			setProducts([]);
			setAfter("");
			fetchProductsLoadMore("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [from, to, id, order]);

	useEffect(() => {
		handleGetBrandName();
		setProducts([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<div>
			<div className="space-y-14 mt-14 mb-14 md:mb-[112px] xl:mb-[144px]">
				<Breadcrumb
					className="hidden lg:block lg:mt-14"
					items={[
						{ title: language.header.home_tag, href: APP_PATH.HOME },
						{ title: language.brand_page.brand_sub_title, href: APP_PATH.BRAND },
						{ title: brandName, href: APP_PATH.BRAND + "/" + id },
					]}
				/>
				<TitlePage
					className="capitalize mt-14 md:mt-16 xl:mt-12"
					subtitle={brandName}
					title={`${language.brand_page.products_of_title} ${brandName}`}
				/>

				<div className="flex justify-between lg:justify-start gap-x-4">
					<Dropdown
						defaulValue={order ? (order as string) : SortPrice.Default}
						register={register}
						name={"orderStatus"}
						className="w-fit"
						onChange={handleSortByChange}
						options={[
							{ label: language.category_page.default, value: SortPrice.Default },
							{ label: language.category_page.ascending, value: SortPrice.Ascending },
							{ label: language.category_page.descending, value: SortPrice.Descending },
						]}
					/>

					<PriceRangeDropdown className="w-[280px] hidden lg:block" />

					<Button className="lg:hidden" onClick={handleOpenFilter} type="secondary">
						<div className="flex items-center gap-x-3">
							<Filter className="dark:text-white" />
							<span className="font-normal dark:text-white">{language.category_page.filter}</span>
						</div>
					</Button>
				</div>

				{from && to && (
					<div className="hidden space-y-4 lg:block">
						<h5 className="font-semibold text-paragraph-3">{language.category_page.filtering_by}</h5>
						<div className="flex flex-wrap items-center gap-4">
							{from && to && (
								<RemoveFilterButton
									type="price-range"
									value={`${new Intl.NumberFormat("vn-VN").format(
										parseInt(from as string) / 1000
									)}k - ${new Intl.NumberFormat("vn-VN").format(parseInt(to as string) / 1000)}k`}
								/>
							)}
							<p onClick={handleRemoveAllFilter} className="cursor-pointer text-red-accent text-paragraph-4">
								{language.category_page.clear_all}
							</p>
						</div>
					</div>
				)}

				{/* products */}
				<div className="mt-14 xl:mt-[72px] md:mt-16 lg:mt-14 mb-[104px] md:mb-28">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
						{products.length > 0 &&
							products.map((product) => <ProductCard key={product.itemId} productItem={product} />)}
						{loading && (
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
								{language.product_detail_page.see_more}
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* filter modal */}
			<FilterModal ref={filterRef} overlay={overlayRef} brands={brands} />
			{/* overlay */}
			<Overlay ref={overlayRef} />
		</div>
	);
}

export async function getServerSideProps(context: any) {
	return {
		props: {},
	};
}
