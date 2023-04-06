import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import Badge from "../badge/badge";

interface Props {
	src: string;
	onClick?: () => void;
	isTagResponsive?: boolean;
	className?: string;
	sale?: number;
}

export default function ProductImage({ src, className, sale, isTagResponsive = false, onClick }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.classList.add("animate-fade-in-out");
		}

		setTimeout(() => {
			if (containerRef.current) {
				containerRef.current.classList.remove("animate-fade-in-out");
			}
		}, 1100);
	}, [src]);

	return (
		<div
			onClick={onClick}
			ref={containerRef}
			className={clsx(
				"relative flex items-center w-full bg-gray-accent dark:bg-black-dark-2 overflow-hidden rounded-xl aspect-square",
				className
			)}
		>
			<Image className="object-contain object-bottom w-full h-full" src={src} alt="product" fill sizes="100vw" />
			{sale && (
				<Badge className="absolute right-6 top-6 md:-right-6" color="red_accent" isResponsive={isTagResponsive}>
					{sale}% off
				</Badge>
			)}
		</div>
	);
}
