import React from "react";

interface Props {
	className?: string;
	icon: JSX.Element;
	title: string;
	bodyText: string;
}

export default function WhyUsCard({ icon, title, bodyText, className }: Props) {
	return (
		<div className={className}>
			<div className="p-4 mx-auto mb-8 rounded-full bg-gray-accent w-fit dark:bg-black-dark-2">
				{icon}
			</div>
			<p className="mb-4 font-semibold text-center text-paragraph-1 dark:text-white-light">{title}</p>
			<p className="text-center text-paragraph-2 dark:text-white-light">{bodyText}</p>
		</div>
	);
}
