import axiosService from "./axios-service";

const API = process.env.API_URL;

const ENDPOINT = "product";
const URL = `${API}/${ENDPOINT}`;

const productApi = {
	getProductItems: () => {
		return axiosService.get<IResponseSuccess<IProductItem[]>>(`${URL}/product-items`);
	},

	getProductItemsByCategory: async (data: IGetProductByCategory) => {
		const response = await axiosService.post<IResponseSuccess<IProductItem[]>>(
			`${URL}/product-items/category/${data.id}`,
			{
				previous: data.previous,
				limit: data.limit,
			}
		);

		return response.data.data;
	},

	getProductItemsByCategoryAndOptions: async (data: IGetProductByCategoryAndOptioins) => {
		let newURL = URL + `/product-items/category/${data.id}/options?`;
		if (data.from) {
			newURL += `from=${data.from}`;
		}
		if (data.to) {
			newURL += `to=${data.to}`;
		}
		if (data.order) {
			newURL += `order=${data.order}`;
		}
		if (data.brand) {
			newURL += `brand=${data.brand}`;
		}

		const response = await axiosService.post<IResponseSuccess<ILoadMorePaginationRes<IProductItem[]>>>(newURL, {
			limit: data.limit,
			after: data.after,
		});

		return response.data.data;
	},
};

export default productApi;
