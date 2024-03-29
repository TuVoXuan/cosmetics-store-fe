import clsx from "clsx";
import React from "react";

interface Props {
	title: string;
	subtitle: string;
	className?: string;
}

export default function TitlePage({ title, subtitle, className }: Props) {
	return (
		<section className={clsx(className !== undefined && className)}>
			<p className="pb-2 italic font-semibold capitalize text-heading-5 text-secondary-100">
				- {subtitle}
			</p>
			<p className="font-bold lg:text-heading-2 text-heading-3 dark:text-white-light">{title}</p>
		</section>
	);
}
