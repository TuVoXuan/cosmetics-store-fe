import React, { useEffect, useMemo, useState } from "react";
import { userApi } from "../../api/user-api";
import FacebookColor from "../../components/icons/facebook-color";
import GoogleColor from "../../components/icons/google-color";
import TitlePage from "../../components/title-page/title-page";
import ChangePass from "../../views/user/info/change-pass";
import CreatePass from "../../views/user/info/create-pass";
import SocialMedia from "../../views/user/info/social-media";
import UpdateInfo from "../../views/user/info/update-info";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import APP_PATH from "../../constants/app-path";
import { useSettings } from "../../store/hooks";

export default function Info() {
	// state
	const [hasPass, setHasPass] = useState(false);

	// context
	const { language } = useSettings();

	const checkUserHasPass = async () => {
		const data = await userApi.checkHasPass();
		setHasPass(data);
	};

	useEffect(() => {
		checkUserHasPass();
	}, []);

	return (
		<div className="mb-28">
			<Breadcrumb
				className="hidden lg:block lg:mt-14"
				items={[
					{ title: language.header.home_tag, href: APP_PATH.HOME },
					{ title: language.account_info_page.info_subtitle, href: APP_PATH.INFO },
				]}
			/>
			<UpdateInfo />
			{hasPass ? <ChangePass /> : <CreatePass setHasPass={setHasPass} />}
			<SocialMedia />
		</div>
	);
}
