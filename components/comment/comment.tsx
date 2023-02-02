import React from "react";
import { primary } from "../../styles/color";
import Quality from "../icons/quality";

export default function Comment() {
	return (
		<div className="py-2 space-y-2 border-0 border-b-[1px] border-gray-300">
			<div className="flex gap-x-1">
				<Quality width={12} height={12} fill={primary[100]} className="h-full text-primary-100" />
				<Quality width={12} height={12} fill={primary[100]} className="h-full text-primary-100" />
				<Quality width={12} height={12} fill={primary[100]} className="h-full text-primary-100" />
				<Quality width={12} height={12} fill={primary[100]} className="h-full text-primary-100" />
				<Quality width={12} height={12} fill={primary[100]} className="h-full text-primary-100" />
			</div>
			<h3 className="dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Nguyen Lam</h3>
			<p className="dark:text-light-100 text-paragraph-5 md:text-paragraph-4">Chat lieu rat tuyet voi</p>
			<p className="text-gray-300 dark:text-light-40 text-paragraph-5 md:text-paragraph-4">30/1/1223</p>
		</div>
	);
}
