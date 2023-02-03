import clsx from "clsx";
import React from "react";
import GoForward from "../icons/go-forward";

interface Props {
	level: 1 | 2 | 3;
	name: string;
	active?: boolean;
}

export default function CategoryItem({ level, name, active = false }: Props) {
	return (
		<div className="flex items-center justify-between h-8 md:h-10">
			<p
				className={clsx(
					{ "text-heading-4 font-semibold md:text-heading-3 xl:text-heading-2": level === 1 },
					{ "text-heading-5 font-semibold md:text-heading-4 xl:text-heading-3": level === 2 },
					{ "text-paragraph-5 ml-2 md:text-paragraph-4 xl:text-heading-4 md:ml-4": level === 3 },
					{ "text-dark-100 dark:text-light-100": !active },
					{ "text-primary-100 dark:text-primary-100": active }
				)}
			>
				{name}
			</p>
			<GoForward
				width={20}
				height={20}
				className={clsx(
					{ "text-dark-40 dark:text-light-40": !active },
					{ "text-primary-100 dark:text-primary-100": active }
				)}
			/>
		</div>
	);
}
