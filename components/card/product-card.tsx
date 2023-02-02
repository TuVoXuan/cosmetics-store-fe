import React, { useState } from "react";
import Image from "next/image";
import Badge from "../badge/badge";
import { light, red_accent, yellow_tertiary } from "../../styles/color";
import clsx from "clsx";
import ProductImage from "../Image/product-image";
import Price from "../badge/price";

export default function ProductCard() {
	const [clsName, setClsName] = useState("");
	const [ratio, setRatio] = useState(16 / 9);

	return (
		<div>
			<ProductImage sale={20} isTagResponsive={false} />
			<div className="mt-8">
				<p className="font-semibold text-heading-3 text-dark-100 dark:text-light-100">
					Product Name Here
				</p>
				<div className="flex items-center mt-4 gap-x-6">
					<Badge color="pink_tertiary" isResponsive={false}>
						Category
					</Badge>
					<Price isResponsive={false} price={30} sale={20} />
				</div>
			</div>
		</div>
	);
}
