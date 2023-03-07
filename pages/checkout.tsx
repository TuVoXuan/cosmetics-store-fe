import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import adminstrativeApi from "../api/adminstrative-api";
import Dropdown from "../components/inputs/dropdown";
import Input from "../components/inputs/input";
import Button from "../components/buttons/button";
import ItemCartCheckout from "../components/card/item-cart-checkout";
import Steps from "../components/steps/steps";
import TitlePage from "../components/title-page/title-page";
import { adminstrative } from "../constants/adminstrative";
import Pin from "../components/icons/pin";
import Badge from "../components/badge/badge";
import AddressDictionary, { AddressDictRefType } from "../components/modal/address-dictionary";
import Overlay from "../components/modal/overlay";
import Radio from "../components/inputs/radio";

// type FormValues = {
// 	name: string;
// 	province: string;
// 	district: string;
// 	ward: string;
// };

type FormValues = {
	paymentMethod: string;
};

const paymentMethods = ["momo", "COD"];

export default function Checkout() {
	const addressDictModalRef = useRef<AddressDictRefType>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const animatedFormRef = useRef<HTMLDivElement>(null);
	const wrapStepFrom = useRef<HTMLDivElement>(null);
	const step1Form = useRef<HTMLDivElement>(null);
	const step2Form = useRef<HTMLDivElement>(null);

	const [paymentMethod, setPaymentMethod] = useState<string>("");
	const [currStep, setCurrStep] = useState<number>(1);

	const handleRadioChange = (value: string) => {
		setPaymentMethod(value);
	};

	const handleOpenAddressDictModal = () => {
		if (addressDictModalRef.current) {
			addressDictModalRef.current.open();
		}
	};

	const handleStep = (action: "next" | "previous") => {
		if (action === "next") {
			if (animatedFormRef.current && step2Form.current && wrapStepFrom.current) {
				animatedFormRef.current.style.height = step2Form.current.clientHeight + "px";
				wrapStepFrom.current.classList.add(
					"-translate-x-[calc(50%+16px)]",
					"md:-translate-x-[calc(50%+20px)]",
					"lg:-translate-x-[calc(50%+24px)]",
					"xl:-translate-x-[calc(50%+48px)]"
				);
				animatedFormRef.current.scrollIntoView();
				setCurrStep(currStep + 1);
			}
		} else {
			if (animatedFormRef.current && step1Form.current && wrapStepFrom.current) {
				animatedFormRef.current.style.height = step1Form.current.clientHeight + "px";
				wrapStepFrom.current.classList.remove(
					"-translate-x-[calc(50%+16px)]",
					"md:-translate-x-[calc(50%+20px)]",
					"lg:-translate-x-[calc(50%+24px)]",
					"xl:-translate-x-[calc(50%+48px)]"
				);
				setCurrStep(currStep - 1);
			}
		}
	};

	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormValues>();

	// const [selectedProvince, setSelectedProvince] = useState<string>();
	// const [selectedDistrict, setSelectedDistrict] = useState<string>();
	// const [selectedWard, setSelectedWard] = useState<string>();

	// const watchProvince = watch("province");
	// const watchDistrict = watch("district");

	// const availabelDistricts = adminstrative.find((item) => item.provinceName === selectedProvince);
	// const availableWards = availabelDistricts?.districts.find(
	// 	(item) => item.districtName === selectedDistrict
	// );

	// const onSubmit = async (data: FormValues) => {
	// 	console.log("data: ", data);
	// };

	// React.useEffect(() => {
	// 	const subscription = watch((value, { name, type }) => {
	// 		switch (name) {
	// 			case "province":
	// 				setValue("district", "");
	// 				setValue("ward", "");
	// 				break;
	// 			case "district":
	// 				setValue("ward", "");
	// 		}
	// 	});
	// 	return () => subscription.unsubscribe();
	// }, [watch]);

	useEffect(() => {
		if (animatedFormRef.current && step1Form.current && step2Form.current) {
			animatedFormRef.current.style.height = step1Form.current.clientHeight + "px";
			step1Form.current.style.width = animatedFormRef.current.clientWidth + "px";
			console.log("animatedFormRef.current.clientWidth: ", animatedFormRef.current.clientWidth);
			step2Form.current.style.width = animatedFormRef.current.clientWidth + "px";
		}
	}, []);

	return (
		<Fragment>
			<div className="space-y-14 mt-14 mb-14 md:mb-[112px] xl:mb-[144px]">
				<TitlePage subtitle="Gần hoàn thành" title="Thanh toán" />
				<Steps className="md:w-1/2" totalSteps={2} currentStep={currStep} />

				{/* <form className="p-6 border-2 rounded-4xl border-gray-accent">
				<h4 className="font-semibold text-heading-4">Shipping Details</h4>

				<Input
					name="name"
					register={register}
					className="w-full tracking-widest"
					label="Họ tên"
					placeholder="Nguyễn Văn A"
					option={{
						required: {
							value: true,
							message: "Yêu cầu họ tên",
						},
					}}
					error={errors.name?.message}
					type="text"
				/>

				<Input
					name="name"
					register={register}
					className="w-full tracking-widest"
					label="Họ tên"
					placeholder="Nguyễn Văn A"
					option={{
						required: {
							value: true,
							message: "Yêu cầu họ tên",
						},
					}}
					error={errors.name?.message}
					type="text"
				/>

				<Dropdown
					label="Tỉnh/Thành phố"
					size={"large"}
					options={adminstrative.map((item) => ({
						value: item.provinceName,
						label: item.provinceName,
					}))}
					name="province"
					register={register}
					option={{
						required: {
							value: true,
							message: "Chọn tỉnh/thành phố",
						},
					}}
					error={errors.province?.message}
					onChange={(value: string) => {
						setSelectedProvince(value);
					}}
				/>

				<Dropdown
					label="Quận/Huyện"
					size={"large"}
					options={
						availabelDistricts?.districts.map((item) => ({
							value: item.districtName,
							label: item.districtName,
						})) || []
					}
					name="district"
					register={register}
					option={{
						required: {
							value: true,
							message: "Chọn quận/huyện",
						},
					}}
					error={errors.district?.message}
					onChange={(value: string) => {
						setSelectedDistrict(value);
					}}
					watch={watchProvince}
				/>
				<Dropdown
					label="Xã/Thị trấn"
					size={"large"}
					options={
						availableWards?.wards.map((item) => ({
							value: item.wardName,
							label: item.wardName,
						})) || []
					}
					name="ward"
					register={register}
					option={{
						required: {
							value: true,
							message: "Chọn xã/thị trấn",
						},
					}}
					error={errors.ward?.message}
					onChange={(value: string) => {
						setSelectedWard(value);
					}}
					watch={watchDistrict}
				/>
				<Button onClick={handleSubmit(onSubmit)} btnType="submit" type="primary">
					submit
				</Button>
			</form> */}

				<div ref={animatedFormRef} className="relative transition-all duration-300 ease-out">
					<div
						ref={wrapStepFrom}
						className="absolute flex transition-transform duration-300 ease-out gap-x-8 md:gap-x-10 lg:gap-x-12 xl:gap-24"
					>
						{/* step 1 */}
						<div
							ref={step1Form}
							className="shrink-0 lg:grid lg:grid-cols-2 space-y-14 lg:space-y-0 lg:gap-x-12"
						>
							{/* delivery address */}
							<div className="p-6 space-y-6 border-2 lg:col-start-2 h-fit md:p-8 rounded-4xl border-gray-accent dark:border-black-dark-2 md:space-y-8">
								<div className="flex items-center gap-x-4">
									<Pin height={24} width={24} className="text-primary-100" />
									<h4 className="font-semibold capitalize text-heading-4 md:text-heading-2 text-primary-100 dark:text-light-100">
										Địa chỉ nhận hàng
									</h4>
								</div>

								<div className="md:flex md:items-center xl:block xl:space-y-4">
									<div className="mb-4 space-y-4 md:mb-0 md:grow md:space-y-0">
										<p className="font-semibold capitalize text-paragraph-3 md:text-heading-4 md:inline-block dark:text-white">
											nguyen thi my duyen
										</p>
										<p className="font-semibold text-paragraph-3 md:text-heading-4 md:inline-block md:pl-4 dark:text-white">
											0987654321
										</p>
										<p className="text-paragraph-3 md:text-heading-4 md:pr-4 dark:text-white">
											Kí túc xá khu A, khu phố 6, Phường Linh Trung, Thành Phố Thủ Đức,
											TP. Hồ Chí Minh
										</p>
									</div>
									<Badge className="w-fit md:shrink-0" color="primary" isResponsive={false}>
										Mặc định
									</Badge>
								</div>
								<Button
									onClick={handleOpenAddressDictModal}
									className="w-full lg:w-fit"
									type="secondary"
								>
									Thay đổi
								</Button>
							</div>

							{/* my cart */}
							<div className="p-6 space-y-10 border-2 lg:row-start-1 lg:col-start-1 md:p-8 rounded-4xl border-gray-accent dark:border-black-dark-2 md:space-y-12">
								<p className="font-semibold capitalize text-heading-4 md:text-heading-2 text-dark-100 dark:text-light-100">
									Giỏ hàng
								</p>
								<div className="lg:max-h-[400px] lg:overflow-y-auto space-y-10 md:space-y-6">
									<ItemCartCheckout />
									<ItemCartCheckout />
									<ItemCartCheckout />
									<ItemCartCheckout />
									<ItemCartCheckout />
									<ItemCartCheckout />
								</div>
								<div className="flex justify-between font-semibold md:text-heading-3 text-heading-5 xl:text-paragraph-1">
									<p className="dark:text-light-100">Tổng:</p>
									<p className="dark:text-light-100">$244</p>
								</div>
								<Button
									className="w-full !mt-14 md:!mt-20 dark:text-light-100"
									type="secondary"
								>
									Chỉnh sửa giỏ hàng
								</Button>
							</div>

							<Button
								onClick={() => handleStep("next")}
								className="w-full lg:col-start-2"
								type="primary"
							>
								Tiếp tục thanh toán
							</Button>
						</div>

						{/* step 2 */}
						<div ref={step2Form} className="shrink-0 h-fit">
							<div className="p-6 border-2 border-gray-accent rounded-4xl dark:border-black-dark-2">
								<h4 className="font-semibold text-heading-4 md:text-heading-2 dark:text-light-100">
									Phương thức thanh toán
								</h4>

								<div>
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
							<Button onClick={() => handleStep("previous")} type="primary" className="w-full">
								submit
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* model address dictionary */}
			<AddressDictionary overlay={overlayRef} ref={addressDictModalRef} />
			<Overlay ref={overlayRef} />
		</Fragment>
	);
}
