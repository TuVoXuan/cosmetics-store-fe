import React from "react";
import Button from "../components/buttons/button";
import ItemCartCheckout from "../components/card/item-cart-checkout";
import Steps from "../components/steps/steps";
import TitlePage from "../components/title-page/title-page";

export default function Checkout() {
	return (
		<div className="space-y-14 mt-14">
			<TitlePage subtitle="Gần hoàn thành" title="Thanh toán" />
			<Steps totalSteps={4} currentStep={2} />

			{/* my cart */}
			<div className="p-6 md:p-14 rounded-4xl border-2 border-gray-accent dark:border-black-dark-2 space-y-10 md:space-y-12">
				<p className="text-heading-4 md:text-heading-2 text-dark-100 font-semibold dark:text-light-100">
					Giỏ hàng của tôi
				</p>
				<div className="space-y-10 md:space-y-6">
					<ItemCartCheckout />
					<ItemCartCheckout />
				</div>
				<div className="flex justify-between font-semibold md:text-heading-3 text-heading-5 xl:text-paragraph-1">
					<p className="dark:text-light-100">Tổng:</p>
					<p className="dark:text-light-100">$244</p>
				</div>
				<Button className="w-full !mt-14 md:!mt-20 dark:text-light-100" type="secondary">
					Chỉnh sửa giỏ hàng
				</Button>
			</div>
		</div>
	);
}
