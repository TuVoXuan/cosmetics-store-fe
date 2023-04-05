import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/slices/user-slice";
import categorySlice from "../redux/slices/category-slice";
import cartSlice from "../redux/slices/cart-slice";
import homeSlice from "../redux/slices/home-slice";

export const store = configureStore({
	reducer: {
		user: userSlice,
		categories: categorySlice,
		cart: cartSlice,
		home: homeSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
