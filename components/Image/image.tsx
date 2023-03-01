import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface Props {
	className?: string;
	src: string;
	alt: string;
}

export default function HyggeImage({ className, src, alt }: Props) {
	return (
		<div className={clsx("relative rounded-xl", className !== undefined && className)}>
			<Image className="object-contain mx-auto" src={src} fill alt={alt} />
		</div>
	);
}
