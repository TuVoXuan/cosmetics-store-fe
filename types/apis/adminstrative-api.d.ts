declare interface IProvince {
	province_id: string;
	province_name: string;
	province_type: string;
}

declare interface IDistrict {
	district_id: string;
	district_name: string;
}

declare interface IWard {
	ward_id: string;
	ward_name: string;
}

declare interface IAdministrativeUnit<T> {
	results: T[];
}
