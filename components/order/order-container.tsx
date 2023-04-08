import { useRouter } from "next/router";
import React from "react";
import APP_PATH from "../../constants/app-path";
import { OrderStatus, PaymentMethod } from "../../constants/enums";
import { IOrder } from "../../types/apis/order-api";
import { convertDate, convertPrice } from "../../util/product";
import { hashCode } from "../../util/short-hash";
import Badge from "../badge/badge";
import Button from "../buttons/button";
import OrderItem from "./order-item";
import { useSettings } from "../../store/hooks";

interface Props {
	order: IOrder;
	status: OrderStatus;
	onCancelOrder: (orderId: string, orderName: string) => void;
}

export default function OrderContainer({ order, status, onCancelOrder }: Props) {
	const router = useRouter();
	const { language } = useSettings();

	const handleTotal: () => number = () => {
		let sum = 0;
		for (const item of order.orderItems) {
			sum += item.price * item.quantity;
		}

		return sum + order.shippingFee;
	};

	const handleOnClick = () => {
		router.push(`${APP_PATH.ORDER_HISTORY}/${order._id}`);
	};

	return (
		<div
			onClick={handleOnClick}
			className="p-4 space-y-4 border-2 md:p-6 lg:p-8 border-gray-accent dark:border-black-dark-2"
		>
			<div className="flex items-end justify-between">
				<h4 className="text-heading-6 md:text-heading-5 lg:text-paragraph-3 dark:text-light-100">{order.orderId}</h4>
				<p className="font-semibold text-paragraph-5 md:text-heading-5 lg:text-paragraph-3 text-dark-40 dark:text-light-100">
					{convertDate(order.date)}
				</p>
			</div>
			<div>
				<OrderItem key={order.orderItems[0]._id} item={order.orderItems[0]} />
			</div>
			<div>
				{order.orderItems.length > 1 && (
					<p className="text-paragraph-5 md:text-paragraph-4 lg:text-paragraph-3 dark:text-light-100">
						{language.component_ui.and} <span className="font-semibold">{order.orderItems.length - 1}</span>{" "}
						{language.component_ui.other_products}
					</p>
				)}
				<div className="flex justify-between">
					<p className="font-semibold text-paragraph-5 md:text-paragraph-4 lg:text-paragraph-3 dark:text-light-100">
						{language.component_ui.order_total}
					</p>
					<p className="font-semibold text-paragraph-5 md:text-paragraph-4 lg:text-paragraph-3 dark:text-light-100">
						{convertPrice(handleTotal())}
					</p>
				</div>
			</div>
			{status === OrderStatus.Pending && (
				<div className="md:flex md:justify-end">
					<Button
						onClick={(event) => {
							event.stopPropagation();
							onCancelOrder(order._id, hashCode(order._id));
						}}
						className="w-full font-medium text-heading-6 md:text-heading-5 md:px-8 md:py-2 md:w-fit"
						type="danger"
					>
						{language.component_ui.cancel_oder}
					</Button>
				</div>
			)}
			{status === OrderStatus.Cancelled && order.paymentMethod === PaymentMethod.MOMO && (
				<p className="font-medium text-red-accent">{language.component_ui.note_cancel_order}</p>
			)}
		</div>
	);
}
