import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { orderApi } from "../../../api/order-api";
import OrderHistoryCardLoader from "../../../components/card/skeleton-loader/order-history-card-loader";
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
import { useSettings } from "../../../store/hooks";

export default function OrdersHistory() {
	const { register } = useForm();

	const router = useRouter();
	const { status } = router.query;
	const { language } = useSettings();

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
			toast.loading(language.account_orders_history.mes_cancelling_order, { id: "cancelOrder" });
			const response = await orderApi.cancelOrder(orderId);
			setOrders(orders.filter((item) => item._id !== response.orderId));
			toast.dismiss("cancelOrder");
			toastSuccess(language.account_orders_history.mes_cancel_order_success);
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	const handleWarningCancelOrder = (orderId: string, orderName: string) => {
		toast.loading(
			(t) => (
				<div className="space-y-3">
					<p>{`${language.account_orders_history.mes_ask_cancel_order} ${orderName}?`}</p>

					<div className="flex justify-end gap-x-3">
						<button
							className="px-5 py-2 font-semibold border-2 rounded-3xl border-gray-accent hover:border-black"
							onClick={() => toast.dismiss(t.id)}
						>
							{language.account_orders_history.no}
						</button>
						<button
							onClick={() => {
								toast.dismiss(t.id);
								handleCancelOrder(orderId);
							}}
							className="px-5 py-2 font-semibold text-white rounded-3xl bg-red-accent"
						>
							{language.account_orders_history.yes}
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
			<TitlePage
				className="mt-14"
				subtitle={language.account_orders_history.personal_subtitle}
				title={language.account_orders_history.personal_title}
			/>
			<div className="lg:px-28">
				<Dropdown
					defaulValue={(status as string) || EnumOrderStatus.Pending}
					register={register}
					name={"orderStatus"}
					className="z-[1] mt-14 md:mt-16 lg:hidden"
					onChange={handleSelectChange}
					options={[
						{
							label: language.account_orders_history.order_status_pending,
							value: EnumOrderStatus.Pending,
						},
						{
							label: language.account_orders_history.order_status_delivering,
							value: EnumOrderStatus.Delivering,
						},
						{
							label: language.account_orders_history.order_status_completed,
							value: EnumOrderStatus.Completed,
						},
						{
							label: language.account_orders_history.order_status_cancelled,
							value: EnumOrderStatus.Cancelled,
						},
					]}
				/>
				<div className="lg:flex gap-x-12">
					<div className="hidden mt-16 space-y-4 w-fit whitespace-nowrap lg:block">
						<OrderStatus value={EnumOrderStatus.Pending}>
							{language.account_orders_history.order_status_pending}
						</OrderStatus>
						<OrderStatus value={EnumOrderStatus.Delivering}>
							{language.account_orders_history.order_status_delivering}
						</OrderStatus>
						<OrderStatus value={EnumOrderStatus.Completed}>
							{language.account_orders_history.order_status_completed}
						</OrderStatus>
						<OrderStatus value={EnumOrderStatus.Cancelled}>
							{language.account_orders_history.order_status_cancelled}
						</OrderStatus>
					</div>
					<div className="space-y-6 lg:grow mt-14 md:mt-16 md:space-y-8 ">
						{loading ? (
							<>
								<OrderHistoryCardLoader />
								<OrderHistoryCardLoader />
								<OrderHistoryCardLoader />
								<OrderHistoryCardLoader />
								<OrderHistoryCardLoader />
							</>
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
										{language.account_orders_history.no_order}
									</p>
								)}
							</Fragment>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
