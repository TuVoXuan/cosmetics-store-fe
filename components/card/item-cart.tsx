import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { changeQuantity, deleteFromCart } from "../../redux/slices/cart-slice";
import Price from "../badge/price";
import QuantityBtn from "../buttons/quantity-btn";
import Delete from "../icons/delete";
import ProductImage from "../Image/product-image";

interface Props {
	item: CartItem;
	sale?: number;
}

export default function ItemCart({ sale, item }: Props) {
	const router = useRouter();
	const { locale } = router;
	const dispatch = useAppDispatch();

	const handleChangeQuantity = (value: number) => {
		dispatch(changeQuantity({ itemId: item.itemId, productId: item.productId, quantity: value }));
	};

	const handleDelete = () => {
		dispatch(deleteFromCart({ itemId: item.itemId, productId: item.productId }));
	};

	return (
		<div className="p-6 border-2 f rounded-4xl border-gray-accent md:p-14 md:grid md:grid-cols-3 lg:p-8 dark:border-black-dark-2">
			<ProductImage
				src={item.thumbnail}
				className="w-full mb-6 select-none aspect-square md:h-48 md:w-48 md:mb-0"
			/>
			<div className="md:col-span-2 md:pl-14 lg:pl-0">
				<h4 className="mb-4 font-semibold text-heading-4 md:text-heading-3 dark:text-white line-clamp-2">
					{item?.name.find((item) => item.language == locale)?.value}
				</h4>
				{/* price */}
				<div className="flex items-center justify-center mb-10 space-x-2 md:justify-start md:mb-6">
					{sale && (
						<span className="font-semibold line-through text-heading-6 md:text-heading-4 lg:text-paragraph-3 text-dark-24 dark:text-light-24">
							{item.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
						</span>
					)}

					<span className="font-semibold text-heading-5 md:text-paragraph-1 lg:text-paragraph-2 dark:text-white-light">
						{sale
							? ((item.price * (100 - sale)) / 100).toLocaleString("it-IT", {
									style: "currency",
									currency: "VND",
							  })
							: item.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
					</span>
				</div>

				<div className="flex justify-evenly gap-x-6 md:justify-start">
					<QuantityBtn onChange={handleChangeQuantity} value={item.quantity} />

					<button
						onClick={handleDelete}
						className="top-0 p-3 transition-colors duration-300 ease-linear border-2 rounded-full border-gray-accent md:p-4 dark:border-black-dark-2 hover:border-dark-100 dark:hover:border-white"
					>
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
