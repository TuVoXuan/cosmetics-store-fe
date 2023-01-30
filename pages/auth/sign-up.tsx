import { signIn, useSession } from "next-auth/react";
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

type FormValues = {
	email: string;
	password: string;
	name: string;
	birthday: Date;
	code: string;
	agreePolicy: boolean;
};

export default function SignUp() {
	const { data: session } = useSession();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const [gender, setGender] = useState<string>("");
	const [genderError, setGenderError] = useState<string>("");

	const onSubmit = async (data: FormValues) => {
		console.log("data: ", data);
		console.log("gender: ", gender);
		if (gender === "") {
			setGenderError("Yêu cầu chọn giới tính");
			return;
		}

		try {
			const res = await authApi.signUp({
				birthday: data.birthday,
				email: data.email,
				gender: gender as Gender,
				name: data.name,
				password: data.password,
				code: data.code,
			});
			if (session) {
				session.user.token = res.data.data.token;
				session.user.email = res.data.data.user.email;
				session.user.name = res.data.data.user.name;
			}
			router.push(APP_PATH.HOME);
		} catch (error) {
			console.log("error: ", error);
		}
	};

	return (
		<div className="pb-[104px] dark:bg-black-dark-3">
			<TitlePage subtitle="Đăng ký" title="Tạo tài khoản của bạn" />
			<form id="registerForm" className="space-y-10 lg:w-[496px] lg:mx-auto">
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
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
							message:
								"Mật khẩu phải chứa ít nhất 8 kí tự bao gồm 1 chữ, 1 số, 1 kí tự đặc biệt",
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
					error={errors.name?.message}
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

				<Dropdown
					label="Giới tính"
					size={"large"}
					options={[
						{
							label: "Chọn giới tính",
							value: "",
						},
						{
							label: "Female",
							value: "female",
						},
						{
							label: "Male",
							value: "male",
						},
						{
							label: "Other",
							value: "other",
						},
					]}
					onChange={(value: string) => setGender(value)}
					error={genderError}
				/>
				<Checkbox
					name="agreePolicy"
					register={register}
					option={{
						required: {
							value: true,
							message: "Yêu cầu đồng ý chính sách",
						},
					}}
					error={errors.agreePolicy?.message}
				>
					<p className="text-paragraph-4 dark:text-white-light md:text-paragraph-2">
						Tôi đã đọc và đồng ý <a className="font-semibold underline">điều khoản & điều kiện</a>
					</p>
				</Checkbox>
			</form>
			<div className="grid grid-cols-1 gap-y-4 mt-14 md:grid-cols-2 md:gap-x-6 md:w-[496px] md:mx-auto">
				<Button
					form="registerForm"
					onClick={handleSubmit(onSubmit)}
					type="primary"
					className="w-full"
				>
					Tại tài khoản
				</Button>
				<Button type="secondary" className="w-full">
					Đăng nhập
				</Button>
			</div>
		</div>
	);
}
