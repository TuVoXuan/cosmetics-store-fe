import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import TitlePage from "../components/title-page/title-page";
import CategoryBtn from "../components/buttons/category-btn";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import GoBack from "../components/icons/go-back";
import GoForward from "../components/icons/go-forward";
import { useEffect, useRef, useState } from "react";
import Return from "../components/icons/return";
import WhyUsCard from "../components/card/why-us-card";
import Profile from "../components/icons/profile";
import Quality from "../components/icons/quality";
import CommentCard from "../components/card/comment-card";
import Button from "../components/buttons/button";
import ProductCard from "../components/card/product-card";
import HyggeImage from "../components/Image/image";
import { toast } from "react-hot-toast";
import productApi from "../api/product-api";
import { selectCategories } from "../redux/slices/category-slice";
import Head from "next/head";
import APP_PATH from "../constants/app-path";
import ProductCardLoader from "../components/card/skeleton-loader/product-card-loader";
import Link from "next/link";
import { brandApi } from "../api/brand-api";
import Image from "next/image";
import BrandLogoCard from "../components/card/brand-logo-card";
import BrandCardLoader from "../components/card/skeleton-loader/brand-card-loader";
import { selectHomeSlice } from "../redux/slices/home-slice";
import { getPopularBrands } from "../redux/actions/home-action";

export default function Home() {
	// ** State
	const [facialSkinCareProds, setFacialSkinCareProds] = useState<IProductItem[]>([]);
	const [highEndCosmeticsProds, setHighEndCosmeticsProds] = useState<IProductItem[]>([]);
	const [makeupProds, setMakeupProds] = useState<IProductItem[]>([]);

	// ** Redux & Session
	const { push } = useRouter();
	const dispatch = useAppDispatch();
	const categories = useAppSelector(selectCategories).categories;
	const popularBrands = useAppSelector(selectHomeSlice).popularBrands;

	// ** Swiper
	const categoriesSwiperRef = useRef<SwiperRef>(null);
	const reviewsSwiperRef = useRef<SwiperRef>(null);
	const skinCareProdsSwiperRef = useRef<SwiperRef>(null);
	const highEndCostmeticsProdsSwiperRef = useRef<SwiperRef>(null);
	const makeupProdsSwiperRef = useRef<SwiperRef>(null);
	const popularBrandsSwiperRef = useRef<SwiperRef>(null);

	const handleFetchFacialSkinCareProds = async () => {
		try {
			const response = await productApi.getProductItemsByCategory({
				id: "63ea42b09d7b67d0ae6c14d9",
				limit: "20",
			});
			setFacialSkinCareProds(response);
		} catch (error) {
			toast.error((error as IResponseError).error);
		}
	};

	const handleFetchHighEndProds = async () => {
		try {
			const response = await productApi.getProductItemsByCategory({
				id: "63ea43bf9d7b67d0ae6c14de",
				limit: "20",
			});
			setHighEndCosmeticsProds(response);
		} catch (error) {
			toast.error((error as IResponseError).error);
		}
	};

	const handleMakeupProds = async () => {
		try {
			const response = await productApi.getProductItemsByCategory({
				id: "63ea440f9d7b67d0ae6c14e1",
				limit: "20",
			});
			setMakeupProds(response);
		} catch (error) {
			toast.error((error as IResponseError).error);
		}
	};

	const handleGetPopularBrands = async () => {
		try {
			if (popularBrands.length === 0) {
				await dispatch(getPopularBrands()).unwrap();
			}
		} catch (error) {
			toast.error((error as IResponseError).error);
		}
	};

	useEffect(() => {
		handleFetchFacialSkinCareProds();
		handleFetchHighEndProds();
		handleMakeupProds();
		handleGetPopularBrands();
	}, []);
	return (
		<>
			<Head>
				<title>Hygge</title>
			</Head>
			<section
				className="space-y-[104px] md:space-y-[112px] xl:space-y-[144px]
			mb-[104px] md:mb-[112px] xl:mb-[144px]"
			>
				{/* banner */}
				<div className="lg:bg-gray-accent lg:rounded-5xl lg:dark:bg-black-dark-2 dark:lg:rounded-5xl lg:relative">
					<div className="lg:ml-12 lg:absolute lg:left-0 lg:w-[400px] xl:w-[496px] xl:ml-24 lg:top-0 lg:bottom-0 lg:content-center lg:grid">
						<TitlePage
							className="pb-6 pt-14"
							subtitle="Sản phẩm chăm sóc da"
							title="Chúng tôi cung cấp những sản phẩm tốt nhất cho làn da của bạn"
						/>
						<Button className="lg:w-fit" type="primary">
							Mua ngay
						</Button>
					</div>
					<div className="px-2 py-10 mt-10 lg:mt-12 lg:mb-6 rounded-5xl md:py-4 lg:flex lg:justify-end bg-gray-accent lg:bg-transparent dark:lg:bg-transparent lg:rounded-none dark:bg-black-dark-2 lg:pt-12 lg:pb-6 lg:pr-6 lg:pl-0 xl:pt-6">
						<HyggeImage
							className="h-[221px] md:h-96 lg:h-[432px] lg:w-[576px] xl:w-[768px] xl:h-[576px]"
							src={"/images/banner/banner.svg"}
							alt="banner"
						/>
					</div>
				</div>

				{/* test comment */}
				{/* the categories */}
				<div>
					<div className="text-center mb-14 md:text-left md:mb-12 md:flex md:justify-between">
						<TitlePage subtitle="Các loại danh mục" title="Tìm kiếm bằng danh mục" />

						{/* navigation button of swiper */}
						<div className="hidden md:flex md:gap-x-4 md:items-end">
							<button
								onClick={() => categoriesSwiperRef.current?.swiper.slidePrev()}
								className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
							>
								<GoBack height={16} width={16} className="text-black dark:text-white-light" />
							</button>
							<button
								onClick={() => categoriesSwiperRef.current?.swiper.slideNext()}
								className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
							>
								<GoForward
									height={16}
									width={16}
									className="text-black dark:text-white-light"
								/>
							</button>
						</div>
					</div>
					<div className="ml-[11px] mb-10 md:m-0">
						<Swiper
							slidesPerView="auto"
							spaceBetween={24}
							breakpoints={{
								0: { slidesPerView: 2, spaceBetween: 24 },
								768: { slidesPerView: 4.4, spaceBetween: 24 },
								1024: { slidesPerView: 7, spaceBetween: 24 },
							}}
							modules={[Pagination]}
							className="w-full mySwiper"
							ref={categoriesSwiperRef}
						>
							{categories.map((cate) => (
								<SwiperSlide key={cate.name[0].value}>
									<CategoryBtn
										onClick={() => {
											push(`${APP_PATH.CATEGORY}/${cate._id}`);
										}}
										icon={cate.icon ? cate.icon : ""}
										title={cate.name.filter((item) => item.language === "vi")[0].value}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					<div className="flex justify-center gap-x-4 md:hidden">
						<button
							onClick={() => categoriesSwiperRef.current?.swiper.slidePrev()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoBack height={16} width={16} className="text-black dark:text-white-light" />
						</button>
						<button
							onClick={() => categoriesSwiperRef.current?.swiper.slideNext()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoForward height={16} width={16} className="text-black dark:text-white-light" />
						</button>
					</div>
				</div>

				{/* products */}
				<div>
					<TitlePage
						className="text-center mb-14 md:text-left md:w-2/3"
						subtitle="Chăm sóc da mặt"
						title="Khám phá các sản phẩm chăm sóc da mặt"
					/>

					<div className="relative">
						<Link
							href={`${APP_PATH.CATEGORY}/63ea42b09d7b67d0ae6c14d9`}
							className="absolute right-0 -top-10 text-primary-100 text-heading-6 md:text-heading-5"
						>
							Xem tất cả
						</Link>
						<Swiper
							slidesPerView={2}
							breakpoints={{
								756: {
									slidesPerView: 3,
								},
								1024: {
									slidesPerView: 5,
								},
							}}
							modules={[Pagination]}
							className="mySwiper"
							ref={skinCareProdsSwiperRef}
						>
							{facialSkinCareProds.length > 0 ? (
								facialSkinCareProds.map((prod) => (
									<SwiperSlide key={prod.itemId}>
										<ProductCard productItem={prod} />
									</SwiperSlide>
								))
							) : (
								<>
									{[
										...new Array(10).fill(7).map((value, index) => (
											<SwiperSlide key={value + index}>
												<ProductCardLoader />
											</SwiperSlide>
										)),
									]}
								</>
							)}
						</Swiper>
						<button
							onClick={() => skinCareProdsSwiperRef.current?.swiper.slidePrev()}
							className="absolute flex justify-between z-10 top-1/2 -translate-y-[50%] -translate-x-4 p-4 rounded-full bg-primary-10 dark:bg-black-dark-2"
						>
							<GoBack
								height={16}
								width={16}
								className="text-primary-100 dark:text-white-light"
							/>
						</button>
						<button
							onClick={() => skinCareProdsSwiperRef.current?.swiper.slideNext()}
							className=" absolute right-0 flex justify-between z-10 top-1/2 -translate-y-[50%] translate-x-4 p-4 rounded-full bg-primary-10 dark:bg-black-dark-2"
						>
							<GoForward
								height={16}
								width={16}
								className="text-primary-100 dark:text-white-light"
							/>
						</button>
					</div>
				</div>

				{/* products */}
				<div>
					<TitlePage
						className="text-center mb-14 md:text-left md:w-2/3"
						subtitle="Mỹ phẩm High-end"
						title="Khám phá các sản phẩm mỹ phẩm high-end"
					/>

					<div className="relative">
						<Link
							href={`${APP_PATH.CATEGORY}/63ea43bf9d7b67d0ae6c14de`}
							className="absolute right-0 -top-10 text-primary-100 text-heading-6 md:text-heading-5"
						>
							Xem tất cả
						</Link>
						<Swiper
							slidesPerView={2}
							breakpoints={{
								756: {
									slidesPerView: 3,
								},
								1024: {
									slidesPerView: 5,
								},
							}}
							modules={[Pagination]}
							className="mySwiper"
							ref={highEndCostmeticsProdsSwiperRef}
						>
							{highEndCosmeticsProds.length > 0 ? (
								highEndCosmeticsProds.map((prod) => (
									<SwiperSlide key={prod.itemId}>
										<ProductCard productItem={prod} />
									</SwiperSlide>
								))
							) : (
								<>
									{[
										...new Array(10).fill(8).map((value, index) => (
											<SwiperSlide key={value + index}>
												<ProductCardLoader />
											</SwiperSlide>
										)),
									]}
								</>
							)}
						</Swiper>
						<button
							onClick={() => highEndCostmeticsProdsSwiperRef.current?.swiper.slidePrev()}
							className="absolute flex justify-between z-10 top-1/2 -translate-y-[50%] -translate-x-4 p-4 rounded-full bg-primary-10 dark:bg-black-dark-2"
						>
							<GoBack
								height={16}
								width={16}
								className="text-primary-100 dark:text-white-light"
							/>
						</button>
						<button
							onClick={() => highEndCostmeticsProdsSwiperRef.current?.swiper.slideNext()}
							className=" absolute right-0 flex justify-between z-10 top-1/2 -translate-y-[50%] translate-x-4 p-4 rounded-full bg-primary-10 dark:bg-black-dark-2"
						>
							<GoForward
								height={16}
								width={16}
								className="text-primary-100 dark:text-white-light"
							/>
						</button>
					</div>
				</div>

				{/* products */}
				<div>
					<TitlePage
						className="text-center mb-14 md:text-left md:w-2/3"
						subtitle="Trang điểm"
						title="Khám phá các sản phẩm trang điểm"
					/>

					<div className="relative">
						<Link
							href={`${APP_PATH.CATEGORY}/63ea440f9d7b67d0ae6c14e1`}
							className="absolute right-0 -top-10 text-primary-100 text-heading-6 md:text-heading-5"
						>
							Xem tất cả
						</Link>
						<Swiper
							slidesPerView={2}
							breakpoints={{
								756: {
									slidesPerView: 3,
								},
								1024: {
									slidesPerView: 5,
								},
							}}
							modules={[Pagination]}
							className="mySwiper"
							ref={makeupProdsSwiperRef}
						>
							{makeupProds.length > 0 ? (
								makeupProds.map((prod) => (
									<SwiperSlide key={prod.itemId}>
										<ProductCard productItem={prod} />
									</SwiperSlide>
								))
							) : (
								<>
									{[
										...new Array(10).fill(9).map((value, index) => (
											<SwiperSlide key={value + index}>
												<ProductCardLoader />
											</SwiperSlide>
										)),
									]}
								</>
							)}
						</Swiper>
						<button
							onClick={() => makeupProdsSwiperRef.current?.swiper.slidePrev()}
							className="absolute flex justify-between z-10 top-1/2 -translate-y-[50%] -translate-x-4 p-4 rounded-full bg-primary-10 dark:bg-black-dark-2"
						>
							<GoBack
								height={16}
								width={16}
								className="text-primary-100 dark:text-white-light"
							/>
						</button>
						<button
							onClick={() => makeupProdsSwiperRef.current?.swiper.slideNext()}
							className=" absolute right-0 flex justify-between z-10 top-1/2 -translate-y-[50%] translate-x-4 p-4 rounded-full bg-primary-10 dark:bg-black-dark-2"
						>
							<GoForward
								height={16}
								width={16}
								className="text-primary-100 dark:text-white-light"
							/>
						</button>
					</div>
				</div>

				{/* outstanding brands */}
				<div>
					<TitlePage
						className="text-center mb-14 md:text-left md:w-2/3"
						subtitle="Thương hiệu nổi bật"
						title="Khám phá các thương hiệu nổi bật"
					/>

					<div className="relative">
						<Link
							href={APP_PATH.BRAND}
							className="absolute right-0 -top-10 text-primary-100 text-heading-6 md:text-heading-5"
						>
							Xem tất cả
						</Link>
						<Swiper
							slidesPerView={2}
							breakpoints={{
								756: {
									slidesPerView: 5,
								},
							}}
							modules={[Pagination]}
							className="mySwiper"
							ref={popularBrandsSwiperRef}
						>
							{popularBrands.length > 0 ? (
								popularBrands.map((brand) => (
									<SwiperSlide key={brand._id}>
										<div className="h-[150px] flex items-center w-full">
											<BrandLogoCard brand={brand} />
										</div>
									</SwiperSlide>
								))
							) : (
								<>
									{[
										...new Array(10).fill(10).map((value, index) => (
											<SwiperSlide key={value + index}>
												<BrandCardLoader />
											</SwiperSlide>
										)),
									]}
								</>
							)}
						</Swiper>
						<button
							onClick={() => popularBrandsSwiperRef.current?.swiper.slidePrev()}
							className="absolute flex justify-between z-10 top-1/2 -translate-y-[50%] -translate-x-4 p-4 rounded-full bg-primary-10 dark:bg-black-dark-2"
						>
							<GoBack
								height={16}
								width={16}
								className="text-primary-100 dark:text-white-light"
							/>
						</button>
						<button
							onClick={() => popularBrandsSwiperRef.current?.swiper.slideNext()}
							className=" absolute right-0 flex justify-between z-10 top-1/2 -translate-y-[50%] translate-x-4 p-4 rounded-full bg-primary-10 dark:bg-black-dark-2"
						>
							<GoForward
								height={16}
								width={16}
								className="text-primary-100 dark:text-white-light"
							/>
						</button>
					</div>
				</div>

				{/* why us */}
				<div>
					<TitlePage
						className="text-center mb-14 md:mb-16 xl:mb-[72px]"
						subtitle="Tại sao là chúng tôi"
						title="Tại sao mọi người chọn chúng tôi"
					/>
					<div className="space-y-14 md:space-y-16 lg:space-y-8 xl:space-y-0 xl:grid xl:grid-cols-3 xl:gap-x-[120px]">
						<div className="space-y-14 md:space-y-16 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:space-y-0 xl:col-span-2 xl:gap-x-[120px]">
							<WhyUsCard
								icon={<Return height={32} width={32} className="dark:text-white-light" />}
								title="Trả lại dễ dàng"
								bodyText="Chính sách hoàn trả của chúng tôi rất đơn giản và đó là lý do tại sao khách hàng yêu
							thích cửa hàng của chúng tôi."
							/>
							<WhyUsCard
								icon={<Profile height={32} width={32} className="dark:text-white-light" />}
								title="Chăm sóc khách hàng"
								bodyText="Chúng tôi cung cấp dịch vụ khách hàng tuyệt vời bất kể điều gì xảy ra."
							/>
						</div>
						<WhyUsCard
							className="lg:px-[248px] xl:px-0"
							icon={<Quality height={32} width={32} className="dark:text-white-light" />}
							title="Chất lượng cao"
							bodyText="Tất cả các sản phẩm của chúng tôi đều được kiểm tra rất nghiêm ngặt trước khi gửi đi."
						/>
					</div>
				</div>

				{/* our reviews */}
				<div
					className="lg:h-[504px] lg:grid lg:grid-cols-2 lg:gap-x-4 lg:px-12 lg:bg-gray-accent lg:rounded-[56px]
				dark:lg:bg-black-dark-2
				xl:h-[600px] xl:grid-cols-3 xl:px-24 xl:rounded-[64px]
			"
				>
					<TitlePage
						className="text-center mb-14 md:mb-16 lg:my-auto lg:text-left xl:col-span-2 xl:pr-40"
						subtitle="Nhận xét của chúng tôi"
						title="Khách hàng của chúng tôi nói gì"
					/>

					<div className="lg:relative lg:my-auto">
						<Swiper
							slidesPerView={1}
							spaceBetween={24}
							pagination={{
								dynamicBullets: true,
							}}
							modules={[Pagination]}
							className="w-full mb-10 mySwiper lg:mb-0"
							loop
							ref={reviewsSwiperRef}
						>
							<SwiperSlide className="pb-12">
								<CommentCard />
							</SwiperSlide>
							<SwiperSlide className="pb-12">
								<CommentCard />
							</SwiperSlide>
							<SwiperSlide className="pb-12">
								<CommentCard />
							</SwiperSlide>
						</Swiper>

						{/* navigate button */}
						<div className="flex items-end justify-center gap-x-4 lg:justify-start lg:absolute lg:top-[calc(100%+40px)] xl:top-[calc(100%+64px)]">
							<button
								onClick={() => reviewsSwiperRef.current?.swiper.slidePrev()}
								className="p-4 rounded-full lg:border-2 lg:border-black lg:dark:border-none bg-gray-accent dark:bg-black-dark-2 lg:dark:bg-black-dark-4"
							>
								<GoBack height={16} width={16} className="text-black dark:text-white-light" />
							</button>

							<button
								onClick={() => reviewsSwiperRef.current?.swiper.slideNext()}
								className="p-4 rounded-full lg:border-2 lg:border-black lg:dark:border-none bg-gray-accent dark:bg-black-dark-2 lg:dark:bg-black-dark-4"
							>
								<GoForward
									height={16}
									width={16}
									className="text-black dark:text-white-light"
								/>
							</button>
						</div>
					</div>
				</div>

				{/* our newsletter */}
				<div className="hidden md:block lg:bg-gray-accent dark:lg:bg-black-dark-2 lg:rounded-[48px] lg:py-16 xl:py-24 xl:rounded-[56px]">
					<TitlePage
						className="text-center mb-14 md:mb-10 lg:mb-12"
						subtitle="Bản tin của chúng tôi"
						title="Đăng ký nhận tin mới nhất từ chúng tôi"
					/>

					<div className="flex items-end justify-center gap-x-6">
						<input
							className="w-[448px] border-[2px] border-gray-accent font-semibold placeholder:text-dark-40 text-dark-100 
						focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 
						dark:focus:outline-none px-6 py-3 text-heading-5 rounded-3xl md:px-6 md:py-4 
						md:text-heading-4 md:rounded-4xl dark:border-black-dark-4 dark:bg-transparent 
						dark:text-white-light dark:placeholder:text-light-40 dark:bg-black-dark-4"
							placeholder="Email của bạn"
						/>
						<Button type="primary" className="h-full">
							Đăng ký
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}
