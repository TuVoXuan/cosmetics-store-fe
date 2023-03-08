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

declare interface IAddressForm {
	name: string;
	phone: string;
	province: string;
	district: string;
	ward: string;
	specificAddress: string;
}

declare interface ICoordinates {
	latitude: number;
	longitude: number;
}

declare interface IAddressAPI extends IAddressForm {
	coordinates: ICoordinates;
}

declare interface IAddress extends IAddressForm {
	_id: string;
	default: boolean;
}

declare interface IAddressExtract extends IAddress {
	coordinates: ICoordinates;
}
