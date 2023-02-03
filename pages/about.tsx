import React from "react";
import Image from "next/image";
import TitlePage from "../components/title-page/title-page";
import WhyUsCard from "../components/card/why-us-card";
import Trending from "../components/icons/trending";
import Quality from "../components/icons/quality";
import Profile from "../components/icons/profile";
import Button from "../components/buttons/button";

export default function About() {
	return (
		<section
			className="pt-14 md:pt-16 space-y-[104px] md:space-y-[112px] xl:space-y-[144px]
			mb-[104px] md:mb-[112px] xl:mb-[144px]"
		>
			{/* learn more */}
			<div>
				<TitlePage
					className="mb-14 md:mb-16 xl:mb-[72px]"
					subtitle="Tìm hiểu thêm"
					title="Tất cả về chúng tôi"
				/>

				<div
					className="relative w-full overflow-hidden aspect-square rounded-5xl 
                                md:h-[400px] md:rounded-[40px]
                                lg:h-[504px] lg:rounded-[56px]
                                xl:h-[600px] xl:rounded-[64px]"
				>
					<Image
						src={"/images/banner/cosmetic.jfif"}
						alt="banner"
						fill
						className="absolute object-cover w-full h-full"
					/>
				</div>
			</div>

			{/* how it has started */}
			<div className="space-y-14 md:space-y-16 xl:grid xl:grid-cols-2 xl:gap-x-[120px] xl:px-[96px]">
				<div className="space-y-14 md:space-y-16 xl:space-y-24">
					<TitlePage
						className="text-center md:px-[113px] lg:px-[230px] xl:px-0 xl:text-left"
						subtitle="Nó đã bắt đầu như thế nào"
						title="Tất cả đã bắt đầu như thế nào và khi nào"
					/>
					<div
						className="relative w-full overflow-hidden aspect-square rounded-5xl
                         md:h-[400px] md:rounded-[40px]
                         lg:h-[504px] lg:rounded-[56px]
						 xl:h-[560px]"
					>
						<Image
							src={"/images/banner/cosmetic1.png"}
							alt="banner"
							fill
							className="absolute object-cover w-full h-full"
						/>
					</div>
				</div>

				<div className="space-y-14 md:space-y-16">
					<div>
						<h4
							className="pl-8 font-semibold text-heading-4 lg:text-paragraph-1 text-primary-100 relative 
                                    before:content-[''] before:h-2 before:w-2 before:bg-primary-100 before:left-0
                                    before:absolute before:rounded-full before:top-1/2 before:-translate-y-[50%]"
						>
							Natural Ingredients Only
						</h4>
						<p className="pl-8 mt-4 lg:mt-8 text-paragraph-2 lg:text-paragraph-1 dark:text-white">
							10 years ago, when one of the co-founders came up with the idea of making skincare
							and beauty products using only natural ingredients, he did not even think twice.
						</p>
					</div>
					<div>
						<h4
							className="pl-8 font-semibold text-heading-4 lg:text-paragraph-1 text-primary-100 relative 
                                    before:content-[''] before:h-2 before:w-2 before:bg-primary-100 before:left-0
                                    before:absolute before:rounded-full before:top-1/2 before:-translate-y-[50%]"
						>
							Affordable Pricing Strategy
						</h4>
						<p className="pl-8 mt-4 lg:mt-8 text-paragraph-2 lg:text-paragraph-1 dark:text-white">
							One of our main goals from the start was to offer high quality products that would
							also have affordable prices. We just can’t believe that we have finally achieved
							this and now we are proud of it.
						</p>
					</div>
				</div>
			</div>

			{/* company value */}
			<div>
				<TitlePage
					className="text-center mb-14 md:mb-16 lg:px-[128px] xl:mb-[72px]"
					subtitle="Giá trị Công ty"
					title="Giá trị cốt lõi của chúng tôi"
				/>
				<div className="space-y-14 md:space-y-16 lg:px-[128px] xl:space-y-0 xl:grid xl:grid-cols-3 xl:gap-x-[120px] xl:px-12">
					<WhyUsCard
						icon={<Trending height={32} width={32} className="dark:text-white-light" />}
						title="Đổi mới vĩ đại"
						bodyText="Chúng tôi luôn tập trung vào việc làm cho tất cả các sản phẩm của mình sáng tạo nhất có thể."
					/>

					<WhyUsCard
						icon={<Quality height={32} width={32} className="dark:text-white-light" />}
						title="Chất lượng cao"
						bodyText="Tất cả các sản phẩm của chúng tôi đều được kiểm tra rất nghiêm ngặt trước khi gửi đi."
					/>

					<WhyUsCard
						icon={<Profile height={32} width={32} className="dark:text-white-light" />}
						title="Làm việc nhóm"
						bodyText="Chúng tôi tin rằng trở thành một công ty thành công là tất cả về việc trở thành một đội."
					/>
				</div>
			</div>

			{/* our newsletter */}
			<div className="hidden md:block lg:bg-gray-accent dark:lg:bg-black-dark-2 lg:rounded-[48px] lg:py-16 xl:py-24 xl:rounded-[56px]">
				<TitlePage
					className="text-center mb-14 md:mb-10 md:px-[100px] lg:mb-12"
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
	);
}
