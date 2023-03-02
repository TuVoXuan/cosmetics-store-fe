import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";
import APP_PATH from "../../constants/app-path";
import GoForward from "../icons/go-forward";

interface Props {
	level: 1 | 2 | 3;
	name: string;
	active?: boolean;
	id: string;
}

export default function CategoryItem({ id, level, name, active = false }: Props) {
	const router = useRouter();

	const onClick = (id: string) => () => {
		router.push(`${APP_PATH.CATEGORY}/${id}`);
	};

	return (
		<div onClick={onClick(id)} className="flex items-center justify-between h-8 cursor-pointer md:h-10">
			<p
				className={clsx(
					{ "text-heading-4 font-semibold md:text-heading-3 xl:text-heading-2": level === 1 },
					{ "text-heading-5 ml-2 md:ml-4 font-semibold md:text-heading-4 xl:text-heading-3": level === 2 },
					{ "text-paragraph-5 ml-4 md:text-paragraph-4 xl:text-heading-4 md:ml-8": level === 3 },
					{ "text-dark-100 dark:text-light-100": !active },
					{ "text-primary-100 dark:text-primary-100": active },
					"capitalize"
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
