import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { primary } from "../../styles/color";
import Quality from "../icons/quality";

interface Props {
	stars: number;
	onChangeStars?: (value: number) => void;
	register?: UseFormRegister<any>;
	option?: RegisterOptions;
	name?: string;
	error?: string;
}

export default function GroupStars({ stars, onChangeStars, error, name, option, register }: Props) {
	if (register && name && onChangeStars) {
		// const { onChange, ...rest } = register(name, { ...option });

		const handleClickStar = (star: number) => {
			onChangeStars(star);
		};

		return (
			<div className="flex items-center justify-start gap-x-1">
				{[...Array(5)].map((value, index) => (
					<input
						{...register(name, { ...option })}
						key={index}
						id={`star${index}`}
						name={name}
						type="radio"
						value={index + 1}
						hidden
					/>
				))}
				{[...Array(5)].map((value, index) => {
					if (index < stars) {
						return (
							<label
								htmlFor={`star${index}`}
								key={index}
								onClick={() => handleClickStar(index + 1)}
							>
								<Quality
									fill={primary[100]}
									className={clsx(
										"w-6 h-6 text-primary-100 lg:w-7 lg:h-7",
										error && "text-red-accent"
									)}
								/>
							</label>
						);
					}
					return (
						<label
							htmlFor={`star${index}`}
							key={index}
							onClick={() => handleClickStar(index + 1)}
						>
							<Quality
								className={clsx(
									"w-6 h-6 text-primary-100 lg:w-7 lg:h-7",
									error && "text-red-accent"
								)}
							/>
						</label>
					);
				})}
			</div>
		);
	}

	return (
		<div className="flex items-center justify-start gap-x-1">
			{[...Array(5)].map((value, index) => {
				if (index < stars) {
					return (
						<button key={index} disabled type="button">
							<Quality fill={primary[100]} className="w-6 h-6 text-primary-100 lg:w-7 lg:h-7" />
						</button>
					);
				}
				return (
					<button key={index} disabled type="button">
						<Quality className="w-6 h-6 text-primary-100 lg:w-7 lg:h-7" />
					</button>
				);
			})}
		</div>
	);
}
