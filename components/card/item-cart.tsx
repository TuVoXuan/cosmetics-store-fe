import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { changeQuantity, deleteFromCart } from "../../redux/slices/cart-slice";
import { convertPrice } from "../../util/product";
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
		<div className="p-6 border-2 rounded-4xl md:p-8 border-gray-accent md:flex md:gap-x-8 lg:p-4 dark:border-black-dark-2">
			<ProductImage
				src={item.thumbnail}
				className="w-1/2 mx-auto mb-6 md:mx-0 select-none aspect-square md:w-32 md:h-32 lg:w-36 lg:h-36 md:mb-0"
			/>
			<div className="md:col-span-2 lg:pl-0">
				<h4 className="mb-4 font-semibold text-dark-100 text-heading-6 text-center md:text-left lg:text-heading-5 dark:text-white line-clamp-2">
					{item?.name.find((item) => item.language == locale)?.value}
				</h4>
				{/* price */}
				<div className="flex items-center justify-center mb-6 space-x-2 md:justify-start md:mb-6">
					{sale && (
						<span className="font-semibold line-through text-paragraph-7 lg:text-paragraph-6 text-dark-24 dark:text-light-24">
							{convertPrice(item.price)}
						</span>
					)}

					<span className="font-semibold text-paragraph-6 lg:text-paragraph-5 dark:text-white-light">
						{sale ? convertPrice((item.price * (100 - sale)) / 100) : convertPrice(item.price)}
					</span>
				</div>

				<div className="flex justify-evenly gap-x-6 md:justify-start">
					<QuantityBtn onChange={handleChangeQuantity} value={item.quantity} />

					<button
						onClick={handleDelete}
						className="top-0 p-3 transition-colors duration-300 ease-linear border-2 rounded-full  border-gray-accent  dark:border-black-dark-2 hover:border-dark-100 dark:hover:border-white"
					>
						<Delete height={20} width={20} className="dark:text-white" />
					</button>
				</div>
			</div>
		</div>
	);
}
