import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/buttons/button";
import Input from "../../components/inputs/input";
import Checkbox from "../../components/inputs/checkbox";
import TitlePage from "../../components/title-page/title-page";

type FormValues = {
	email: string;
	password: string;
};

export default function SignIn() {
	const errorsNextAuth = {
		Signin: "Try signing with a different account.",
		OAuthSignin: "Try signing with a different account.",
		OAuthCallback: "Try signing with a different account.",
		OAuthCreateAccount: "Try signing with a different account.",
		EmailCreateAccount: "Try signing with a different account.",
		Callback: "Try signing with a different account.",
		OAuthAccountNotLinked: "To confirm your identity, sign in with the same account you used originally.",
		EmailSignin: "Check your email address.",
		CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
		default: "Unable to sign in.",
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const { data: session, status } = useSession();
	const { push } = useRouter();
	let { error } = useRouter().query;
	const errorMessage =
		error && (errorsNextAuth[error as keyof typeof errorsNextAuth] ?? errorsNextAuth.default);

	if (session) {
		push("/");
	}

	const onSubmit = (data: FormValues) => console.log(data);

	return (
		<div className="pb-[104px] dark:bg-black-dark-3">
			<TitlePage subtitle="Đăng nhập" title="Đăng nhập tài khoản của bạn" />
			<p>{errorMessage}</p>
			<form className="space-y-10 lg:w-[536px] lg:mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
				<Checkbox>Ghi nhớ tài khoản</Checkbox>
				<div className="space-y-6">
					<Button btnType="submit" title="Đăng nhập" type="primary" className="w-full" />
					<button
						className="px-4 py-2 bg-red-400 border rounded-md"
						onClick={() => signIn("google")}
					>
						Sign in with google
					</button>
					<button
						className="px-4 py-2 bg-red-400 border rounded-md"
						onClick={() => signIn("facebook")}
					>
						Sign in with facebook
					</button>
					<div className="space-y-6 md:grid md:grid-cols-2 md:items-center">
						<Button title="Tạo tài khoản" type="secondary" className="w-full" />
						<p className="font-normal text-center underline align-middle cursor-pointer md:text-paragraph-2 dark:text-white-light text-dark-100 text-heading-5">
							Quên mật khẩu?
						</p>
					</div>
				</div>
			</form>
		</div>
	);
}
