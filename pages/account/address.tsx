import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import adminstrativeApi from "../../api/adminstrative-api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "../../components/buttons/button";
import AddressCard from "../../components/card/address-card";
import Dropdown from "../../components/inputs/dropdown";
import Input from "../../components/inputs/input";
import TitlePage from "../../components/title-page/title-page";
import { adminstrative } from "../../constants/adminstrative";
import { createAddress, updateAddress } from "../../redux/actions/user-action";
import { selectUser } from "../../redux/slices/user-slice";
import { toastError, toastSuccess } from "../../util/toast";

const AddressMap = dynamic(() => import("../../components/map/Map"), { ssr: false });

export default function Address() {
	// State
	const [selectedProvince, setSelectedProvince] = useState<string>();
	const [selectedDistrict, setSelectedDistrict] = useState<string>();
	const [selectedWard, setSelectedWard] = useState<string>();
	const [updateAddressId, setUpdateAddressId] = useState<string>();
	const [position, setPosition] = useState<L.LatLngExpression>();
	const [markerDraggable, setMarkerDraggable] = useState<boolean>(true);

	// Ref
	const addressFormRef = useRef<HTMLFormElement>(null);

	// Redux
	const dispatch = useAppDispatch();
	const addresses = useAppSelector(selectUser).address;

	// React-hook-form
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<IAddressForm>();

	const watchProvince = watch("province");
	const watchDistrict = watch("district");

	// Function
	const availabelDistricts = adminstrative.find((item) => item.provinceName === selectedProvince);

	const availableWards = availabelDistricts?.districts.find((item) => item.districtName === selectedDistrict);

	const scrollToForm = () => {
		if (addressFormRef.current) {
			addressFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	const handleSetUpdate = (value: IAddress) => {
		console.log("value: ", value);
		setUpdateAddressId(value._id);
		setValue("name", value.name);
		setValue("phone", value.phone);
		setValue("province", value.province);
		setValue("district", value.district);
		setValue("ward", value.ward);
		setValue("specificAddress", value.specificAddress);

		setSelectedProvince(value.province);
		setSelectedDistrict(value.district);
		setSelectedWard(value.ward);
		// chưa làm cái update address vơi map
		handleGetPosition();
		scrollToForm();
	};

	const handleGetPosition = () => {
		if (!markerDraggable) {
			setMarkerDraggable(true);
		}
		const specAddress = getValues("specificAddress");
		const proviceVal = getValues("province");
		const districtVal = getValues("district");
		const wardVal = getValues("ward");
		if (specAddress && proviceVal && districtVal && wardVal) {
			const address = specAddress + ", " + wardVal + ", " + districtVal + ", " + proviceVal;
			console.log("address: ", address);
			const response = adminstrativeApi.getGeocoding(address);
			toast.promise(response, {
				loading: "Đang lấy vị trí trên bản đồ",
				success: "Lấy vị trí thành công",
				error: "Xảy ra lỗi khi lấy vị trí",
			});
			response.then((data) => {
				const coordinates = data.data.results[0].locations[0].displayLatLng;
				setPosition(coordinates);
			});
		} else {
			toastError("Please fill complete the form");
		}
	};

	const handleChangePosition = (value: L.LatLngExpression) => {
		setPosition(value);
	};

	const confirmPosition = () => {
		if (position) {
			setMarkerDraggable(false);
			toast.success("Đã xác nhận vị trí. Bây giờ bạn hãy gửi form", { duration: 5000 });
		} else {
			toast.error("Hãy click xem vị trí trên bản đồ trước", { duration: 5000 });
		}
	};

	const onSubmit = async (data: IAddressForm) => {
		try {
			if (!position) {
				toastError("Bạn hãy xác nhận ví trí trên map");
			} else {
				const newAddress: IAddressAPI = {
					coordinates: {
						latitude: (position as L.LatLngLiteral).lat,
						longitude: (position as L.LatLngLiteral).lng,
					},
					district: data.district,
					name: data.name,
					phone: data.phone,
					province: data.province,
					specificAddress: data.specificAddress,
					ward: data.ward,
				};
				console.log("newAddress: ", newAddress);

				if (updateAddressId) {
					await dispatch(updateAddress({ addressId: updateAddressId, addresss: newAddress }));
					toastSuccess("Update address success");
					setUpdateAddressId(undefined);
				} else {
					await dispatch(createAddress(newAddress));
					toastSuccess("Create new address success");
				}
				// rest form
				reset();
				setSelectedProvince(undefined);
				setSelectedDistrict(undefined);
				setSelectedWard(undefined);
			}
		} catch (error) {
			console.log("error: ", error);
			toastError("Have some error. Try it later");
		}
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch]);

	return (
		<section className="space-y-14 mt-14 mb-14 md:mb-[112px] xl:mb-[144px]">
			<div className=" md:flex md:items-end md:justify-between">
				<TitlePage className="mt-14 md-16" subtitle="Cá nhân" title="Sổ địa chỉ" />
				<Button onClick={scrollToForm} className="mt-6 md:mt-0" type="secondary">
					Thêm địa chỉ mới
				</Button>
			</div>
			<div>
				<div className="space-y-4">
					{addresses.length > 0 ? (
						addresses.map((item) => <AddressCard onUpdate={handleSetUpdate} key={item._id} address={item} />)
					) : (
						<p>No address</p>
					)}
				</div>
			</div>

			<TitlePage className="mt-14 md-16" subtitle="Cá nhân" title="Địa chỉ mới" />

			<form ref={addressFormRef} id="addressForm" className="space-y-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-6">
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
					defaulValue={selectedProvince}
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
					defaulValue={selectedDistrict}
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
					defaulValue={selectedWard}
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
				<Input
					name="specificAddress"
					register={register}
					option={{
						required: {
							value: true,
							message: "Yêu cầu nhập địa chỉ cụ thể",
						},
					}}
					error={errors.specificAddress?.message}
					className="w-full"
					label="Địa chỉ cụ thể"
					placeholder="Tổ dân phố 4B"
				/>
			</form>
			<p className="font-semibold text-red-accent">
				*Lưu ý: khi bạn chỉnh địa chỉ trên form xong thì hãy &quotClick&quot nút &quotXem vị trí trên map&quot để xem vị
				trí nhận hàng của bạn có chính xác không.
			</p>
			<Button onClick={handleGetPosition} className="self-end w-full lg:w-fit" btnType="submit" type="primary">
				Xem vị trí trên map
			</Button>
			{/* Map React Leaflet */}
			<div className="relative">
				<Button
					onClick={confirmPosition}
					className="absolute z-[500] top-4 right-4 self-end lg:w-fit"
					btnType="submit"
					type="primary"
				>
					Xác nhận vị trí
				</Button>
				<AddressMap position={position} markerDraggable={markerDraggable} onPositionChange={handleChangePosition} />
			</div>
			<Button
				form="addressForm"
				className="self-end w-full lg:w-fit"
				onClick={handleSubmit(onSubmit)}
				btnType="submit"
				type="primary"
			>
				submit
			</Button>
		</section>
	);
}
