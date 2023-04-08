import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface Props {
	onClick: () => void;
}

export default function HamburgerButton({ onClick }: Props) {
	const { useState } = React;
	const [isOpen, setIsOpen] = useState(false);

	const router = useRouter();

	const handleOnClick = () => {
		setIsOpen(!isOpen);
		onClick();
	};

	useEffect(() => {
		router.events.on("routeChangeStart", () => {
			setIsOpen(false);
		});
	}, []);

	return (
		<button
			className="flex flex-col items-center justify-center w-12 h-12 gap-2 duration-300 transform rounded-full hover:bg-primary-100 dark:hover:bg-primary-100 ease dark:bg-black-dark-2 bg-gray-accent group"
			onClick={handleOnClick}
		>
			<div
				className={clsx(
					"h-[2px] w-6 group-hover:bg-light-100 dark:bg-light-100 transition ease transform duration-300  rounded-lg bg-dark-100",
					isOpen && "rotate-45 translate-y-[4.75px]"
				)}
			></div>
			<div
				className={clsx(
					"h-[2px] w-6 group-hover:bg-light-100 dark:bg-light-100 transition ease transform duration-300 rounded-lg bg-dark-100",
					isOpen && "-rotate-45 -translate-y-[4.75px]"
				)}
			></div>
		</button>
	);
}
