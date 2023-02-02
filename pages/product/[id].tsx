import React, { useRef } from "react";
import ProductImage from "../../components/Image/product-image";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import GoBack from "../../components/icons/go-back";
import GoForward from "../../components/icons/go-forward";
import TitlePage from "../../components/title-page/title-page";
import Badge from "../../components/badge/badge";
import { yellow_tertiary } from "../../styles/color";
import Price from "../../components/badge/price";
import QuantityBtn from "../../components/buttons/quantity-btn";
import Button from "../../components/buttons/button";
import ProductCard from "../../components/card/product-card";

export default function Product() {
	const prodImagesSwiperRef = useRef<SwiperRef>(null);
	const relatedProdsSwiperRef = useRef<SwiperRef>(null);

	return (
		<section
			className="pt-14 md:pt-16 space-y-[104px] md:space-y-[112px] xl:space-y-[144px]
			mb-[104px] md:mb-[112px] xl:mb-[144px]"
		>
			<div className="xl:flex xl:gap-x-[72px] xl:items-center">
				<div className="md:hidden">
					<Swiper
						slidesPerView={1}
						spaceBetween={40}
						// breakpoints={{
						// 	0: { slidesPerView: 2, spaceBetween: 24 },
						// 	768: { slidesPerView: 4.8, spaceBetween: 24 },
						// 	1024: { slidesPerView: 7, spaceBetween: 24 },
						// }}
						modules={[Pagination]}
						className="mb-10"
						loop
						ref={prodImagesSwiperRef}
					>
						<SwiperSlide>
							<ProductImage sale={20} />
						</SwiperSlide>
						<SwiperSlide>
							<ProductImage sale={20} />
						</SwiperSlide>
						<SwiperSlide>
							<ProductImage sale={20} />
						</SwiperSlide>
						<SwiperSlide>
							<ProductImage sale={20} />
						</SwiperSlide>
					</Swiper>
					{/* navigate button */}
					<nav className="flex justify-center gap-x-4 mb-14">
						<button
							onClick={() => prodImagesSwiperRef.current?.swiper.slidePrev()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoBack height={16} width={16} className="text-black dark:text-white-light" />
						</button>
						<button
							onClick={() => prodImagesSwiperRef.current?.swiper.slideNext()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoForward height={16} width={16} className="text-black dark:text-white-light" />
						</button>
					</nav>
				</div>

				<div className="hidden md:block md:mb-16 xl:mb-0 xl:w-[55%]">
					<div className="px-[84px] lg:px-[124px] lg:grid lg:grid-cols-4 lg:gap-x-6 xl:px-0">
						<ProductImage isTagResponsive sale={20} className="mb-6 lg:col-span-3 xl:mb-0" />

						<div className="grid grid-cols-3 gap-x-6 lg:block lg:col-start-1 lg:row-start-1 lg:gap-x-0 lg:space-y-6">
							<ProductImage />
							<ProductImage />
							<ProductImage />
						</div>
					</div>
				</div>

				{/* product info */}
				<div>
					<TitlePage
						className="mb-6 text-center md:mb-8 xl:text-left"
						subtitle="Bán chạy"
						title="Kem chống nắng"
					/>

					<div className="flex items-center justify-center mb-10 gap-x-6 md:gap-x-8 xl:mb-12">
						<Badge isResponsive color="yellow_tertiary">
							SUN CARE
						</Badge>
						<Price isResponsive price={30} sale={20} />
					</div>

					<div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
						<QuantityBtn />
						<Button type="primary">Thêm vào giỏ</Button>
					</div>
				</div>
			</div>

			{/* relative product */}
			<div>
				<div className="md:flex md:justify-between md:mb-16 xl:mb-[72px]">
					<TitlePage
						className="mb-6 text-center md:text-left md:mb-0"
						subtitle="Tìm hiểu thêm"
						title="Sản phẩm tương tự"
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
					spaceBetween={40}
					breakpoints={{
						0: {
							slidesPerView: 1,
							spaceBetween: 40,
							grid: {
								rows: 1,
							},
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 40,
							grid: {
								rows: 2,
								fill: "row",
							},
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 40,
							grid: {
								rows: 2,
								fill: "row",
							},
						},
						1440: {
							slidesPerView: 4,
							spaceBetween: 40,
							grid: {
								rows: 2,
								fill: "row",
							},
						},
					}}
					modules={[Grid, Pagination]}
					className="mb-10 md:mb-0"
					loop
					ref={relatedProdsSwiperRef}
				>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
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
		</section>
	);
}
