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
