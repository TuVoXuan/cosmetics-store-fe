import React from "react";
import Badge from "../badge/badge";
import Button from "../buttons/button";
import OrderItem from "./order-item";

export default function OrderContainer() {
	return (
		<div className="p-4 space-y-8 border-2 md:p-12 lg:p-10 border-gray-accent rounded-3xl dark:border-black-dark-2">
			<div className="flex items-end justify-between">
				<h2 className="text-heading-4 md:text-heading-2 lg:text-heading-2 dark:text-light-100">
					#123456789
				</h2>
				<p className="font-semibold text-paragraph-5 md:text-heading-5 text-dark-40 dark:text-light-100">
					11/2/2023
				</p>
			</div>
			<div className="space-y-8">
				<OrderItem />
				<OrderItem />
			</div>
			<div>
				<p className="text-paragraph-5 md:text-paragraph-2 lg:text-heading-4 dark:text-light-100">
					và <span className="font-semibold">3</span> sản phẩm khác
				</p>
				<div className="flex justify-between">
					<p className="font-semibold text-paragraph-5 md:text-heading-3 lg:text-heading-4 dark:text-light-100">
						Tổng đơn hàng:
					</p>
					<p className="font-semibold text-paragraph-5 md:text-heading-3 lg:text-heading-4 dark:text-light-100">
						499.000đ
					</p>
				</div>
			</div>
			<div className="md:flex md:justify-end">
				<Button className="w-full md:w-fit md:ml" type="danger">
					Hủy đơn hàng
				</Button>
			</div>
		</div>
	);
}
