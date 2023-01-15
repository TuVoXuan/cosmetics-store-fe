import React, { useEffect, useRef } from "react";
import Search from "../icons/search";

interface Props {
	onClose: () => void;
}

export default function SearchInput({ onClose }: Props) {
	const searchCoverRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: any) => {
		const { target } = event;

		if (searchCoverRef.current && target && "nodeType" in target) {
			if (!searchCoverRef.current.contains(target)) {
				onClose();
			}
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
	}, []);

	return (
		<div
			ref={searchCoverRef}
			className="flex items-center h-12 text-dark-100 rounded-[32px] border-2 border-gray-accent py-3 px-4 box-border"
		>
			<Search className="dark:text-light-100" height={24} width={24} color="#000" />
			<input
				className=" w-full ml-4 text-heading-5 focus:outline-none min-w-[290px] dark:bg-transparent dark:text-light-100"
				type="text"
				name="search"
				id="search"
				placeholder="search"
			/>
		</div>
	);
}
