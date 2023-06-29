import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import adminstrativeApi from "../../api/adminstrative-api";
import { useAppDispatch, useAppSelector, useSettings } from "../../store/hooks";
import Button from "../../components/buttons/button";
import AddressCard from "../../components/card/address-card";
import Dropdown from "../../components/inputs/dropdown";
import Input from "../../components/inputs/input";
import TitlePage from "../../components/title-page/title-page";
import { adminstrative } from "../../constants/adminstrative";
import { createAddress, updateAddress } from "../../redux/actions/user-action";
import { selectUser } from "../../redux/slices/user-slice";
import { toastError, toastSuccess } from "../../util/toast";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import APP_PATH from "../../constants/app-path";

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

	// Redux & Context
	const dispatch = useAppDispatch();
	const addresses = useAppSelector(selectUser).address;
	const { language } = useSettings();

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

	const handleSetUpdate = (value: IAddressExtract) => {
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
		setPosition({ lat: value.coordinates.latitude, lng: value.coordinates.longitude });
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
				loading: language.account_address_page.mes_getting_location,
				success: language.account_address_page.mes_get_location_success,
				error: language.account_address_page.mes_get_location_error,
			});
			response.then((data) => {
				const coordinates = data.data.results[0].locations[0].displayLatLng;
				setPosition(coordinates);
			});
		} else {
			toastError(language.account_address_page.mes_not_fill_out_form);
		}
	};

	const handleChangePosition = (value: L.LatLngExpression) => {
		setPosition(value);
	};

	const confirmPosition = () => {
		if (position) {
			setMarkerDraggable(false);
			toast.success(language.account_address_page.mes_confirm_location_success, { duration: 5000 });
		} else {
			toast.error(language.account_address_page.mes_confirm_location_error, { duration: 5000 });
		}
	};

	const onSubmit = async (data: IAddressForm) => {
		try {
			if (!position) {
				toastError(language.account_address_page.mes_not_confirm_location);
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
					toastSuccess(language.account_address_page.mes_update_location_success);
					setUpdateAddressId(undefined);
				} else {
					await dispatch(createAddress(newAddress));
					toastSuccess(language.account_address_page.mes_create_location_success);
				}
				// rest form
				reset();
				setSelectedProvince(undefined);
				setSelectedDistrict(undefined);
				setSelectedWard(undefined);
			}
		} catch (error) {
			console.log("error: ", error);
			toastError(language.account_address_page.mes_submit_form_error);
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
			<Breadcrumb
				className="hidden lg:block lg:mt-14"
				items={[
					{ title: language.header.home_tag, href: APP_PATH.HOME },
					{ title: language.account_info_page.info_subtitle, href: APP_PATH.INFO },
					{ title: language.account_address_page.addresses_title, href: APP_PATH.ADDRESS },
				]}
			/>
			<div className=" md:flex md:items-end md:justify-between">
				<TitlePage
					className="mt-14 lg:mt-0"
					subtitle={language.account_address_page.section_subtitle}
					title={language.account_address_page.addresses_title}
				/>
				<Button onClick={scrollToForm} className="mt-6 md:mt-0" type="secondary">
					{language.account_address_page.add_new_address_btn}
				</Button>
			</div>
			<div className="lg:w-4/5 lg:mx-auto">
				<div className="space-y-4">
					{addresses.length > 0 ? (
						addresses.map((item) => <AddressCard onUpdate={handleSetUpdate} key={item._id} address={item} />)
					) : (
						<p>{language.account_address_page.no_address}</p>
					)}
				</div>
			</div>

			<TitlePage
				className="mt-14 md-16"
				subtitle={language.account_address_page.section_subtitle}
				title={language.account_address_page.new_address_title}
			/>

			<form
				ref={addressFormRef}
				id="addressForm"
				className="space-y-6 md:grid md:grid-cols-2 md:space-y-0 md:gap-6 lg:w-4/5 lg:mx-auto"
			>
				<Input
					name="name"
					register={register}
					option={{
						required: {
							value: true,
							message: language.account_address_page.input_name_required_mes,
						},
					}}
					error={errors.name?.message}
					className="w-full"
					label={language.account_address_page.input_name_label}
					placeholder={language.account_address_page.input_name_placeholder}
				/>
				<Input
					name="phone"
					register={register}
					option={{
						required: {
							value: true,
							message: language.account_address_page.input_phone_required_mes,
						},
						pattern: {
							value: /(03|05|07|08|09|01[2689])+([0-9]{8})\b/,
							message: language.account_address_page.input_phone_not_match_format,
						},
					}}
					error={errors.phone?.message}
					className="w-full"
					label={language.account_address_page.input_phone_label}
					placeholder={language.account_address_page.input_phone_placeholder}
				/>

				<Dropdown
					label={language.account_address_page.dropdown_province_label}
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
							message: language.account_address_page.dropdown_province_required_mes,
						},
					}}
					error={errors.province?.message}
					onChange={(value: string) => {
						setSelectedProvince(value);
					}}
				/>

				<Dropdown
					label={language.account_address_page.dropdown_district_label}
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
							message: language.account_address_page.dropdown_district_required_mes,
						},
					}}
					error={errors.district?.message}
					onChange={(value: string) => {
						setSelectedDistrict(value);
					}}
					watch={watchProvince}
				/>
				<Dropdown
					label={language.account_address_page.dropdown_ward_label}
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
							message: language.account_address_page.dropdown_ward_required_mes,
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
							message: language.account_address_page.input_specific_address_required_mes,
						},
					}}
					error={errors.specificAddress?.message}
					className="w-full"
					label={language.account_address_page.input_specific_address_label}
					placeholder={language.account_address_page.input_specific_address_placeholder}
				/>
			</form>
			<p className="font-semibold text-red-accent lg:w-4/5 lg:mx-auto">{language.account_address_page.noted}</p>
			<Button onClick={handleGetPosition} className="self-end w-full lg:w-fit" btnType="submit" type="primary">
				{language.account_address_page.view_location_in_map_btn}
			</Button>
			{/* Map React Leaflet */}
			<div className="relative">
				<Button
					onClick={confirmPosition}
					className="absolute z-[500] top-4 right-4 self-end lg:w-fit"
					btnType="submit"
					type="primary"
				>
					{language.account_address_page.confirm_location_btn}
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
				{updateAddressId ? language.account_address_page.btn_update : language.account_address_page.create_address_btn}
			</Button>
		</section>
	);
}
