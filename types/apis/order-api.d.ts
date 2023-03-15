import { PaymentMethod } from "../../constants/enums";

declare interface ICreateOrderItem {
	productItem: string;
	price: number;
	quantity: Number;
}

declare interface ICreateOrder {
	address: string;
	paymentMethod: PaymentMethod;
	shippingFee: number;
	orderItems: ICreateOrderItem[];
}

declare interface IOrderItem {
	_id: string;
	name: ITranslation[];
	price: number;
	quantity: number;
	thumbnail: string;
}

declare interface IOrder {
	_id: string;
	orderItems: IOrderItem[];
	paymentMethod: PaymentMethod;
	shippingFee: number;
	date: string;
}

declare interface IOrderDetail extends IOrder {
	address: IAddress;
}
