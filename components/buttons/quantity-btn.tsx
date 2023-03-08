import clsx from "clsx";
import React from "react";
import GoBack from "../icons/go-back";
import GoForward from "../icons/go-forward";

interface Props {
	value: number;
	onChange: (value: number) => void;
	className?: string;
}

export default function QuantityBtn({ value, onChange, className }: Props) {
	const handlePlus = () => {
		onChange(value + 1);
	};

	const handleMinus = () => {
		if (value > 1) {
			onChange(value - 1);
		}
	};

	return (
		<div
			className={clsx(
				"flex items-center justify-between border-2 border-gray-accent rounded-[32px] w-[136px] py-2 px-4 md:w-[176px] md:px-6 md:py-4 lg:px-5 lg:py-3 dark:border-black-dark-2",
				className
			)}
		>
			<button>
				<GoBack
					onClick={handleMinus}
					className="dark:text-white-light"
					width={16}
					height={16}
					color="#1A202C"
				/>
			</button>
			<span className="font-bold select-none text-dark-100 text-heading-4 md:text-heading-3 dark:text-white">
				{value}
			</span>
			<button>
				<GoForward
					onClick={handlePlus}
					className="dark:text-white-light"
					width={16}
					height={16}
					color="#1A202C"
				/>
			</button>
		</div>
	);
}
