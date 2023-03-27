import React from "react";
import Selected from "../../icons/selected";

export default function BrandItemLoading() {
	return (
		<li className="flex animate-pulse items-center gap-x-4 px-6 py-3 h-fit w-full">
			<div className="p-1 w-6 shrink-0 h-6 border-2 rounded-md border-slate-200"></div>
			<label className="h-4 md:h-5 w-full bg-slate-200 rounded-md"></label>
		</li>
	);
}
