import axiosService from "./axios-service";

const API = process.env.API_URL;

const ENDPOINT = "product";
const URL = `${API}/${ENDPOINT}`;

const productApi = {
	getProductItems: () => {
		return axiosService.get<IResponseSuccess<IProductItem[]>>(`${URL}/product-items`);
	},
};

export default productApi;
