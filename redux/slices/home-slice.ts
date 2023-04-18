import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { getCategories } from "../actions/category-action";
import { getPopularBrands, getShippingFeePerKm } from "../actions/home-action";

interface IHomePageStore {
	popularBrands: IBrand[];
	shippingFeePerKm: number;
}

const initialState: IHomePageStore = {
	popularBrands: [],
	shippingFeePerKm: 0,
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
		builder.addCase(getShippingFeePerKm.fulfilled, (state, action: PayloadAction<number>) => {
			state.shippingFeePerKm = action.payload;
		});
	},
});

export const selectHomeSlice = (state: RootState) => state.home;

export default homePageSlide.reducer;
