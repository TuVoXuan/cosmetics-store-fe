declare interface IOption {
	label: string;
	value: string;
}

declare interface IAdministrativeOption extends IOption {
	id: string;
}

declare interface ITranslation {
	language: "vi" | "en";
	value: string;
}

declare interface IOption {
	value: string;
	label: string;
}

declare interface IDisableVariationList {
	_id: string;
	value: string[];
}

declare interface ISeletedVariationList {
	variationId: string;
	optionId: string;
}
