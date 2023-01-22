import React from "react";

interface Props {
	title: string;
	subtitle: string;
}

export default function TitlePage({ title, subtitle }: Props) {
	return (
		<section className="py-14">
			<p className="text-heading-5 text-secondary-100 font-bold italic">- {subtitle}</p>
			<p className="text-heading-2 font-bold dark:text-white-light">{title}</p>
		</section>
	);
}
