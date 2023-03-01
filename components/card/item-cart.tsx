import React from "react";
import Price from "../badge/price";
import QuantityBtn from "../buttons/quantity-btn";
import Delete from "../icons/delete";
import ProductImage from "../Image/product-image";

interface Props {
	sale?: number;
	price: number;
}

export default function ItemCart({ sale, price }: Props) {
	return (
		<div className="flex flex-col items-center p-6 border-2 rounded-4xl border-gray-accent md:p-14 md:flex-row md:gap-x-14 md:items-start lg:p-8 dark:border-black-dark-2">
			<ProductImage className="h-24 w-24 !rounded-2xl md:!rounded-4xl mb-6 md:h-48 md:w-48 md:mb-0" />
			<div>
				<h4 className="mb-4 font-semibold text-heading-4 md:text-heading-2 lg:text-heading-3 dark:text-white line-clamp-2">
					Sleepless Night 10g Sleepless Night 10g Sleepless Night 10g
				</h4>
				{/* price */}
				<div className="flex items-center justify-center mb-10 space-x-2 md:justify-start md:mb-6">
					{sale && (
						<span className="font-semibold line-through text-heading-6 md:text-heading-4 lg:text-paragraph-3 text-dark-24 dark:text-light-24">
							${price}
						</span>
					)}

					<span className="font-semibold text-heading-5 md:text-paragraph-1 lg:text-paragraph-2 dark:text-white-light">
						${sale ? (price * (100 - sale)) / 100 : price}
					</span>
				</div>

				<div className="flex gap-x-6">
					<QuantityBtn />

					<button className="top-0 p-3 transition-colors duration-300 ease-linear border-2 rounded-full border-gray-accent md:p-4 dark:border-black-dark-2 hover:border-dark-100 dark:hover:border-white">
						<Delete
							height={24}
							width={24}
							className="dark:text-white md:w-8 md:h-8 lg:w-6 lg:h-6"
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
