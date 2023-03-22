import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		getLocalData: (state, action: PayloadAction<CartItem[]>) => {
			state.push(...action.payload);
		},

		addToCart: (state, action: PayloadAction<CartItem>) => {
			const itemFound = state.find(
				(item) => item.itemId === action.payload.itemId && item.productId === action.payload.productId
			);
			if (itemFound) {
				itemFound.quantity += action.payload.quantity;
			} else {
				state.push(action.payload);
			}

			localStorage.setItem("cart", JSON.stringify(state));
		},

		changeQuantity: (state, action: PayloadAction<IChangeQuantityCartItem>) => {
			const itemFound = state.find(
				(item) => item.itemId === action.payload.itemId && item.productId === action.payload.productId
			);

			if (itemFound) {
				itemFound.quantity = action.payload.quantity;
				localStorage.setItem("cart", JSON.stringify(state));
			}
		},

		deleteFromCart: (state, action: PayloadAction<IDeleteCart>) => {
			const { itemId, productId } = action.payload;
			const newCart = state.filter((item) => item.itemId !== itemId && item.productId !== productId);
			state.splice(0);
			state.push(...newCart);
			localStorage.setItem("cart", JSON.stringify(state));
		},

		deleteAll: (state) => {
			state.splice(0);
			localStorage.setItem("cart", JSON.stringify(state));
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToCart, changeQuantity, getLocalData, deleteFromCart, deleteAll } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
