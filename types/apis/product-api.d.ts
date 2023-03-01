declare interface IProductItem {
	_id: string;
	price: number;
	thumbnail: string;
	name: Itranslate[];
	brand: string;
	categories: {
		_id: string;
		name: Itranslate[];
	};
}
