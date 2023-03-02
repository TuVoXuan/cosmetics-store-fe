declare interface IProductItem {
	productId: string;
	itemId: string;
	price: number;
	thumbnail: string;
	name: ITranslation[];
	brand: string;
	categories: string[];
}

declare interface IGetProductByCategory extends IRandomPagination {
	id: string;
}

declare interface IGetProductByCategoryAndOptioins extends ILoadMorePagination {
	id: string;
	from?: string;
	to?: string;
	brand?: string;
	order?: "asc" | "desc";
}
