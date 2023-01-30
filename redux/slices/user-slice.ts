import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SignInWithSocialMedia } from "../actions/user-action";
import { ISignInWithSocialMediaRes } from "../../types/apis/auth-api";
import { RootState } from "../../app/store";

const initialState: IUserStore = {
	_id: "",
	name: "",
	email: "",
	image: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	extraReducers(builder) {},
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
});

// Action creators are generated for each case reducer function
export const { signInWithSocialMedia } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
