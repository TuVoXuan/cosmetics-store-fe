import React, { useRef } from "react";
import Expand from "../components/icons/expand";
import SmallPara from "../components/text/smallPara";
import TitlePage from "../components/title-page/title-page";

export default function Legal() {
	return (
		<section
			className="pt-14 md:pt-16 space-y-[56px] md:space-y-[64px] xl:space-y-[144px]
			mb-[104px] md:mb-[112px] xl:mb-[144px]"
		>
			<TitlePage subtitle="Hợp pháp" title="Hygge - Điều khoản và điều kiện" />

			<div className="space-y-10 lg:space-y-12">
				<h3 className="font-bold text-heading-3 lg:text-heading-2 dark:text-white">1. Giới thiệu</h3>
				<div className="space-y-10 lg:space-y-12 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-x-24 xl:gap-y-[72px]">
					<SmallPara title="1.1 Điều khoản & Điều kiện của chúng tôi">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>

					<SmallPara title="1.2 Thu thập dữ liệu cá nhân">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>
					<SmallPara title="1.3 Mục đích thu thập dữ liệu cá nhân">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>

					<SmallPara title="1.4 Sử dụng dữ liệu cá nhân">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>
				</div>
			</div>

			<div className="space-y-10 lg:space-y-12">
				<h3 className="font-bold text-heading-3 lg:text-heading-2 dark:text-white">
					2. Điều khoản thanh toán
				</h3>
				<div className="space-y-10 lg:space-y-12 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-x-24 xl:gap-y-[72px]">
					<SmallPara title="2.1 Các phương thức thanh toán khác nhau">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>

					<SmallPara title="2.2 Quyền của chúng tôi để hủy thanh toán của bạn">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>
				</div>
			</div>

			<div className="space-y-10 lg:space-y-12">
				<h3 className="font-bold text-heading-3 lg:text-heading-2 dark:text-white">
					3. đơn đặt hàng
				</h3>
				<div className="space-y-10 lg:space-y-12 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-x-24 xl:gap-y-[72px]">
					<SmallPara title="3.1 Xử lý đơn đặt hàng trên trang web">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>

					<SmallPara title="3.2 Thời gian vận chuyển cho các đơn đặt hàng khác nhau">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>

					<SmallPara title="3.3 Chính sách trả lại và hoàn tiền">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>
				</div>
			</div>

			<div className="space-y-10 lg:space-y-12">
				<h3 className="font-bold text-heading-3 lg:text-heading-2 dark:text-white">4. Thay đổi</h3>
				<div className="space-y-10 lg:space-y-12 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-x-24 xl:gap-y-[72px]">
					<SmallPara title="4.1 Quyền thay đổi Điều khoản & Điều kiện">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>

					<SmallPara title="4.2 Thông báo thay đổi Điều khoản & Điều kiện">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</SmallPara>
				</div>
			</div>
		</section>
	);
}
