import React from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useSettings } from "../../store/hooks";
import { deleteAddress, setDefaultAddress } from "../../redux/actions/user-action";
import { toastError, toastSuccess } from "../../util/toast";
import Badge from "../badge/badge";
import Button from "../buttons/button";
import Edit from "../icons/edit";
import Trash from "../icons/trash";
import Warning from "../icons/warning";

interface Props {
	address: IAddressExtract;
	onUpdate: (value: IAddressExtract) => void;
}

export default function AddressCard({ address, onUpdate }: Props) {
	const { language } = useSettings();
	const dispatch = useAppDispatch();

	const handeDelete = async () => {
		try {
			await dispatch(deleteAddress(address._id)).unwrap();
			toastSuccess(language.component_ui.mes_delete_address_success);
		} catch (error) {
			console.log("error: ", error);
			toastError((error as IResponseError).error);
		}
	};

	const handleSetDefault = async () => {
		try {
			await dispatch(setDefaultAddress(address._id)).unwrap();
			toastSuccess(language.component_ui.mes_set_default_address_success);
		} catch (error) {
			console.log("error: ", error);
			toastError((error as IResponseError).error);
		}
	};

	const showWarningToast = () => {
		toast.loading(
			(t) => (
				<div className="space-y-3">
					<p>{language.component_ui.mes_ask_want_to_delete_address}</p>

					<div className="flex justify-end gap-x-3">
						<button
							className="px-5 py-2 font-semibold border-2 rounded-3xl border-gray-accent hover:border-black"
							onClick={() => toast.dismiss(t.id)}
						>
							{language.component_ui.cancle}
						</button>
						<button
							onClick={() => {
								toast.dismiss(t.id);
								handeDelete();
							}}
							className="px-5 py-2 font-semibold text-white rounded-3xl bg-red-accent"
						>
							{language.component_ui.delete}
						</button>
					</div>
				</div>
			),
			{
				style: { maxWidth: "500px" },
				icon: <Warning className="text-yellow-tertiary-100" />,
			}
		);
	};

	return (
		<div className="pb-6 space-y-4 border-b-2 border-gray-accent dark:border-black-dark-2 md:grid md:grid-cols-3">
			<div className="space-y-2 md:col-span-2">
				<h4 className="font-semibold capitalize lg:inline-block lg:pr-4 text-paragraph-5 md:text-paragraph-4 dark:text-white">
					{address.name}
				</h4>
				<h4 className="font-semibold capitalize lg:inline-block lg:pl-4 lg:border-l-2 lg:border-gray-accent lg:dark:border-black-dark-2 text-paragraph-5 md:text-paragraph-4 dark:text-white">
					{address.phone}
				</h4>
				<p className="text-paragraph-5 md:text-paragraph-4 dark:text-white">
					{address.specificAddress}, {address.ward}, {address.district}, {address.province}
				</p>
				{address.default && (
					<Badge className="w-fit shrink-0" isResponsive={false} color="pink_tertiary">
						{language.component_ui.default}
					</Badge>
				)}
			</div>
			<div className="flex items-center justify-between md:flex-col md:justify-center md:space-y-4 lg:items-end">
				<div className="hidden md:block md:space-x-4">
					<button
						onClick={() => onUpdate(address)}
						className="p-3 text-heading-6 md:text-heading-5 text-secondary-100"
					>
						{language.component_ui.update}
					</button>
					<button
						onClick={showWarningToast}
						className="p-3 text-heading-6 md:text-heading-5 text-red-accent"
					>
						{language.component_ui.delete}
					</button>
				</div>
				<Button onClick={handleSetDefault} disable={address.default} type="secondary">
					{language.component_ui.set_default}
				</Button>
				<button onClick={() => onUpdate(address)} className="p-3 md:hidden">
					<Edit className="w-6 h-6 dark:text-white" />
				</button>
				<button onClick={showWarningToast} className="p-3 md:hidden">
					<Trash className="w-6 h-6 text-red-accent dark:text-white" />
				</button>
			</div>
		</div>
	);
}
