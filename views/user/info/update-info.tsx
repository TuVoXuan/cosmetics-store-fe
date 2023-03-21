import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { userApi } from "../../../api/user-api";
import Button from "../../../components/buttons/button";
import Birthday from "../../../components/inputs/birthday";
import Dropdown from "../../../components/inputs/dropdown";
import Input from "../../../components/inputs/input";
import TitlePage from "../../../components/title-page/title-page";
import { Gender } from "../../../constants/enums";
import { toastError } from "../../../util/toast";

interface FormValue {
	name: string;
	email: string;
	gender: Gender;
	birthday: string;
}

export default function UpdateInfo() {
	const [user, setUser] = useState<IUserBasicInfo>();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValue>({
		defaultValues: useMemo(() => user, [user]),
	});
	const { data: session } = useSession();

	const fetchUser = async () => {
		if (session?.user.email) {
			const data = await userApi.getBasicInfo(session.user.email);
			data.birthday = data.birthday ? data.birthday.split("T")[0] : new Date().toISOString();
			setUser(data);
		}
	};

	const onSubmit = async (value: FormValue) => {
		try {
			toast.loading("Đang cập nhập thông tin...", { id: "updateUserInfo" });
			const updatedUser = await userApi.updateUser({
				name: value.name,
				gender: value.gender,
				birthday: new Date(value.birthday).toISOString(),
			});

			setUser({ ...updatedUser, birthday: updatedUser.birthday.split("T")[0] });
			toast.dismiss("updateUserInfo");
			toast.success("Cập nhập thông tin thành công");
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	useEffect(() => {
		fetchUser();
	}, [session]);

	useEffect(() => {
		reset(user);
	}, [user]);

	return (
		<>
			<TitlePage className="mb-8 mt-14" subtitle="Cá nhân" title="Thông tin cá nhân" />
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-10 md:w-4/5 md:mx-auto lg:w-full lg:grid lg:grid-cols-2 lg:gap-y-10 lg:gap-x-10 lg:space-y-0">
					<Input
						register={register}
						className="w-full"
						label="Họ tên"
						name="name"
						error={errors.name?.message}
						option={{
							required: {
								value: true,
								message: "Nhập tên của bạn",
							},
						}}
					/>
					<Input
						register={register}
						disabled
						className="w-full"
						label="Email"
						name="email"
						error={errors.email?.message}
					/>
					<Dropdown
						register={register}
						name={"gender"}
						error={errors.gender?.message}
						option={{
							required: {
								value: true,
								message: "Nhập giới tính của bạn",
							},
						}}
						defaulValue={user?.gender}
						onChange={(value: string) => {
							console.log("first");
						}}
						label="Giới tính"
						options={[
							{ label: "Nam", value: "male" },
							{ label: "Nữ", value: "female" },
							{ label: "Khác", value: "other" },
						]}
					/>
					<Birthday
						className="w-full"
						label="Ngày sinh"
						name="birthday"
						defaultValue={user?.birthday}
						error={errors.birthday?.message}
						register={register}
						option={{
							required: {
								value: true,
								message: "Nhập ngày sinh của bạn",
							},
						}}
					/>
					<Button className="w-full md:col-span-2 lg:col-span-1" type="primary" btnType="submit">
						Cập nhập
					</Button>
				</div>
			</form>
		</>
	);
}
