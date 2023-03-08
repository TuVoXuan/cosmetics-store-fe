import React from "react";
import Image from "next/image";

interface Props {
	icon: string;
	title: string;
	onClick: () => void;
}

export default function CategoryBtn({ icon, title, onClick }: Props) {
	return (
		<button
			onClick={onClick}
			className="flex flex-col items-center justify-center px-3 w-36 h-36 shrink-0 rounded-3xl bg-gray-accent gap-y-4 dark:bg-black-dark-2"
		>
			<Image width={36} height={36} src={icon} alt={title} />
			<span className="font-semibold capitalize text-heading-5 dark:text-white-light">{title}</span>
		</button>
	);
}
