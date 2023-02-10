import clsx from "clsx";
import React, { useRef, useState } from "react";
import { RegisterOptions, UseFormGetValues, UseFormRegister } from "react-hook-form";
import authApi from "../../api/auth-api";
import { Gender } from "../../constants/enums";
import { toastError, toastSuccess } from "../../util/toast";

type FormValues = {
	email: string;
	password: string;
	name: string;
	birthday: Date;
	gender: Gender;
	code: string;
	agreePolicy: boolean;
};

interface Props {
	register: UseFormRegister<any>;
	option?: RegisterOptions;
	name: string;
	label?: string;
	className?: string;
	error?: string;
	getValueRef: UseFormGetValues<FormValues>;
}

export default function CodeInput({ className, error, label, name, option, register, getValueRef }: Props) {
	const [countDown, setCountDown] = useState<number>(0);
	const btnRef = useRef<HTMLButtonElement>(null);

	const handleGetOTP = async () => {
		try {
			const email = getValueRef("email");
			if (email) {
				if (btnRef.current) {
					btnRef.current.disabled = true;
				}
				await authApi.sendOTP(email);
				toastSuccess("Send mail OTP success");
				setTimeout(() => {
					if (btnRef.current) {
						btnRef.current.disabled = false;
					}
				}, 30000);
			} else {
				toastError("Email is empty");
				// alert("email is empty");
			}
		} catch (error) {
			toastError((error as IResponseError).error);
			// alert("error");
		}
	};

	return (
		<div>
			<p className="mb-2 text-dark-100 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">
				{label}
			</p>
			<div className="relative">
				<input
					{...register(name, { ...option })}
					className={clsx(
						"border-[2px] border-gray-accent font-semibold placeholder:text-dark-40 text-dark-100 focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 dark:focus:outline-none px-6 py-3 text-heading-5 rounded-3xl md:px-6 md:py-4 md:text-heading-4 md:rounded-4xl dark:border-black-dark-2 dark:bg-transparent dark:text-white-light dark:placeholder:text-light-40",
						error && "border-red-accent dark:border-red-accent focus:border-red-accent",
						className
					)}
					type="text"
					placeholder="1234"
					maxLength={6}
				/>
				<button
					ref={btnRef}
					type="button"
					onClick={handleGetOTP}
					className="absolute py-3 md:py-4 md:text-heading-4 pl-4 pr-6 rounded-r-full whitespace-nowrap bottom-[2px] right-0  bg-primary-100 text-white-light font-semibold disabled:cursor-not-allowed disabled:bg-dark-64"
				>
					Lấy mã
				</button>
			</div>
			{countDown > 0 ? (
				<p className="pl-6 mt-1 text-paragraph-5 md:text-paragraph-4 md:mt-2">
					resend email after {countDown} seconds
				</p>
			) : null}
			{error && (
				<p className="pl-6 mt-1 text-red-accent text-paragraph-5 md:text-paragraph-4 md:mt-2">
					{error}
				</p>
			)}
		</div>
	);
}
