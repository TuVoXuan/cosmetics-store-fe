import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/auth-api";
import { userApi } from "../../api/user-api";
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

export const getAddress = createAsyncThunk("user/address/get", async (body, thunkAPI) => {
	try {
		const response = await userApi.getAddresses();
		return response.data.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const createAddress = createAsyncThunk("user/address/create", async (body: IAddressAPI, thunkAPI) => {
	try {
		const response = await userApi.createAddress(body);
		return response.data.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const deleteAddress = createAsyncThunk("user/address/delete", async (body: string, thunkAPI) => {
	try {
		const response = await userApi.deleteAddress(body);
		return response.data.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const setDefaultAddress = createAsyncThunk("user/address/default", async (body: string, thunkAPI) => {
	try {
		const response = await userApi.setDefaultAddress(body);
		return response.data.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const updateAddress = createAsyncThunk(
	"user/address/update",
	async (body: IUpdateAddress, thunkAPI) => {
		try {
			const response = await userApi.updateAddress(body.addressId, body.addresss);
			return response.data.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
