import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useSettings } from "../../store/hooks";

export default function Error() {
	const { language } = useSettings();
	const errors = {
		Signin: language.error_page.using_another_account_mes,
		OAuthSignin: language.error_page.using_another_account_mes,
		OAuthCallback: language.error_page.using_another_account_mes,
		OAuthCreateAccount: language.error_page.using_another_account_mes,
		EmailCreateAccount: language.error_page.using_another_account_mes,
		Callback: language.error_page.using_another_account_mes,
		OAuthAccountNotLinked: language.error_page.sign_in_with_original_account_mes,
		EmailSignin: language.error_page.check_email_mes,
		CredentialsSignin: language.error_page.invalid_credentical_mes,
		default: language.error_page.unable_sign_in_mes,
		ERROR_ALREADY_LINKED_TO_ANOTHER_ACCOUNT: language.error_page.using_another_account_mes,
	};

	let { error } = useRouter().query;
	console.log("error: ", error);

	const errorMessage = error && (errors[error as keyof typeof errors] ?? errors.default);

	return <div className="flex items-center justify-center h-96 w-ful">{errorMessage}</div>;
}
