declare interface IUserStore {
	_id: string;
	name: string;
	email: string;
	image: string;
	address: IAddressExtract[];
}
