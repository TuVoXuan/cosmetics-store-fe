import React from "react";
import Badge from "../badge/badge";
import ProductImage from "../Image/product-image";
import Price from "../badge/price";
import { useRouter } from "next/router";
import APP_PATH from "../../constants/app-path";
import GroupStars from "../comment/group-stars";
import Cart from "../icons/cart";
import CartIndicator from "../icons/cart-indicator";

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
				<Price isResponsive={false} price={productItem.price} />
				<div className="flex items-center gap-x-2">
					<GroupStars className="!w-3 !h-3 lg:!w-4 lg:!h-4" stars={productItem.rating} />
					<p className="text-paragraph-7 dark:text-light-100 lg:text-paragraph-5">
						({productItem.comments})
					</p>
					<Cart
						width={16}
						height={16}
						className="w-3 h-3 text-black shrink-0 dark:text-light-100 lg:w-4 lg:h-4"
					/>
					<p className="text-paragraph-7 dark:text-light-100 lg:text-paragraph-5">
						{productItem.sold}
					</p>
				</div>
			</div>
		</div>
	);
}
