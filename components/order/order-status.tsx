import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import APP_PATH from "../../constants/app-path";
import { OrderStatus as OrderStatusEnum } from "../../constants/enums";

interface Props {
	children: React.ReactNode;
	value: string;
}

export default function OrderStatus({ children, value }: Props) {
	const router = useRouter();

	const { status } = router.query;

	const onClick = () => {
		router.push({
			pathname: APP_PATH.ORDER_HISTORY,
			query: {
				status: value,
			},
		});
	};

	return (
		<h4
			className={clsx(
				"text-heading-5 lg:text-heading-4 shrink-0 cursor-pointer border-2 border-gray-accent rounded-4xl px-8 py-2 dark:border-black-dark-2 dark:text-light-100",
				status === value && "text-light-100 border-primary-100 bg-primary-100"
			)}
			onClick={onClick}
		>
			{children}
		</h4>
	);
}
