import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { orderApi } from "../../../api/order-api";
import LoadingHorizontal from "../../../components/icons/loading";
import Warning from "../../../components/icons/warning";
import Dropdown from "../../../components/inputs/dropdown";
import OrderContainer from "../../../components/order/order-container";
import OrderStatus from "../../../components/order/order-status";
import TitlePage from "../../../components/title-page/title-page";
import APP_PATH from "../../../constants/app-path";
import { OrderStatus as EnumOrderStatus } from "../../../constants/enums";
import { IOrder } from "../../../types/apis/order-api";
import { toastError, toastSuccess } from "../../../util/toast";

export default function OrdersHistory() {
	const { register } = useForm();

	const router = useRouter();
	const { status } = router.query;

	const [orders, setOrders] = useState<IOrder[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchOrders = async () => {
		if (status) {
			const data = await orderApi.getOrders(status as string as EnumOrderStatus);
			setOrders(data);
			setLoading(false);
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

	const handleCancelOrder = async (orderId: string) => {
		try {
			toast.loading("Đang hủy đơn hàng", { id: "cancelOrder" });
			const response = await orderApi.cancelOrder(orderId);
			setOrders(orders.filter((item) => item._id !== response.orderId));
			toast.dismiss("cancelOrder");
			toastSuccess("Hủy đơn hàng thành công");
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	const handleWarningCancelOrder = (orderId: string, orderName: string) => {
		toast.loading(
			(t) => (
				<div className="space-y-3">
					<p>{`Bạn có chắc muốn hủy đơn hàng ${orderName} không?`}</p>

					<div className="flex justify-end gap-x-3">
						<button
							className="px-5 py-2 font-semibold border-2 rounded-3xl border-gray-accent hover:border-black"
							onClick={() => toast.dismiss(t.id)}
						>
							Không
						</button>
						<button
							onClick={() => {
								toast.dismiss(t.id);
								handleCancelOrder(orderId);
							}}
							className="px-5 py-2 font-semibold text-white rounded-3xl bg-red-accent"
						>
							Có
						</button>
					</div>
				</div>
			),
			{
				style: { maxWidth: "500px" },
				icon: <Warning className="text-yellow-tertiary-100" />,
			}
		);
	};

	useEffect(() => {
		setLoading(true);
		setOrders([]);
		fetchOrders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
				<div className="hidden mt-16 space-y-4 w-fit whitespace-nowrap lg:block">
					<OrderStatus value={EnumOrderStatus.Pending}>Đang xử lý</OrderStatus>
					<OrderStatus value={EnumOrderStatus.Delivering}>Đang giao</OrderStatus>
					<OrderStatus value={EnumOrderStatus.Completed}>Đã nhận</OrderStatus>
					<OrderStatus value={EnumOrderStatus.Cancelled}>Đã hủy</OrderStatus>
				</div>
				<div className="space-y-8 lg:grow mt-14 md:mt-16 md:space-y-12 ">
					{loading ? (
						<div className="flex flex-col items-center">
							<LoadingHorizontal className="h-[100px] text-primary-100" />
							<p className="text-center">Đang tải dữ liệu vui lòng đợi trong giây lát</p>
						</div>
					) : (
						<Fragment>
							{orders.length > 0 &&
								orders.map((item) => (
									<OrderContainer
										onCancelOrder={handleWarningCancelOrder}
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
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
}
