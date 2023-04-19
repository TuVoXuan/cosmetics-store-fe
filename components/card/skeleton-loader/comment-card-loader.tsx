import { useRouter } from "next/router";
import React from "react";

export default function CommentCardLoader() {
	const { locale } = useRouter();
	return (
		<div className="py-2 space-y-2 border-0 border-b-[1px] border-gray-300 animate-pulse">
			<div className="h-6 rounded-lg w-36 bg-slate-200"></div>
			<h3 className="w-1/2 h-8 rounded-lg bg-slate-200"></h3>
			<p className="w-4/5 h-8 rounded-lg bg-slate-200"></p>
			<p className="w-3/5 h-8 rounded-lg bg-slate-200"></p>
			{locale === "en" && (
				<div className="space-y-3">
					<div className="w-1/3 h-6 rounded-lg bg-slate-200"></div>
				</div>
			)}
			<p className="w-3/5 h-8 rounded-lg bg-slate-200"></p>
		</div>
	);
}
