import router from "next/router";
import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { deleteFromCart } from "../../redux/slices/cart-slice";
import { English, Vietnamese } from "../../translation";
import { convertPrice } from "../../util/product";
import Delete from "../icons/delete";
import ProductImage from "../Image/product-image";

interface Props {
	item: CartItem;
}

export default function ItemCartCheckout({ item }: Props) {
	const { name, thumbnail, price, quantity, itemId, productId } = item;
	const dispatch = useAppDispatch();

	const handleDelete = () => {
		dispatch(
			deleteFromCart({
				itemId,
				productId,
			})
		);
	};

	return (
		<div className="flex flex-col items-center md:flex-row">
			<ProductImage
				src={thumbnail}
				className="w-1/2 aspect-square md:h-28 md:w-28 shrink-0 !rounded-2xl mb-6 md:mb-0"
			/>
			<div className="mb-6 md:mx-6 md:mb-0 md:grow">
				<h4 className="mb-4 font-semibold text-center md:text-left text-heading-6 lg:text-heading-5 dark:text-white">
					{name.filter((e) => e.language === "vi")[0].value}
				</h4>
				<div className="flex flex-wrap  justify-center md:justify-start gap-y-3 gap-x-4">
					<p className="flex items-center gap-x-3">
						{/* <span className="font-semibold line-through text-heading-6 text-dark-24 dark:text-light-24">
							{convertPrice(price)}
						</span> */}
						<span className="font-semibold text-paragraph-6 lg:text-paragraph-5 text-dark-64  dark:text-light-100">
							{convertPrice(price)}
						</span>
					</p>
					<p className="font-semibold text-paragraph-6 lg:text-paragraph-5 text-dark-64 dark:text-light-100">
						SL: <span>{quantity}</span>
					</p>
				</div>
			</div>
			<button
				onClick={handleDelete}
				className="flex items-center justify-center w-12 h-12 border-2 rounded-full md:shrink-0 border-gray-accent dark:border-black-dark-2"
			>
				<Delete height={24} width={24} className="dark:text-white xl:w-4 xl:h-4" />
			</button>
		</div>
	);
}
