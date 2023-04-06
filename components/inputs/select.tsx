import React, { useEffect, useState } from "react";

interface Props {
	value: IOption;
	options: IOption[];
	disable: IDisableVariationList;
	onChange: (value: string) => void;
}

export default function Select({ options, disable, onChange, value }: Props) {
	const [selected, setSelected] = useState<string>(value.value);

	const handleClick = (value: string) => {
		onChange(value);
	};

	useEffect(() => {
		setSelected(value.value);
	}, [value]);

	return (
		<div className="flex flex-wrap justify-center gap-3 lg:justify-start">
			{options.map((option) => {
				if (selected === option.value) {
					return (
						<button
							// disabled={disable.value.find((item) => item === option.value) ? true : false}
							onClick={() => handleClick(option.value)}
							className="px-3 py-2 border-2 text-paragraph-5 lg:text-paragraph-4 rounded-xl dark:text-white border-primary-100"
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
						className="px-3 py-2 border-2 text-paragraph-5 lg:text-paragraph-4 dark:border-black-dark-2 dark:text-white rounded-xl disabled:dark:bg-black-dark-2 disabled:bg-gray-accent disabled:line-through"
						key={option.value}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
