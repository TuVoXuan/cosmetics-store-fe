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
	dragPoint: boolean;
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

declare interface IDirectionMQ {
	route: {
		sessionId: string;
		realTime: number;
		distance: number;
		time: number;
		formattedTime: string;
		hasHighway: boolean;
		hasTollRoad: boolean;
		hasBridge: boolean;
		hasSeasonalClosure: boolean;
		hasTunnel: boolean;
		hasFerry: boolean;
		hasUnpaved: boolean;
		hasTimedRestriction: boolean;
		hasCountryCross: boolean;
		legs: {
			index: number;
			hasTollRoad: boolean;
			hasHighway: boolean;
			hasBridge: boolean;
			hasUnpaved: boolean;
			hasTunnel: boolean;
			hasSeasonalClosure: boolean;
			hasFerry: boolean;
			hasCountryCross: boolean;
			hasTimedRestriction: boolean;
			distance: number;
			time: number;
			formattedTime: string;
			origIndex: number;
			origNarrative: string;
			destIndex: number;
			destNarrative: string;
			maneuvers: {
				index: number;
				distance: number;
				narrative: string;
				time: number;
				direction: number;
				directionName: string;
				signs: any;
				maneuverNotes: any;
				formattedTime: string;
				transportMode: string;
				startPoint: {
					lat: number;
					lng: number;
				};
				turnType: number;
				mapUrl: string;
				attributes: number;
				iconUrl: string;
				streets: any;
			}[];
		}[];
		options: {
			routeType: string;
			unit: string;
			narrativeType: string;
			enhancedNarrative: boolean;
			walkingSpeed: number;
			highwayEfficiency: number;
			avoids: boolean;
			generalize: number;
			shapeFormat: string;
			locale: string;
			useTraffic: boolean;
			timeType: number;
			dateType: number;
			doReverseGeocode: boolean;
			sideOfStreetDisplay: boolean;
		};
		boundingBox: {
			ul: {
				lat: number;
				lng: number;
			};
			lr: {
				lat: number;
				lng: number;
			};
		};
		routeWarnings: any;
		maxRoutes: string;
		locations: ILocationMQ[];
		locationSequence: number[];
	};
	info: {
		statuscode: number;
		copyright: {
			text: string;
			imageUrl: string;
			imageAltText: string;
		};
		messages: any;
	};
}
