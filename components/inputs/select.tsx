import React, { useEffect, useState } from "react";

interface Props {
	defaultValue: IOption;
	options: IOption[];
	disable: IDisableVariationList;
	onChange: (value: string) => void;
}

export default function Select({ options, disable, onChange, defaultValue }: Props) {
	const [selected, setSelected] = useState<string>(defaultValue?.value);
	// console.log("selected: ", selected);

	const handleClick = (value: string) => {
		setSelected(value);
	};

	useEffect(() => {
		onChange(selected);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	return (
		<div className="flex flex-wrap gap-3">
			{options.map((option) => {
				if (selected === option.value) {
					return (
						<button
							// disabled={disable.value.find((item) => item === option.value) ? true : false}
							onClick={() => handleClick(option.value)}
							className="p-3 border-2 rounded-xl dark:text-white border-primary-100"
							key={option.value}
						>
							{option.label}
						</button>
					);
				}

				return (
					<button
						disabled={disable.value.find((item) => item === option.value) ? true : false}
						onClick={() => handleClick(option.value)}
						className="p-3 border-2 dark:border-black-dark-2 dark:text-white rounded-xl disabled:dark:bg-black-dark-2 disabled:bg-gray-accent disabled:line-through"
						key={option.value}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
