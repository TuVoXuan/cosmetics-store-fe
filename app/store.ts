import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../redux/slices/counter-slice";
import userSlice from "../redux/slices/user-slice";
import categorySlice from "../redux/slices/category-slice";
import cartSlice from "../redux/slices/cart-slice";

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		user: userSlice,
		categories: categorySlice,
		cart: cartSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
