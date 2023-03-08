import React, { useEffect, useState } from "react";
import authApi from "../../../api/auth-api";
import TitlePage from "../../../components/title-page/title-page";
import { StatusSocialAccount } from "../../../types/apis/auth-api";
import Image from "next/image";
import ToggleBtn from "../../../components/buttons/toggle-btn";
import { signIn } from "next-auth/react";
import { toastError, toastSuccess } from "../../../util/toast";
import APP_PATH from "../../../constants/app-path";

export default function SocialMedia() {
	const [statusSocialAccount, setStatusSocialAccount] = useState<StatusSocialAccount>();

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
					toastSuccess("Liên kết thành công");
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
					toastSuccess("Liên kết thành công");
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
			<TitlePage className="mb-8 mt-14" subtitle="Mạng xã hội" title="Liên kết mạng xã hội" />

			<div className="space-y-4 md:w-2/3 lg:w-full lg:grid lg:grid-cols-2 lg:gap-x-14 lg:space-y-0">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-x-4">
						<Image src="/facebook.png" width={32} height={32} alt="facebook" />
						<p className="text-paragraph-2 dark:text-light-100 lg:text-paragraph-1">Facebook</p>
					</div>
					{/* <p className="lg:text-paragraph-3">{statusSocialAccount?.facebook ? "Đã liên kết" : "Chưa liên kết"}</p> */}
					<ToggleBtn
						className="!rounded-full"
						value={statusSocialAccount?.facebook || false}
						toggle={toggleFacebook}
						childrenOn="On"
						childrenOff="Off"
					/>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-x-4">
						<Image src="/google.png" width={32} height={32} alt="google" />
						<p className="text-paragraph-2 dark:text-light-100 lg:text-paragraph-1">Google</p>
					</div>
					<ToggleBtn
						className="!rounded-full"
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
