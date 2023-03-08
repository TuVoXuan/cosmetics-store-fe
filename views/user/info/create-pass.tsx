import React from "react";
import { useForm } from "react-hook-form";
import { userApi } from "../../../api/user-api";
import Button from "../../../components/buttons/button";
import Input from "../../../components/inputs/input";
import TitlePage from "../../../components/title-page/title-page";
import { toastError, toastSuccess } from "../../../util/toast";

interface FormValue {
	password: string;
	repeat: string;
}

interface Props {
	setHasPass: (value: boolean) => void;
}

export default function CreatePass({ setHasPass }: Props) {
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
		reset,
	} = useForm<FormValue>();

	const onSubmit = async (value: FormValue) => {
		try {
			await userApi.createPass(value.password);
			reset();
			setHasPass(true);
			toastSuccess("Create your password successfully.");
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	return (
		<div>
			<TitlePage className="mb-8 mt-14" subtitle="Tạo mật khẩu" title="Tạo mật khẩu" />

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-10 md:w-4/5 md:mx-auto lg:w-full lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0"
			>
				<Input
					className="w-full"
					label="Mật khẩu"
					type="password"
					name="password"
					placeholder="•••••••••"
					error={errors.password?.message}
					register={register}
					option={{
						required: { value: true, message: "Nhập mật khẩu" },
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
							message: "Mật khẩu phải chứa ít nhất 8 kí tự bao gồm chữ, số, kí tự đặc biệt",
						},
					}}
				/>
				<Input
					className="w-full"
					type="password"
					label="Nhập lại"
					name="repeat"
					placeholder="•••••••••"
					error={errors.repeat?.type === "validate" ? "Không trùng với mật khẩu" : errors.repeat?.message}
					register={register}
					option={{
						required: { value: true, message: "Nhập lại mật khẩu" },
						validate: () => getValues("repeat") === getValues("password"),
					}}
				/>
				<Button btnType="submit" className="w-full md:col-span-2 lg:col-span-1" type="primary">
					Cập nhập
				</Button>
			</form>
		</div>
	);
}
