import React, { useState } from "react";
import Image from "next/image";
import Badge from "../badge/badge";
import { light, red_accent, yellow_tertiary } from "../../styles/color";
import clsx from "clsx";
import ProductImage from "../Image/product-image";
import Price from "../badge/price";

interface Props {
	productItem: IProductItem;
}

export default function ProductCard({ productItem }: Props) {
	return (
		<div className="box-border p-3 overflow-hidden border-2 border-white dark:hover:border-primary-100 dark:border-black-dark-3 hover:border-primary-100 rounded-xl">
			<ProductImage src={productItem.thumbnail} />
			<div className="mt-8 space-y-2">
				<p className="font-semibold text-paragraph-2 text-dark-100 dark:text-light-100 line-clamp-2">
					{productItem.name.find((item) => item.language === "vi")?.value}
				</p>
				<Badge className="w-fit" color="pink_tertiary" isResponsive={false}>
					{productItem.brand}
				</Badge>
				<Price isResponsive={false} price={productItem.price} sale={10} />
			</div>
		</div>
	);
}
