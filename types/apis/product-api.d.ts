declare interface IProductItem {
	_id: string;
	price: number;
	thumbnail: string;
	name: ITranslation[];
	brand: string;
	categories: {
		_id: string;
		name: ITranslation[];
	};
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

declare interface IProductBasicInfo {
	descriptions: ITranslation[];
	rating: number;
	comments: string[];
}

declare interface IProductDetailInfo {
	productItems: IProductItemDetail[];
	variationList: IVariationList[];
	productInfo: IProductBasicInfo;
}
