import React, { useRef } from "react";

interface Props {
	children: React.ReactNode;
	onSelect?: () => void;
}

export default function RadioInput({ children, onSelect }: Props) {
	const btnRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		if (btnRef.current) {
			if (btnRef.current.classList.contains("border-2")) {
				btnRef.current.classList.replace("border-2", "border-[6px]");
				btnRef.current.classList.replace("border-gray-accent", "border-primary-100");
			} else {
				btnRef.current.classList.replace("border-[6px]", "border-2");
				btnRef.current.classList.replace("border-primary-100", "border-gray-accent");
			}
		}
	};

	return (
		<div onClick={handleClick} className="flex items-center select-none gap-x-4 group">
			<div
				ref={btnRef}
				className="w-6 h-6 transition-all duration-300 ease-linear border-2 rounded-full cursor-pointer border-gray-accent group-hover:border-primary-100 dark:border-black-dark-2 "
			></div>
			{children}
		</div>
	);
}
