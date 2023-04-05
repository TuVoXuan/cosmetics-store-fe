import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { getCategories } from "../actions/category-action";
import { getPopularBrands } from "../actions/home-action";

interface IHomePageStore {
	popularBrands: IBrand[];
}

const initialState: IHomePageStore = {
	popularBrands: [],
};

export const homePageSlide = createSlice({
	name: "home",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getPopularBrands.fulfilled, (state, action: PayloadAction<IBrand[]>) => {
			if (state.popularBrands.length === 0) {
				state.popularBrands = action.payload;
			}
		});
	},
});

export const selectHomeSlice = (state: RootState) => state.home;

export default homePageSlide.reducer;
