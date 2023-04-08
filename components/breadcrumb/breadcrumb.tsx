import Link from "next/link";
import React, { Fragment } from "react";
import GoForward from "../icons/go-forward";

interface IItemBreadcrumb {
	title: string;
	href: string;
}

interface IBreadcrumb {
	items: IItemBreadcrumb[];
	className?: string;
}

export default function Breadcrumb({ items, className }: IBreadcrumb) {
	const length = items.length;
	return (
		<div className={className}>
			{items.map((e, index) => {
				return (
					<Fragment key={index}>
						<Link
							href={e.href}
							className="inline-block capitalize font-medium select-none xl:text-heading-4 text-paragraph-5 dark:text-light-100 text-dark-100"
						>
							{e.title}
						</Link>
						{index !== length - 1 && (
							<GoForward
								className="inline-block ml-4 mr-6 select-none dark:text-light-100 text-dark-100"
								width={16}
								height={16}
							/>
						)}
					</Fragment>
				);
			})}
		</div>
	);
}
