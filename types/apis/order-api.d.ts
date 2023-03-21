import { OrderStatus, PaymentMethod } from "../../constants/enums";

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

declare interface IComment {
	_id: string;
	rate: number;
	content: string;
}

declare interface IOrderItem {
	_id: string;
	productItemId: string;
	name: ITranslation[];
	price: number;
	quantity: number;
	thumbnail: string;
	configurations: ITranslation[][];
	comment: IComment;
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
	status: OrderStatus;
}

declare interface ICancelOrder {
	orderId: string;
	status: OrderStatus;
}
