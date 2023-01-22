import Image from "next/image";
import React, { useRef, useState } from "react";
import CartIndicator from "./icons/cart-indicator";
import HeartIcon from "./icons/heart";
import Menu from "./icons/menu";
import Profile from "./icons/profile";
import Search from "./icons/search";
import SearchInput from "./inputs/search-input";

export default function Header() {
	const logoRef = useRef<HTMLDivElement>(null);
	const [search, setSearch] = useState<boolean>(false);

	const handleClickSearchIcon = () => {
		setSearch(true);
		if (logoRef.current) {
			logoRef.current.classList.add("hidden");
		}
	};

	const handleCloseSearchInput = () => {
		setSearch(false);
		if (logoRef.current) {
			logoRef.current.classList.remove("hidden");
		}
	};

	return (
		<header className="relative flex items-center justify-between dark:bg-black-dark-3">
			<div className="hidden h-12 lg:block">
				{/* light logo */}
				<Image
					className="w-auto h-full aspect-auto dark:hidden"
					src={"/images/logo/light/logo-primary-lightBg.svg"}
					height={100}
					width={100}
					alt="logo"
				/>

				{/* dark logo */}
				<Image
					className="hidden w-auto h-full aspect-auto dark:lg:block"
					src={"/images/logo/dark/logo-primary-darkBg.svg"}
					height={100}
					width={100}
					alt="logo"
				/>
			</div>
			<div className=" p-3 rounded-full cursor-pointer bg-gray-accent w-fit lg:absolute lg:left-[50%] lg:-translate-x-[50%] hover:bg-primary-100 group dark:bg-black-dark-2">
				<Menu className="group-hover:text-light-100 dark:text-light-100" height={24} width={24} />
			</div>

			<div ref={logoRef} className="absolute h-12 left-[50%] -translate-x-[50%] lg:hidden">
				{/* light logo */}
				<Image
					className="w-auto h-full aspect-auto md:hidden dark:hidden"
					src={"/images/logo/light/logo-secondary-lightBg.svg"}
					height={100}
					width={100}
					alt="logo"
				/>

				<Image
					className="hidden w-auto h-full aspect-auto md:block dark:hidden"
					src={"/images/logo/light/logo-primary-lightBg.svg"}
					height={100}
					width={100}
					alt="logo"
				/>

				{/* dark light */}
				<Image
					className="hidden w-auto h-full aspect-auto md:hidden dark:block md:dark:hidden"
					src={"/images/logo/dark/logo-secondary-darkBg.svg"}
					height={100}
					width={100}
					alt="logo"
				/>
				<Image
					className="hidden w-auto h-full aspect-auto dark:md:block"
					src={"/images/logo/dark/logo-primary-darkBg.svg"}
					height={100}
					width={100}
					alt="logo"
				/>
			</div>

			<div className="flex items-center">
				{search ? (
					<SearchInput onClose={handleCloseSearchInput} />
				) : (
					<Search
						className="hidden cursor-pointer md:block dark:text-light-100"
						height={24}
						width={24}
						color="#000"
						onClick={handleClickSearchIcon}
					/>
				)}

				<CartIndicator
					className="cursor-pointer md:mr-6 md:ml-8 dark:text-light-100"
					height={28}
					width={32}
					color="#000"
				/>
				<Profile className="hidden cursor-pointer md:block dark:text-light-100" height={24} width={24} color="#000" />
			</div>
		</header>
	);
}
