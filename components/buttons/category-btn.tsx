import React from "react";

interface Props {
	icon: JSX.Element;
	title: string;
}

export default function CategoryBtn({ icon, title }: Props) {
	return (
		<button className="flex flex-col items-center justify-center w-32 h-32 px-3 shrink-0 rounded-3xl bg-gray-accent gap-y-4 dark:bg-black-dark-2">
			{icon}
			<span className="font-semibold capitalize text-heading-5 dark:text-white-light">{title}</span>
		</button>
	);
}
