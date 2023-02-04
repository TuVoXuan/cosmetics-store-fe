import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CLIENT_RENEG_LIMIT } from "tls";
import adminstrativeApi from "../api/adminstrative-api";
import Button from "../components/buttons/button";
import Dropdown from "../components/inputs/dropdown";
import Input from "../components/inputs/input";
import Steps from "../components/steps/steps";
import TitlePage from "../components/title-page/title-page";
import { adminstrative } from "../constants/adminstrative";
import { getDistricts, getProvinces, getWards } from "../util/adminstrative-api";

type FormValues = {
	name: string;
	province: string;
	district: string;
	ward: string;
};

export default function Checkout() {
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormValues>();

	const [selectedProvince, setSelectedProvince] = useState<string>();
	const [selectedDistrict, setSelectedDistrict] = useState<string>();
	const [selectedWard, setSelectedWard] = useState<string>();

	const watchProvince = watch("province");
	const watchDistrict = watch("district");

	const availabelDistricts = adminstrative.find((item) => item.provinceName === selectedProvince);
	const availableWards = availabelDistricts?.districts.find(
		(item) => item.districtName === selectedDistrict
	);

	const onSubmit = async (data: FormValues) => {
		console.log("data: ", data);
	};

	React.useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			switch (name) {
				case "province":
					setValue("district", "");
					setValue("ward", "");
					break;
				case "district":
					setValue("ward", "");
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	return (
		<div className="space-y-14 mt-14">
			<TitlePage subtitle="Gần hoàn thành" title="Thanh toán" />
			<Steps totalSteps={4} currentStep={2} />

			<form className="p-6 border-2 rounded-4xl border-gray-accent">
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
			</form>
		</div>
	);
}
