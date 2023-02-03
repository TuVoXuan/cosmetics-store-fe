import clsx from "clsx";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import Wallet from "../icons/wallet";

export default function OptionButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={clsx(
				"px-4 py-2 inline-flex items-center xl:text-heading-3 shrink-0 xl:px-8 xl:py-4 xl:rounded-5xl md:text-heading-4 text-heading-6 capitalize rounded-3xl border-2 dark:border-black-dark-2 dark:text-light-100 border-gray-300",
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
