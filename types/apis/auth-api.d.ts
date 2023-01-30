import { AdapterUser } from "next-auth/adapters";

declare interface ISignInWithSocialMedia {
	user: User | AdapterUser;
	account: Account | null;
}

declare interface ISignInWithSocialMediaRes {
	token: string;
	user: {
		_id: string;
		email: string;
		name: string;
	};
}

declare interface ISignIn {
	email: string;
	password: string;
	rememberMe?: boolean;
}
