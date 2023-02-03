import React from "react";
import Button from "../components/buttons/button";
import Dropdown from "../components/inputs/dropdown";
import Input from "../components/inputs/input";
import ParaEmail from "../components/text/paraEmail";
import TitlePage from "../components/title-page/title-page";

export default function Contact() {
	return (
		<section
			className="pt-14 md:pt-16 space-y-[104px] md:space-y-[112px] xl:space-y-[144px]
			mb-[104px] md:mb-[112px] xl:mb-[144px]"
		>
			<TitlePage
				className="mb-14 md:mb-16 xl:mb-[72px]"
				subtitle="Đặt câu hỏi"
				title="Chúng tôi luôn ở đây để giúp bạn"
			/>

			<div className="space-y-14 md:space-y-16 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-x-24 xl:gap-y-[72px]">
				<div className="space-y-4">
					<h3 className="font-semibold text-paragraph-1 dark:text-white">Chăm sóc khách hàng</h3>
					<p className="text-paragraph-3">
						Vui lòng gửi email cho chúng tôi tại
						<span className="pl-1 font-semibold">customercare@hygge.com</span>
					</p>
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold text-paragraph-1 dark:text-white">Đơn đặt hàng lớn</h3>
					<ParaEmail>
						Nếu bạn đang nghĩ đến việc thực hiện một đơn đặt hàng rất lớn, xin vui lòng liên hệ
						với chúng tôi tại sales@hygge.com và chúng tôi sẽ giảm giá đặc biệt cho bạn
					</ParaEmail>
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold text-paragraph-1 dark:text-white">Quan hệ công chúng</h3>
					<ParaEmail>
						Bạn có thể liên hệ với nhóm truyền thông của chúng tôi bằng cách gửi email
						general@hygge.com
					</ParaEmail>
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold text-paragraph-1 dark:text-white">Other Enquiries</h3>

					<ParaEmail>
						Đối với tất cả các câu hỏi khác của bạn, vui lòng gửi email cho chúng tôi tại
						general@hygge.com
					</ParaEmail>
				</div>
			</div>

			{/* reach out to us */}
			<div className="xl:grid xl:grid-cols-2 xl:gap-x-24">
				<TitlePage
					className="mb-14 md:mb-16 md:pr-[288px] lg:pr-[488px] xl:mb-0 xl:pr-0 xl:pl-[84px]"
					subtitle="Liên hệ với chúng tôi"
					title="Vui lòng điền vào mẫu liên hệ"
				/>

				<form className="space-y-10 md:space-y-12 xl:mt-8">
					<Input className="w-full" label="Họ tên" placeholder="John Smith" />
					<Input className="w-full" label="Email" placeholder="johnsmith@gmail.com" />

					<Dropdown
						label="Chủ đề"
						size={"large"}
						options={[
							{
								label: "Chọn Chủ đề",
								value: "",
							},
							{
								label: "Thời gian giao hàng",
								value: "Thời gian giao hàng",
							},
							{
								label: "Giảm giá",
								value: "Giảm giá",
							},
							{
								label: "Khác",
								value: "Khác",
							},
						]}
						onChange={(value: string) => {}}
						error={""}
					/>

					<div>
						<p className="mb-2 text-dark-100 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">
							Tin nhắn
						</p>
						<textarea
							className="w-full border-[2px] border-gray-accent placeholder:text-dark-40 
                            font-semibold text-dark-100 focus:border-primary-100 focus:outline-none
                            dark:focus:border-primary-100 dark:focus:outline-none px-6 py-3 
                            text-heading-5 rounded-3xl md:px-6 md:py-4 md:text-heading-4 md:rounded-4xl
                            dark:border-black-dark-2 dark:bg-transparent dark:text-white-light
                            dark:placeholder:text-light-40"
							placeholder={"Nhập tin nhắn của bạn"}
							rows={6}
						/>
					</div>

					<Button type="primary" btnType="button">
						Gửi
					</Button>
				</form>
			</div>

			{/* our newsletter */}
			<div
				className="hidden md:block lg:bg-gray-accent dark:lg:bg-black-dark-2 lg:rounded-[48px] 
                    lg:py-16 xl:py-24 xl:rounded-[56px]"
			>
				<TitlePage
					className="text-center mb-14 md:mb-10 md:px-[100px] lg:mb-12"
					subtitle="Bản tin của chúng tôi"
					title="Đăng ký nhận tin mới nhất từ chúng tôi"
				/>

				<div className="flex items-end justify-center gap-x-6">
					<input
						className="w-[448px] border-[2px] border-gray-accent font-semibold placeholder:text-dark-40 text-dark-100 
						focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 
						dark:focus:outline-none px-6 py-3 text-heading-5 rounded-3xl md:px-6 md:py-4 
						md:text-heading-4 md:rounded-4xl dark:border-black-dark-4 dark:bg-transparent 
						dark:text-white-light dark:placeholder:text-light-40 dark:bg-black-dark-4"
						placeholder="Email của bạn"
					/>
					<Button type="primary" className="h-full">
						Đăng ký
					</Button>
				</div>
			</div>
		</section>
	);
}
