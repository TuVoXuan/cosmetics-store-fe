import Image from "next/image";
import React from "react";
import Badge from "./badge/badge";
import Breadcrumb from "./breadcrumb/breadcrumb";
import Cart from "./icons/cart";
import CartIndicator from "./icons/cart-indicator";
import Close from "./icons/close";
import Delete from "./icons/delete";
import Expand from "./icons/expand";
import EyeCare from "./icons/eye-care";
import Facebook from "./icons/facebook";
import Favorite from "./icons/favorite";
import GoForward from "./icons/go-forward";
import Instargram from "./icons/instargram";
import Menu from "./icons/menu";
import Moon from "./icons/moon";
import Natural from "./icons/natural";
import Profile from "./icons/profile";
import Protection from "./icons/protection";
import Quality from "./icons/quality";
import Return from "./icons/return";
import Search from "./icons/search";
import Selected from "./icons/selected";
import ShoppingBag from "./icons/shopping-bag";
import Skincare from "./icons/skincare";
import Sun from "./icons/sun";
import Trending from "./icons/trending";
import Twitter from "./icons/twitter";
import Zoom from "./icons/zoom";
import Input from "./inputs/input";

export default function Footer() {
	return (
		<section className="grid grid-cols-2 gap-x-16">
			<div>
				<Image src={"./images/logo/logo-secondary-lightBg.svg"} alt="logo-mobile" width={74} height={32} />
				<p className="font-normal text-paragraph-5">© 2020 - All rights reserved</p>
				<div className="flex gap-x-6">
					<Instargram width={24} height={24} color="#000" />
					<Twitter width={24} height={24} color="#000" />
					<Facebook width={24} height={24} color="#000" />
				</div>
			</div>
		</section>
	);
}
