import axiosService from "./axios-service";

const API = process.env.API_URL;

const ENDPOINT = "product";
const URL = `${API}/${ENDPOINT}`;

const productApi = {
	getProductItems: () => {
		return axiosService.get<IResponseSuccess<IProductItem[]>>(`${URL}/product-items`);
	},

	getProductDetal: (productId: string, itemId: string) => {
		return axiosService.get<IResponseSuccess<IProductDetailInfo>>(
			`${URL}/product-detail/${productId}/${itemId}`
		);
	},
};

export default productApi;
