import Image from "next/image";
import React from "react";
import ToggleBtn from "./buttons/toggle-btn";
import Facebook from "./icons/facebook";
import Instargram from "./icons/instargram";
import Twitter from "./icons/twitter";

export default function Footer() {
	return (
		<section className="dark:bg-dark-100 dark:text-white grid grid-cols-2 mb-10 bg-slate-100 gap-x-16 md:gap-x-28 gap-y-14 lg:flex lg:justify-between">
			<div>
				<Image
					className="md:hidden"
					src={"./images/logo/logo-secondary-lightBg.svg"}
					alt="logo-mobile"
					width={74}
					height={32}
				/>
				<Image
					className="hidden md:block"
					src={"./images/logo/logo-primary-colorfulBg-lowOpacity.svg"}
					alt="logo-mobile"
					width={115}
					height={32}
				/>
				<p className="mt-4 mb-6 font-normal text-paragraph-5 md:text-paragraph-4">© 2020 - All rights reserved</p>
				<div className="flex mb-12 gap-x-6 md:gap-4">
					<div className="md:w-12 md:h-12 md:rounded-full md:bg-white md:flex md:justify-center md:items-center">
						<Instargram width={24} height={24} color="#000" />
					</div>
					<div className="md:w-12 md:h-12 md:rounded-full md:bg-white md:flex md:justify-center md:items-center">
						<Twitter width={24} height={24} color="#000" />
					</div>
					<div className="md:w-12 md:h-12 md:rounded-full md:bg-white md:flex md:justify-center md:items-center">
						<Facebook width={24} height={24} color="#000" />
					</div>
				</div>
				<ToggleBtn />
			</div>
			<div className="space-y-4">
				<h4 className="text-heading-4 md:text-heading-3">Categories</h4>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">On Sale</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Featured</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Masks</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Moisturizers</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Treatments</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Night Care</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Sun Care</p>
			</div>
			<div className="space-y-4">
				<h4 className="text-heading-4 md:text-heading-3">Legal</h4>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Terms of Service</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Privacy Policy</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Return Policy</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Shipping</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Data Protection</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Night Care</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Sun Care</p>
			</div>
			<div className="space-y-4">
				<h4 className="text-heading-4 md:text-heading-3">Company</h4>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">About</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Team</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Contact</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Careers</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Vision</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Culture</p>
				<p className="font-normal text-paragraph-5 md:text-paragraph-4">Sun Care</p>
			</div>
		</section>
	);
}
