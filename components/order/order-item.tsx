import React from "react";
import ProductImage from "../Image/product-image";

export default function OrderItem() {
	return (
		<div className="flex gap-x-4">
			<ProductImage className="h-24 w-24 !rounded-2xl md:rounded-2xl md:h-24 md:w-h-24" />
			<div className="overflow-hidden">
				<h4 className="w-full font-semibold line-clamp-2 md:line-clamp-1 text-paragraph-5 md:text-paragraph-2 dark:text-light-100">
					Kem Chống Nắng La Roche-Posay Kiểm Soát Dầu SPF50+ 50ml
				</h4>
				<p className="font-semibold text-paragraph-5 md:text-heading-5 text-dark-40 dark:text-light-40">X 1</p>
				<p className="font-semibold text-paragraph-5 md:text-heading-5 dark:text-light-100">499.000d</p>
			</div>
		</div>
	);
}
