import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { PaletteMode } from "../types/types";

export type ProductDetailContextValue = {
	productId: string;
	currentItem: IProductItemDetail | undefined;
	selectedItem: IProductItemDetail | undefined;
	descriptions: ITranslation[];
	setCurrentItem: (value: IProductItemDetail) => void;
	productItems: IProductItemDetail[];
	variationList: IVariationList[];
};

// Create context
export const ProductDetailContext = createContext<ProductDetailContextValue>({
	productId: "",
	currentItem: undefined,
	selectedItem: undefined,
	descriptions: [],
	productItems: [],
	setCurrentItem: (value: IProductItemDetail) => {
		console.log("a");
	},
	variationList: [],
});

interface Props {
	productId: string;
	descriptions: ITranslation[];
	productItems: IProductItemDetail[];
	variationList: IVariationList[];
	children: ReactNode | ReactNode[];
	setCurrentItem: (value: IProductItemDetail) => void;
	currentItem: IProductItemDetail | undefined;
	selectedItem: IProductItemDetail | undefined;
}

export const ProductDetailProvider = ({
	children,
	productId,
	currentItem,
	descriptions,
	productItems,
	variationList,
	setCurrentItem,
	selectedItem,
}: Props) => {
	return (
		<ProductDetailContext.Provider
			value={{
				productId,
				productItems,
				descriptions,
				variationList,
				currentItem,
				setCurrentItem,
				selectedItem,
			}}
		>
			{children}
		</ProductDetailContext.Provider>
	);
};

export const ProductDetailConsumer = ProductDetailContext.Consumer;
