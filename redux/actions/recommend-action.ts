import { createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../api/product-api";

export const recommendItemBase = createAsyncThunk("recommend/item-based", async (_body, thunkAPI) => {
	const response = await productApi.recommendItemBased();

	return response;
});

export const checkUserHasComments = createAsyncThunk("user/has-comments", async (_body, thunkAPI) => {
	try {
		const response = await productApi.checkUserHasComments();
		return response;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
