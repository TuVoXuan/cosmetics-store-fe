import { useRouter } from "next/router";
import { settings } from "nprogress";
import { createContext, ReactNode, useEffect, useState } from "react";
import { selectCategories } from "../redux/slices/category-slice";
import { useAppSelector } from "../store/hooks";
import { PaletteMode } from "../types/types";
import { findPath } from "../util/category";

// Type

export type PathCategoryContextValue = {
	path: ICategory[];
};

// Create context
export const PathCategoryContext = createContext<PathCategoryContextValue>({
	path: [],
});

export const PathCategoryProvider = ({ children }: { children: ReactNode }) => {
	const [path, setPath] = useState<ICategory[]>([]);

	const categories = useAppSelector(selectCategories).categories;

	const router = useRouter();
	const { id } = router.query;

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
			setPath(newPath);
		}
	};

	useEffect(() => {
		if (id) {
			findPathCategory(id as string);
		}
	}, [id, categories]);

	return <PathCategoryContext.Provider value={{ path }}>{children}</PathCategoryContext.Provider>;
};

export const PathCategoryConsumer = PathCategoryContext.Consumer;
