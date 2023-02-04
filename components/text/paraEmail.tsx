import React from "react";

interface Props {
	children: string;
}

export default function ParaEmail({ children }: Props) {
	const arr: string[] = children.split(" ");
	let index: number = -1;
	let email: string = "";

	for (let i = 0; i < arr.length; i++) {
		const element = arr[i];
		if (element.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && element.length > 10) {
			email = element;
			index = i;
			break;
		}
	}

	let newElement: React.ReactNode;

	const newArr: string[] = children.split(email);

	if (index === 0) {
		newElement = (
			<>
				<span className="inline-block font-semibold">{email}</span>
				{newArr[0]}
			</>
		);
	} else if (index > 0 && index < arr.length - 1) {
		newElement = (
			<>
				{newArr[0]}
				<span className="inline-block font-semibold">{email}</span>
				{newArr[1]}
			</>
		);
	} else {
		newElement = (
			<>
				{newArr[0]}
				<span className="inline-block font-semibold">{email}</span>
			</>
		);
	}
	return <p className="text-paragraph-3 dark:text-white">{newElement}</p>;
}
