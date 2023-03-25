import clsx from "clsx";
import { useRouter } from "next/router";
import React, { Children, MouseEvent, useEffect, useRef, useState } from "react";
import APP_PATH from "../../constants/app-path";
import { usePathCategory } from "../../store/hooks";
import GoForward from "../icons/go-forward";

interface Props {
	category: ICategory;
}

export default function CategoryItem({ category }: Props) {
	const router = useRouter();
	const { path } = usePathCategory();

	const [active, setActive] = useState(false);
	const [show, setShow] = useState(false);

	const wrapperRef = useRef<HTMLDivElement>(null);
	const childrenRef = useRef<HTMLDivElement>(null);

	const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		router.push(`${APP_PATH.CATEGORY}/${category._id}`);
	};

	const handleExpand = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setShow(!show);
	};

	useEffect(() => {
		if (path.findIndex((item) => item._id === category._id) !== -1) {
			setActive(true);
			setShow(true);
		} else {
			setActive(false);
			setShow(false);
		}
	}, [path, category]);

	return (
		<div onClick={handleOnClick} className="space-y-3 cursor-pointer">
			<div className="flex items-center gap-x-1">
				{category.children ? (
					<div
						onClick={handleExpand}
						className="p-2 rounded-full group hover:bg-primary-10 transition-colors duration-200 ease-out"
					>
						<GoForward
							width={12}
							height={12}
							className={clsx(
								"transition-all duration-200 ease-out group-hover:text-primary-100",
								{ "dark:text-light-40": !active },
								{ "text-primary-100 dark:text-primary-100": active },
								{ "rotate-0": !show },
								{ "rotate-90": show }
							)}
						/>
					</div>
				) : (
					<GoForward width={16} height={16} className="text-white dark:text-black-dark-1" />
				)}
				<p
					className={clsx(
						{ "text-dark-100 dark:text-light-100": !active },
						{ "text-primary-100 dark:text-primary-100": active },
						"capitalize text-heading-5 font-medium hover:text-primary-100"
					)}
				>
					{category.name.filter((item) => item.language === "vi")[0].value}
				</p>
			</div>

			{show && (
				<div ref={childrenRef} className="ml-3 space-y-3 transition-all duration-200 ease-linear">
					{category.children && category.children.map((item) => <CategoryItem category={item} key={item._id} />)}
				</div>
			)}
		</div>
	);
}
