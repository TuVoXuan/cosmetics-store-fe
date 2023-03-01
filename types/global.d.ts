declare interface IOption {
	label: string;
	value: string;
}

declare interface IAdministrativeOption extends IOption {
	id: string;
}

declare interface Itranslate {
	language: "vi" | "en";
	value: string;
}
