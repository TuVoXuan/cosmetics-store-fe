import { ISignIn, ISignInWithSocialMedia, ISignInWithSocialMediaRes } from "../types/apis/auth-api";
import axiosService from "./axios-service";

const API = process.env.API_URL;
const ENDPOINT = "auth";
const URL = `${API}/${ENDPOINT}`;

const authApi = {
	signInWithSocialMedia: (body: ISignInWithSocialMedia) => {
		return axiosService.post<IResponseSuccess<ISignInWithSocialMediaRes>>(`${URL}/sign-in/social-media`, body);
	},
	signIn: (body: ISignIn) => {
		return axiosService.post<IResponseSuccess<ISignInWithSocialMediaRes>>(`${URL}/sign-in`, body);
	},
};

export default authApi;
