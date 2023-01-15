import Image from "next/image";
import React from "react";
import Cart from "./icons/cart";
import CartIndicator from "./icons/cart-indicator";
import Menu from "./icons/menu";
import Search from "./icons/search";

export default function Header() {
	return (
		<header className="flex items-center justify-between">
			<div className="p-3 rounded-full cursor-pointer bg-gray-accent w-fit">
				<Menu height={24} width={24} color="#000" />
			</div>

			<Image
				className="sm:hidden"
				src={"./images/logo/logo-secondary-lightBg.svg"}
				height={100}
				width={100}
				alt="logo"
			/>
			<Image
				className="hidden sm:block lg:hidden"
				src={"./images/logo/logo-primary-lightBg.svg"}
				height={100}
				width={100}
				alt="logo"
			/>

			<div className="flex items-center">
				<Search height={24} width={24} color="#000" />
				<CartIndicator height={28} width={32} color="#000" />
			</div>
		</header>
	);
}
