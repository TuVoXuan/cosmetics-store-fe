import { setCookie } from "cookies-next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import APP_PATH from "../constants/app-path";
import Button from "./buttons/button";
import CartIndicator from "./icons/cart-indicator";
import Delete from "./icons/delete";
import Facebook from "./icons/facebook";
import GoBack24 from "./icons/go-back-24";
import GoForward from "./icons/go-forward";
import Instargram from "./icons/instargram";
import Menu from "./icons/menu";
import Profile from "./icons/profile";
import Search from "./icons/search";
import Twitter from "./icons/twitter";
import SearchInput from "./inputs/search-input";
import MyAccount from "./modal/my-account";
import LanguageDropdown from "./inputs/language-dropdown";
import { useAppSelector, useSettings } from "../store/hooks";
import { selectCategories } from "../redux/slices/category-slice";

interface Props {
	onShowNavbar: () => void;
}

export default function Header({ onShowNavbar }: Props) {
	const logoRef = useRef<HTMLDivElement>(null);
	const navbarRef = useRef<HTMLElement>(null);
	const navbarListRef = useRef<HTMLUListElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	const categoriesRef = useRef<HTMLDivElement>(null);
	const categoriesTagRef = useRef<HTMLParagraphElement>(null);
	const myAccountTagRef = useRef<HTMLParagraphElement>(null);
	const myAccountRef = useRef<HTMLDivElement>(null);

	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	const [search, setSearch] = useState<boolean>(false);
	const [showMyAccountModal, setShowMyAccountModal] = useState<boolean>(false);

	const router = useRouter();
	const { data: session, status } = useSession();
	const categories = useAppSelector(selectCategories).categories;
	const { language } = useSettings();

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

	const handleShowMyAccountModal = () => {
		setShowMyAccountModal(!showMyAccountModal);
	};

	const handleClickNavBarBtn = () => {
		if (navbarRef.current) {
			if (navbarRef.current.classList.contains("hidden")) {
				navbarRef.current.classList.remove("hidden");
				setShowNavbar(true);
			} else {
				navbarRef.current.classList.add("hidden");
				setShowNavbar(false);
			}

			if (headerRef.current) {
				if (!headerRef.current.classList.contains("z-[3]")) {
					headerRef.current.classList.add("z-[3]");
				}
			}
			onShowNavbar();
		}
		if (categoriesRef.current) {
			if (!categoriesRef.current.classList.contains("hidden")) {
				categoriesRef.current.classList.add("hidden");
			}
		}

		if (window.innerWidth >= 768) {
			if (navbarListRef.current) {
				if (navbarListRef.current.classList.contains("-translate-x-[110px]")) {
					navbarListRef.current.classList.remove("-translate-x-[110px]");
				}

				if (navbarListRef.current.classList.contains("h-[552px]")) {
					navbarListRef.current.classList.remove("h-[552px]");
				}
			}

			if (categoriesTagRef.current) {
				if (categoriesTagRef.current.classList.contains("text-primary-100")) {
					categoriesTagRef.current.classList.remove("text-primary-100", "dark:text-primary-100");
				}
			}
		}
	};

	const handleShowCategories = (e: any) => {
		e.stopPropagation();

		if (categoriesRef.current) {
			if (categoriesRef.current.classList.contains("hidden")) {
				categoriesRef.current.classList.remove("hidden");
			} else {
				categoriesRef.current.classList.add("hidden");
			}
		}
		if (window.innerWidth < 768) {
			if (headerRef.current) {
				headerRef.current.classList.remove("z-[3]");
			}
		} else {
			if (categoriesRef.current) {
				categoriesRef.current.classList.remove(
					"fixed",
					"z-[2]",
					"top-0",
					"bottom-0",
					"left-0",
					"right-0"
				);
			}
			if (navbarListRef.current) {
				if (navbarListRef.current.classList.contains("-translate-x-[110px]")) {
					navbarListRef.current.classList.remove("-translate-x-[110px]");
				} else {
					navbarListRef.current.classList.add("-translate-x-[110px]");
				}

				if (window.innerHeight > 980) {
					if (!navbarListRef.current.classList.contains("h-[552px]")) {
						navbarListRef.current.classList.add("h-[552px]");
					} else {
						navbarListRef.current.classList.remove("h-[552px]");
					}
				}
			}

			if (categoriesTagRef.current) {
				if (!categoriesTagRef.current.classList.contains("text-primary-100")) {
					categoriesTagRef.current.classList.add("text-primary-100", "dark:text-primary-100");
				} else {
					categoriesTagRef.current.classList.remove("text-primary-100", "dark:text-primary-100");
				}
			}
		}
	};

	const handleBackFromCategories = (e: any) => {
		e.stopPropagation();
		if (categoriesRef.current) {
			categoriesRef.current.classList.add("hidden");
		}
		if (window.innerWidth < 768) {
			if (headerRef.current) {
				headerRef.current.classList.add("z-[3]");
			}
		}
	};

	const handleShowMyAccount = (e: any) => {
		e.stopPropagation();

		if (myAccountRef.current) {
			myAccountRef.current.classList.toggle("hidden");
		}

		if (headerRef.current) {
			headerRef.current.classList.remove("z-[3]");
		}

		if (myAccountTagRef.current) {
			if (!myAccountTagRef.current.classList.contains("text-primary-100")) {
				myAccountTagRef.current.classList.add("text-primary-100", "dark:text-primary-100");
			} else {
				myAccountTagRef.current.classList.remove("text-primary-100", "dark:text-primary-100");
			}
		}
	};

	const handleBackFromMyAccount = (e: any) => {
		e.stopPropagation();
		if (myAccountRef.current) {
			myAccountRef.current.classList.add("hidden");
		}
		if (window.innerWidth < 768) {
			if (headerRef.current) {
				headerRef.current.classList.add("z-[3]");
			}
		}
	};

	const handleRedirectToLoginPage = () => {
		console.log("lsdkjfoij");
		handleClickNavBarBtn();
		router.push({
			pathname: APP_PATH.SIGN_IN,
			query: { redirectURL: router.asPath },
		});
	};

	const handleMyAccount = (to: string) => {
		handleClickNavBarBtn();
		router.push(to);
	};

	return (
		<header className="relative bg-white-light dark:bg-black-dark-3">
			<section ref={headerRef} className="relative z-[3] flex items-center justify-between">
				<div className="hidden h-12 lg:block">
					{/* light logo */}
					<Image
						onClick={() => router.push(APP_PATH.HOME)}
						className="w-auto h-full cursor-pointer aspect-auto dark:hidden"
						src={"/images/logo/light/logo-primary-lightBg.svg"}
						height={100}
						width={100}
						alt="logo"
					/>

					{/* dark logo */}
					<Image
						onClick={() => router.push(APP_PATH.HOME)}
						className="hidden w-auto h-full cursor-pointer aspect-auto dark:lg:block"
						src={"/images/logo/dark/logo-primary-darkBg.svg"}
						height={100}
						width={100}
						alt="logo"
					/>
				</div>
				<div
					onClick={handleClickNavBarBtn}
					className=" p-3 rounded-full cursor-pointer bg-gray-accent w-fit lg:absolute lg:left-[50%] lg:-translate-x-[50%] hover:bg-primary-100 group dark:bg-black-dark-2 transition-colors duration-300 ease-linear"
				>
					{showNavbar ? (
						<Delete
							className="group-hover:text-light-100 dark:text-light-100"
							height={24}
							width={24}
						/>
					) : (
						<Menu
							className="group-hover:text-light-100 dark:text-light-100"
							height={24}
							width={24}
						/>
					)}
				</div>

				<div ref={logoRef} className="absolute h-12 left-[50%] -translate-x-[50%] lg:hidden">
					{/* light logo */}
					<Image
						onClick={() => router.push(APP_PATH.HOME)}
						className="w-auto h-full cursor-pointer aspect-auto md:hidden dark:hidden"
						src={"/images/logo/light/logo-secondary-lightBg.svg"}
						height={100}
						width={100}
						alt="logo"
					/>

					<Image
						onClick={() => router.push(APP_PATH.HOME)}
						className="hidden w-auto h-full cursor-pointer aspect-auto md:block dark:hidden"
						src={"/images/logo/light/logo-primary-lightBg.svg"}
						height={100}
						width={100}
						alt="logo"
					/>

					{/* dark light */}
					<Image
						onClick={() => router.push(APP_PATH.HOME)}
						className="hidden w-auto h-full cursor-pointer aspect-auto md:hidden dark:block md:dark:hidden"
						src={"/images/logo/dark/logo-secondary-darkBg.svg"}
						height={100}
						width={100}
						alt="logo"
					/>
					<Image
						onClick={() => router.push(APP_PATH.HOME)}
						className="hidden w-auto h-full cursor-pointer aspect-auto dark:md:block"
						src={"/images/logo/dark/logo-primary-darkBg.svg"}
						height={100}
						width={100}
						alt="logo"
					/>
				</div>

				<div className="flex items-center">
					<LanguageDropdown className="hidden lg:block lg:mr-8" />
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
						onClick={() => router.push(APP_PATH.CART)}
						className="cursor-pointer shrink-0 md:mr-6 md:ml-8 dark:text-light-100"
						height={28}
						width={32}
						color="#000"
					/>
					<div className="relative">
						<Profile
							onClick={handleShowMyAccountModal}
							className="hidden cursor-pointer shrink-0 md:block dark:text-light-100"
							height={24}
							width={24}
							color="#000"
						/>
						{showMyAccountModal && <MyAccount onClose={handleShowMyAccountModal} />}
					</div>
				</div>
			</section>

			{/* navbar */}
			<section
				ref={navbarRef}
				className="fixed pt-[110px] top-0 bottom-0 left-0 right-0 z-[2] hidden px-8 bg-white-light dark:bg-black-dark-3 md:px-10 lg:px-12 xl:px-24"
			>
				<SearchInput className="mb-6 md:hidden" />

				<ul
					ref={navbarListRef}
					className="flex flex-col items-center mx-auto text-center transition-transform select-none lg:overflow-y-auto gap-y-6 dark:text-white-light"
				>
					<li className="text-paragraph-1 text-primary-100">{language.header.home_tag}</li>
					<div onClick={handleShowCategories} className="md:relative dark:text-white-light">
						<div
							ref={categoriesTagRef}
							className="flex items-center duration-300 ease-linear cursor-pointer text-paragraph-1 gap-x-4 hover:text-primary-100"
						>
							{language.header.categories_tag}
							<GoForward height={16} width={16} />
						</div>
						<div
							ref={categoriesRef}
							className="fixed z-[2] bg-white-light top-0 bottom-0 left-0 right-0 p-8 hidden transition-all ease-linear duration-300 md:absolute md:top-0 md:left-[calc(100%+70px)] md:p-0 dark:bg-black-dark-3"
						>
							<nav className="flex justify-between md:hidden">
								<button
									onClick={handleBackFromCategories}
									className="p-3 transition-colors duration-300 ease-linear rounded-full cursor-pointer bg-gray-accent w-fit hover:bg-primary-100 group dark:bg-black-dark-2"
								>
									<GoBack24 className="dark:text-light-100" height={24} width={24} />
								</button>
								<button
									onClick={handleClickNavBarBtn}
									className="p-3 transition-colors duration-300 ease-linear rounded-full cursor-pointer bg-gray-accent w-fit hover:bg-primary-100 group dark:bg-black-dark-2"
								>
									<Delete className="dark:text-light-100" height={24} width={24} />
								</button>
							</nav>
							<ul className="space-y-6 text-center select-none text-paragraph-1">
								{categories.map((cate) => (
									<li
										onClick={() => {
											handleClickNavBarBtn();
											router.push(`${APP_PATH.CATEGORY}/${cate._id}`);
										}}
										className="duration-300 ease-linear cursor-pointer whitespace-nowrap hover:text-primary-100"
									>
										{cate.name.filter((item) => item.language == router.locale)[0].value}
									</li>
								))}
							</ul>
						</div>
					</div>
					{status === "authenticated" && (
						<div onClick={handleShowMyAccount} className="md:hidden dark:text-white-light">
							<div
								ref={myAccountTagRef}
								className="flex items-center duration-300 ease-linear cursor-pointer text-paragraph-1 gap-x-4 hover:text-primary-100"
							>
								{language.header.my_account_tag}
								<GoForward height={16} width={16} />
							</div>
							<div
								ref={myAccountRef}
								className="hidden fixed z-[2] bg-white-light dark:bg-black-dark-3 top-0 bottom-0 left-0 right-0 p-8 transition-all ease-linear duration-30"
							>
								<nav className="flex justify-between">
									<button
										onClick={handleBackFromMyAccount}
										className="p-3 transition-colors duration-300 ease-linear rounded-full cursor-pointer bg-gray-accent w-fit hover:bg-primary-100 group dark:bg-black-dark-2"
									>
										<GoBack24 className="dark:text-light-100" height={24} width={24} />
									</button>
									<button
										onClick={handleClickNavBarBtn}
										className="p-3 transition-colors duration-300 ease-linear rounded-full cursor-pointer bg-gray-accent w-fit hover:bg-primary-100 group dark:bg-black-dark-2"
									>
										<Delete className="dark:text-light-100" height={24} width={24} />
									</button>
								</nav>
								<ul className="space-y-6 text-center select-none text-paragraph-1">
									<li
										onClick={() => handleMyAccount(APP_PATH.ADDRESS)}
										className="duration-300 ease-linear cursor-pointer hover:text-primary-100"
									>
										{language.header.my_account_address}
									</li>
									<li
										onClick={() => handleMyAccount(APP_PATH.INFO)}
										className="duration-300 ease-linear cursor-pointer hover:text-primary-100"
									>
										{language.header.my_account_info}
									</li>
									<li
										onClick={() =>
											handleMyAccount(`${APP_PATH.ORDER_HISTORY}?status=pending`)
										}
										className="duration-300 ease-linear cursor-pointer hover:text-primary-100"
									>
										{language.header.my_account_order}
									</li>
								</ul>
							</div>
						</div>
					)}

					<li className="duration-300 ease-linear cursor-pointer text-paragraph-1 hover:text-primary-100">
						{language.header.about_tag}
					</li>
					<li className="duration-300 ease-linear cursor-pointer text-paragraph-1 hover:text-primary-100">
						{language.header.contact_tag}
					</li>
				</ul>

				{session?.user ? (
					<Button
						onClick={() => {
							// deleteCookie("Authorization", { path: "/", domain: "localhost" });
							setCookie("Authorization", "");
							signOut({ callbackUrl: APP_PATH.HOME });
						}}
						type="primary"
						className="w-full mt-6 mb-[68px] md:hidden"
					>
						{language.header.signout_btn}
					</Button>
				) : (
					<Button
						onClick={handleRedirectToLoginPage}
						type="primary"
						className="w-full mt-6 mb-[68px] md:hidden"
					>
						{language.header.signin_btn}
					</Button>
				)}

				<div className="fixed z-[2] flex gap-x-6 left-8 bottom-8 md:left-10 lg:left-12 lg:bottom-12 xl:left-24">
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
			</section>
		</header>
	);
}
