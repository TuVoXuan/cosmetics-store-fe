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

declare interface ILocationMQ {
	street: string;
	adminArea6: string;
	adminArea6Type: string;
	adminArea5: string;
	adminArea5Type: string;
	adminArea4: string;
	adminArea4Type: string;
	adminArea3: string;
	adminArea3Type: string;
	adminArea1: string;
	adminArea1Type: string;
	postalCode: string;
	geocodeQualityCode: string;
	geocodeQuality: string;
	dragPoint: false;
	sideOfStreet: string;
	linkId: string;
	unknownInput: string;
	type: string;
	latLng: {
		lat: number;
		lng: number;
	};
	displayLatLng: {
		lat: number;
		lng: number;
	};
	mapUrl: string;
}

declare interface IGeocoding {
	info: {
		statuscode: number;
		copyright: {
			text: string;
			imageUrl: string;
			imageAltText: string;
		};
		messages: any;
	};
	options: {
		maxResults: number;
		ignoreLatLngInput: boolean;
	};
	results: [
		{
			providedLocation: {
				location: string;
			};
			locations: ILocationMQ[];
		}
	];
}
