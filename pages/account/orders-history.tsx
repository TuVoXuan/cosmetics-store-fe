import React from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../../components/inputs/dropdown";
import OrderContainer from "../../components/order/order-container";
import OrderStatus from "../../components/order/order-status";
import TitlePage from "../../components/title-page/title-page";

export default function OrdersHistory() {
	const { register } = useForm();
	return (
		<div className="mb-[104px] md:mb-28 xl:mb-36">
			<TitlePage className="mt-14" subtitle="Cá nhân" title="Đơn hàng của bạn" />
			<Dropdown
				register={register}
				name={"orderStatus"}
				className="z-[1] mt-14 md:mt-16 lg:hidden"
				onChange={(value: string) => console.log(value)}
				options={[
					{ label: "Đang xử lý", value: "Đang xử lý" },
					{ label: "Đang giao", value: "Đang giao" },
					{ label: "Đã nhận hàng", value: "Đã nhận hàng" },
					{ label: "Đã hủy", value: "Đã hủy" },
				]}
			/>
			<div className="lg:flex gap-x-12">
				<div className="hidden w-1/4 mt-16 space-y-4 lg:block">
					<OrderStatus active>Đang xử lý</OrderStatus>
					<OrderStatus>Đang giao</OrderStatus>
					<OrderStatus>Đã nhận</OrderStatus>
					<OrderStatus>Đã hủy</OrderStatus>
				</div>
				<div className="space-y-8 mt-14 md:mt-16 md:space-y-12 ">
					<OrderContainer />
					<OrderContainer />
					<OrderContainer />
				</div>
			</div>
		</div>
	);
}
