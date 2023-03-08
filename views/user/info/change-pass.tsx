import React from "react";
import { useForm } from "react-hook-form";
import { userApi } from "../../../api/user-api";
import Button from "../../../components/buttons/button";
import Input from "../../../components/inputs/input";
import TitlePage from "../../../components/title-page/title-page";
import { toastError, toastSuccess } from "../../../util/toast";

interface FormValue {
	oldPass: string;
	newPass: string;
	repeat: string;
}

export default function ChangePass() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
		reset,
	} = useForm<FormValue>();

	const onSubmit = async (value: FormValue) => {
		try {
			await userApi.changePass({
				newPass: value.newPass,
				oldPass: value.oldPass,
			});

			reset();

			toastSuccess("Update your password successfully.");
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	return (
		<div>
			<TitlePage className="mb-8 mt-14" subtitle="Đổi mật khẩu" title="Đổi mật khẩu" />

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-10 md:w-4/5 md:mx-auto lg:w-full lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0"
			>
				<Input
					className="w-full"
					label="Mật khẩu cũ"
					name="oldPass"
					type="password"
					register={register}
					placeholder="•••••••••"
					error={errors.oldPass?.message}
					option={{ required: { value: true, message: "Nhập mật khẩu cũ" } }}
				/>
				<Input
					className="w-full"
					label="Mật khẩu mới"
					type="password"
					name="newPass"
					placeholder="•••••••••"
					error={errors.newPass?.message}
					register={register}
					option={{
						required: { value: true, message: "Nhập mật khẩu mới" },
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
							message: "Mật khẩu phải chứa ít nhất 8 kí tự bao gồm 1 chữ, 1 số, 1 kí tự đặc biệt",
						},
					}}
				/>
				<Input
					className="w-full"
					type="password"
					label="Nhập lại"
					name="repeat"
					placeholder="•••••••••"
					error={errors.repeat?.type === "validate" ? "Không trùng với mật khẩu mới" : errors.repeat?.message}
					register={register}
					option={{
						required: { value: true, message: "Nhập lại mật khẩu mới" },
						validate: () => getValues("repeat") === getValues("newPass"),
					}}
				/>
				<Button btnType="submit" className="w-full md:col-span-2 md:row-start-3 lg:col-span-1" type="primary">
					Cập nhập
				</Button>
			</form>
		</div>
	);
}
