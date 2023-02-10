import React, { Fragment, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
}

const options = ["hello", "hi", "hie", "hshs"];

const AddressDictionary = React.forwardRef<AddressDictRefType, Props>(({ overlay }, ref) => {
	const [selectedValue, setSelectedValue] = useState<string>("");
	const addressDictRef = useRef<HTMLDivElement>(null);

	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormValues>();

	const watchAddress = watch("address");

	const onSubmit = async (data: FormValues) => {
		console.log("data: ", data);
	};

	const handleRadioChange = (value: string) => {
		setSelectedValue(value);
	};

	// handle model function
	const handleOpen = () => {
		document.addEventListener("click", handleClickOutside, true);
		if (addressDictRef.current && overlay && overlay.current) {
			addressDictRef.current.classList.replace("-left-[100%]", "left-1/2");
			overlay.current.classList.replace("hidden", "block");
		}
	};

	const handleClose = () => {
		if (addressDictRef.current && overlay && overlay.current) {
			addressDictRef.current.classList.replace("left-1/2", "-left-[100%]");
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
	}, []);

	return (
		<div
			ref={addressDictRef}
			className="fixed -left-[100%] z-20 w-[100%] md:w-4/5 lg:w-3/5 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black-dark-3 rounded-3xl top-1/2 transition-all duration-300 ease-out"
		>
			<div className="relative flex justify-between p-6 border-b-2">
				<h3 className="text-heading-4 md:text-heading-2 dark:text-white">Địa chỉ của tôi</h3>

				<button
					onClick={handleClose}
					className="absolute top-[50%] -translate-y-1/2 p-2 md:p-3 border-2 rounded-full right-6 border-gray-accent dark:border-black-dark-2"
				>
					<Delete className="w-6 h-6 md:h-8 md:w-8 dark:text-white" />
				</button>
			</div>
			<form className="p-6 space-y-6 h-[400px] overflow-y-auto">
				{options.map((item, index) => {
					if (index === 0) {
						return (
							<Radio
								onClick={(value: string) => handleRadioChange(value)}
								key={item}
								value={item}
								name="address"
								selected={selectedValue === item}
								register={register}
							>
								<div className="space-y-2">
									<h4 className="inline-block pr-4 font-semibold capitalize text-paragraph-3 md:text-heading-3 dark:text-white">
										Vo Xuan Tu
									</h4>
									<h4 className="inline-block pl-4 font-semibold capitalize border-l-2 text-paragraph-3 md:text-heading-3 dark:text-white">
										0987654321
									</h4>
									<p className="text-paragraph-3 md:text-heading-3 dark:text-white">
										Kí túc xá khu A, khu phố 6 Phường Linh Trung, Thành Phố Thủ Đức, TP.
										Hồ Chí Minh
									</p>
									<Badge
										className="w-fit shrink-0"
										isResponsive={false}
										color="pink_tertiary"
									>
										Mặc định
									</Badge>
								</div>
							</Radio>
						);
					}

					return (
						<Radio
							onClick={(value: string) => handleRadioChange(value)}
							key={item}
							value={item}
							name="address"
							selected={selectedValue === item}
							register={register}
						>
							<div>
								<h4 className="inline-block pr-4 font-semibold capitalize text-paragraph-3 md:text-heading-3 dark:text-white">
									Vo Xuan Tu
								</h4>
								<h4 className="inline-block pl-4 font-semibold capitalize border-l-2 text-paragraph-3 md:text-heading-3 dark:text-white">
									0987654321
								</h4>
								<p className="text-paragraph-3 md:text-heading-3 dark:text-white">
									Kí túc xá khu A, khu phố 6 Phường Linh Trung, Thành Phố Thủ Đức, TP. Hồ
									Chí Minh
								</p>
							</div>
						</Radio>
					);
				})}
			</form>
			<div className="p-6 space-x-6">
				<Button onClick={handleSubmit(onSubmit)} type="secondary" btnType="submit">
					Thêm địa chỉ
				</Button>
				<Button onClick={handleSubmit(onSubmit)} type="primary" btnType="submit">
					Lưu
				</Button>
			</div>
		</div>
	);
});

AddressDictionary.displayName = "AddressDictionary";

export default AddressDictionary;
