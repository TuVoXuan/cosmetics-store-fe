import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { orderApi } from "../../api/order-api";
import { useAppDispatch } from "../../store/hooks";
import LoadingHorizontal from "../../components/icons/loading";
import APP_PATH from "../../constants/app-path";
import { deleteAll } from "../../redux/slices/cart-slice";
import { toastError } from "../../util/toast";

export default function Loading() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const orderId = router.query.orderId as string;
	console.log("orderId: ", orderId);

	const handleCheckOrder = async () => {
		try {
			const existOrder = await orderApi.checkOrder(orderId);
			if (existOrder) {
				router.push({ pathname: APP_PATH.ORDER_HISTORY, query: { status: "pending" } });
				dispatch(deleteAll());
			} else {
				router.push(APP_PATH.CART);
			}
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	useEffect(() => {
		const timeOut = setTimeout(() => {
			if (orderId) {
				handleCheckOrder();
			}
		}, 2000);

		return () => clearTimeout(timeOut);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderId]);

	return (
		<div className="flex flex-col gap-y-3 items-center mt-14 mb-14 md:mb-[112px] xl:mb-[144px]">
			<LoadingHorizontal className="h-[100px] text-primary-100" />
			<p className="dark:text-white">Đơn hàng của bạn đang được xử lý</p>
			<p className="dark:text-white">Vui lòng đợi trong giây lát..</p>
		</div>
	);
}
