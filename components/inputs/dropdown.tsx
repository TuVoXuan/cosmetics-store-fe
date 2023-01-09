import { useState, Fragment } from "react";
import { Listbox } from "@headlessui/react";
import Expand from "../icons/expand";
import Selected from "../icons/selected";

const people = [
	{ id: 1, name: "Durward Reynolds" },
	{ id: 2, name: "Kenton Towne" },
	{ id: 3, name: "Therese Wunsch" },
	{ id: 4, name: "Benedict Kessler" },
	{ id: 5, name: "Katelyn Rohan" },
];

interface Props {
	size: "large" | "small";
}

export default function Dropdown({ size }: Props) {
	const [selectedPerson, setSelectedPerson] = useState(people[0]);

	return (
		<Listbox value={selectedPerson} onChange={setSelectedPerson}>
			<Listbox.Button
				className={`text-left cursor-pointer border-2 border-gray-accent rounded-[32px] ${
					size === "large" ? "py-4 px-6" : "px-4 py-3"
				}`}
			>
				<div className={`flex items-center ${size === "large" ? "gap-x-6" : "gap-x-4"}`}>
					<p className={`${size === "large" ? "text-heading-4" : "text-heading-5"}`}>
						{selectedPerson.name}
					</p>
					<Expand width={16} height={16} color="#1A202C" />
				</div>
				<Listbox.Options>
					{people.map((person) => (
						/* Use the `active` state to conditionally style the active option. */
						/* Use the `selected` state to conditionally style the selected option. */
						<Listbox.Option key={person.id} value={person} as={Fragment}>
							{({ active, selected }) => (
								<li
									className={`flex items-center justify-between ${
										selected ? "font-semibold" : "font-normal"
									} ${size === "large" ? "text-heading-4 mt-8" : "text-heading-5 mt-6"}`}
								>
									{person.name}
									{selected && <Selected width={16} height={16} color="#1A202C" />}
								</li>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Listbox.Button>
		</Listbox>
	);
}
