import clsx from "clsx";
import React, { useState } from "react";
import Image from "next/image";

interface Props {
	brand: IBrand;
}

export default function BrandCard({ brand }: Props) {
	return (
		<div className="w-full p-3">
			<Image src={brand.logo} alt={brand.name} height={200} width={200} />
		</div>
	);
}
