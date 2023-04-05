import axiosService from "./axios-service";

const API = process.env.API_URL;

const ENDPOINT = "brand";
const URL = `${API}/${ENDPOINT}`;

export const brandApi = {
	getBrandsByCategory: async (id: string) => {
		const response = await axiosService.get<IResponseSuccess<IBrand[]>>(`${URL}?category=${id}`);

		return response.data.data;
	},

	getBrandsBySearchKey: async (search: string) => {
		const response = await axiosService.get<IResponseSuccess<IBrand[]>>(`${URL}?search=${search}`);

		return response.data.data;
	},

	getBrandRankingSell: async () => {
		const response = await axiosService.get<IResponseSuccess<IBrand[]>>(`${URL}/ranking-sell`);

		return response.data.data;
	},

	getListBrands: async () => {
		const response = await axiosService.get<IResponseSuccess<IBrand[]>>(URL);

		return response.data.data;
	},
};
