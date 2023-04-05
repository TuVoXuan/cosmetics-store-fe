import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApi } from "../../api/category-api";
import { brandApi } from "../../api/brand-api";

export const getPopularBrands = createAsyncThunk("home/brands", async (_body, thunkAPI) => {
	try {
		const response = await brandApi.getBrandRankingSell();

		return response;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
