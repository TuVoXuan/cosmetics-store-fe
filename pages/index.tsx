import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../redux/slices/user-slice";
import TitlePage from "../components/title-page/title-page";
import CategoryBtn from "../components/buttons/category-btn";
import ShoppingBag from "../components/icons/shopping-bag";
import Skincare from "../components/icons/skincare";
import Natural from "../components/icons/natural";
import EyeCare from "../components/icons/eye-care";
import Protection from "../components/icons/protection";
import NightCare from "../components/icons/night-care";
import AfterSun from "../components/icons/after-sun";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper";
import GoBack from "../components/icons/go-back";
import GoForward from "../components/icons/go-forward";
import { useRef } from "react";
import Return from "../components/icons/return";
import WhyUsCard from "../components/card/why-us-card";
import Profile from "../components/icons/profile";
import Quality from "../components/icons/quality";
import Image from "next/image";
import CommentCard from "../components/card/comment-card";
import Button from "../components/buttons/button";
import Input from "../components/inputs/input";

const categories = [
	{
		icon: <ShoppingBag height={32} width={32} className="text-primary-100" />,
		title: "giảm giá",
	},
	{
		icon: <Skincare height={32} width={32} className="text-primary-100" />,
		title: "mặt nạ",
	},
	{
		icon: <EyeCare height={32} width={32} className="text-primary-100" />,
		title: "chăm sóc mắt",
	},
	{
		icon: <Natural height={32} width={32} className="text-primary-100" />,
		title: "dưỡng ẩm",
	},
	{
		icon: <Protection height={32} width={32} className="text-primary-100" />,
		title: "điều trị",
	},
	{
		icon: <NightCare height={32} width={32} className="text-primary-100" />,
		title: "chăm sóc ban đêm",
	},
	{
		icon: <AfterSun height={32} width={32} className="text-primary-100" />,
		title: "chống nắng",
	},
];
import ProductCard from "../components/card/product-card";
import HyggeImage from "../components/Image/image";

export default function Home() {
	const { data: session } = useSession();
	console.log("session: ", session);
	const { push } = useRouter();
	const user = useAppSelector(selectUser);
	const categoriesSwiperRef = useRef<SwiperRef>(null);
	const reviewsSwiperRef = useRef<SwiperRef>(null);
	const productsSwiperRef = useRef<SwiperRef>(null);

	const handleSignIn = () => push(`/auth/sign-in`);

	return (
		<>
			{session && (
				<button onClick={() => signOut()} className="bg-red-200">
					sign out
				</button>
			)}

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
								768: { slidesPerView: 4.8, spaceBetween: 24 },
								1024: { slidesPerView: 7, spaceBetween: 24 },
							}}
							modules={[Pagination]}
							className="w-full mySwiper"
							loop
							ref={categoriesSwiperRef}
						>
							{categories.map((cate) => (
								<SwiperSlide key={cate.title}>
									<CategoryBtn icon={cate.icon} title={cate.title} />
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
					<div className="md:flex md:justify-between mb-14">
						<TitlePage
							className="text-center md:text-left md:w-2/3"
							subtitle="Sản phẩm"
							title="Khám phá các sản phẩm của chúng tôi"
						/>

						<div className="hidden md:flex md:gap-x-4 md:items-end">
							<button
								onClick={() => productsSwiperRef.current?.swiper.slidePrev()}
								className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
							>
								<GoBack height={16} width={16} className="text-black dark:text-white-light" />
							</button>
							<button
								onClick={() => productsSwiperRef.current?.swiper.slideNext()}
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
					<div>
						<Swiper
							slidesPerView={2}
							grid={{
								rows: 2,
								fill: "row",
							}}
							breakpoints={{
								1024: {
									slidesPerView: 3,
									spaceBetween: 56,
								},
								1440: {
									slidesPerView: 4,
									spaceBetween: 48,
								},
							}}
							spaceBetween={48}
							modules={[Grid, Pagination]}
							className="hidden mySwiper md:block"
							ref={productsSwiperRef}
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
					</div>
					<div
						className="space-y-14 md:hidden md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 lg:gap-x-14 
				md:space-y-0 md:gap-y-16 xl:grid-cols-4 xl:gap-x-12 xl:gap-y-[72px]"
					>
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</div>
					<div className="flex justify-center mt-14">
						<Button type="primary">Xem tất cả</Button>
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
