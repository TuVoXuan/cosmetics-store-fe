import clsx from "clsx";
import React, { useState } from "react";

interface Props {
	brandName: string;
}

export default function BrandCard({ brandName }: Props) {
	const [active, setActive] = useState<boolean>(false);

	const handleClick = () => {
		setActive((value) => !value);
	};

	return (
		<div
			onClick={handleClick}
			className={clsx(
				"w-full p-2 rounded-xl bg-gray-accent text-center text-heading-6 transition-colors duration-500 ease-in-out",
				active && "bg-primary-100 text-white"
			)}
		>
			{brandName}
		</div>
	);
}
