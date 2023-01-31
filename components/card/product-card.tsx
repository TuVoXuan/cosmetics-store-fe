import React, { useState } from "react";
import Image from "next/image";
import Badge from "../badge/badge";
import { light, red_accent, yellow_tertiary } from "../../styles/color";
import clsx from "clsx";

export default function ProductCard() {
	const [clsName, setClsName] = useState("");
	const [ratio, setRatio] = useState(16 / 9);

	return (
		<div>
			<div
				className="bg-gray-accent dark:bg-black-dark-2 relative rounded-4xl w-full 
			aspect-square flex items-center"
			>
				<div className={clsx("relative z-10", clsName)}>
					<Image
						className="object-contain object-bottom w-full h-full z-10"
						src={"/Product3.png"}
						alt="product"
						width={200}
						height={200 / ratio}
						onLoadingComplete={({ naturalWidth, naturalHeight }) => {
							if (naturalWidth > naturalHeight) {
								setClsName("w-2/3 mx-auto");
							} else {
								setClsName("h-2/3 w-full");
							}
							setRatio(naturalWidth / naturalHeight);
						}}
					/>
					<div className="absolute bottom-0 h-4 w-1/2 left-1/2 translate-y-1/4 -z-10">
						<div className="relative h-full w-full">
							<Image className="w-full object-contain " src={"/images/banner/Shadow.svg"} fill alt="shadow" />
						</div>
					</div>
				</div>
				<Badge className="absolute -right-6 top-6 " size="small" color={light[100]} backgroundColor={red_accent}>
					20% OFF
				</Badge>
			</div>
			<div className="mt-8">
				<p className="text-heading-3 text-dark-100 font-semibold dark:text-light-100">Product Name Here</p>
				<div className="mt-4 flex items-center">
					<Badge size="small" color={yellow_tertiary[100]} backgroundColor={yellow_tertiary[10]}>
						Category
					</Badge>
					<p className="text-heading-5 font-semibold text-dark-24 ml-6 mr-2 line-through dark:text-light-24">$30</p>
					<p className="text-heading-4 font-semibold text-dark-100 dark:text-light-100">$30</p>
				</div>
			</div>
		</div>
	);
}
