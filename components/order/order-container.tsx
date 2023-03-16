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

interface Props {
	order: IOrder;
	status: OrderStatus;
	onCancelOrder: (orderId: string, orderName: string) => void;
}

export default function OrderContainer({ order, status, onCancelOrder }: Props) {
	const router = useRouter();

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
			className="p-4 space-y-8 border-2 md:p-8 lg:px-12 lg:py-8 border-gray-accent rounded-3xl dark:border-black-dark-2"
		>
			<div className="flex items-end justify-between">
				<h2 className="text-heading-4 md:text-heading-3 dark:text-light-100">
					{hashCode(order._id)}
				</h2>
				<p className="font-semibold text-paragraph-5 md:text-heading-5 text-dark-40 dark:text-light-100">
					{convertDate(order.date)}
				</p>
			</div>
			<div className="space-y-8">
				<OrderItem key={order.orderItems[0]._id} item={order.orderItems[0]} />
			</div>
			<div>
				{order.orderItems.length > 1 && (
					<p className="text-paragraph-5 md:text-paragraph-3 dark:text-light-100">
						và <span className="font-semibold">{order.orderItems.length - 1}</span> sản phẩm khác
					</p>
				)}
				<div className="flex justify-between">
					<p className="font-semibold text-paragraph-5 md:text-paragraph-3 dark:text-light-100">
						Tổng đơn hàng:
					</p>
					<p className="font-semibold text-paragraph-5 md:text-paragraph-3 dark:text-light-100">
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
						className="w-full font-medium md:px-8 md:py-2 md:w-fit"
						type="danger"
					>
						Hủy đơn hàng
					</Button>
				</div>
			)}
			{status === OrderStatus.Cancelled && order.paymentMethod === PaymentMethod.MOMO && (
				<p className="font-medium text-red-accent">
					Lưu ý: Đơn hàng thanh toán bằng Momo sẽ được hoàn tiền sau 24h.
				</p>
			)}
		</div>
	);
}
