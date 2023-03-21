import { useRouter } from "next/router";
import React, { Fragment, useEffect, useImperativeHandle, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "../../redux/slices/category-slice";
import CategoryItem from "../category/category";
import Delete from "../icons/delete";

export type CategoriesWindowRefType = {
	current: HTMLDivElement | null;
	open: () => void;
};

interface Props {
	overlay?: React.RefObject<HTMLDivElement>;
}

const CategoriesWindow = React.forwardRef<CategoriesWindowRefType, Props>(({ overlay }, ref) => {
	const router = useRouter();
	const { id } = router.query;

	const categoriesRef = useRef<HTMLDivElement>(null);
	const categories = useAppSelector(selectCategories).categories;

	const handleOpen = () => {
		document.addEventListener("click", handleClickOutside, true);
		if (categoriesRef.current && overlay && overlay.current) {
			categoriesRef.current.classList.replace("-translate-x-full", "translate-x-0");
			overlay.current.classList.replace("hidden", "block");
		}
	};

	const handleClose = () => {
		if (categoriesRef.current && overlay && overlay.current) {
			categoriesRef.current.classList.replace("translate-x-0", "-translate-x-full");
			overlay.current.classList.replace("block", "hidden");
		}
		document.removeEventListener("click", handleClickOutside, true);
	};

	const handleClickOutside = (event: any) => {
		const { target } = event;

		if (categoriesRef.current && target && "nodeType" in target) {
			if (!categoriesRef.current.contains(target)) {
				handleClose();
			}
		}
	};

	useImperativeHandle(ref, () => ({
		current: categoriesRef.current,
		open: handleOpen,
	}));

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);

		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		handleClose();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.asPath]);

	return (
		<div
			ref={categoriesRef}
			className="fixed top-0 left-0 z-20 flex flex-col h-screen overflow-y-hidden transition duration-300 ease-out delay-200 -translate-x-full bg-white dark:bg-black-dark-3 lg:w-screen-1/3 md:w-screen-1/2 w-screen-4/5 rounded-tr-2xl"
		>
			<section className="flex items-center justify-between px-2 py-3 bg-primary-100">
				<p className="font-semibold text-light-100 text-heading-3 lg:text-heading-2">Phân loại</p>
				<Delete onClick={handleClose} width={20} height={20} className="text-light-100" />
			</section>
			<div className="px-2 mt-2 space-y-2 overflow-y-auto grow">
				{categories.length > 0 &&
					categories.map((category) => (
						<Fragment key={category._id}>
							<CategoryItem
								active={id === category._id}
								key={category._id}
								id={category._id}
								level={1}
								name={category.name.filter((item) => item.language === "vi")[0].value}
							/>
							{category.children &&
								category.children.map((child) => (
									<Fragment key={child._id}>
										<CategoryItem
											level={2}
											id={child._id}
											active={id === child._id}
											name={child.name.filter((item) => item.language === "vi")[0].value}
										/>
										{child.children &&
											child.children.map((grandChild) => (
												<CategoryItem
													key={grandChild._id}
													id={grandChild._id}
													active={id === grandChild._id}
													level={3}
													name={grandChild.name.filter((item) => item.language === "vi")[0].value}
												/>
											))}
									</Fragment>
								))}
						</Fragment>
					))}
			</div>
		</div>
	);
});

CategoriesWindow.displayName = "CategoriesWindow";

export default CategoriesWindow;
