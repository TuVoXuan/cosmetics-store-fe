import clsx from "clsx";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import Wallet from "../icons/wallet";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	actived?: boolean;
}

export default function OptionButton({ className, children, actived, ...props }: Props) {
	return (
		<button
			className={clsx(
				actived && "border-primary-100",
				!actived && "border-gray-300 dark:border-black-dark-2",
				"px-4 py-2 md:px-6 md:py-3 inline-flex items-center xl:text-heading-3 shrink-0 xl:px-8 xl:py-4 xl:rounded-5xl md:text-heading-4 text-heading-6 capitalize rounded-4xl border-2  dark:text-light-100 ",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
