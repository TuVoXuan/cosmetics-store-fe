import Image from "next/image";
import React from "react";
import { useSettings } from "../app/hooks";
import ToggleBtn from "./buttons/toggle-btn";
import Facebook from "./icons/facebook";
import Instargram from "./icons/instargram";
import Moon from "./icons/moon";
import Sun from "./icons/sun";
import Twitter from "./icons/twitter";

export default function Footer() {
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
					© 2020 - All rights reserved
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
				<h4 className="dark:text-light-100 text-heading-4 md:text-heading-3">Categories</h4>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">On Sale</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Featured</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Masks</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Moisturizers</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Treatments</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Night Care</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Sun Care</p>
			</div>
			<div className="space-y-4">
				<h4 className="dark:text-light-100 text-heading-4 md:text-heading-3">Legal</h4>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Terms of Service</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Privacy Policy</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Return Policy</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Shipping</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Data Protection</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Night Care</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Sun Care</p>
			</div>
			<div className="space-y-4">
				<h4 className="dark:text-light-100 text-heading-4 md:text-heading-3">Company</h4>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">About</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Team</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Contact</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Careers</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Vision</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Culture</p>
				<p className="font-normal dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Sun Care</p>
			</div>
		</section>
	);
}
