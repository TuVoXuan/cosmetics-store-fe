import clsx from "clsx";
import React, { useState } from "react";

interface Props {
	active?: boolean;
	brandName: string;
	onClick: () => void;
}

export default function BrandCard({ brandName, onClick, active = false }: Props) {
	// const [isActive, setIsActive] = useState<boolean>(active);

	const handleClick = () => {
		onClick();
		// setIsActive((value) => !value);
	};

	return (
		<div
			onClick={handleClick}
			className={clsx(
				"w-full p-2 rounded-xl bg-gray-accent dark:bg-black-dark-2 dark:text-light-100 text-center text-heading-6 transition-colors duration-500 ease-in-out",
				active && "bg-primary-100 text-white"
			)}
		>
			{brandName}
		</div>
	);
}
