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

declare interface IVariationList {
	_id: string;
	name: ITranslation[];
	values: {
		_id: string;
		value: ITranslation[];
	}[];
}

declare interface IProductItemDetail {
	_id: string;
	price: number;
	thumbnail: string;
	images: string[];
	name: ITranslation[];
	configurations: string[];
}

declare interface IProductDetailInfo {
	productItems: IProductItemDetail[];
	variationList: IVariationList[];
	descriptions: ITranslation[];
}

declare interface ISearchProduct extends Omit<IGetProductByCategoryAndOptioins, "id"> {
	search: string;
}

declare interface ICreateComment {
	rate: number;
	content: string;
	productItemId: string;
	orderItemId: string;
}

declare interface IUpdateComment {
	_id: string;
	rate: number;
	content: string;
	productItemId: string;
}

declare interface IRateType {
	rate: number;
	count: number;
}

declare interface IRatingProductItem {
	rating: number;
	rateType: IRateType[];
}

declare interface ICommentProdItem {
	_id: string;
	content: string;
	user: {
		_id: string;
		name: string;
	};
	rate: number;
	createdAt: string;
}

declare interface ICommentPagination {
	data: ICommentProdItem[];
	totalPage: number;
}
