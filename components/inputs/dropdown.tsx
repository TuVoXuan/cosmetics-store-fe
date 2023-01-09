import { useState, Fragment } from "react";
import { Listbox } from "@headlessui/react";

const people = [
	{ id: 1, name: "Durward Reynolds" },
	{ id: 2, name: "Kenton Towne" },
	{ id: 3, name: "Therese Wunsch" },
	{ id: 4, name: "Benedict Kessler" },
	{ id: 5, name: "Katelyn Rohan" },
];

export default function Dropdown() {
	const [selectedPerson, setSelectedPerson] = useState(people[0]);

	return (
		<Listbox value={selectedPerson} onChange={setSelectedPerson}>
			<Listbox.Button
				className={
					"text-left text-heading-4 cursor-pointer border-2 border-gray-accent py-4 px-6 rounded-[32px]"
				}
			>
				{selectedPerson.name}
				<Listbox.Options>
					{people.map((person) => (
						/* Use the `active` state to conditionally style the active option. */
						/* Use the `selected` state to conditionally style the selected option. */
						<Listbox.Option key={person.id} value={person} as={Fragment}>
							{({ active, selected }) => (
								<li
									className={`${active ? "bg-blue-500 text-white" : "bg-white text-black"}
                            ${selected ? "font-semibold" : "font-normal"} text-heading-4 mt-8`}
								>
									{/* {selected && <p>x</p>} */}
									{person.name}
								</li>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Listbox.Button>
		</Listbox>
	);
}
