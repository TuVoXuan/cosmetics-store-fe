import { createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../../api/product-api";

export const recommendItemBase = createAsyncThunk("recommend/item-based", async (_body, thunkAPI) => {
	const response = await productApi.recommendItemBased();

	return response;
});
