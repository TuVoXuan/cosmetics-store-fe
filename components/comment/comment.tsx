import React from "react";
import { primary } from "../../styles/color";
import { convertDate } from "../../util/product";
import Quality from "../icons/quality";
import GroupStars from "./group-stars";

interface Props {
	comment: ICommentProdItem;
}

export default function Comment({ comment }: Props) {
	return (
		<div className="py-2 space-y-2 border-0 border-b-[1px] border-gray-300">
			<GroupStars stars={comment.rate} />
			<h3 className="dark:text-light-100 text-paragraph-4 md:text-paragraph-2">{comment.user.name}</h3>
			<p className="dark:text-light-100 text-paragraph-4 md:text-paragraph-2">{comment.content}</p>
			<p className="text-gray-300 dark:text-light-40 text-paragraph-4 md:text-paragraph-2">
				{convertDate(comment.createdAt)}
			</p>
		</div>
	);
}
