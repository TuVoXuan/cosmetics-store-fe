import React from "react";
import { useForm } from "react-hook-form";
import { userApi } from "../../../api/user-api";
import Button from "../../../components/buttons/button";
import Input from "../../../components/inputs/input";
import TitlePage from "../../../components/title-page/title-page";
import { toastError, toastSuccess } from "../../../util/toast";
import { useSettings } from "../../../store/hooks";

interface FormValue {
	password: string;
	repeat: string;
}

interface Props {
	setHasPass: (value: boolean) => void;
}

export default function CreatePass({ setHasPass }: Props) {
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
			await userApi.createPass(value.password);
			reset();
			setHasPass(true);
			toastSuccess(language.account_info_page.mes_create_pass_success);
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	return (
		<div>
			<TitlePage
				className="mb-8 mt-14"
				subtitle={language.account_info_page.create_pass_subtitle}
				title={language.account_info_page.create_pass_title}
			/>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-10 md:w-4/5 md:mx-auto lg:w-full lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0"
			>
				<Input
					className="w-full"
					label={language.account_info_page.input_pass_label}
					type="password"
					name="password"
					placeholder="•••••••••"
					error={errors.password?.message}
					register={register}
					option={{
						required: {
							value: true,
							message: language.account_info_page.input_pass_required_mes,
						},
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
							message: language.account_info_page.input_pass_not_match_format,
						},
					}}
				/>
				<Input
					className="w-full"
					type="password"
					label={language.account_info_page.input_repeat_pass_label}
					name="repeat"
					placeholder="•••••••••"
					error={
						errors.repeat?.type === "validate"
							? language.account_info_page.input_repeat_pass_not_match_pass
							: errors.repeat?.message
					}
					register={register}
					option={{
						required: {
							value: true,
							message: language.account_info_page.input_repeat_pass_required_mes,
						},
						validate: () => getValues("repeat") === getValues("password"),
					}}
				/>
				<Button btnType="submit" className="w-full md:col-span-2 lg:col-span-1" type="primary">
					{language.account_info_page.update_btn}
				</Button>
			</form>
		</div>
	);
}
