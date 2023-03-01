import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryApi } from "../../api/category-api";

export const getCategories = createAsyncThunk("categories", async (_body, thunkAPI) => {
	try {
		const response = await categoryApi.getCategories();

		return response.data.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
