import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Badge from "../badge/badge";

interface Props {
	src: string;
	isTagResponsive?: boolean;
	className?: string;
	sale?: number;
}

export default function ProductImage({ src, className, sale, isTagResponsive = false }: Props) {
	const [clsName, setClsName] = useState<string>("");

	const [ratio, setRatio] = useState<number>(16 / 9);

	return (
		<div
			className={clsx(
				"relative flex items-center w-full bg-gray-accent dark:bg-black-dark-2 overflow-hidden rounded-4xl aspect-square",
				className
			)}
		>
			<Image
				className="z-10 object-contain object-bottom w-full h-full"
				src={src}
				alt="product"
				width={200}
				height={200}
			/>
			{/* <div className={clsx("relative", clsName)}>
				<div className="absolute bottom-0 w-1/2 h-4 left-1/2 translate-y-1/4 -z-10">
					<div className="relative w-full h-full">
						<Image
							className="object-contain w-full "
							src={"/images/banner/Shadow.svg"}
							fill
							alt="shadow"
						/>
					</div>
				</div>
			</div> */}
			{sale && (
				<Badge className="absolute right-6 top-6 md:-right-6" color="red_accent" isResponsive={isTagResponsive}>
					{sale}% off
				</Badge>
			)}
		</div>
	);
}
