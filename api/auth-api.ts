import {
	ISignIn,
	ISignInWithSocialMedia,
	ISignInWithSocialMediaRes,
	ISignUp,
	ISignUpRes,
} from "../types/apis/auth-api";
import axiosService from "./axios-service";

const API = process.env.API_URL;
console.log("API: ", API);

const ENDPOINT = "auth";
const URL = `${API}/${ENDPOINT}`;

const authApi = {
	signInWithSocialMedia: (body: ISignInWithSocialMedia) => {
		return axiosService.post<IResponseSuccess<ISignInWithSocialMediaRes>>(
			`${URL}/sign-in/social-media`,
			body
		);
	},
	signUp: (body: ISignUp) => {
		return axiosService.post<IResponseSuccess<ISignUpRes>>(`${URL}/sign-up`, body);
	},
	signIn: (body: ISignIn) => {
		return axiosService.post<IResponseSuccess<ISignInWithSocialMediaRes>>(`${URL}/sign-in`, body);
	},
};

export default authApi;
