import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import adminstrativeApi from "../api/adminstrative-api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Button from "../components/buttons/button";
import ItemCart from "../components/card/item-cart";
import Warning from "../components/icons/warning";
import TitlePage from "../components/title-page/title-page";
import { deleteAll, selectCart } from "../redux/slices/cart-slice";
import { selectUser } from "../redux/slices/user-slice";
import { toastError } from "../util/toast";

export default function ShoppingCart() {
	// State
	const [subTotal, setSubTotal] = useState<number>(0);
	const [shippingFee, setShippingFee] = useState<number>(0);

	// Redux
	const dispatch = useAppDispatch();
	const cart = useAppSelector(selectCart);
	const addresses = useAppSelector(selectUser).address;
	const defaultAddress = addresses.find((item) => item.default === true);

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
					const response = adminstrativeApi.getDirection(
						shopCoordinates,
						defaultAddress.coordinates
					);
					response
						.then((data) => data.data)
						.then((data) => {
							const feePerKm = parseInt(process.env.SHIPPING_FEE_PER_KM || "");

							setShippingFee(feePerKm * data.route.distance);
						});
				} catch (error) {
					toastError("Xãy ra lỗi trong khi tính phí ship. Vui lòng thử lại sau.");
				}
			}
		} else {
			toast(
				"Hiện tại bạn chưa có địa chỉ mặc định. Vui lòng vào trang cá nhân để thêm địa chỉ mặc định.",
				{ duration: 10000, icon: <Warning className="text-yellow-tertiary-100 shrink-0" /> }
			);
		}
	};

	useEffect(() => {
		handleTotal();
	}, [cart]);

	useEffect(() => {
		handleShippingFee();
		handleTotal();
	}, [addresses]);

	return (
		<Fragment>
			<Head>
				<title>Shopping cart</title>
			</Head>
			<section className="pt-14 md:pt-16 mb-[104px] md:mb-[112px] xl:mb-[144px]">
				<div className="justify-between mb-14 md:items-end md:flex md:mb-16">
					<TitlePage className="mb-6 md:mb-0" subtitle="Giỏ hàng của bạn" title="Giỏ hàng" />
					{cart.length > 0 && (
						<Button onClick={handleDeleteAll} type="secondary">
							Xóa tất cả
						</Button>
					)}
				</div>

				<div className="lg:justify-between lg:flex">
					<div className="mb-10 space-y-10 md:mb-12 md:space-y-12 lg:space-y-10 lg:mb-0 lg:w-[65%]">
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
									Cart is empty
									<Link className="pl-2 font-semibold text-primary-100" href={"/"}>
										go to shop now!
									</Link>
								</p>
							</div>
						)}
					</div>

					<div className="p-6 border-2 border-gray-accent rounded-4xl md:p-14 lg:p-8 lg:h-fit dark:border-black-dark-2">
						<h4 className="mb-10 font-semibold text-heading-4 md:text-heading-2 md:mb-12 lg:mb-10 dark:text-white">
							Tổng số giỏ hàng
						</h4>
						<div className="space-y-10 mb-14 md:space-y-12 md:mb-20 lg:block lg:space-y-10 lg:mb-14">
							<div className="flex justify-between">
								<p className="text-heading-5 md:text-paragraph-1 lg:text-paragraph-2 dark:text-white">
									Tổng phụ:
								</p>
								<p className="text-heading-5 md:text-paragraph-1 lg:text-paragraph-2 dark:text-white">
									{subTotal.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
								</p>
							</div>
							<div className="flex justify-between">
								<p className="text-heading-5 md:text-paragraph-1 lg:text-paragraph-2 dark:text-white">
									Phí giao hàng:
								</p>
								<p className="text-heading-5 md:text-paragraph-1 lg:text-paragraph-2 dark:text-white">
									{shippingFee.toLocaleString("it-IT", {
										style: "currency",
										currency: "VND",
									})}
								</p>
							</div>
							<div className="flex justify-between">
								<p className="font-semibold text-heading-5 md:text-paragraph-1 lg:text-paragraph-2 dark:text-white">
									Tổng:
								</p>
								<p className="font-semibold text-heading-5 md:text-paragraph-1 lg:text-paragraph-2 dark:text-white">
									{(subTotal + shippingFee).toLocaleString("it-IT", {
										style: "currency",
										currency: "VND",
									})}
								</p>
							</div>
						</div>
						<Button className="w-full" type="primary">
							Thanh toán
						</Button>
					</div>
				</div>
			</section>
		</Fragment>
	);
}
