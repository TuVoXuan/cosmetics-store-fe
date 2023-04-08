import React from "react";
import Image from "next/image";
import TitlePage from "../components/title-page/title-page";
import WhyUsCard from "../components/card/why-us-card";
import Trending from "../components/icons/trending";
import Quality from "../components/icons/quality";
import Profile from "../components/icons/profile";
import Button from "../components/buttons/button";
import Input from "../components/inputs/input";
import { useSettings } from "../store/hooks";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import APP_PATH from "../constants/app-path";

export default function About() {
	const { language } = useSettings();

	return (
		<section
			className="pt-14 md:pt-16 space-y-[104px] md:space-y-[112px] xl:space-y-[144px]
			mb-[104px] md:mb-[112px] xl:mb-[144px]"
		>
			{/* learn more */}
			<div>
				<Breadcrumb
					className="hidden lg:block"
					items={[
						{ title: language.header.home_tag, href: APP_PATH.HOME },
						{ title: language.about_page.about_us_title, href: APP_PATH.ABOUT },
					]}
				/>
				<TitlePage
					className="mb-14 md:mb-16 lg:mt-14 xl:mb-[72px]"
					subtitle={language.product_detail_page.recommend_subTitle}
					title={language.about_page.all_about_us_title}
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
						subtitle={language.about_page.how_it_has_started_subtitle}
						title={language.about_page.how_it_has_started_title}
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
							{language.about_page.natural_ingredients_title}
						</h4>
						<p className="pl-8 mt-4 lg:mt-8 text-paragraph-2 lg:text-paragraph-1 dark:text-white">
							{language.about_page.natural_ingredients_body}
						</p>
					</div>
					<div>
						<h4
							className="pl-8 font-semibold text-heading-4 lg:text-paragraph-1 text-primary-100 relative 
                                    before:content-[''] before:h-2 before:w-2 before:bg-primary-100 before:left-0
                                    before:absolute before:rounded-full before:top-1/2 before:-translate-y-[50%]"
						>
							{language.about_page.pricing_strategy_title}
						</h4>
						<p className="pl-8 mt-4 lg:mt-8 text-paragraph-2 lg:text-paragraph-1 dark:text-white">
							{language.about_page.pricing_strategy_body}
						</p>
					</div>
				</div>
			</div>

			{/* company value */}
			<div>
				<TitlePage
					className="text-center mb-14 md:mb-16 lg:px-[128px] xl:mb-[72px]"
					subtitle={language.about_page.company_value_subTitle}
					title={language.about_page.company_value_title}
				/>
				<div className="space-y-14 md:space-y-16 lg:px-[128px] xl:space-y-0 xl:grid xl:grid-cols-3 xl:gap-x-[120px] xl:px-12">
					<WhyUsCard
						icon={<Trending height={32} width={32} className="dark:text-white-light" />}
						title={language.about_page.great_innovation_title}
						bodyText={language.about_page.great_innovation_body}
					/>

					<WhyUsCard
						icon={<Quality height={32} width={32} className="dark:text-white-light" />}
						title={language.about_page.high_quality_title}
						bodyText={language.about_page.high_quality_body}
					/>

					<WhyUsCard
						icon={<Profile height={32} width={32} className="dark:text-white-light" />}
						title={language.about_page.teamwork_matters_title}
						bodyText={language.about_page.teamwork_matters_body}
					/>
				</div>
			</div>

			{/* our newsletter */}
			<div className="hidden md:block lg:bg-gray-accent dark:lg:bg-black-dark-2 lg:rounded-[48px] lg:py-16 xl:py-24 xl:rounded-[56px]">
				<TitlePage
					className="text-center mb-14 md:mb-10 md:px-[100px] lg:mb-12"
					subtitle={language.home_page.our_newletter_sub_title}
					title={language.home_page.our_newletter_sub_title}
				/>

				<div className="flex items-center justify-center w-full gap-x-6">
					<Input placeholder={language.home_page.input_email_placehodlder} />
					<Button type="primary" className="h-full">
						{language.home_page.our_newletter_signup_btn}
					</Button>
				</div>
			</div>
		</section>
	);
}
