import React from "react";
import Button from "../components/buttons/button";
import ItemCart from "../components/card/item-cart";
import TitlePage from "../components/title-page/title-page";

export default function ShoppingCart() {
	return (
		<section className="pt-14 md:pt-16 mb-[104px] md:mb-[112px] xl:mb-[144px]">
			<div className="justify-between mb-14 md:items-end md:flex md:mb-16">
				<TitlePage className="mb-6 md:mb-0" subtitle="Giỏ hàng của bạn" title="Giỏ hàng" />

				<Button type="secondary">Xóa tất cả</Button>
			</div>

			<div className="justify-between xl:flex">
				<div className="mb-10 space-y-10 md:mb-12 md:space-y-12 xl:mb-0 xl:w-[784px]">
					<ItemCart sale={20} price={100} />
					<ItemCart sale={20} price={100} />
				</div>

				<div className="p-6 border-2 border-gray-accent rounded-4xl md:p-14 xl:w-[416px] dark:border-black-dark-2">
					<h4 className="mb-10 font-semibold text-heading-4 md:text-heading-2 md:mb-12 dark:text-white">
						Tổng số giỏ hàng
					</h4>
					<div className="space-y-10 mb-14 md:space-y-12 md:mb-20 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-24 lg:gap-y-12 lg:mb-12 xl:block xl:space-y-12 xl:mb-20">
						<div className="flex justify-between">
							<p className="text-heading-5 md:text-paragraph-1 dark:text-white">Tổng phụ:</p>
							<p className="text-heading-5 md:text-paragraph-1 dark:text-white">$209</p>
						</div>
						<div className="flex justify-between">
							<p className="text-heading-5 md:text-paragraph-1 dark:text-white">Thuế:</p>
							<p className="text-heading-5 md:text-paragraph-1 dark:text-white">$209</p>
						</div>
						<div className="flex justify-between">
							<p className="text-heading-5 md:text-paragraph-1 dark:text-white">
								Phí giao hàng:
							</p>
							<p className="text-heading-5 md:text-paragraph-1 dark:text-white">$209</p>
						</div>
						<div className="flex justify-between">
							<p className="font-semibold text-heading-5 md:text-paragraph-1 dark:text-white">
								Tổng:
							</p>
							<p className="font-semibold text-heading-5 md:text-paragraph-1 dark:text-white">
								$209
							</p>
						</div>
					</div>
					<Button className="w-full lg:w-fit xl:w-full" type="primary">
						Thanh toán
					</Button>
				</div>
			</div>
		</section>
	);
}
