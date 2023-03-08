import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface Props {
	className?: string;
	src: string;
	alt: string;
	actived?: boolean;
	onClick?: () => void;
}

export default function HyggeImage({ className, src, alt, actived, onClick }: Props) {
	return (
		<div onClick={onClick} className={clsx("relative rounded-xl", className !== undefined && className)}>
			<Image
				className={clsx(
					"object-contain px-4 mx-auto border-2 rounded-2xl",
					actived && "border-primary-100",
					!actived && "border-transparent"
				)}
				src={src}
				fill
				alt={alt}
			/>
		</div>
	);
}
