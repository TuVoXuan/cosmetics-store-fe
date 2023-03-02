declare interface IOption {
	label: string;
	value: string;
}

declare interface IAdministrativeOption extends IOption {
	id: string;
}

declare interface ITranslation {
	language: "vi" | "en";
	value: string;
}

declare interface IRandomPagination {
	previous?: string[];
	limit: string;
}

declare interface ILoadMorePagination {
	limit: string;
	after?: string;
}

declare interface ILoadMorePaginationRes<T> {
	data: T;
	after: string;
}
