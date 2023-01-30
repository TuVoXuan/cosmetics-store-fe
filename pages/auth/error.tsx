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
	};

	let { error } = useRouter().query;

	const errorMessage = error && (errors[error as keyof typeof errors] ?? errors.default);

	return <div>{errorMessage}</div>;
}