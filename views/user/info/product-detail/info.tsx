import React, { useEffect, useRef, useState } from "react";
import { Pagination } from "swiper";
import ProductImage from "../../../../components/Image/product-image";
import ZoomImage from "../../../../components/Image/zoom-image";
import Price from "../../../../components/badge/price";
import Button from "../../../../components/buttons/button";
import QuantityBtn from "../../../../components/buttons/quantity-btn";
import GoBack from "../../../../components/icons/go-back";
import GoForward from "../../../../components/icons/go-forward";
import TitlePage from "../../../../components/title-page/title-page";
import VariationOptions from "../../../../components/variation-option/variationOptions";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { useAppDispatch, useProductDetail } from "../../../../store/hooks";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import APP_PATH from "../../../../constants/app-path";
import { addToCart } from "../../../../redux/slices/cart-slice";
import { toastSuccess } from "../../../../util/toast";

export default function ProductInfo() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { data: session, status } = useSession();

	const { currentItem, descriptions, productItems, variationList, setCurrentItem, productId } = useProductDetail();

	const prodImagesSwiperRef = useRef<SwiperRef>(null);

	const [quantity, setQuantity] = useState<number>(1);
	const [displayImg, setDisplayImg] = useState<string | undefined>(currentItem?.thumbnail);

	const { locale } = router;

	const handleDescription = () => {
		const description = descriptions.find((des) => des.language === locale);
		if (description) {
			let descipt = description.value;
			descipt = descipt.replaceAll("<h1>", '<h1 class="py-2 text-heading-1 dark:text-white">');
			descipt = descipt.replaceAll("<h2>", '<h2 class="py-2 text-heading-2 dark:text-white">');
			descipt = descipt.replaceAll("<h3>", '<h3 class="py-2 text-heading-3 dark:text-white">');
			descipt = descipt.replaceAll("<h4>", '<h4 class="py-2 text-heading-4 dark:text-white">');
			descipt = descipt.replaceAll("<h5>", '<h5 class="py-2 text-heading-5 dark:text-white">');
			descipt = descipt.replaceAll("<h6>", '<h6 class="py-2 text-heading-6 dark:text-white">');
			descipt = descipt.replaceAll("<p>", '<p class="dark:text-white py-2">');
			descipt = descipt.replaceAll("<ul>", '<ul class="list-disc list-inside pl-4">');

			return descipt;
		}
		return "";
	};

	const handleClickImg = (url: string) => {
		setDisplayImg(url);
	};

	const handleChangeQuantity = (value: number) => {
		setQuantity(value);
	};

	const handleChangeCurrItem = (item: IProductItemDetail) => {
		setCurrentItem(item);
	};

	const handleAddToCart = () => {
		if (status === "authenticated") {
			if (currentItem) {
				const cartItem: CartItem = {
					itemId: currentItem._id,
					productId: productId,
					name: currentItem.name,
					price: currentItem.price,
					thumbnail: currentItem.thumbnail,
					quantity,
				};

				dispatch(addToCart(cartItem));

				toastSuccess("Add to cart success");
			}
		} else {
			router.push({
				pathname: APP_PATH.SIGN_IN,
				query: { redirectURL: router.asPath },
			});
		}
	};

	useEffect(() => {
		setDisplayImg(currentItem?.thumbnail);
	}, [currentItem]);

	return (
		<>
			<div className="lg:grid lg:grid-cols-10">
				<div className="md:hidden">
					<Swiper
						slidesPerView={1}
						spaceBetween={40}
						modules={[Pagination]}
						className="mb-10"
						loop
						ref={prodImagesSwiperRef}
					>
						{currentItem &&
							[currentItem.thumbnail, ...currentItem.images].map((url) => (
								<SwiperSlide key={url}>
									<ProductImage src={url} sale={20} />
								</SwiperSlide>
							))}
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

				<div className="hidden md:block md:mb-16 lg:mb-0 lg:col-span-4">
					<div className="px-[84px] lg:px-0">
						{/* <ProductImage src={displayImg || "/images/Product.png"} className="mb-6" /> */}
						<ZoomImage url={displayImg || "/images/Product.png"} alt={"product image"} />

						<div className="grid grid-cols-4 gap-x-2 ">
							{currentItem &&
								[currentItem.thumbnail, ...currentItem.images].map((url) => (
									<ProductImage onClick={() => handleClickImg(url)} key={url} src={url} />
								))}
						</div>
					</div>
				</div>

				{/* product info */}
				<div className="lg:col-span-6 lg:pl-12">
					<TitlePage
						className="mb-6 text-center md:mb-8 lg:text-left"
						subtitle="Bán chạy"
						title={currentItem?.name.find((item) => item.language == locale)?.value || ""}
					/>

					<div className="flex justify-center mb-10 lg:justify-start lg:mb-12">
						<Price isResponsive price={currentItem?.price || 0} />
					</div>
					{/* variation options */}
					<VariationOptions
						currentItem={currentItem}
						productItems={productItems}
						variationList={variationList}
						onChange={handleChangeCurrItem}
					/>

					<div className="flex flex-col items-center gap-6 md:items-stretch md:flex-row md:justify-center">
						<QuantityBtn value={quantity} onChange={handleChangeQuantity} />
						<Button onClick={handleAddToCart} type="primary">
							Thêm vào giỏ
						</Button>
					</div>
				</div>
			</div>

			{/* product info */}
			<div>
				<TitlePage className="text-center xl:text-left " subtitle="Đặc điểm sản phẩm" title="Khám phá các đặc điểm" />
				<div
					className="mt-8 text-paragraph-5 lg:text-paragraph-4 dark:text-white"
					dangerouslySetInnerHTML={{
						__html: handleDescription(),
					}}
				></div>
			</div>
		</>
	);
}
