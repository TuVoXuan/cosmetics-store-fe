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
