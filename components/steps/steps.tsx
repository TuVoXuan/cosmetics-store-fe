import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";

interface Props {
	totalSteps: number;
	currentStep: number;
	className?: string;
}

export default function Steps({ totalSteps, currentStep, className }: Props) {
	const [steps, setSteps] = useState<number[]>([]);

	useEffect(() => {
		const st = [];
		for (let index = 1; index <= totalSteps; index++) {
			st.push(index);
		}
		setSteps(st);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={clsx("flex items-center gap-x-[2px]", className)}>
			{steps.map((value) => {
				if (value <= currentStep && value < totalSteps) {
					return (
						<Fragment key={value}>
							<p className="w-6 h-6 md:w-12 md:h-12 md:text-heading-4 font-semibold text-center rounded-full bg-primary-100 text-light-100 text-heading-6 flex items-center justify-center">
								{value}
							</p>
							<p className="h-[2px] bg-primary-100 rounded grow"></p>
						</Fragment>
					);
				} else if (value > currentStep && value < totalSteps) {
					return (
						<Fragment key={value}>
							<p className="w-6 h-6 md:w-12 md:h-12 md:text-heading-4 font-semibold text-center rounded-full dark:text-light-100 border-[1px] md:border-2 border-gray-accent dark:border-black-dark-2 text-dark-100 flex items-center justify-center text-heading-6">
								{value}
							</p>
							<p className="h-[2px] bg-gray-accent dark:bg-black-dark-2 rounded grow"></p>
						</Fragment>
					);
				} else if (value === totalSteps && value !== currentStep) {
					return (
						<p
							key={value}
							className="w-6 h-6 md:w-12 md:h-12 md:text-heading-4 font-semibold text-center rounded-full border-[1px] md:border-2 border-gray-accent dark:border-black-dark-2 text-dark-100 dark:text-light-100 flex items-center justify-center text-heading-6"
						>
							{value}
						</p>
					);
				} else if (value === totalSteps && value === currentStep) {
					return (
						<p
							key={value}
							className="w-6 h-6 md:w-12 md:h-12 md:text-heading-4 font-semibold text-center rounded-full bg-primary-100 text-light-100 text-heading-6 flex items-center justify-center"
						>
							{value}
						</p>
					);
				}
			})}
		</div>
	);
}
