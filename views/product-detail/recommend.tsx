import { Grid, Pagination } from "swiper";
import { toastError } from "../../util/toast";
import productApi from "../../api/product-api";
import GoBack from "../../components/icons/go-back";
import GoForward from "../../components/icons/go-forward";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../../components/card/product-card";
import { SwiperRef, SwiperSlide, Swiper } from "swiper/react";
import TitlePage from "../../components/title-page/title-page";
import { selectRecommend } from "../../redux/slices/recommend-slice";
import { useAppSelector, useProductDetail } from "../../store/hooks";
import ProductCardLoader from "../../components/card/skeleton-loader/product-card-loader";
import { useRouter } from "next/router";
import { English, Vietnamese } from "../../translation";

export default function ProductRecommend() {
	const { locale } = useRouter();
	const { currentItem } = useProductDetail();

	const { product_detail_page } = locale === "en" ? English : Vietnamese;

	const relatedProdsSwiperRef = useRef<SwiperRef>(null);
	const mayBeLikeProdsSwiperRef = useRef<SwiperRef>(null);

	const recommendedProducts = useAppSelector(selectRecommend).products;

	const [similarProds, setSimilarProds] = useState<IProductItem[]>([]);

	const handleGetSimilarProds = async () => {
		try {
			if (currentItem) {
				const res = await productApi.recommendCF(currentItem._id);
				setSimilarProds(res);
			}
		} catch (error) {
			console.log("error: ", error);
			toastError("Have same errors when get similar produts");
		}
	};

	useEffect(() => {
		handleGetSimilarProds();
	}, [currentItem]);

	return (
		<>
			{/* relative product */}
			<div>
				<div className="md:flex md:justify-between md:mb-16 xl:mb-[72px]">
					<TitlePage
						className="mb-6 text-center md:text-left md:mb-0"
						subtitle={product_detail_page.recommend_subTitle}
						title={product_detail_page.related_prod_title}
					/>

					<div className="hidden md:flex md:gap-x-4 md:items-end">
						<button
							onClick={() => relatedProdsSwiperRef.current?.swiper.slidePrev()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoBack height={16} width={16} className="text-black dark:text-white-light" />
						</button>
						<button
							onClick={() => relatedProdsSwiperRef.current?.swiper.slideNext()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoForward height={16} width={16} className="text-black dark:text-white-light" />
						</button>
					</div>
				</div>

				<Swiper
					slidesPerView="auto"
					breakpoints={{
						0: {
							slidesPerView: 2,
							grid: {
								rows: 1,
							},
						},
						768: {
							slidesPerView: 3,
							grid: {
								rows: 2,
								fill: "row",
							},
						},
						1024: {
							slidesPerView: 5,
							grid: {
								rows: 1,
								fill: "row",
							},
						},
					}}
					modules={[Grid, Pagination]}
					className="mb-10 md:mb-0"
					ref={relatedProdsSwiperRef}
				>
					{similarProds.length > 0 ? (
						similarProds.map((item) => (
							<SwiperSlide key={item.itemId}>
								<ProductCard productItem={item} />
							</SwiperSlide>
						))
					) : (
						<>
							<SwiperSlide>
								<ProductCardLoader />
							</SwiperSlide>
							<SwiperSlide>
								<ProductCardLoader />
							</SwiperSlide>
							<SwiperSlide>
								<ProductCardLoader />
							</SwiperSlide>
							<SwiperSlide>
								<ProductCardLoader />
							</SwiperSlide>
						</>
					)}
				</Swiper>

				{/* navigate button */}
				<nav className="flex justify-center gap-x-4 mb-14 md:hidden">
					<button
						onClick={() => relatedProdsSwiperRef.current?.swiper.slidePrev()}
						className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
					>
						<GoBack height={16} width={16} className="text-black dark:text-white-light" />
					</button>
					<button
						onClick={() => relatedProdsSwiperRef.current?.swiper.slideNext()}
						className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
					>
						<GoForward height={16} width={16} className="text-black dark:text-white-light" />
					</button>
				</nav>
			</div>

			{/* products you may be like */}

			<div>
				<div className="md:flex md:justify-between md:mb-16 xl:mb-[72px]">
					<TitlePage
						className="mb-6 text-center md:text-left md:mb-0"
						subtitle={product_detail_page.recommend_subTitle}
						title={product_detail_page.may_be_like_prod_title}
					/>

					<div className="hidden md:flex md:gap-x-4 md:items-end">
						<button
							onClick={() => mayBeLikeProdsSwiperRef.current?.swiper.slidePrev()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoBack height={16} width={16} className="text-black dark:text-white-light" />
						</button>
						<button
							onClick={() => mayBeLikeProdsSwiperRef.current?.swiper.slideNext()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoForward height={16} width={16} className="text-black dark:text-white-light" />
						</button>
					</div>
				</div>

				<Swiper
					slidesPerView="auto"
					breakpoints={{
						0: {
							slidesPerView: 2,
							grid: {
								rows: 1,
							},
						},
						768: {
							slidesPerView: 3,
							grid: {
								rows: 2,
								fill: "row",
							},
						},
						1024: {
							slidesPerView: 5,
							grid: {
								rows: 1,
								fill: "row",
							},
						},
					}}
					modules={[Grid, Pagination]}
					className="mb-10 md:mb-0"
					ref={mayBeLikeProdsSwiperRef}
				>
					{recommendedProducts.length > 0 ? (
						recommendedProducts.map((item) => (
							<SwiperSlide key={item.itemId}>
								<ProductCard productItem={item} />
							</SwiperSlide>
						))
					) : (
						<>
							<SwiperSlide>
								<ProductCardLoader />
							</SwiperSlide>
							<SwiperSlide>
								<ProductCardLoader />
							</SwiperSlide>
							<SwiperSlide>
								<ProductCardLoader />
							</SwiperSlide>
							<SwiperSlide>
								<ProductCardLoader />
							</SwiperSlide>
						</>
					)}
				</Swiper>

				{/* navigate button */}
				<nav className="flex justify-center gap-x-4 mb-14 md:hidden">
					<button
						onClick={() => mayBeLikeProdsSwiperRef.current?.swiper.slidePrev()}
						className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
					>
						<GoBack height={16} width={16} className="text-black dark:text-white-light" />
					</button>
					<button
						onClick={() => mayBeLikeProdsSwiperRef.current?.swiper.slideNext()}
						className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
					>
						<GoForward height={16} width={16} className="text-black dark:text-white-light" />
					</button>
				</nav>
			</div>
		</>
	);
}
