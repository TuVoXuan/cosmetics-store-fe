import React from "react";
import { convertPrice } from "../../util/product";

interface Props {
	price: number;
	sale?: number;
	isResponsive: boolean;
}

export default function Price({ price, sale, isResponsive }: Props) {
	if (isResponsive) {
		return (
			<div className="flex items-center space-x-2">
				{sale && (
					<span className="font-semibold line-through text-heading-5 text-dark-24 md:text-heading-4 dark:text-light-24">
						{convertPrice(price)}
					</span>
				)}

				<span className="font-semibold text-paragraph-1 md:text-heading-2 dark:text-white-light">
					{sale ? convertPrice((price * (100 - sale)) / 100) : convertPrice(price)}
				</span>
			</div>
		);
	}

	return (
		<div className="flex items-center space-x-2">
			{sale && (
				<span className="font-semibold line-through text-heading-5 text-dark-24 dark:text-light-24">
					{convertPrice(price)}
				</span>
			)}

			<span className="font-semibold text-heading-4 dark:text-white-light">
				{sale
					? ((price * (100 - sale)) / 100).toLocaleString("it-IT", {
							style: "currency",
							currency: "VND",
					  })
					: convertPrice(price)}
			</span>
		</div>
	);
}
