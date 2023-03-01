declare interface ICategory {
	_id: string;
	name: ITranslation[];
	icon?: string;
	children?: ICategory[];
}
