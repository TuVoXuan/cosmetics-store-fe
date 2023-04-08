import React from "react";

export default function OrderHistoryCardLoader() {
	return (
		<div className="p-4 space-y-4 border-2 rounded-3xl animate-pulse md:p-6 lg:p-8 border-gray-accent dark:border-black-dark-2">
			<div className="flex items-end justify-between">
				<h4 className="h-[14px] md:h-4 lg:h-[18px] w-[100px] rounded-lg bg-slate-200"></h4>
				<p className="h-[14px] md:h-4 lg:h-[18px] w-[100px] rounded-lg bg-slate-200"></p>
			</div>
			<div>
				<div className="flex gap-x-3">
					<div className="w-24 h-24 lg:h-36 lg:w-36 bg-slate-200 rounded-2xl shrink-0"></div>
					<div className="flex flex-col justify-around w-full">
						<p className="w-full h-4 rounded-lg md:w-9/12 bg-slate-200"></p>
						<p className="h-4 w-[50px] rounded-lg bg-slate-200"></p>
						<p className="w-1/3 h-4 rounded-lg md:w-1/5 bg-slate-200"></p>
					</div>
				</div>
			</div>
			<div>
				<div className="flex justify-between">
					<p className="h-[14px] md:h-4 lg:h-[18px] w-1/3 md:w-1/4 rounded-lg bg-slate-200"></p>
					<p className="h-[14px] md:h-4 lg:h-[18px] w-1/3 md:w-1/4 rounded-lg bg-slate-200"></p>
				</div>
			</div>
		</div>
	);
}
