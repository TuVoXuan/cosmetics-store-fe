import React from "react";
import { useForm } from "react-hook-form";
import { userApi } from "../../../api/user-api";
import Button from "../../../components/buttons/button";
import Input from "../../../components/inputs/input";
import TitlePage from "../../../components/title-page/title-page";
import { toastError, toastSuccess } from "../../../util/toast";
import { useSettings } from "../../../store/hooks";

interface FormValue {
	oldPass: string;
	newPass: string;
	repeat: string;
}

export default function ChangePass() {
	const { language } = useSettings();

	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
		reset,
	} = useForm<FormValue>();

	const onSubmit = async (value: FormValue) => {
		try {
			await userApi.changePass({
				newPass: value.newPass,
				oldPass: value.oldPass,
			});

			reset();

			toastSuccess(language.account_info_page.mes_update_pass_success);
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	return (
		<div>
			<TitlePage
				className="mb-8 mt-14"
				subtitle={language.account_info_page.change_pass_subtitle}
				title={language.account_info_page.change_pass_title}
			/>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-5 md:w-3/5 md:mx-auto lg:w-4/5 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0"
			>
				<Input
					className="w-full"
					label={language.account_info_page.input_old_pass_label}
					name="oldPass"
					type="password"
					register={register}
					placeholder="•••••••••"
					error={errors.oldPass?.message}
					option={{
						required: {
							value: true,
							message: language.account_info_page.input_old_pass_require_mes,
						},
					}}
				/>
				<Input
					className="w-full"
					label={language.account_info_page.input_new_pass_label}
					type="password"
					name="newPass"
					placeholder="•••••••••"
					error={errors.newPass?.message}
					register={register}
					option={{
						required: {
							value: true,
							message: language.account_info_page.input_new_pass_required_mes,
						},
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
							message: language.account_info_page.input_new_pass_not_match_mes,
						},
					}}
				/>
				<Input
					className="w-full"
					type="password"
					label={language.account_info_page.input_new_pass_repeat_label}
					name="repeat"
					placeholder="•••••••••"
					error={
						errors.repeat?.type === "validate"
							? language.account_info_page.input_new_pass_repeat_not_match_new_pass
							: errors.repeat?.message
					}
					register={register}
					option={{
						required: {
							value: true,
							message: language.account_info_page.input_new_pass_repeat_require_mes,
						},
						validate: () => getValues("repeat") === getValues("newPass"),
					}}
				/>
				<Button btnType="submit" className="self-end w-full h-fit" type="primary">
					{language.account_info_page.update_btn}
				</Button>
			</form>
		</div>
	);
}
