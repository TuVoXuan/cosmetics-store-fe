import clsx from "clsx";
import React from "react";
import { primary } from "../../styles/color";

interface IBadge {
	color: "primary" | "secondary" | "yellow_tertiary" | "pink_tertiary";
	title: string;
	isResponsive: boolean;
	className?: string;
}

export default function Badge({ color, title, isResponsive, className }: IBadge) {
	const handleColor = () => {
		switch (color) {
			case "primary":
				return "text-primary-100 bg-primary-10";
			case "secondary":
				return "text-secondary-100 bg-secondary-10";
			case "yellow_tertiary":
				return "text-yellow-tertiary-100 bg-yellow-tertiary-10";
			case "pink_tertiary":
				return "text-pink-tertiary-100 bg-pink-tertiary-10";
			default:
				return "text-primary-100 bg-primary-10";
		}
	};

	if (isResponsive) {
		return (
			<p
				className={clsx(
					"px-6 py-3 font-bold text-heading-6 rounded-3xl",
					"md:px-8 md:text-paragraph-2 md:rounded-4xl",
					handleColor(),
					className
				)}
			>
				{title}
			</p>
		);
	}

	return <p className={clsx("px-4 py-2 text-heading-6 rounded-3xl", handleColor(), className)}>{title}</p>;
}
