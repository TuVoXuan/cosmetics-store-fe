import React from "react";
import GoForward from "../icons/go-forward";

interface IBreadcrumb {
	items: string[];
}

export default function Breadcrumb({ items }: IBreadcrumb) {
	const length = items.length;
	return (
		<div>
			{items.map((e, index) => {
				return (
					<>
						<p className="inline-block font-medium">{e}</p>
						{index !== length - 1 && (
							<GoForward color="#000" className="inline-block ml-4 mr-6" width={16} height={16} />
						)}
					</>
				);
			})}
		</div>
	);
}
