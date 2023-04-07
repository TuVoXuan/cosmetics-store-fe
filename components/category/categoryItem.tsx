import clsx from "clsx";
import React from "react";
import GoForward from "../icons/go-forward";
import { useRouter } from "next/router";

interface Props {
	category: ICategory;
	active?: boolean;
	onClick?: () => void;
}

export default function Category({ category, active, onClick }: Props) {
	const { locale } = useRouter();
	return (
		<div onClick={onClick} className="flex items-center justify-between py-2">
			<p
				className={clsx(
					"text-paragraph-5 font-medium capitalize",
					{ "text-dark-100 dark:text-light-100": !active },
					{ "text-primary-100 dark:text-primary-100": active }
				)}
			>
				{category.name.filter((item) => item.language === locale)[0].value}
			</p>
			{category.children && (
				<GoForward
					width={16}
					height={16}
					className={clsx(
						{ "text-dark-40 dark:text-light-100": !active },
						{ "text-primary-100 dark:text-primary-100": active }
					)}
				/>
			)}
		</div>
	);
}
