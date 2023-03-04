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

declare interface IOption {
	value: string;
	label: string;
}

declare interface IDisableVariationList {
	_id: string;
	value: string[];
}

declare interface ISeletedVariationList {
	variationId: string;
	optionId: string;
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

declare interface CartItem {
	productId: string;
	itemId: string;
	price: number;
	thumbnail: string;
	name: ITranslation[];
	quantity: number;
}

declare interface IChangeQuantityCartItem {
	productId: string;
	itemId: string;
	quantity: number;
}

declare interface IDeleteCart {
	productId: string;
	itemId: string;
}
