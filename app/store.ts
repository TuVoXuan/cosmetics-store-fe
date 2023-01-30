import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../redux/slices/counter-slice";
import userSlice from "../redux/slices/user-slice";

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		user: userSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
