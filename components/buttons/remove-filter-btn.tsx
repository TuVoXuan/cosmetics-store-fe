import React from "react";
import Delete from "../icons/delete";

interface Props {
	type: "order" | "price-range" | "brand";
	value: string;
}

export default function RemoveFilterButton({ type, value }: Props) {
	return (
		<div className="flex items-center py-1 pl-4 pr-1 rounded-full w-fit gap-x-2 bg-gray-accent">
			<p>{value}</p>
			<div className="p-2 transition-all duration-200 ease-in-out rounded-full cursor-pointer hover:bg-primary-10 group hover:rotate-90 dark:text-white">
				<Delete width={16} height={16} className="group-hover:text-primary-100 group-hover:rotate-90" />
			</div>
		</div>
	);
}
