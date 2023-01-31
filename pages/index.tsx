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
import "swiper/css/pagination";
import { Pagination } from "swiper";
import GoBack from "../components/icons/go-back";
import GoForward from "../components/icons/go-forward";
import { useRef } from "react";
import Return from "../components/icons/return";
import WhyUsCard from "../components/card/why-us-card";
import Profile from "../components/icons/profile";
import Quality from "../components/icons/quality";
import Image from "next/image";
import CommentCard from "../components/card/comment-card";

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

export default function Home() {
	const { data: session } = useSession();
	console.log("session: ", session);
	const { push } = useRouter();
	const user = useAppSelector(selectUser);
	const categoriesSwiperRef = useRef<SwiperRef>(null);
	const reviewsSwiperRef = useRef<SwiperRef>(null);

	const handleSignIn = () => push(`/auth/sign-in`);

	return (
		<section>
			{/* <div>
				<TitlePage
					className="pb-6 pt-14"
					subtitle="Sản phẩm chăm sóc da"
					title="Chúng tôi cung cấp những sản phẩm tốt nhất cho làn da của bạn"
				/>
				<Button type="primary">Mua ngay dddd</Button>
			</div> */}

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
							<GoForward height={16} width={16} className="text-black dark:text-white-light" />
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

			{/* why us */}
			<div className="mb-[104px] md:mb-[112px] xl:mb-[144px]">
				<TitlePage
					className="text-center mb-14 pt-14 md:mb-16 xl:mb-[72px]"
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
							<GoForward height={16} width={16} className="text-black dark:text-white-light" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
