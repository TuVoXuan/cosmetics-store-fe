import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/buttons/button";
import CursorClick from "../../components/icons/cursor-click";
import FacebookColor from "../../components/icons/facebook-color";
import GoogleColor from "../../components/icons/google-color";
import Lock from "../../components/icons/lock";
import Selected from "../../components/icons/selected";
import Synchronize from "../../components/icons/synchronize";
import Birthday from "../../components/inputs/birthday";
import Dropdown from "../../components/inputs/dropdown";
import Input from "../../components/inputs/input";
import TitlePage from "../../components/title-page/title-page";

export default function Info() {
	const { register } = useForm();

	return (
		<div>
			<TitlePage className="mt-14 md-16" subtitle="Cá nhân" title="Thông tin cá nhân" />

			<div className="lg:flex lg:gap-x-12 xl:mt-[72px] space-y-10 lg:space-y-0 mt-10 xl:mb-[144px] md:mt-16 md:space-y-12 md:mb-[112px] mb-[104px]">
				<div className="p-6 space-y-10 border-2 lg:flex-1 xl:flex-1 md:space-y-12 md:px-14 lg:p-12 border-gray-accent rounded-4xl">
					<h2 className="text-heading-4 md:text-heading-2 dark:text-light-100 lg:text-heading-3 xl:text-heading-2">
						Thông tin tài khoản
					</h2>
					<div className="space-y-10">
						<Input className="w-full" label="Họ tên" />
						<Input className="w-full" label="Email" />
					</div>
					<div className="space-y-10">
						<Dropdown
							register={register}
							name={"gender"}
							size="large"
							onChange={(value: string) => {
								console.log("first");
							}}
							label="Giới tính"
							options={[
								{ label: "Nam", value: "Nam" },
								{ label: "Nữ", value: "Nữ" },
								{ label: "Khác", value: "khác" },
							]}
						/>
						<Birthday className="w-full" label="Ngày sinh" name="birthday" register={register} />
					</div>

					<div className="md:!mt-20">
						<Button className="w-full" type="primary">
							Cập nhập
						</Button>
						<p className="mt-4 font-semibold text-center underline text-paragraph-4 md:text-paragraph-2 dark:text-light-100">
							Quên mật khẩu?
						</p>
					</div>
				</div>
				<div className="p-6 space-y-10 border-2 lg:p-12 lg:h-fit lg:flex-1 xl:mb-0 xl:h-fit xl:flex-1 md:space-y-12 md:px-14 border-gray-accent rounded-4xl">
					<div className="space-y-6 lg:space-y-12">
						<h2 className="text-heading-4 md:text-heading-2 dark:text-light-100 lg:text-heading-3 xl:text-heading-2">
							Bảo mật
						</h2>
						<div className="flex justify-between">
							<span className="font-semibold text-paragraph-4 md:text-paragraph-2 dark:text-light-100">
								Đổi mật khẩu
							</span>
							<Lock
								width={24}
								height={24}
								className="text-dark-100 md:hidden lg:h-7 lg:w-7 dark:text-light-100 lg:block xl:hidden"
							/>
							<Button className="hidden w-2/5 md:block lg:hidden xl:block" type="primary">
								Cập nhập
							</Button>
						</div>
					</div>

					<div className="space-y-6 lg:space-y-12">
						<h2 className="text-heading-4 md:text-heading-2 dark:text-light-100 lg:text-heading-3 xl:text-heading-2">
							Liên kết mạng xã hội
						</h2>
						<div className="space-y-6 md:space-y-6 lg:space-y-10">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-x-4">
									<FacebookColor width={32} height={32} className="text-dark-100 md:w-12 md:h-12" />
									<p className="font-semibold text-paragraph-4 md:text-paragraph-2 dark:text-light-100">Facebook</p>
								</div>
								<Synchronize
									width={24}
									height={24}
									className="text-dark-100 md:hidden dark:text-light-100 lg:w-7 lg:h-7 lg:block xl:hidden"
								/>
								<Button className="hidden w-2/5 md:block lg:hidden xl:block" type="primary">
									Đã liên kết
								</Button>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-x-4">
									<GoogleColor width={32} height={32} className="text-dark-100 md:w-12 md:h-12" />
									<p className="font-semibold text-paragraph-4 md:text-paragraph-2 dark:text-light-100">Google</p>
								</div>
								<Selected
									width={24}
									height={24}
									className="text-primary-100 md:hidden lg:w-7 lg:h-7 lg:block xl:hidden"
								/>
								<Button className="hidden w-2/5 md:block lg:hidden xl:block" type="secondary">
									Liên kết
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
