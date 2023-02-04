import React from "react";
import Delete from "../icons/delete";
import ProductImage from "../Image/product-image";

export default function ItemCartCheckout() {
	return (
		<div className="flex flex-col items-center md:flex-row">
			<ProductImage className="h-24 w-24 !rounded-2xl md:!rounded-4xl mb-6 md:mb-0" />
			<div className="mb-10 md:mb-0 md:grow ml-6">
				<h4 className="mb-4 md:text-left text-center font-semibold text-heading-4 dark:text-white">
					Sleepless Night 10 g
				</h4>
				<div className="flex md:justify-start justify-center flex-wrap gap-y-3 gap-x-4">
					<p className="flex items-center gap-x-3">
						<span className="text-heading-6 text-dark-24 line-through font-semibold dark:text-light-24">$24</span>
						<span className="text-heading-5 text-dark-100 font-semibold dark:text-light-100">$24</span>
					</p>
					<p className="text-heading-5 font-semibold dark:text-light-100">
						SL: <span>1</span>
					</p>
				</div>
			</div>
			<button className="w-12 md:shrink-0 h-12 rounded-full border-2 border-gray-accent dark:border-black-dark-2 flex justify-center items-center">
				<Delete height={24} width={24} className="dark:text-white xl:w-4 xl:h-4" />
			</button>
		</div>
	);
}
