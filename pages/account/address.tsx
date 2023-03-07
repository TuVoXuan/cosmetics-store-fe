import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Badge from "../../components/badge/badge";
import Button from "../../components/buttons/button";
import Add from "../../components/icons/add";
import Edit from "../../components/icons/edit";
import Trash from "../../components/icons/trash";
import Dropdown from "../../components/inputs/dropdown";
import Input from "../../components/inputs/input";
import TitlePage from "../../components/title-page/title-page";
import { adminstrative } from "../../constants/adminstrative";

interface FormValues {
	name: string;
	phone: string;
	province: string;
	district: string;
	ward: string;
	specificAddress: string;
}

export default function Address() {
	// State
	const [selectedProvince, setSelectedProvince] = useState<string>();
	const [selectedDistrict, setSelectedDistrict] = useState<string>();
	const [selectedWard, setSelectedWard] = useState<string>();
	// Ref
	const addressDictRef = useRef<HTMLDivElement>(null);

	// React-hook-form
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormValues>();

	const watchProvince = watch("province");
	const watchDistrict = watch("district");

	// Function
	const availabelDistricts = adminstrative.find((item) => item.provinceName === selectedProvince);

	const availableWards = availabelDistricts?.districts.find(
		(item) => item.districtName === selectedDistrict
	);

	const onSubmit = async (data: FormValues) => {
		console.log("data: ", data);
	};

	useEffect(() => {
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
		<section className="space-y-14 mt-14 mb-14 md:mb-[112px] xl:mb-[144px]">
			<div className=" md:flex md:items-end md:justify-between">
				<TitlePage className="mt-14 md-16" subtitle="Cá nhân" title="Sổ địa chỉ" />
				<Button className="mt-6 md:mt-0" type="secondary">
					Thêm địa chỉ mới
				</Button>
			</div>
			<div>
				<div className="space-y-4">
					<div className="pb-6 space-y-4 border-b-2 md:grid md:grid-cols-3">
						<div className="space-y-2 md:col-span-2">
							<h4 className="font-semibold capitalize lg:inline-block lg:pr-4 text-paragraph-3 dark:text-white">
								Nguyen Thi Diem Quynh
							</h4>
							<h4 className="font-semibold capitalize lg:inline-block lg:pl-4 lg:border-l-2 text-paragraph-3 dark:text-white">
								0987654321
							</h4>
							<p className="text-paragraph-3 dark:text-white">
								Kí túc xá khu A, khu phố 6 Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí
								Minh
							</p>
							<Badge className="w-fit shrink-0" isResponsive={false} color="pink_tertiary">
								Mặc định
							</Badge>
						</div>

						<div className="flex items-center justify-between md:flex-col md:justify-center md:space-y-4 lg:items-end">
							<div className="hidden md:block md:space-x-4">
								<button className="p-3 md:text-heading-4 text-secondary-100">Cập nhật</button>
								<button className="p-3 md:text-heading-4 text-red-accent">Xóa</button>
							</div>
							<Button className="md:px-3" type="secondary">
								Đặt mặc định
							</Button>
							<button className="p-3 md:hidden">
								<Edit className="w-6 h-6 dark:text-white" />
							</button>
							<button className="p-3 md:hidden">
								<Trash className="w-6 h-6 text-red-accent dark:text-white" />
							</button>
						</div>
					</div>
					<div className="pb-6 space-y-4 border-b-2 md:grid md:grid-cols-3">
						<div className="space-y-2 md:col-span-2">
							<h4 className="font-semibold capitalize lg:inline-block lg:pr-4 text-paragraph-3 dark:text-white">
								Nguyen Thi Diem Quynh
							</h4>
							<h4 className="font-semibold capitalize lg:inline-block lg:pl-4 lg:border-l-2 text-paragraph-3 dark:text-white">
								0987654321
							</h4>
							<p className="text-paragraph-3 dark:text-white">
								Kí túc xá khu A, khu phố 6 Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ Chí
								Minh
							</p>
						</div>

						<div className="flex items-center justify-between md:flex-col md:justify-center md:space-y-4 lg:items-end">
							<div className="hidden md:block md:space-x-4">
								<button className="p-3 md:text-heading-4 text-secondary-100">Cập nhật</button>
								<button className="p-3 md:text-heading-4 text-red-accent">Xóa</button>
							</div>
							<Button className="md:px-3" type="secondary">
								Đặt mặc định
							</Button>
							<button className="p-3 md:hidden">
								<Edit className="w-6 h-6 dark:text-white" />
							</button>
							<button className="p-3 md:hidden">
								<Trash className="w-6 h-6 text-red-accent dark:text-white" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<TitlePage className="mt-14 md-16" subtitle="Cá nhân" title="Địa chỉ mới" />

			<form className="space-y-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-6">
				<Input
					name="name"
					register={register}
					option={{
						required: {
							value: true,
							message: "Yêu cầu nhập tên",
						},
					}}
					error={errors.name?.message}
					className="w-full"
					label="Họ tên"
					placeholder="Nguyễn Văn A"
				/>
				<Input
					name="phone"
					register={register}
					option={{
						required: {
							value: true,
							message: "Yêu cầu nhập số điện thoại",
						},
						pattern: {
							value: /(03|05|07|08|09|01[2689])+([0-9]{8})\b/,
							message: "Số điện thoại không đúng định đạng",
						},
					}}
					error={errors.phone?.message}
					className="w-full"
					label="Số điện thoại"
					placeholder="0987654321"
				/>

				<Dropdown
					label="Tỉnh/Thành phố"
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
				<Button
					className="self-end w-full lg:h-fit"
					onClick={handleSubmit(onSubmit)}
					btnType="submit"
					type="primary"
				>
					submit
				</Button>
			</form>
		</section>
	);
}
