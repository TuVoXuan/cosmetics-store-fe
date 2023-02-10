import axiosService from "./axios-service";

const API = "https://vapi.vnappmob.com";

const adminstrativeApi = {
	getProvinces: () => {
		return axiosService.get<IAdministrativeUnit<IProvince>>(`${API}/api/province`);
	},
	getDistricts: (provinceId: string) => {
		return axiosService.get<IAdministrativeUnit<IDistrict>>(`${API}/api/province/district/${provinceId}`);
	},
	getWards: (districtId: string) => {
		return axiosService.get<IAdministrativeUnit<IWard>>(`${API}/api/province/ward/${districtId}`);
	},
};

export default adminstrativeApi;
