import React, { Fragment } from "react";
import GoForward from "../icons/go-forward";

interface IBreadcrumb {
	items: string[];
	className?: string;
}

export default function Breadcrumb({ items, className }: IBreadcrumb) {
	const length = items.length;
	return (
		<div className={className}>
			{items.map((e, index) => {
				return (
					<Fragment key={index}>
						<p className="inline-block font-medium xl:text-heading-4 dark:text-light-100 text-dark-100">{e}</p>
						{index !== length - 1 && (
							<GoForward className="inline-block ml-4 mr-6 dark:text-light-100 text-dark-100" width={16} height={16} />
						)}
					</Fragment>
				);
			})}
		</div>
	);
}
