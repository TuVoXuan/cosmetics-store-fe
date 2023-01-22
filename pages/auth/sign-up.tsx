import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/buttons/button";
import Birthday from "../../components/inputs/birthday";
import CodeInput from "../../components/inputs/code";
import Input from "../../components/inputs/input";
import RadioInput from "../../components/inputs/radio-input";
import TitlePage from "../../components/title-page/title-page";
import { Gender } from "../../constants/enums";

type FormValues = {
	email: string;
	password: string;
	name: string;
	gender: Gender;
	birthday: Date;
	code: number;
};

export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit = (data: FormValues) => console.log(data);

	return (
		<div className="pb-[104px] dark:bg-black-dark-3">
			<TitlePage subtitle="Đăng ký" title="Tạo tài khoản của bạn" />
			<form
				id="registerForm"
				className="space-y-10 lg:w-[536px] lg:mx-auto"
				// onSubmit={handleSubmit(onSubmit)}
			>
				<Input
					name="email"
					register={register}
					option={{
						required: {
							value: true,
							message: "Yêu cầu email",
						},
						pattern: {
							value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							message: "Email không đúng định dạng",
						},
					}}
					error={errors.email?.message}
					className="w-full"
					label="Địa chỉ email"
					placeholder="NguyenVanA@gmail.com"
				/>
				<Input
					name="password"
					register={register}
					className="w-full tracking-widest"
					label="Mật khẩu"
					placeholder="•••••••••"
					option={{
						required: {
							value: true,
							message: "Yêu cầu mật khẩu",
						},
					}}
					error={errors.password?.message}
					type="password"
				/>
				<Input
					name="name"
					register={register}
					className="w-full tracking-widest"
					label="Họ tên"
					placeholder="Nguyễn Văn A"
					option={{
						required: {
							value: true,
							message: "Yêu cầu họ tên",
						},
					}}
					error={errors.password?.message}
					type="text"
				/>
				<CodeInput
					name="code"
					register={register}
					label="Code"
					option={{
						required: {
							value: true,
							message: "Yêu cầu nhập code",
						},
						pattern: {
							value: /^[0-9]*$/,
							message: "Code chỉ chứa số",
						},
					}}
					error={errors.code?.message}
					className="w-full"
				/>
				<Birthday
					name="birthday"
					label="Ngày sinh"
					register={register}
					error={errors.birthday?.message}
					option={{
						required: {
							value: true,
							message: "Yêu cầu nhập ngày sinh",
						},
					}}
					className="w-full"
				/>
				<RadioInput>
					<p className="text-paragraph-4 dark:text-white-light">
						Tôi đã đọc và đồng ý <a className="font-semibold underline">điều khoản & điều kiện</a>
					</p>
				</RadioInput>
			</form>
			<div className="grid grid-cols-1 gap-y-4 mt-14">
				<Button
					form="registerForm"
					onClick={handleSubmit(onSubmit)}
					title="Tại tài khoản"
					type="primary"
					className="w-full"
				/>
				<Button title="Đăng nhập" type="secondary" className="w-full" />
			</div>
		</div>
	);
}
