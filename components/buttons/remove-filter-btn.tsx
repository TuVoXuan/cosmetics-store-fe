import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import APP_PATH from "../../constants/app-path";
import Delete from "../icons/delete";

interface Props {
	type: "price-range" | "brand";
	value: string;
	brandId?: string;
}

export default function RemoveFilterButton({ type, value, brandId }: Props) {
	const router = useRouter();

	const { id, from, to, brand, order } = router.query;

	const formatURL = (url: string) => {
		const newUrl1 = url.replace("?&", "?");
		const newUrl2 = newUrl1.replace("&&", "&");

		if (newUrl2[newUrl2.length - 1] === "&") return newUrl2.slice(0, -1);

		return newUrl2;
	};

	const handleDelete = () => {
		const currentUrl = router.asPath;

		switch (type) {
			case "brand":
				if (brandId && brand) {
					const newBrandsList = (brand as string).split(",").filter((item) => item !== brandId);
					if (newBrandsList.length === 0) {
						const newUrl = currentUrl.replace(`brand=${brand}`, "");
						router.push(formatURL(newUrl), undefined, { shallow: true });
					} else {
						const brandsString = (brand as string)
							.split(",")
							.filter((item) => item !== brandId)
							.join(",");
						const newUrl = currentUrl.replace(`brand=${brand}`, `brand=${brandsString}`);
						router.push(formatURL(newUrl), undefined, { shallow: true });
					}
				}
				break;
			case "price-range":
				const newUrl = currentUrl.replace(`from=${from}`, "").replace(`to=${to}`, "");
				router.push(formatURL(newUrl), undefined, { shallow: true });
				break;
			default:
				break;
		}
	};

	return (
		<div className="flex items-center py-1 pl-6 pr-1 rounded-full w-fit gap-x-2 bg-gray-accent">
			<p className="text-paragraph-5">{value}</p>
			<div
				onClick={handleDelete}
				className="p-2 transition-all duration-200 ease-in-out rounded-full cursor-pointer hover:bg-primary-10 group hover:rotate-90 dark:text-white"
			>
				<Delete width={16} height={16} className="group-hover:text-primary-100 group-hover:rotate-90" />
			</div>
		</div>
	);
}
