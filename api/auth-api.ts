import {
	ISignIn,
	ISignInWithSocialMedia,
	ISignInWithSocialMediaRes,
	ISignUp,
	ISignUpRes,
	StatusSocialAccount,
} from "../types/apis/auth-api";
import axiosService from "./axios-service";

const API = process.env.API_URL;

const ENDPOINT = "auth";
const URL = `${API}/${ENDPOINT}`;

const authApi = {
	signInWithSocialMedia: (body: ISignInWithSocialMedia) => {
		return axiosService.post<IResponseSuccess<ISignInWithSocialMediaRes>>(`${URL}/sign-in/social-media`, body);
	},

	signUp: (body: ISignUp) => {
		return axiosService.post<IResponseSuccess<ISignUpRes>>(`${URL}/sign-up`, body);
	},

	signIn: (body: ISignIn) => {
		return axiosService.post<IResponseSuccess<ISignInWithSocialMediaRes>>(`${URL}/sign-in`, body);
	},

	sendOTP: (email: string) => {
		return axiosService.post<IResponseSuccess<null>>(`${URL}/send-mail-otp`, { email });
	},

	checkStatusSocialAccount: async () => {
		const response = await axiosService.get<IResponseSuccess<StatusSocialAccount>>(
			`${URL}/check-status-social-account`
		);

		return response.data.data;
	},

	linkSocialAccount: async () => {
		const response = await axiosService.post<IResponseSuccess<string>>(`${URL}/link-social-account`);

		return response.data.data;
	},
};

export default authApi;
