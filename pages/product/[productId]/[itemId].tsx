import "swiper/css";
import "swiper/css/grid";
import Head from "next/head";
import "swiper/css/pagination";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import productApi from "../../../api/product-api";
import ProductInfo from "../../../views/product-detail/info";
import ProductComment from "../../../views/product-detail/comment";
import ProductRecommend from "../../../views/product-detail/recommend";
import { ProductDetailProvider } from "../../../context/product-detail.context";

interface Props {
	productId: string;
	selectedItem: IProductItemDetail | undefined;
	descriptions: ITranslation[];
	productItems: IProductItemDetail[];
	variationList: IVariationList[];
}

export const getServerSideProps = async (context: any) => {
	const productId = context.query.productId as string;
	const itemId = context.query.itemId as string;

	// fetch product
	const response = await productApi.getProductDetal(productId, itemId);
	const { descriptions, productItems, variationList } = response.data.data;

	const selectedItem = productItems.find((item) => item._id === itemId);

	return {
		props: {
			productId,
			selectedItem,
			descriptions,
			productItems,
			variationList,
		},
	};
};

export default function Product({ productId, selectedItem, descriptions, productItems, variationList }: Props) {
	// State
	const [currItem, setCurrItem] = useState<IProductItemDetail | undefined>(selectedItem);

	// Router & Redux
	const router = useRouter();
	const { locale } = router;

	useEffect(() => {
		setCurrItem(selectedItem);
	}, [selectedItem]);

	return (
		<ProductDetailProvider
			productId={productId}
			productItems={productItems}
			currentItem={currItem}
			setCurrentItem={setCurrItem}
			variationList={variationList}
			descriptions={descriptions}
			selectedItem={selectedItem}
		>
			<Head>
				<title>{currItem?.name.find((item) => item.language == locale)?.value}</title>
			</Head>
			<section
				className="pt-14 md:pt-16 space-y-14 md:space-y-[112px] xl:space-y-[144px]
			mb-[104px] md:mb-[112px] xl:mb-[144px]"
			>
				<ProductInfo />

				<ProductComment />

				<ProductRecommend />
			</section>
		</ProductDetailProvider>
	);
}
