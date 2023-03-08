import { Switch } from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import Moon from "../icons/moon";
import Sun from "../icons/sun";

interface Props {
	toggle: () => void;
	value?: boolean;
	childrenOn?: React.ReactNode;
	childrenOff?: React.ReactNode;
	className?: string;
}

export default function ToggleBtn({ toggle, value, childrenOff, childrenOn, className }: Props) {
	const switchRef = useRef<HTMLButtonElement>(null);
	const childRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (switchRef.current && childRef.current) {
			const paddingLeft = window.getComputedStyle(switchRef.current).getPropertyValue("padding-left").replace("px", "");
			const childrenWidth = childRef.current.clientWidth;

			switchRef.current.style.width = 2 * childrenWidth + 2 * parseInt(paddingLeft) + "px";
		}
	}, []);

	return (
		<div className="shrink-0">
			<Switch
				ref={switchRef}
				checked={value}
				onChange={toggle}
				className={clsx(
					value ? "bg-primary-10" : "bg-gray-accent",
					"relative inline-flex items-center w-14 p-1 dark:bg-black-dark-2 shrink-0 cursor-pointer rounded-2xl border-none transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
					className
				)}
			>
				<div
					ref={childRef}
					aria-hidden="true"
					className={clsx(
						value && `translate-x-[100%]`,
						!value && "translate-x-0",
						"pointer-events-none inline-block p-1 text-light-100 transform rounded-full bg-primary-100 shadow-lg ring-0 transition duration-200 ease-in-out"
					)}
				>
					{value ? childrenOn : childrenOff}
				</div>
			</Switch>
		</div>
	);
}
