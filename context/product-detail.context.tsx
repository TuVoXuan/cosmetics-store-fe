import { createContext, ReactNode, useEffect, useState } from "react";
import { PaletteMode } from "../types/types";

export type ProductDetailContextValue = {
	productId: string;
	currentItem: IProductItemDetail | undefined;
	descriptions: ITranslation[];
	setCurrentItem: (value: IProductItemDetail) => void;
	productItems: IProductItemDetail[];
	variationList: IVariationList[];
};

// Create context
export const ProductDetailContext = createContext<ProductDetailContextValue>({
	productId: "",
	currentItem: {
		_id: "",
		configurations: [],
		images: [],
		name: [],
		price: 0,
		thumbnail: "",
	},
	descriptions: [],
	productItems: [],
	setCurrentItem: (value: IProductItemDetail) => {
		console.log("a");
	},
	variationList: [],
});

interface Props {
	productId: string;
	selectedItem: IProductItemDetail | undefined;
	descriptions: ITranslation[];
	productItems: IProductItemDetail[];
	variationList: IVariationList[];
	children: ReactNode | ReactNode[];
}

export const ProductDetailProvider = ({
	children,
	productId,
	selectedItem,
	descriptions,
	productItems,
	variationList,
}: Props) => {
	const [currentItem, setCurrentItem] = useState<IProductItemDetail | undefined>(selectedItem);

	return (
		<ProductDetailContext.Provider
			value={{ productId, productItems, descriptions, variationList, currentItem, setCurrentItem }}
		>
			{children}
		</ProductDetailContext.Provider>
	);
};

export const ProductDetailConsumer = ProductDetailContext.Consumer;
