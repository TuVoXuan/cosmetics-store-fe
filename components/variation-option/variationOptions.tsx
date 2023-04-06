import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Select from "../inputs/select";
import { useProductDetail } from "../../store/hooks";

export default function VariationOptions() {
	const router = useRouter();
	const { locale } = router;

	const { currentItem, setCurrentItem, productItems, variationList, selectedItem } = useProductDetail();

	const [disable, setDisable] = useState<IDisableVariationList[]>(
		variationList.map((variation) => ({ _id: variation._id, value: [] }))
	);
	const [selected, setSelected] = useState<ISeletedVariationList[]>(
		variationList.map((variation) => ({ variationId: variation._id, optionId: "" }))
	);

	const handleOnChange = (value: string) => {
		console.log("value: ", value);
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
			return [...select];
		});
	};

	const handleChangeProductItem = () => {
		const config: string[] = selected.map((item) => item.optionId);
		console.log("selected: ", selected);
		console.log("config: ", config);
		const selectedProductItem = productItems.find((item) => {
			return (
				item.configurations.length === config.length &&
				config.every((e) => item.configurations.includes(e))
			);
		});
		if (selectedProductItem) {
			setCurrentItem(selectedProductItem);
		}
	};

	useEffect(() => {
		setDisable(variationList.map((variation) => ({ _id: variation._id, value: [] })));
		setSelected(variationList.map((variation) => ({ variationId: variation._id, optionId: "" })));
		if (selectedItem) {
			for (const config of selectedItem.configurations) {
				handleOnChange(config);
			}
		}
	}, [variationList]);

	useEffect(() => {
		handleChangeProductItem();
	}, [selected]);

	return (
		<div className="mb-10 space-y-3">
			{variationList.map((variation) => {
				const optionList: IOption[] = variation.values.map((item) => ({
					label: item.value.find((op) => op.language === locale)?.value as string,
					value: item._id,
				}));

				const value =
					optionList.find((op) => currentItem?.configurations.includes(op.value)) ||
					optionList.find((op) => selectedItem?.configurations.includes(op.value));

				return (
					<div key={variation._id}>
						<p className="mb-3 font-semibold text-center lg:text-left text-paragraph-4 lg:text-heading-4 dark:text-white">
							{variation.name.find((item) => item.language === locale)?.value}
						</p>
						<Select
							disable={
								(disable.find(
									(item) => item._id === variation._id
								) as IDisableVariationList) || {
									_id: variation._id,
									value: [],
								}
							}
							onChange={(value) => {
								handleOnChange(value);
								// handleChangeProductItem();
							}}
							value={value as IOption}
							options={optionList}
						/>
					</div>
				);
			})}
		</div>
	);
}
