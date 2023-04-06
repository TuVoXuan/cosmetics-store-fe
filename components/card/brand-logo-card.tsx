import clsx from "clsx";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import APP_PATH from "../../constants/app-path";

interface Props {
	brand: IBrand;
}

export default function BrandLogoCard({ brand }: Props) {
	const router = useRouter();

	const handleClickBrand = () => {
		router.push(`${APP_PATH.BRAND}/${brand._id}`);
	};

	return (
		<div onClick={handleClickBrand} className="w-full p-3 cursor-pointer">
			<Image src={brand.logo} alt={brand.name} height={150} width={150} />
		</div>
	);
}
