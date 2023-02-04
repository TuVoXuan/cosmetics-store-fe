import clsx from "clsx";
import React from "react";
import GoBack from "../icons/go-back";
import GoForward from "../icons/go-forward";

interface Props {
	className?: string;
	children?: React.ReactNode;
}

export default function QuantityBtn({ className, children }: Props) {
	return (
		<div
			className={clsx(
				"flex items-center border-2 border-gray-accent rounded-[32px] w-fit gap-x-8 py-2 px-4 md:gap-x-11 md:px-6 md:py-4 dark:border-black-dark-2",
				className
			)}
		>
			<GoBack className="cursor-pointer dark:text-white-light" width={16} height={16} color="#1A202C" />
			<span className="font-bold text-dark-100 text-heading-4 md:text-heading-3 dark:text-white">
				1
			</span>
			<GoForward
				className="cursor-pointer dark:text-white-light"
				width={16}
				height={16}
				color="#1A202C"
			/>
		</div>
	);
}
