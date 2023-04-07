import React from "react";
import Badge from "../badge/badge";
import ProductImage from "../Image/product-image";
import Price from "../badge/price";
import { useRouter } from "next/router";
import APP_PATH from "../../constants/app-path";

interface Props {
	productItem: IProductItem | IProductBrandItem;
}

export default function ProductCard({ productItem }: Props) {
	const router = useRouter();
	const { locale } = router;

	const handleOnClick = () => {
		router.push(`${APP_PATH.PRODUCT}/${productItem.productId}/${productItem.itemId}`);
	};

	return (
		<div
			onClick={handleOnClick}
			className="box-border p-3 overflow-hidden border-2 border-white cursor-pointer dark:hover:border-primary-100 dark:border-black-dark-3 hover:border-primary-100 rounded-xl"
		>
			<ProductImage src={productItem.thumbnail} />
			<div className="mt-8 space-y-2">
				<p className="font-semibold text-paragraph-5 md:text-paragraph-4 text-dark-100 dark:text-light-100 line-clamp-2">
					{productItem.name.find((item) => item.language === locale)?.value}
				</p>
				<Badge className="w-fit" color="pink_tertiary" isResponsive={false}>
					{productItem.brand}
				</Badge>
				<Price isResponsive={false} price={productItem.price} sale={10} />
			</div>
		</div>
	);
}
