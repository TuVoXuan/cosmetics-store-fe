import axiosService from "./axios-service";

const API = process.env.API_URL;

const ENDPOINT = "setting";
const URL = `${API}/${ENDPOINT}`;

export const settingApi = {
	getShippingFeePerKm: async () => {
		const response = await axiosService.get<IResponseSuccess<number>>(`${URL}/shipping-fee-per-km`);

		return response.data.data;
	},
};
