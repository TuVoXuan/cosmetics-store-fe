import React from "react";

interface IInput {
	size: "large" | "small";
	placeholder?: "string";
}

export default function Input({ size, placeholder }: IInput) {
	let className =
		"border-[2px] border-white font-semibold placeholder:text-dark-100 text-dark-100 focus:border-primary-100 focus:outline-none ";
	switch (size) {
		case "small":
			className += "px-6 py-3 text-heading-5 rounded-3xl";
			break;
		case "large":
			className += "px-6 py-4 text-heading-4 rounded-4xl";
		default:
			break;
	}

	return <input className={className} type="text" placeholder={placeholder ? placeholder : "Placeholder"} />;
}
