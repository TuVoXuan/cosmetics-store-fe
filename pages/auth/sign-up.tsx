import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/buttons/button";
import Birthday from "../../components/inputs/birthday";
import CodeInput from "../../components/inputs/code";
import Input from "../../components/inputs/input";
import Checkbox from "../../components/inputs/checkbox";
import TitlePage from "../../components/title-page/title-page";
import authApi from "../../api/auth-api";
import { useRouter } from "next/router";
import APP_PATH from "../../constants/app-path";
import { Gender } from "../../constants/enums";
import Dropdown from "../../components/inputs/dropdown";
import { toastError } from "../../util/toast";
import { useSettings } from "../../store/hooks";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";

type FormValues = {
	email: string;
	password: string;
	name: string;
	birthday: Date;
	gender: Gender;
	code: string;
	agreePolicy: boolean;
};

export default function SignUp() {
	const router = useRouter();
	const { language } = useSettings();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit = async (data: FormValues) => {
		try {
			await authApi.signUp({
				birthday: data.birthday,
				email: data.email,
				gender: data.gender,
				name: data.name,
				password: data.password,
				code: data.code,
			});

			router.push({
				pathname: APP_PATH.SIGN_IN,
				query: router.query,
			});
		} catch (error) {
			toastError((error as IResponseError).error);
			console.log("error: ", error);
		}
	};

	return (
		<div className="pb-[104px] dark:bg-black-dark-3">
			<Breadcrumb
				className="hidden lg:block lg:mt-14"
				items={[
					{ title: language.header.home_tag, href: APP_PATH.HOME },
					{ title: language.sign_up_page.sign_up_sub_title, href: APP_PATH.SIGN_UP },
				]}
			/>
			<TitlePage
				className="py-14"
				subtitle={language.sign_up_page.sign_up_sub_title}
				title={language.sign_up_page.sign_up_title}
			/>
			<form id="registerForm" className="gap-5 space-y-5 md:grid md:grid-cols-2 md:space-y-0 lg:w-2/3 lg:mx-auto">
				<Input
					name="email"
					register={register}
					option={{
						required: {
							value: true,
							message: language.sign_in_page.rule_required_email,
						},
						pattern: {
							value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							message: language.sign_in_page.rule_format_email,
						},
					}}
					error={errors.email?.message}
					className="w-full"
					label={language.contact_page.email_address}
					placeholder="NguyenVanA@gmail.com"
				/>
				<Input
					name="password"
					register={register}
					className="w-full tracking-widest"
					label={language.account_info_page.input_pass_label}
					placeholder="•••••••••"
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
					error={errors.password?.message}
					type="password"
				/>
				<Input
					name="name"
					register={register}
					className="w-full tracking-widest"
					label={language.account_info_page.input_name_label}
					placeholder="Nguyễn Văn A"
					option={{
						required: {
							value: true,
							message: language.account_info_page.input_name_required_mes,
						},
					}}
					error={errors.name?.message}
					type="text"
				/>
				<CodeInput
					name="code"
					register={register}
					label={language.sign_up_page.input_code_label}
					option={{
						required: {
							value: true,
							message: language.sign_up_page.input_code_required_mes,
						},
						pattern: {
							value: /^[0-9]*$/,
							message: language.sign_up_page.input_code_incorrect_format_mes,
						},
					}}
					error={errors.code?.message}
					className="w-full"
					getValueRef={getValues}
				/>
				<Birthday
					name="birthday"
					label={language.account_info_page.input_birthday_label}
					register={register}
					error={errors.birthday?.message}
					option={{
						required: {
							value: true,
							message: language.account_info_page.input_birthday_required_mes,
						},
					}}
					className="w-full"
				/>

				<Dropdown
					label={language.account_info_page.dropdown_gender_label}
					options={[
						{
							label: language.account_info_page.gender_female,
							value: "female",
						},
						{
							label: language.account_info_page.gender_male,
							value: "male",
						},
						{
							label: language.account_info_page.gender_other,
							value: "other",
						},
					]}
					name="gender"
					register={register}
					option={{
						required: {
							value: true,
							message: language.account_info_page.dropdown_gender_required_mes,
						},
					}}
					error={errors.gender?.message}
				/>
				<div className="col-span-2">
					<Checkbox
						name="agreePolicy"
						register={register}
						option={{
							required: {
								value: true,
								message: language.sign_up_page.agree_with_terms_mes,
							},
						}}
						error={errors.agreePolicy?.message}
					>
						<p className="text-paragraph-5 dark:text-white-light md:text-paragraph-4">
							{language.sign_up_page.read_adnd_agree}{" "}
							<a className="font-semibold underline">{language.sign_up_page.terms_and_conditions}</a>
						</p>
					</Checkbox>
				</div>
			</form>
			<div className="grid grid-cols-1 gap-y-4 mt-14 md:grid-cols-2 md:gap-x-6 md:w-[496px] md:mx-auto">
				<Button form="registerForm" onClick={handleSubmit(onSubmit)} type="primary" className="w-full">
					{language.sign_in_page.create_an_account_title}
				</Button>
				<Button type="secondary" className="w-full">
					{language.sign_in_page.sign_in_sub_title}
				</Button>
			</div>
		</div>
	);
}
