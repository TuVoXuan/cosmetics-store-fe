import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import adminstrativeApi from "../api/adminstrative-api";
import { useAppDispatch, useAppSelector, useSettings } from "../store/hooks";
import Button from "../components/buttons/button";
import ItemCart from "../components/card/item-cart";
import Warning from "../components/icons/warning";
import TitlePage from "../components/title-page/title-page";
import APP_PATH from "../constants/app-path";
import { deleteAll, selectCart } from "../redux/slices/cart-slice";
import { selectUser } from "../redux/slices/user-slice";
import { toastError } from "../util/toast";
import { convertPrice } from "../util/product";
import Breadcrumb from "../components/breadcrumb/breadcrumb";

export default function ShoppingCart() {
	// State
	const [subTotal, setSubTotal] = useState<number>(0);
	const [shippingFee, setShippingFee] = useState<number>(0);

	// Redux
	const dispatch = useAppDispatch();
	const router = useRouter();
	const cart = useAppSelector(selectCart);
	const addresses = useAppSelector(selectUser).address;
	const defaultAddress = addresses.find((item) => item.default === true);

	// Context
	const { language } = useSettings();

	const handleTotal = () => {
		setSubTotal(cart.reduce((prev, curr) => prev + curr.quantity * curr.price, 0));
	};

	const handleDeleteAll = () => {
		dispatch(deleteAll());
	};

	const handleShippingFee = () => {
		console.log("defaultAddress: ", defaultAddress);
		if (defaultAddress) {
			console.log("chay khong");
			if (cart.length > 0) {
				const shopLat = parseFloat(process.env.SHOP_LAT || "");
				const shopLng = parseFloat(process.env.SHOP_LNG || "");
				const shopCoordinates: ICoordinates = {
					latitude: shopLat,
					longitude: shopLng,
				};
				try {
					const response = adminstrativeApi.getDirection(shopCoordinates, defaultAddress.coordinates);
					response
						.then((data) => data.data)
						.then((data) => {
							const feePerKm = parseInt(process.env.SHIPPING_FEE_PER_KM || "");

							setShippingFee(feePerKm * data.route.distance);
						});
				} catch (error) {
					toastError(language.shopping_cart_page.error_shipping_fee);
				}
			}
		} else {
			toast(language.shopping_cart_page.warning_default_address, {
				duration: 10000,
				icon: <Warning className="text-yellow-tertiary-100 shrink-0" />,
			});
		}
	};

	const handleCheckout = () => {
		router.push(APP_PATH.CHECKOUT);
	};

	useEffect(() => {
		handleTotal();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart]);

	useEffect(() => {
		handleShippingFee();
		handleTotal();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addresses]);

	return (
		<Fragment>
			<Head>
				<title>{language.shopping_cart_page.shopping_cart}</title>
			</Head>
			<Breadcrumb
				className="hidden lg:block lg:mt-14"
				items={[
					{ title: language.header.home_tag, href: APP_PATH.HOME },
					{ title: language.shopping_cart_page.shopping_cart, href: APP_PATH.CART },
				]}
			/>
			<section className="pt-14 md:pt-16 mb-[104px] md:mb-[112px] xl:mb-[144px]">
				<div className="justify-between mb-10 md:items-end md:flex md:mb-16">
					<TitlePage
						className="mb-6 md:mb-0"
						subtitle={language.shopping_cart_page.your_cart}
						title={language.shopping_cart_page.shopping_cart}
					/>
					{cart.length > 0 && (
						<Button onClick={handleDeleteAll} type="secondary">
							{language.category_page.clear_all}
						</Button>
					)}
				</div>

				<div className="md:w-4/5 md:mx-auto lg:w-full lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
					<div className="mb-10 space-y-10 md:mb-12 md:space-y-12 lg:space-y-8 lg:mb-0 lg:col-span-2">
						{cart.length > 0 ? (
							cart.map((item) => <ItemCart key={item.itemId} item={item} />)
						) : (
							<div className="flex flex-col items-center justify-center h-full gap-y-4 md:gap-y-0">
								<Image
									className="dark:hidden md:h-[180px] md:w-[153px] lg:h-[300px] lg:w-[255px]"
									src={"/icons/empty-cart-light.svg"}
									height={120}
									width={102}
									alt="empty-cart"
								/>
								<Image
									className="hidden dark:block md:h-[180px] md:w-[153px] lg:h-[300px] lg:w-[255px]"
									src={"/icons/empty-cart-dark.svg"}
									height={120}
									width={102}
									alt="empty-cart"
								/>
								<p className="md:text-paragraph-1 lg:text-paragraph-2 dark:text-white">
									{language.shopping_cart_page.empty_cart}
									<Link className="pl-2 font-semibold text-primary-100" href={"/"}>
										{language.shopping_cart_page.go_shop_now}
									</Link>
								</p>
							</div>
						)}
					</div>

					<div className="p-6 border-2 border-gray-accent rounded-4xl md:p-8 lg:p-6 lg:h-fit dark:border-black-dark-2">
						<h4 className="mb-8 font-semibold text-heading-5 lg:text-heading-4 md:mb-8 lg:mb-10 dark:text-white">
							{language.shopping_cart_page.cart_total}
						</h4>
						<div className="space-y-6 mb-8 md:mb-10 lg:mx-0 lg:block lg:mb-14">
							<div className="flex justify-between">
								<p className="text-heading-6 lg:text-heading-5 dark:text-white">
									{language.shopping_cart_page.merchandise_subTotal}:
								</p>
								<p className="text-heading-6 lg:text-heading-5 dark:text-white">{convertPrice(subTotal)}</p>
							</div>
							<div className="flex justify-between">
								<p className="text-heading-6 lg:text-heading-5 dark:text-white">
									{language.shopping_cart_page.shipping_fee}:
								</p>
								<p className="text-heading-6 lg:text-heading-5 dark:text-white">{convertPrice(shippingFee)}</p>
							</div>
							<div className="flex justify-between">
								<p className="font-semibold text-heading-6 lg:text-heading-5 dark:text-white">
									{language.shopping_cart_page.total_payment}:
								</p>
								<p className="font-semibold text-heading-6 lg:text-heading-5 dark:text-white">
									{convertPrice(subTotal + shippingFee)}
								</p>
							</div>
						</div>
						<Button className="w-full" type="primary" onClick={handleCheckout}>
							{language.shopping_cart_page.checkout}
						</Button>
					</div>
				</div>
			</section>
		</Fragment>
	);
}
