import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "../inputs/select";

interface Props {
	defaultItemId: string;
	variationList: IVariationList[];
	productItems: IProductItemDetail[];
	onChange: (item: IProductItemDetail) => void;
}

export default function VariationOptions({ defaultItemId, productItems, variationList, onChange }: Props) {
	// State
	const [disable, setDisable] = useState<IDisableVariationList[]>(
		variationList.map((variation) => ({ _id: variation._id, value: [] }))
	);
	const [selected, setSelected] = useState<ISeletedVariationList[]>(
		variationList.map((variation) => ({ variationId: variation._id, optionId: "" }))
	);

	// Router
	const router = useRouter();
	const { locale } = router;
	const defaultItem = productItems.find((item) => item._id === defaultItemId);

	const handleOnChange = (value: string) => {
		const enableOption: string[] = [];
		for (const prodItem of productItems) {
			const hasOption = prodItem.configurations.findIndex((item) => item === value);
			if (hasOption > -1) {
				enableOption.push(...prodItem.configurations.filter((item) => item !== value));
			}
		}

		// add disable options
		setDisable((currDisable) => {
			currDisable.forEach((curr) => {
				const variation = variationList.find((varia) => varia._id === curr._id);
				if (variation) {
					const hasOption = variation.values.findIndex((item) => item._id === value);
					if (hasOption === -1) {
						curr.value = variation.values
							.filter((x) => !enableOption.includes(x._id))
							.map((item) => item._id);
					}
				}
			});

			return currDisable;
		});

		setSelected((select) => {
			variationList.forEach((variation) => {
				const option = variation.values.find((item) => item._id === value);
				if (option) {
					const selectOption = select.find((i) => i.variationId === variation._id);
					if (selectOption) {
						selectOption.optionId = value;
					}
				}
			});
			return select;
		});
	};

	const handleChangeProductItem = () => {
		const config: string[] = selected.map((item) => item.optionId);

		const selectedItem = productItems.find((item) => {
			return item.configurations.filter((conf) => !config.includes(conf)).length > 0 ? false : true;
		});
		if (selectedItem) {
			onChange(selectedItem);
		}
	};

	return (
		<div className="mb-10 space-y-3">
			{variationList.map((variation) => {
				const optionList: IOption[] = variation.values.map((item) => ({
					label: item.value.find((op) => op.language === locale)?.value as string,
					value: item._id,
				}));

				const defaultValue = optionList.find((op) => defaultItem?.configurations.includes(op.value));

				return (
					<div key={variation._id}>
						<p className="mb-3 font-semibold dark:text-white">
							{variation.name.find((item) => item.language === locale)?.value}
						</p>
						<Select
							disable={
								disable.find((item) => item._id === variation._id) as IDisableVariationList
							}
							onChange={(value) => {
								handleOnChange(value);
								handleChangeProductItem();
							}}
							defaultValue={defaultValue as IOption}
							options={optionList}
						/>
					</div>
				);
			})}
		</div>
	);
}
