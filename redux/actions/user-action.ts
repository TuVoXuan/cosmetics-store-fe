import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/auth-api";
import { ISignInWithSocialMedia } from "../../types/apis/auth-api";

export const SignInWithSocialMedia = createAsyncThunk(
	"user/sign-in-with-social-media",
	async (body: ISignInWithSocialMedia, thunkAPI) => {
		try {
			const response = await authApi.signInWithSocialMedia(body);
			return response.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
