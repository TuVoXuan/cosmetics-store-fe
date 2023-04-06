import Image from "next/image";
import React from "react";
import { useAppSelector, useSettings } from "../store/hooks";
import ToggleBtn from "./buttons/toggle-btn";
import Facebook from "./icons/facebook";
import Instargram from "./icons/instargram";
import Moon from "./icons/moon";
import Sun from "./icons/sun";
import Twitter from "./icons/twitter";
import { useRouter } from "next/router";
import { English, Vietnamese } from "../translation";
import { selectCategories } from "../redux/slices/category-slice";
import APP_PATH from "../constants/app-path";

export default function Footer() {
	// Redux
	const categories = useAppSelector(selectCategories).categories;

	// Router
	const router = useRouter();
	const { locale } = router;
	const language = locale === "en" ? English : Vietnamese;

	const { settings, saveSettings } = useSettings();
	const Toggle = () => {
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.documentElement.classList.add("dark");
			localStorage.theme = "light";
			saveSettings({
				...settings,
				mode: "dark",
			});
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.theme = "dark";
			saveSettings({
				...settings,
				mode: "light",
			});
		}
	};

	return (
		<section className="grid grid-cols-2 mb-10 dark:bg-black-dark-3 bg-white-light gap-x-16 md:gap-x-28 gap-y-14 lg:flex lg:justify-between">
			<div>
				{/* Light icons */}
				<Image
					className="md:hidden dark:hidden"
					src={"/images/logo/light/logo-secondary-lightBg.svg"}
					alt="logo-mobile"
					width={74}
					height={32}
				/>
				<Image
					className="hidden md:block dark:hidden"
					src={"/images/logo/light/logo-primary-lightBg.svg"}
					alt="logo-mobile"
					width={115}
					height={32}
				/>

				{/* Dark icons */}
				<Image
					className="hidden md:dark:hidden dark:block"
					src={"/images/logo/dark/logo-secondary-darkBg.svg"}
					alt="logo-mobile"
					width={74}
					height={32}
				/>
				<Image
					className="hidden dark:md:block"
					src={"/images/logo/dark/logo-primary-darkBg.svg"}
					alt="logo-mobile"
					width={115}
					height={32}
				/>
				<p className="mt-4 mb-6 font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">
					{language.footer.all_right_reserve}
				</p>
				<div className="flex mb-12 gap-x-6 md:gap-4">
					<div className="md:w-12 md:h-12 md:rounded-full md:bg-gray-accent md:dark:bg-black-dark-2 md:flex md:justify-center md:items-center">
						<Instargram width={24} height={24} className="text-black dark:text-light-100" />
					</div>
					<div className="md:w-12 md:h-12 md:rounded-full md:bg-gray-accent md:dark:bg-black-dark-2 md:flex md:justify-center md:items-center">
						<Twitter width={24} height={24} className="text-black dark:text-light-100" />
					</div>
					<div className="md:w-12 md:h-12 md:rounded-full md:bg-gray-accent md:dark:bg-black-dark-2 md:flex md:justify-center md:items-center">
						<Facebook width={24} height={24} className="text-black dark:text-light-100" />
					</div>
				</div>
				<ToggleBtn
					value={settings.mode === "dark"}
					toggle={Toggle}
					childrenOn={<Moon width={16} height={16} color="#F7FAFC" />}
					childrenOff={<Sun width={16} height={16} color="#F7FAFC" />}
				/>
			</div>
			<div className="space-y-4">
				<h4 className="dark:text-light-100 text-heading-5 md:text-heading-4">
					{language.footer.category_list_title}
				</h4>
				{categories.map((cate) => (
					<p
						onClick={() => {
							router.push(`${APP_PATH.CATEGORY}/${cate._id}`);
						}}
						key={cate._id}
						className="font-normal capitalize cursor-pointer dark:text-light-100 text-paragraph-5 md:text-paragraph-4"
					>
						{cate.name.filter((item) => item.language == locale)[0].value}
					</p>
				))}
			</div>
			<div className="space-y-4">
				<h4 className="dark:text-light-100 text-heading-5 md:text-heading-4">
					{language.footer.customer_support_list_title}
				</h4>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">
					{language.footer.customer_support_term_serive}
				</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">
					{language.footer.customer_support_privacy_policy}
				</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">
					{language.footer.customer_support_return_policy}
				</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">
					{language.footer.customer_support_data_protection}
				</p>
			</div>
			<div className="space-y-4">
				<h4 className="dark:text-light-100 text-heading-5 md:text-heading-4">
					{language.footer.about_hygge}
				</h4>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">
					{language.footer.about_hygge_introduction}
				</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">
					{language.footer.about_hygge_team}
				</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">
					{language.footer.about_hygge_contact}
				</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">
					{language.footer.about_hygge_careers}
				</p>
			</div>
		</section>
	);
}
