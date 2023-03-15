import React from "react";
import { IOrderItem } from "../../types/apis/order-api";
import { convertPrice } from "../../util/product";
import ProductImage from "../Image/product-image";

interface Props {
	item: IOrderItem;
}

export default function OrderItem({ item }: Props) {
	return (
		<div className="flex gap-x-4">
			<ProductImage
				src={item.thumbnail}
				className="h-24 w-24 shrink-0 !rounded-2xl md:rounded-2xl md:h-24 md:w-h-24 lg:h-36 lg:w-36"
			/>
			<div className="overflow-hidden lg:flex lg:flex-col lg:justify-evenly">
				<h4 className="w-full font-semibold line-clamp-2 md:line-clamp-1 text-paragraph-5 md:text-paragraph-3 lg:text-paragraph-2 dark:text-light-100">
					{item.name.filter((item) => item.language === "vi")[0].value}
				</h4>
				<p className="font-semibold text-paragraph-5 md:text-heading-5 lg:text-paragraph-3 text-dark-40 dark:text-light-40">
					X {item.quantity}
				</p>
				<p className="font-semibold text-paragraph-5 md:text-heading-5 lg:text-paragraph-3 dark:text-light-100">
					{convertPrice(item.price)}
				</p>
			</div>
		</div>
	);
}
