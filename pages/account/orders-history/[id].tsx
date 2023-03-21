import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { orderApi } from "../../../api/order-api";
import Button from "../../../components/buttons/button";
import LoadingHorizontal from "../../../components/icons/loading";
import ProductImage from "../../../components/Image/product-image";
import Overlay from "../../../components/modal/overlay";
import ProductReview, { ProdReviewRefType } from "../../../components/modal/product-review";
import TitlePage from "../../../components/title-page/title-page";
import { OrderStatus } from "../../../constants/enums";
import { IComment, IOrderDetail } from "../../../types/apis/order-api";
import { convertDate, convertPrice } from "../../../util/product";
import { hashCode } from "../../../util/short-hash";

export default function OrderDetail() {
	const router = useRouter();
	const { id } = router.query;

	const [order, setOrder] = useState<IOrderDetail>();
	const [total, setTotal] = useState(0);

	const prodReviewModalRef = useRef<ProdReviewRefType>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	const fetchOrder = async () => {
		if (id) {
			const data = await orderApi.getOrdersById(id as string);
			setOrder(data);
			const sum = data.orderItems.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);

			setTotal(sum);
		}
	};

	const handleSetComment = (comment: IComment, orderItemId: string) => {
		if (order) {
			const orderItem = order.orderItems.find((item) => item._id === orderItemId);
			if (orderItem) {
				orderItem.comment = comment;
			}
		}
	};

	const handleOpenProdReviewModal = () => {
		if (prodReviewModalRef.current) {
			prodReviewModalRef.current.open();
		}
	};

	const handleSetValueProdReviewModal = (orderItemId: string, productItemId: string) => {
		if (prodReviewModalRef.current) {
			prodReviewModalRef.current.setFormValue(orderItemId, productItemId);
		}
	};

	const handleSetDefaultComment = (comment: IComment) => {
		if (prodReviewModalRef.current) {
			prodReviewModalRef.current.setDefaultComment(comment);
		}
	};

	useEffect(() => {
		fetchOrder();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return order ? (
		<Fragment>
			<div className="space-y-10 mb-[104px]">
				<TitlePage className="mt-14" subtitle="Đơn hàng" title="Thông tin đơn hàng của bạn" />

				<div className="p-4 space-y-8 border-2 md:p-10 lg:space-y-12 lg:p-14 border-gray-accent rounded-3xl lg:w-4/5 lg:mx-auto">
					<h3 className="text-heading-4 lg:text-heading-2">Thông tin sản phẩm</h3>
					<div className="space-y-8 lg:space-y-12">
						<div className="space-y-6">
							{order.orderItems.map((item) => (
								<div
									key={item._id}
									className="flex flex-col items-center justify-center gap-y-6"
								>
									<div className="flex flex-col items-center gap-y-6 md:flex-row md:gap-y-0 md:gap-x-6 md:justify-between">
										<div className="md:flex md:gap-x-6">
											<ProductImage
												src={item.thumbnail}
												className="w-20 h-20 mx-auto md:w-24 md:h-24 lg:w-28 lg:h-28 md:mx-0 shrink-0"
											/>
											<div className="justify-center md:flex md:flex-col">
												<p className="w-4/5 mx-auto font-medium text-center md:text-left md:w-full md:mx-0 text-heading-5 lg:text-heading-4 line-clamp-2">
													{item.name.filter((e) => e.language === "vi")[0].value}
												</p>
												<p className="text-center md:text-left lg:text-heading-5 text-paragraph-5">
													X {item.quantity}
												</p>
												<p className="text-center md:text-left lg:text-heading-5 text-paragraph-5">
													{convertPrice(item.price)}
												</p>
											</div>
										</div>
										{order.status === OrderStatus.Completed ? (
											item.comment ? (
												<button
													onClick={() => {
														handleOpenProdReviewModal();
														handleSetDefaultComment(item.comment);
														handleSetValueProdReviewModal(
															item._id,
															item.productItemId
														);
													}}
													className="text-primary-100"
												>
													Sửa đánh giá
												</button>
											) : (
												<Button
													onClick={() => {
														handleOpenProdReviewModal();
														handleSetValueProdReviewModal(
															item._id,
															item.productItemId
														);
													}}
													className="whitespace-nowrap w-fit font-medium text-heading-5 md:!py-3 "
													type="primary"
												>
													Đánh giá
												</Button>
											)
										) : null}
									</div>

									<div className="w-2/3 border-t-2 border-gray-accent h-[1px]"></div>
								</div>
							))}
						</div>
						<div className="space-y-2 md:space-y-4">
							<p className="flex justify-between text-heading-5 lg:text-heading-3">
								Mã đơn hàng: <span>{hashCode(order._id)}</span>
							</p>
							<p className="flex justify-between text-heading-5 lg:text-heading-3">
								Ngày đặt: <span>{convertDate(order.date)}</span>
							</p>
							<p className="flex justify-between text-heading-5 lg:text-heading-3">
								Trạng thái: <span>{order.status}</span>
							</p>
							<p className="flex justify-between text-heading-5 lg:text-heading-3">
								Tổng tiền hàng: <span>{convertPrice(total)}</span>
							</p>
							<p className="flex justify-between text-heading-5 lg:text-heading-3">
								Phí vận chuyển: <span>{convertPrice(order.shippingFee)}</span>
							</p>
							<p className="flex justify-between font-semibold text-heading-5 lg:text-heading-3">
								Tổng đơn hàng: <span>{convertPrice(total + order.shippingFee)}</span>
							</p>
						</div>
					</div>
				</div>

				<div className="p-4 space-y-8 border-2 md:p-10 lg:p-14 border-gray-accent rounded-3xl lg:w-4/5 lg:mx-auto">
					<h3 className="text-heading-4 lg:text-heading-2">Thông tin nhận hàng</h3>
					<div className="space-y-2 lg:space-y-4">
						<p className="text-heading-5 lg:text-heading-3">
							Tên người nhân: <span className="font-semibold">{order.address.name}</span>
						</p>
						<p className="text-heading-5 lg:text-heading-3">
							SĐT: <span className="font-semibold">{order.address.phone}</span>
						</p>
						<p className="text-heading-5 lg:text-heading-3">
							Hình thức thanh toán: <span className="font-semibold">{order.paymentMethod}</span>
						</p>
						<p className="text-heading-5 lg:text-heading-3">
							Nơi nhận:{" "}
							<span className="font-semibold">{`${order.address.specificAddress}, ${order.address.ward}, ${order.address.district}, ${order.address.province}`}</span>
						</p>
					</div>
				</div>
			</div>

			{/* Product review modal */}
			<ProductReview setComment={handleSetComment} overlay={overlayRef} ref={prodReviewModalRef} />
			<Overlay ref={overlayRef} />
		</Fragment>
	) : (
		<div className="flex flex-col gap-y-3 items-center mt-14 mb-14 md:mb-[112px] xl:mb-[144px]">
			<LoadingHorizontal className="h-[100px] text-primary-100" />
			<p className="dark:text-white">Đang lấy dữ liệu</p>
			<p className="dark:text-white">Vui lòng đợi trong giây lát..</p>
		</div>
	);
}
