import React, { Fragment, SetStateAction, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../redux/slices/user-slice";
import Badge from "../badge/badge";
import Button from "../buttons/button";
import Delete from "../icons/delete";
import Checkbox from "../inputs/checkbox";
import Radio from "../inputs/radio";

export type AddressDictRefType = {
	current: HTMLDivElement | null;
	open: () => void;
};

type FormValues = {
	address: string;
};

interface Props {
	overlay?: React.RefObject<HTMLDivElement>;
	onChangeValue: (value: SetStateAction<IAddressExtract | undefined>) => void;
	defaultValue?: string;
}

const AddressDictionary = React.forwardRef<AddressDictRefType, Props>(
	({ overlay, onChangeValue, defaultValue }, ref) => {
		const [selectedValue, setSelectedValue] = useState<string>("");
		const addressDictRef = useRef<HTMLDivElement>(null);
		const address = useAppSelector(selectUser).address;

		const {
			register,
			handleSubmit,
			getValues,
			setValue,
			watch,
			reset,
			formState: { errors },
		} = useForm<FormValues>({
			defaultValues: {
				address: defaultValue,
			},
		});

		const watchAddress = watch("address");

		const onSubmit = async (data: FormValues) => {
			onChangeValue(address.find((item) => item._id === selectedValue));
			handleClose();
		};

		const handleRadioChange = (value: string) => {
			setSelectedValue(value);
		};

		// handle model function
		const handleOpen = () => {
			document.addEventListener("click", handleClickOutside, true);
			if (addressDictRef.current && overlay && overlay.current) {
				addressDictRef.current.classList.replace("md:-translate-x-full", "md:translate-x-1/2");
				addressDictRef.current.classList.replace("translate-y-full", "translate-y-0");
				overlay.current.classList.replace("hidden", "block");
			}
		};

		const handleClose = () => {
			if (addressDictRef.current && overlay && overlay.current) {
				addressDictRef.current.classList.replace("md:translate-x-1/2", "md:-translate-x-full");

				addressDictRef.current.classList.replace("translate-y-0", "translate-y-full");

				overlay.current.classList.replace("block", "hidden");
			}
			document.removeEventListener("click", handleClickOutside, true);
		};

		const handleClickOutside = (event: any) => {
			const { target } = event;

			if (addressDictRef.current && target && "nodeType" in target) {
				if (!addressDictRef.current.contains(target)) {
					handleClose();
				}
			}
		};

		useImperativeHandle(ref, () => ({
			current: addressDictRef.current,
			open: handleOpen,
		}));

		useEffect(() => {
			document.addEventListener("click", handleClickOutside, true);

			return () => {
				document.removeEventListener("click", handleClickOutside, true);
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		useEffect(() => {
			setSelectedValue(defaultValue || "");
		}, [defaultValue]);

		return (
			<div
				ref={addressDictRef}
				className="fixed md:right-1/2 z-20 w-[100%] md:w-4/5 lg:w-3/5 md:left-auto md:-translate-x-full md:-translate-y-1/2
				 bg-white dark:bg-black-dark-3 md:rounded-3xl rounded-tl-3xl rounded-tr-3xl md:top-1/2 md:bottom-auto bottom-0 left-0 translate-y-full
				  transition-transform duration-500 ease-in-out"
			>
				<div className="relative flex justify-between p-4 border-b-2 md:p-5">
					<h3 className="text-heading-5 lg:text-heading-4 dark:text-white">Địa chỉ của tôi</h3>

					<button
						onClick={handleClose}
						className="absolute top-[50%] -translate-y-1/2 p-2 border-2 rounded-full right-6 border-gray-accent dark:border-black-dark-2"
					>
						<Delete width={20} height={20} className="dark:text-white" />
					</button>
				</div>
				<form className="p-4 space-y-4 md:p-5 md:space-y-5 h-[350px] overflow-y-auto">
					{address.map((item) => {
						return (
							<Radio
								onClick={(value: string) => handleRadioChange(value)}
								key={item._id}
								value={item._id}
								name="address"
								error={errors.address?.message}
								selected={selectedValue === item._id}
								register={register}
							>
								<div className="space-y-2">
									<h4 className="inline-block pr-4 font-semibold capitalize text-paragraph-5 lg:text-paragraph-4 dark:text-white">
										{item.name}
									</h4>
									<h4 className="inline-block pl-4 !mt-0 font-semibold capitalize border-l-2 text-paragraph-5 lg:text-paragraph-4 dark:text-white">
										{item.phone}
									</h4>
									<p className="text-paragraph-5 lg:text-paragraph-4 dark:text-white">
										{`${item.specificAddress}, ${item.ward}, ${item.district}, ${item.province}`}
									</p>
									{item.default && (
										<Badge className="w-fit shrink-0" isResponsive={false} color="pink_tertiary">
											Mặc định
										</Badge>
									)}
								</div>
							</Radio>
						);
					})}
				</form>
				<div className="p-4 space-x-4 md:p-5 md:space-x-5">
					<Button className="!py-2 md:!py-3" onClick={handleSubmit(onSubmit)} type="secondary" btnType="submit">
						Thêm địa chỉ
					</Button>
					<Button className="!py-2 md:!py-3" onClick={handleSubmit(onSubmit)} type="primary" btnType="submit">
						Lưu
					</Button>
				</div>
			</div>
		);
	}
);

AddressDictionary.displayName = "AddressDictionary";

export default AddressDictionary;
