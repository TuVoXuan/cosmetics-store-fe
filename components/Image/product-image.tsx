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
				"relative flex items-center w-full bg-gray-accent dark:bg-black-dark-2 overflow-hidden rounded-xl aspect-square",
				className
			)}
		>
			<Image
				className="object-contain object-bottom w-full h-full"
				src={src}
				alt="product"
				width={200}
				height={200}
			/>
			{sale && (
				<Badge
					className="absolute right-6 top-6 md:-right-6"
					color="red_accent"
					isResponsive={isTagResponsive}
				>
					{sale}% off
				</Badge>
			)}
		</div>
	);
}
