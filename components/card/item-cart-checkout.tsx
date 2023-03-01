import React from "react";
import Delete from "../icons/delete";
import ProductImage from "../Image/product-image";

export default function ItemCartCheckout() {
	return (
		<div className="flex flex-col items-center md:flex-row">
			<ProductImage className="h-24 w-24 !rounded-2xl mb-6 md:mb-0" />
			<div className="mb-10 ml-6 md:mb-0 md:grow">
				<h4 className="mb-4 font-semibold text-center md:text-left text-heading-4 dark:text-white">
					Sleepless Night 10 g
				</h4>
				<div className="flex flex-wrap justify-center md:justify-start gap-y-3 gap-x-4">
					<p className="flex items-center gap-x-3">
						<span className="font-semibold line-through text-heading-6 text-dark-24 dark:text-light-24">
							$24
						</span>
						<span className="font-semibold text-heading-5 text-dark-100 dark:text-light-100">
							$24
						</span>
					</p>
					<p className="font-semibold text-heading-5 dark:text-light-100">
						SL: <span>1</span>
					</p>
				</div>
			</div>
			<button className="flex items-center justify-center w-12 h-12 border-2 rounded-full md:shrink-0 border-gray-accent dark:border-black-dark-2">
				<Delete height={24} width={24} className="dark:text-white xl:w-4 xl:h-4" />
			</button>
		</div>
	);
}
