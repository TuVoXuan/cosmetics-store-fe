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
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import path from "path";
import APP_PATH from "../../../constants/app-path";
import { usePathCategory, useSettings } from "../../../store/hooks";

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

	// Router
	const router = useRouter();
	const { locale } = router;

	// Context
	const { language } = useSettings();
	const { path } = usePathCategory();

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
			<Breadcrumb
				className="hidden lg:block lg:mt-14"
				items={[
					{ title: language.header.home_tag, href: APP_PATH.HOME },
					...path.slice(1).map((item) => ({
						title: item.name.filter((e) => e.language === locale)[0].value,
						href: `${APP_PATH.CATEGORY}/${item._id}`,
					})),
					{
						title: currItem?.name.find((item) => item.language == locale)?.value || "",
						href: `${APP_PATH.PRODUCT}/${productId}/${currItem?._id}`,
					},
				]}
			/>
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
