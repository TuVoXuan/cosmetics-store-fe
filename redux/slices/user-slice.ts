import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	createAddress,
	deleteAddress,
	getAddress,
	setDefaultAddress,
	SignInWithSocialMedia,
	updateAddress,
} from "../actions/user-action";
import { ISignInWithSocialMediaRes } from "../../types/apis/auth-api";
import { RootState } from "../../store/store";

const initialState: IUserStore = {
	_id: "",
	name: "",
	email: "",
	image: "",
	address: [],
};

export const userSlice = createSlice({
	name: "user",
	initialState,

	reducers: {
		signInWithSocialMedia: (state, action: PayloadAction<ISignInWithSocialMediaRes>) => {
			try {
				// localStorage.setItem("token", action.payload.token);
				state._id = action.payload.user._id;
				state.name = action.payload.user.name;
				state.email = action.payload.user.email;

				console.log("state: ", state._id);
			} catch (error) {
				console.log("error: ", error);
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAddress.fulfilled, (state, action: PayloadAction<IAddressExtract[]>) => {
				if (state.address.length === 0) {
					state.address.push(...action.payload);
				}
			})
			.addCase(createAddress.fulfilled, (state, action: PayloadAction<IAddressExtract>) => {
				state.address.push(action.payload);
			})
			.addCase(deleteAddress.fulfilled, (state, action: PayloadAction<string>) => {
				state.address = state.address.filter((item) => item._id !== action.payload);
			})
			.addCase(setDefaultAddress.fulfilled, (state, action: PayloadAction<string>) => {
				const oldDefault = state.address.find((item) => item.default === true);
				if (oldDefault) {
					oldDefault.default = false;
				}

				const newDefault = state.address.find((item) => item._id === action.payload);
				if (newDefault) {
					newDefault.default = true;
				}
			})
			.addCase(updateAddress.fulfilled, (state, action: PayloadAction<IAddressExtract>) => {
				const updateAddress = state.address.find((item) => item._id === action.payload._id);
				if (updateAddress) {
					updateAddress.coordinates = action.payload.coordinates;
					updateAddress.default = action.payload.default;
					updateAddress.district = action.payload.district;
					updateAddress.name = action.payload.name;
					updateAddress.phone = action.payload.phone;
					updateAddress.province = action.payload.province;
					updateAddress.specificAddress = action.payload.specificAddress;
					updateAddress.ward = action.payload.ward;
				}
			});
	},
});

// Action creators are generated for each case reducer function
export const { signInWithSocialMedia } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
