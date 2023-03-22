import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { getCategories } from "../actions/category-action";

interface ICategoryStore {
	categories: ICategory[];
}

const initialState: ICategoryStore = {
	categories: [],
};

export const categorySlide = createSlice({
	name: "category",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
			state.categories = action.payload;
		});
	},
});

export const {} = categorySlide.actions;
export const selectCategories = (state: RootState) => state.categories;

export default categorySlide.reducer;
