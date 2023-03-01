import axiosService from "./axios-service";

const API = process.env.API_URL;

const ENDPOINT = "category";
const URL = `${API}/${ENDPOINT}`;

export const categoryApi = {
	getCategories: () => {
		return axiosService.get<IResponseSuccess<ICategory[]>>(`${URL}`);
	},
};
