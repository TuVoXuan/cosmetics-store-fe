import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { userApi } from "../../../api/user-api";
import Button from "../../../components/buttons/button";
import Birthday from "../../../components/inputs/birthday";
import Dropdown from "../../../components/inputs/dropdown";
import Input from "../../../components/inputs/input";
import TitlePage from "../../../components/title-page/title-page";
import { Gender } from "../../../constants/enums";
import { toastError } from "../../../util/toast";
import { useSettings } from "../../../store/hooks";

interface FormValue {
	name: string;
	email: string;
	gender: Gender;
	birthday: string;
}

export default function UpdateInfo() {
	const [user, setUser] = useState<IUserBasicInfo>();
	const { language } = useSettings();
	const { data: session } = useSession();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValue>({
		defaultValues: useMemo(() => user, [user]),
	});

	const fetchUser = async () => {
		if (session?.user.email) {
			const data = await userApi.getBasicInfo(session.user.email);
			data.birthday = data.birthday ? data.birthday.split("T")[0] : new Date().toISOString();
			setUser(data);
		}
	};

	const onSubmit = async (value: FormValue) => {
		try {
			toast.loading(language.account_info_page.mes_updating, { id: "updateUserInfo" });
			const updatedUser = await userApi.updateUser({
				name: value.name,
				gender: value.gender,
				birthday: new Date(value.birthday).toISOString(),
			});

			setUser({ ...updatedUser, birthday: updatedUser.birthday.split("T")[0] });
			toast.dismiss("updateUserInfo");
			toast.success(language.account_info_page.mes_update_success);
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	useEffect(() => {
		fetchUser();
	}, [session]);

	useEffect(() => {
		reset(user);
	}, [user]);

	return (
		<>
			<TitlePage
				className="mb-8 mt-14"
				subtitle={language.account_info_page.info_subtitle}
				title={language.account_info_page.info_title}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-5 md:w-3/5 md:mx-auto lg:w-4/5 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
					<Input
						register={register}
						className="w-full"
						label={language.account_info_page.input_name_label}
						placeholder={language.account_info_page.input_name_placeholder}
						name="name"
						error={errors.name?.message}
						option={{
							required: {
								value: true,
								message: language.account_info_page.input_name_required_mes,
							},
						}}
					/>
					<Input
						register={register}
						disabled
						className="w-full"
						label={language.account_info_page.input_email_label}
						name="email"
						error={errors.email?.message}
					/>
					<Dropdown
						register={register}
						name={"gender"}
						error={errors.gender?.message}
						option={{
							required: {
								value: true,
								message: language.account_info_page.dropdown_gender_required_mes,
							},
						}}
						defaulValue={user?.gender}
						onChange={(value: string) => {
							console.log("first");
						}}
						label={language.account_info_page.dropdown_gender_label}
						options={[
							{ label: language.account_info_page.gender_male, value: "male" },
							{ label: language.account_info_page.gender_female, value: "female" },
							{ label: language.account_info_page.gender_other, value: "other" },
						]}
					/>
					<Birthday
						className="w-full"
						label={language.account_info_page.input_birthday_label}
						name="birthday"
						defaultValue={user?.birthday}
						error={errors.birthday?.message}
						register={register}
						option={{
							required: {
								value: true,
								message: language.account_info_page.input_birthday_required_mes,
							},
						}}
					/>
					<Button className="w-full lg:col-start-2" type="primary" btnType="submit">
						{language.account_info_page.update_btn}
					</Button>
				</div>
			</form>
		</>
	);
}
