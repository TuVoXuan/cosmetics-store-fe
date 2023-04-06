import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { getCategories } from "../actions/category-action";
import { recommendItemBase } from "../actions/recommend-action";

interface IRecommendStore {
	products: IProductItem[];
}

const initialState: IRecommendStore = {
	products: [],
};

export const recommendSlide = createSlice({
	name: "recommend",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(recommendItemBase.fulfilled, (state, action: PayloadAction<IProductItem[]>) => {
			if (state.products.length === 0) {
				state.products = action.payload;
			}
		});
	},
});

export const {} = recommendSlide.actions;
export const selectRecommend = (state: RootState) => state.recommend;

export default recommendSlide.reducer;
