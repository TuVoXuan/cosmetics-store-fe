export const findParentCategory: (element: ICategory, id: string) => ICategory | null = (
	element: ICategory,
	id: string
) => {
	if (element.children) {
		const e = element.children.find((item) => item._id === id);
		if (e) {
			return element;
		}
		for (const child of element.children) {
			const result = findParentCategory(child, id);
			if (result) {
				return result;
			}
		}
	}
	return null;
};

export const findPath: (element: ICategory, id: string) => ICategory[] = (element: ICategory, id: string) => {
	if (element._id === id) {
		return [{ _id: element._id, name: element.name }];
	}
	if (element.children) {
		for (const child of element.children) {
			const result = findPath(child, id);

			if (result.length > 0) {
				result.unshift({ _id: element._id, name: element.name });
				return result;
			}
		}
	}

	return [];
};
