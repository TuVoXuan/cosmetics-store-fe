import React, { useRef } from "react";
import { primary } from "../../styles/color";
import { convertDate } from "../../util/product";
import Quality from "../icons/quality";
import GroupStars from "./group-stars";
import { useRouter } from "next/router";
import Expand from "../icons/expand";

interface Props {
	comment: ICommentProdItem;
}

export default function Comment({ comment }: Props) {
	const { locale } = useRouter();

	const originCommentRef = useRef<HTMLParagraphElement>(null);
	const expandIconRef = useRef<HTMLDivElement>(null);

	const handleSeeOriginComment = () => {
		if (originCommentRef.current) {
			originCommentRef.current.classList.toggle("hidden");
		}
		if (expandIconRef.current) {
			expandIconRef.current.classList.toggle("rotate-180");
		}
	};

	return (
		<div className="py-2 space-y-2 border-0 border-b-[1px] border-gray-300">
			<GroupStars stars={comment.rate} />
			<h3 className="dark:text-light-100 text-paragraph-4 md:text-paragraph-2">{comment.user.name}</h3>
			<p className="dark:text-light-100 text-paragraph-4 md:text-paragraph-2">
				{locale === "en" && comment.contentTrans ? comment.contentTrans : comment.content}
			</p>
			{locale === "en" && (
				<div className="space-y-3">
					<button
						onClick={handleSeeOriginComment}
						className="flex items-center gap-x-3 text-secondary-100"
					>
						See original
						<div ref={expandIconRef} className="transition-transform duration-300 ease-in-out">
							<Expand height={16} width={16} />
						</div>
					</button>
					<p
						ref={originCommentRef}
						className="hidden dark:text-light-100 text-paragraph-4 md:text-paragraph-2"
					>
						{comment.content}
					</p>
				</div>
			)}
			<p className="text-gray-300 dark:text-light-40 text-paragraph-4 md:text-paragraph-2">
				{convertDate(comment.createdAt)}
			</p>
		</div>
	);
}
