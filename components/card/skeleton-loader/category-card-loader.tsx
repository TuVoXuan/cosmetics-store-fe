import clsx from "clsx";
import React from "react";
import GoForward from "../../icons/go-forward";

export default function CategoryCardLoader() {
	return (
		<div className="space-y-3 animate-pulse">
			<div className="flex items-center gap-x-1">
				<div className="p-2">
					<GoForward width={12} height={12} className="text-primary-10" />
				</div>

				<p className="w-4/5 h-5 rounded-md bg-slate-200"></p>
			</div>
		</div>
	);
}
