import React, { useEffect, useState } from "react";
import authApi from "../../../api/auth-api";
import TitlePage from "../../../components/title-page/title-page";
import { StatusSocialAccount } from "../../../types/apis/auth-api";
import Image from "next/image";
import ToggleBtn from "../../../components/buttons/toggle-btn";
import { signIn } from "next-auth/react";
import { toastError, toastSuccess } from "../../../util/toast";
import APP_PATH from "../../../constants/app-path";
import { useSettings } from "../../../store/hooks";

export default function SocialMedia() {
	const [statusSocialAccount, setStatusSocialAccount] = useState<StatusSocialAccount>();

	const { language } = useSettings();

	const fetchStatusAccount = async () => {
		try {
			const response = await authApi.checkStatusSocialAccount();
			setStatusSocialAccount(response);
		} catch (error) {
			console.log("error: ", error);
		}
	};

	const toggleFacebook = async () => {
		try {
			if (statusSocialAccount) {
				const response = await signIn("facebook", {
					redirect: false,
					callbackUrl: APP_PATH.INFO,
				});

				if (response && response.ok) {
					toastSuccess(language.account_info_page.link_social_success_mes);
				}

				if (response && response.error) {
					toastError(response.error);
				}
			}
		} catch (error) {
			console.log("error: ", error);
		}
	};

	const toggleGoogle = async () => {
		try {
			if (statusSocialAccount && !statusSocialAccount.google) {
				const response = await signIn("google", {
					redirect: false,
					callbackUrl: APP_PATH.INFO,
				});

				if (response && response.ok) {
					toastSuccess(language.account_info_page.link_social_success_mes);
				}

				if (response && response.error) {
					toastError(response.error);
				}
			}
		} catch (error) {
			console.log("error: ", error);
		}
	};

	useEffect(() => {
		fetchStatusAccount();
	}, []);

	return (
		<div>
			<TitlePage
				className="mb-8 mt-14"
				subtitle={language.account_info_page.social_subtitle}
				title={language.account_info_page.social_title}
			/>

			<div className="space-y-4 md:w-1/2 md:mx-auto lg:w-4/5 lg:grid lg:grid-cols-2 lg:gap-x-14 lg:space-y-0">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-x-4">
						<Image src="/facebook.png" width={32} height={32} alt="facebook" />
						<p className="text-paragraph-5 dark:text-light-100 lg:text-paragraph-4">Facebook</p>
					</div>
					{/* <p className="lg:text-paragraph-3">{statusSocialAccount?.facebook ? "Đã liên kết" : "Chưa liên kết"}</p> */}
					<ToggleBtn
						className="!rounded-full h-fit"
						value={statusSocialAccount?.facebook || false}
						toggle={toggleFacebook}
						childrenOn="On"
						childrenOff="Off"
					/>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-x-4">
						<Image src="/google.png" width={32} height={32} alt="google" />
						<p className="text-paragraph-5 dark:text-light-100 lg:text-paragraph-4">Google</p>
					</div>
					<ToggleBtn
						className="!rounded-full h-fit"
						value={statusSocialAccount?.google || false}
						toggle={toggleGoogle}
						childrenOn="On"
						childrenOff="Off"
					/>
					{/* <p className="lg:text-paragraph-3">{statusSocialAccount?.google ? "Đã liên kết" : "Chưa liên kết"}</p> */}
				</div>
			</div>
		</div>
	);
}
