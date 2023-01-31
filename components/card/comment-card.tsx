import React from "react";
import Image from "next/image";

export default function CommentCard() {
	return (
		<div>
			<div className="w-20 h-20 p-2 mx-auto mb-8 border-2 rounded-full border-primary-100 lg:mx-0">
				<div className="relative w-full h-full overflow-hidden rounded-full">
					<Image
						src={"https://i.pinimg.com/564x/a5/2b/0c/a52b0c036659e5f517668d43a965a8dd.jpg"}
						// height={100}
						// width={100}
						alt="avatar"
						fill
						className="absolute object-cover w-full h-full"
					/>
				</div>
			</div>

			<p className="mb-4 font-semibold text-center text-paragraph-1 dark:text-white-light lg:text-left">
				Amy Smith
			</p>
			<p className="text-center text-paragraph-2 dark:text-white-light lg:text-left">
				Đây là trang web tốt nhất mà tôi đã đặt hàng từ đó. Tôi rất khuyến khích.
			</p>
		</div>
	);
}
