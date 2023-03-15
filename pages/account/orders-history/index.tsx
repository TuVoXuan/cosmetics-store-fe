import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { orderApi } from "../../../api/order-api";
import Dropdown from "../../../components/inputs/dropdown";
import OrderContainer from "../../../components/order/order-container";
import OrderStatus from "../../../components/order/order-status";
import TitlePage from "../../../components/title-page/title-page";
import APP_PATH from "../../../constants/app-path";
import { OrderStatus as EnumOrderStatus } from "../../../constants/enums";
import { IOrder } from "../../../types/apis/order-api";

export default function OrdersHistory() {
	const { register } = useForm();

	const router = useRouter();
	const { status } = router.query;

	const [orders, setOrders] = useState<IOrder[]>([]);

	const fetchOrders = async () => {
		if (status) {
			const data = await orderApi.getOrders(status as string as EnumOrderStatus);
			setOrders(data);
		}
	};

	const handleSelectChange = (value: string) => {
		router.push({
			pathname: APP_PATH.ORDER_HISTORY,
			query: {
				status: value,
			},
		});
	};

	useEffect(() => {
		setOrders([]);
		fetchOrders();
	}, [status]);

	return (
		<div className="mb-[104px] md:mb-28 xl:mb-36">
			<TitlePage className="mt-14" subtitle="Cá nhân" title="Đơn hàng của bạn" />
			<Dropdown
				defaulValue={EnumOrderStatus.Pending}
				register={register}
				name={"orderStatus"}
				className="z-[1] mt-14 md:mt-16 lg:hidden"
				onChange={handleSelectChange}
				options={[
					{ label: "Đang xử lý", value: EnumOrderStatus.Pending },
					{ label: "Đang giao", value: EnumOrderStatus.Delivering },
					{ label: "Đã nhận hàng", value: EnumOrderStatus.Completed },
					{ label: "Đã hủy", value: EnumOrderStatus.Cancelled },
				]}
			/>
			<div className="lg:flex gap-x-12">
				<div className="hidden mt-16 space-y-4 w-fit lg:block">
					<OrderStatus value={EnumOrderStatus.Pending}>Đang xử lý</OrderStatus>
					<OrderStatus value={EnumOrderStatus.Delivering}>Đang giao</OrderStatus>
					<OrderStatus value={EnumOrderStatus.Completed}>Đã nhận</OrderStatus>
					<OrderStatus value={EnumOrderStatus.Cancelled}>Đã hủy</OrderStatus>
				</div>
				<div className="space-y-8 lg:grow mt-14 md:mt-16 md:space-y-12 ">
					{orders.length > 0 &&
						orders.map((item) => (
							<OrderContainer
								key={item._id}
								order={item}
								status={((status as string) || "pending") as EnumOrderStatus}
							/>
						))}
					{orders.length === 0 && (
						<p className="text-center md:text-paragraph-2 lg:h-full lg:flex lg:justify-center lg:items-center">
							Không có đơn hàng
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
