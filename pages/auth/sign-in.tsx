import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/buttons/button";
import BxlFacebook from "../../components/icons/bxl-facebook";
import Facebook from "../../components/icons/facebook";
import Google from "../../components/icons/google";
import Input from "../../components/inputs/input";
import Checkbox from "../../components/inputs/checkbox";
import TitlePage from "../../components/title-page/title-page";
import APP_PATH from "../../constants/app-path";
import { toastError } from "../../util/toast";
import { useSettings } from "../../store/hooks";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";

type FormValues = {
	email: string;
	password: string;
	rememberMe: boolean;
};

export default function SignIn() {
	const router = useRouter();
	const { language } = useSettings();
	const { redirectURL } = router.query;
	const errorsNextAuth = {
		Signin: "Hãy thử lại với một tài khoản khác.",
		OAuthSignin: "Hãy thử lại với một tài khoản khác.",
		OAuthCallback: "Hãy thử lại với một tài khoản khác.",
		OAuthCreateAccount: "Hãy thử lại với một tài khoản khác.",
		EmailCreateAccount: "Hãy thử lại với một tài khoản khác.",
		Callback: "Hãy thử lại với một tài khoản khác.",
		OAuthAccountNotLinked: "Hãy đăng nhập bằng tài khoản bạn đã sử dụng ban đầu",
		EmailSignin: "Hãy kiểm tra lại địa chỉ email.",
		CredentialsSignin: "Đăng nhập thất bại. Hãy đảm bảo rằng các thông tin bạn cung cấp là chính xác",
		default: "Không thể đăng nhập.",
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();
	const { data: session, status } = useSession();
	const { push } = useRouter();
	let { error } = useRouter().query;
	const errorMessage = error && (errorsNextAuth[error as keyof typeof errorsNextAuth] ?? errorsNextAuth.default);

	// if (session) {
	// 	push("/");
	// }

	const onSubmit = async (data: FormValues) => {
		try {
			console.log("data: ", data);

			const res = await signIn("credentials", {
				redirect: false,
				email: data.email,
				password: data.password,
				rememberMe: data.rememberMe,
				callbackUrl: redirectURL as string,
			});
			console.log("res: ", res);

			if (res?.error) {
				toastError(res.error);
			} else if (res) {
				router.push(res.url || "/");
			}
		} catch (error) {
			console.log("error: ", error);
		}
	};

	const handleSignUpClick = () => {
		router.push({
			pathname: APP_PATH.SIGN_UP,
			query: router.query,
		});
	};

	return (
		<div className="pb-[104px] dark:bg-black-dark-3">
			<Breadcrumb
				className="hidden lg:block lg:mt-14"
				items={[
					{ title: language.header.home_tag, href: APP_PATH.HOME },
					{ title: language.sign_in_page.sign_in_sub_title, href: APP_PATH.SIGN_IN },
				]}
			/>
			<TitlePage
				className="py-14"
				subtitle={language.sign_in_page.sign_in_sub_title}
				title={language.sign_in_page.sign_in_title}
			/>
			{errorMessage && (
				<p className="lg:w-[536px] lg:mx-auto px-4 py-2 mb-2 text-white bg-red-400 rounded-md">{errorMessage}</p>
			)}
			<form className="space-y-5 lg:w-[496px] lg:mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
					}}
					error={errors.password?.message}
					type="password"
				/>
				<Checkbox register={register} name="rememberMe">
					{language.sign_in_page.remember_me}
				</Checkbox>
				<div className="space-y-6">
					<Button btnType="submit" type="primary" className="w-full">
						{language.sign_in_page.sign_in_sub_title}
					</Button>
					<Button
						type="secondary"
						className="flex items-center justify-center w-full"
						onClick={() =>
							signIn("google", {
								callbackUrl: redirectURL as string,
							})
						}
					>
						<Google width={24} height={24} className="inline mr-4 text-black dark:text-light-100" />
						{language.sign_in_page.sign_in_google}
					</Button>
					<Button
						type="secondary"
						className="flex items-center justify-center w-full"
						onClick={() =>
							signIn("facebook", {
								callbackUrl: redirectURL as string,
							})
						}
					>
						<BxlFacebook width={24} height={24} className="inline mr-4 text-black dark:text-light-100" />
						{language.sign_in_page.sign_in_facebook}
					</Button>
					<div className="space-y-6 md:grid md:grid-cols-2 md:items-center md:gap-y-6 md:gap-x-2 md:space-y-0">
						<Button onClick={handleSignUpClick} type="secondary" className="w-full">
							{language.sign_in_page.create_an_account_title}
						</Button>
						<p className="font-normal text-center underline align-middle cursor-pointer text-paragraph-5 md:text-paragraph-4 dark:text-white-light text-dark-100">
							{language.sign_in_page.forgot_password}?
						</p>
					</div>
				</div>
			</form>
		</div>
	);
}
