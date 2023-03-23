import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/buttons/button";
import ItemCartCheckout from "../../components/card/item-cart-checkout";
import TitlePage from "../../components/title-page/title-page";
import Pin from "../../components/icons/pin";
import Badge from "../../components/badge/badge";
import AddressDictionary, { AddressDictRefType } from "../../components/modal/address-dictionary";
import Overlay from "../../components/modal/overlay";
import Radio from "../../components/inputs/radio";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteAll, selectCart } from "../../redux/slices/cart-slice";
import { convertPrice } from "../../util/product";
import { selectUser } from "../../redux/slices/user-slice";
import { ICreateOrder, ICreateOrderItem } from "../../types/apis/order-api";
import { PaymentMethod } from "../../constants/enums";
import adminstrativeApi from "../../api/adminstrative-api";
import toast from "react-hot-toast";
import Warning from "../../components/icons/warning";
import { toastError, toastSuccess } from "../../util/toast";
import { orderApi } from "../../api/order-api";
import { useRouter } from "next/router";
import APP_PATH from "../../constants/app-path";

type FormValues = {
	paymentMethod: string;
};

const paymentMethods = ["MOMO", "COD"];

export default function Checkout() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { register } = useForm<FormValues>();

	const addressDictModalRef = useRef<AddressDictRefType>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	const cart = useAppSelector(selectCart);
	const address = useAppSelector(selectUser).address;

	const [paymentMethod, setPaymentMethod] = useState<string>("COD");
	const [total, setTotal] = useState<number>(0);
	const [selectedAddress, setSelectedAddress] = useState<IAddressExtract>();
	const [shippingFee, setShippingFee] = useState<number>(0);

	const handleShippingFee = () => {
		if (selectedAddress) {
			console.log("chay khong");
			if (cart.length > 0) {
				const shopLat = parseFloat(process.env.SHOP_LAT || "");
				const shopLng = parseFloat(process.env.SHOP_LNG || "");
				const shopCoordinates: ICoordinates = {
					latitude: shopLat,
					longitude: shopLng,
				};
				try {
					const response = adminstrativeApi.getDirection(shopCoordinates, selectedAddress.coordinates);
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
		}
	};

	const handleRadioChange = (value: string) => {
		setPaymentMethod(value);
	};

	const handleOpenAddressDictModal = () => {
		if (addressDictModalRef.current) {
			addressDictModalRef.current.open();
		}
	};

	const handleTotal = () => {
		if (cart.length > 0) {
			let sum = 0;
			cart.forEach((item) => (sum += item.price));

			setTotal(sum);
		} else {
			router.push(APP_PATH.CART);
		}
	};

	const handleCheckout = async () => {
		const orderItems = cart.map(
			(item) =>
				({
					productItem: item.itemId,
					quantity: item.quantity,
					price: item.price,
				} as ICreateOrderItem)
		);

		const body: ICreateOrder = {
			address: selectedAddress?._id || "",
			orderItems: orderItems,
			paymentMethod: paymentMethod as PaymentMethod,
			shippingFee: shippingFee,
		};

		const response = orderApi.createOrder(body);
		response.then((momoUrl) => {
			if (momoUrl) {
				router.push(momoUrl);
			} else {
				dispatch(deleteAll());
				router.push({ pathname: APP_PATH.ORDER_HISTORY, query: { status: "pending" } });
			}
		});
		toast.promise(response, {
			loading: "Đang tạo đơn hàng...",
			success: "Tạo đơn hàng thành công.",
			error: "Xảy ra lỗi trong quá trình tạo đơn hàng.",
		});
	};

	const handleEditCart = () => {
		router.push(APP_PATH.CART);
	};

	useEffect(() => {
		setSelectedAddress(address.find((item) => item.default));
	}, [address]);

	useEffect(() => {
		handleShippingFee();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedAddress]);

	useEffect(() => {
		handleTotal();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart]);

	return (
		<Fragment>
			<div className="space-y-14 mt-14 mb-14 md:mb-[112px]  xl:mb-[144px]">
				<TitlePage subtitle="Gần hoàn thành" title="Thanh toán" />
				<div className="space-y-6 lg:w-3/5 md:w-4/5 md:mx-auto md:space-y-8">
					<div className="space-y-6 md:space-y-8">
						{/* cart section */}
						<div className="p-6 space-y-10 border-2 md:p-8 rounded-4xl border-gray-accent dark:border-black-dark-2 md:space-y-12">
							<p className="font-semibold capitalize text-heading-5 lg:text-heading-4 text-dark-100 dark:text-light-100">
								Giỏ hàng
							</p>
							<div className="space-y-10 md:space-y-6">
								{cart.length > 0 && cart.map((item) => <ItemCartCheckout key={item.itemId} item={item} />)}
							</div>
							<Button
								onClick={handleEditCart}
								className="w-full !mt-14 md:!mt-20 lg:w-fit dark:text-light-100"
								type="secondary"
							>
								Chỉnh sửa giỏ hàng
							</Button>
						</div>
						{/* address section */}
						<div className="p-6 space-y-6 border-2 h-fit md:p-8 rounded-4xl border-gray-accent dark:border-black-dark-2 md:space-y-8">
							<div className="flex items-center gap-x-4">
								<Pin height={24} width={24} className="text-primary-100" />
								<h4 className="font-semibold capitalize text-heading-5 lg:text-heading-4 text-primary-100 dark:text-light-100">
									Địa chỉ nhận hàng
								</h4>
							</div>

							<div className="md:flex md:items-center xl:block xl:space-y-4">
								<div className="mb-4 space-y-4 md:mb-0 md:grow md:space-y-0">
									<p className="font-semibold capitalize text-paragraph-5 lg:text-paragraph-4 md:inline-block dark:text-white">
										{selectedAddress ? selectedAddress.name : "nguyen thi my duyen"}
									</p>
									<p className="font-semibold text-paragraph-5 lg:text-paragraph-4 md:inline-block md:pl-4 dark:text-white">
										{selectedAddress ? selectedAddress.phone : "0987654321"}
									</p>
									<p className="text-paragraph-5 lg:text-paragraph-4 md:pr-4 dark:text-white">
										{selectedAddress
											? `${selectedAddress.specificAddress}, ${selectedAddress.ward}, ${selectedAddress.district}, ${selectedAddress.province}`
											: "Kí túc xá khu A, khu phố 6, Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí Minh"}
									</p>
								</div>
								<Badge className="w-fit md:shrink-0" color="primary" isResponsive={false}>
									Mặc định
								</Badge>
							</div>
							<Button onClick={handleOpenAddressDictModal} className="w-full lg:w-fit" type="secondary">
								Thay đổi
							</Button>
						</div>
					</div>

					<div className="lg:grid lg:grid-cols-2 space-y-10 lg:space-y-0 lg:gap-x-10">
						{/* payment method section */}
						<div className="p-6 space-y-6 border-2 border-gray-accent rounded-4xl dark:border-black-dark-2">
							<h4 className="font-semibold text-heading-5 lg:text-heading-4 dark:text-light-100">
								Phương thức thanh toán
							</h4>

							<div className="space-y-4">
								{paymentMethods.map((item, index) => {
									if (index === 0) {
										return (
											<Radio
												onClick={(value: string) => handleRadioChange(value)}
												key={item}
												value={item}
												name="address"
												selected={paymentMethod === item}
												register={register}
											>
												{item}
											</Radio>
										);
									}

									return (
										<Radio
											onClick={(value: string) => handleRadioChange(value)}
											key={item}
											value={item}
											name="address"
											selected={paymentMethod === item}
											register={register}
										>
											{item}
										</Radio>
									);
								})}
							</div>
						</div>
						{/* order info section */}
						<div className="p-6 space-y-4 border-2 border-gray-accent rounded-4xl dark:border-black-dark-2">
							<h4 className="font-semibold text-heading-5 lg:text-heading-4 dark:text-light-100">Thông tin đơn hàng</h4>

							<div className="flex justify-between text-heading-6 lg:text-heading-5">
								<p className="dark:text-light-100">Tổng phụ:</p>
								<p className="dark:text-light-100">{convertPrice(total)}</p>
							</div>
							<div className="flex justify-between text-heading-6 lg:text-heading-5">
								<p className="dark:text-light-100">Phí ship:</p>
								<p className="dark:text-light-100">{convertPrice(shippingFee)}</p>
							</div>

							<div className="flex justify-between text-heading-6 lg:text-heading-5">
								<p className="dark:text-light-100">Tổng:</p>
								<p className="dark:text-light-100">{convertPrice(total + shippingFee)}</p>
							</div>
						</div>
					</div>

					<Button onClick={handleCheckout} type="primary" className="w-full">
						submit
					</Button>
				</div>
			</div>

			{/* model address dictionary */}
			<AddressDictionary
				overlay={overlayRef}
				ref={addressDictModalRef}
				onChangeValue={setSelectedAddress}
				defaultValue={selectedAddress?._id}
			/>
			<Overlay ref={overlayRef} />
		</Fragment>
	);
}
