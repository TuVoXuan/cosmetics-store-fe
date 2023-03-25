import React, { Fragment, MouseEvent, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import Delete from "../icons/delete";
import { selectCategories } from "../../redux/slices/category-slice";
import Category from "../category/categoryItem";
import GoBack from "../icons/go-back";
import { useRouter } from "next/dist/client/router";
import APP_PATH from "../../constants/app-path";
import Button from "../buttons/button";
import { findParentCategory, findPath } from "../../util/category";

export type CategoriesRefType = {
	current: HTMLDivElement | null;
	open: () => void;
};

interface Props {
	overlay?: React.RefObject<HTMLDivElement>;
}

const Categories = React.forwardRef<CategoriesRefType, Props>(({ overlay }, ref) => {
	const categoriesRef = useRef<HTMLDivElement>(null);
	const categories = useAppSelector(selectCategories).categories;
	const [showedCategories, setShowedCategories] = useState<ICategory | null>();
	const [path, setPath] = useState<ICategory[]>([]);

	const router = useRouter();
	const { id } = router.query;

	// handle model function
	const handleOpen = () => {
		findShowedCategories(id as string);
		findPathCategory(id as string);
		document.addEventListener("click", handleClickOutside, true);
		if (categoriesRef.current && overlay && overlay.current) {
			categoriesRef.current.classList.replace("translate-y-full", "translate-y-0");
			overlay.current.classList.replace("hidden", "block");
		}
	};

	const handleClose = () => {
		if (categoriesRef.current && overlay && overlay.current) {
			categoriesRef.current.classList.replace("translate-y-0", "translate-y-full");

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

	const findShowedCategories = (cateId: string | undefined) => {
		if (cateId) {
			const categoriesTree: ICategory = {
				_id: "root",
				name: [
					{ language: "vi", value: "Danh mục" },
					{ language: "en", value: "Category" },
				],
				children: categories,
			};

			setShowedCategories(findParentCategory(categoriesTree, cateId));
			const newPath = findPath(categoriesTree, cateId);
			setPath(newPath.slice(0, -1));
		}
	};

	const findPathCategory = (cateId: string | undefined) => {
		if (cateId) {
			const categoriesTree: ICategory = {
				_id: "root",
				name: [
					{ language: "vi", value: "Danh mục" },
					{ language: "en", value: "Category" },
				],
				children: categories,
			};

			const newPath = findPath(categoriesTree, cateId);
			setPath(newPath.slice(0, -1));
		}
	};

	const handleGoBack = () => {
		findShowedCategories(showedCategories?._id);
		setPath(path.slice(0, -1));
	};

	const handleClick = (cate: ICategory) => {
		if (cate.children) {
			setShowedCategories(cate);
			setPath((value) => [...value, { _id: cate._id, name: cate.name }]);
		} else {
			handleClose();
			router.push(`${APP_PATH.CATEGORY}/${cate._id}`);
		}
	};

	const handleChooseButtonClick = () => {
		if (showedCategories?._id !== "root") {
			handleClose();
			router.push(`${APP_PATH.CATEGORY}/${showedCategories?._id}`);
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
		findShowedCategories(id as string);
		findPathCategory(id as string);
	}, [id, categories]);

	return (
		<div
			ref={categoriesRef}
			className="fixed z-20 w-[100%] h-[90%] flex flex-col bg-white dark:bg-black-dark-3 rounded-t-2xl bottom-0 left-0 translate-y-full
				  transition-transform duration-500 ease-in-out"
		>
			<div className="relative p-4 border-b-2 border-gray-accent dark:border-black-dark-2 md:p-5">
				<h3 className="text-center text-heading-5 lg:text-heading-4 dark:text-white">Danh mục sản phẩm</h3>

				<button onClick={handleClose} className="absolute top-[50%] -translate-y-1/2 right-4 md:right-5">
					<Delete width={20} height={20} className="dark:text-white" />
				</button>

				{showedCategories && showedCategories._id !== "root" && (
					<button onClick={handleGoBack} className="absolute top-[50%] -translate-y-1/2 left-4 md:right-5">
						<GoBack width={16} height={16} className="dark:text-white" />
					</button>
				)}
			</div>

			<div className="flex flex-wrap p-4 bg-gray-accent dark:bg-black-dark-2">
				{path.length > 0 && (
					<p className="text-paragraph-5 capitalize dark:text-light-100">
						{path.map((item) => item.name.filter((e) => e.language === "vi")[0].value).join(" / ")}
					</p>
				)}
			</div>

			<div className="px-4 overflow-y-auto grow">
				{showedCategories?.children &&
					showedCategories.children.map((item) => (
						<Category key={item._id} category={item} onClick={() => handleClick(item)} />
					))}
			</div>
			<div className="p-4 shadow-t-md">
				<Button className="!py-2 md:!py-3 w-full md:w-fit" type="primary" onClick={handleChooseButtonClick}>
					Chọn
				</Button>
			</div>
		</div>
	);
});

Categories.displayName = "Categories";

export default Categories;
