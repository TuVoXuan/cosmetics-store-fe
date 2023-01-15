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
		<header className="relative flex items-center justify-between dark:bg-dark-100">
			<div className="hidden h-12 lg:block">
				<Image
					className="w-auto h-full aspect-auto"
					src={"./images/logo/logo-primary-lightBg.svg"}
					height={100}
					width={100}
					alt="logo"
				/>
			</div>
			<div className=" p-3 rounded-full cursor-pointer bg-gray-accent w-fit lg:absolute lg:left-[50%] lg:-translate-x-[50%] hover:bg-primary-100 group dark:bg-dark-40">
				<Menu className="group-hover:text-light-100 dark:text-light-100" height={24} width={24} />
			</div>

			<div ref={logoRef} className="absolute h-12 left-[50%] -translate-x-[50%] lg:hidden">
				<Image
					className="w-auto h-full aspect-auto sm:hidden dark:hidden"
					src={"./images/logo/logo-secondary-lightBg.svg"}
					height={100}
					width={100}
					alt="logo"
				/>
				<Image
					className="hidden w-auto h-full aspect-auto sm:hidden dark:block"
					src={"./images/logo/logo-secondary-darkBg.svg"}
					height={100}
					width={100}
					alt="logo"
				/>
				<Image
					className="hidden w-auto h-full aspect-auto sm:block"
					src={"./images/logo/logo-primary-lightBg.svg"}
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
						className="hidden cursor-pointer sm:block"
						height={24}
						width={24}
						color="#000"
						onClick={handleClickSearchIcon}
					/>
				)}

				<CartIndicator
					className="cursor-pointer sm:mr-6 sm:ml-8"
					height={28}
					width={32}
					color="#000"
				/>
				<Profile className="hidden cursor-pointer sm:block" height={24} width={24} color="#000" />
			</div>
		</header>
	);
}
