import { AdapterUser } from "next-auth/adapters";
import { Gender } from "../../constants/enums";

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

declare interface ISignUp {
	email: string;
	password: string;
	name: string;
	gender: Gender;
	birthday: Date;
	code: string;
}

declare interface ISignUpRes {
	token: string;
	user: IUserBasicInfo;
}

declare interface ISignIn {
	email: string;
	password: string;
	rememberMe?: boolean;
}

declare interface StatusSocialAccount {
	facebook: boolean;
	google: boolean;
}
