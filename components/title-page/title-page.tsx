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
			<p className="text-heading-5 text-secondary-100 font-semibold italic">- {subtitle}</p>
			<p className="lg:text-heading-1 text-heading-2 font-bold dark:text-white-light">{title}</p>
		</section>
	);
}
