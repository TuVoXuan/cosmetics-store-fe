import clsx from "clsx";
import React from "react";

interface Props {
	children: React.ReactNode;
	active?: boolean;
}

export default function OrderStatus({ children, active }: Props) {
	return (
		<h4
			className={clsx(
				"text-heading-5 border-2 border-gray-accent rounded-4xl px-8 py-2 dark:border-black-dark-2 dark:text-light-100",
				active && "text-light-100 border-primary-100 bg-primary-100"
			)}
		>
			{children}
		</h4>
	);
}
