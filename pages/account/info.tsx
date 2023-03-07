import React, { useEffect, useMemo, useState } from "react";
import { userApi } from "../../api/user-api";
import FacebookColor from "../../components/icons/facebook-color";
import GoogleColor from "../../components/icons/google-color";
import TitlePage from "../../components/title-page/title-page";
import ChangePass from "../../views/user/info/change-pass";
import CreatePass from "../../views/user/info/create-pass";
import SocialMedia from "../../views/user/info/social-media";
import UpdateInfo from "../../views/user/info/update-info";

export default function Info() {
	const [hasPass, setHasPass] = useState(false);

	const checkUserHasPass = async () => {
		const data = await userApi.checkHasPass();
		setHasPass(data);
	};

	useEffect(() => {
		checkUserHasPass();
	}, []);

	return (
		<div className="mb-28">
			<UpdateInfo />
			{hasPass ? <ChangePass /> : <CreatePass setHasPass={setHasPass} />}
			<SocialMedia />
		</div>
	);
}
