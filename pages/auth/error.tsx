import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function Error() {
	const errors = {
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
		ERROR_ALREADY_LINKED_TO_ANOTHER_ACCOUNT: "Try using another account",
	};

	let { error } = useRouter().query;
	console.log("error: ", error);

	const errorMessage = error && (errors[error as keyof typeof errors] ?? errors.default);

	return <div className="flex items-center justify-center h-96 w-ful">{errorMessage}</div>;
}
