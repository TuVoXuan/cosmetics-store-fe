import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface Props {
	className?: string;
	src: string;
	alt: string;
	onClick?: () => void;
}

export default function HyggeImage({ className, src, alt, onClick }: Props) {
	return (
		<div onClick={onClick} className={clsx("relative rounded-xl", className !== undefined && className)}>
			<Image className="object-contain mx-auto" src={src} fill alt={alt} />
		</div>
	);
}
