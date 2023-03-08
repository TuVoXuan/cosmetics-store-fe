import axiosService from "./axios-service";

// const API = "https://vapi.vnappmob.com";
const API = "http://www.mapquestapi.com/";
const MapQuestKey = process.env.MAPQUEST_KEY;

const adminstrativeApi = {
	// getProvinces: () => {
	// 	return axiosService.get<IAdministrativeUnit<IProvince>>(`${API}/api/province`);
	// },
	// getDistricts: (provinceId: string) => {
	// 	return axiosService.get<IAdministrativeUnit<IDistrict>>(`${API}/api/province/district/${provinceId}`);
	// },
	// getWards: (districtId: string) => {
	// 	return axiosService.get<IAdministrativeUnit<IWard>>(`${API}/api/province/ward/${districtId}`);
	// },

	getGeocoding: (location: string) => {
		return axiosService.get<IGeocoding>(
			`${API}/geocoding/v1/address?key=${MapQuestKey}&location=${location}`
		);
	},
	getDirection: (from: ICoordinates, to: ICoordinates) => {
		return axiosService.get<IDirectionMQ>(
			`${API}/directions/v2/route?key=${MapQuestKey}&from=${from.latitude},${from.longitude}&to=${to.latitude},${to.longitude}&routeType=shortest&unit=k`
		);
	},
};

export default adminstrativeApi;
