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
};

export default adminstrativeApi;
