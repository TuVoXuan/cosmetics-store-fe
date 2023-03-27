import React from "react";

export default function ProductCardLoader() {
	return (
		<div className="box-border p-3 overflow-hidden border-2 border-white rounded-xl animate-pulse">
			<div className="w-full rounded-xl bg-slate-200 aspect-square"></div>
			<div className="mt-8 space-y-2">
				<div className="h-[14px] w-full rounded-full bg-slate-200"></div>
				<div className="h-[14px] w-full rounded-full bg-slate-200"></div>
				<div className="w-24 h-6 md:h-7 rounded-2xl bg-slate-200"></div>
				<div className="h-[14px] w-4/5 rounded-full bg-slate-200"></div>
			</div>
		</div>
	);
}
