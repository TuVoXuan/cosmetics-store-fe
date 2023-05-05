import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { getCategories } from "../actions/category-action";
import { checkUserHasComments, recommendItemBase } from "../actions/recommend-action";

interface IRecommendStore {
	products: IProductItem[];
	isUserHasComments: boolean;
}

const initialState: IRecommendStore = {
	products: [],
	isUserHasComments: false,
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
		builder.addCase(checkUserHasComments.fulfilled, (state, action: PayloadAction<boolean>) => {
			state.isUserHasComments = action.payload;
		});
	},
});

export const {} = recommendSlide.actions;
export const selectRecommend = (state: RootState) => state.recommend;

export default recommendSlide.reducer;
