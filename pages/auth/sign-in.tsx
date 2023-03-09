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

type FormValues = {
	email: string;
	password: string;
	rememberMe: boolean;
};

export default function SignIn() {
	const router = useRouter();
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
	const errorMessage =
		error && (errorsNextAuth[error as keyof typeof errorsNextAuth] ?? errorsNextAuth.default);

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
			<TitlePage className="py-14" subtitle="Đăng nhập" title="Đăng nhập tài khoản của bạn" />
			{errorMessage && (
				<p className="lg:w-[536px] lg:mx-auto px-4 py-2 mb-2 text-white bg-red-400 rounded-md">
					{errorMessage}
				</p>
			)}
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
				<Checkbox register={register} name="rememberMe">
					Ghi nhớ tài khoản
				</Checkbox>
				<div className="space-y-6">
					<Button btnType="submit" type="primary" className="w-full">
						Đăng nhập
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
						<Google
							width={24}
							height={24}
							className="inline mr-4 text-black dark:text-light-100"
						/>
						Đăng nhập với Google
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
						<BxlFacebook
							width={24}
							height={24}
							className="inline mr-4 text-black dark:text-light-100"
						/>
						Đăng nhập với Facebook
					</Button>
					<div className="space-y-6 md:grid md:grid-cols-2 md:items-center md:gap-y-6 md:gap-x-2 md:space-y-0">
						<Button onClick={handleSignUpClick} type="secondary" className="w-full">
							Tạo tài khoản
						</Button>
						<p className="font-normal text-center underline align-middle cursor-pointer md:text-paragraph-2 dark:text-white-light text-dark-100 text-heading-5">
							Quên mật khẩu?
						</p>
					</div>
				</div>
			</form>
		</div>
	);
}
