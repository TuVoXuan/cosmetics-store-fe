import { IComment } from "../types/apis/order-api";
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

	getProductItemsByCategoryAndOptions: async (data: IGetProductByCategoryAndOptions) => {
		let newURL = URL + `/product-items/category/${data.id}?`;
		if (data.from) {
			newURL += `&from=${data.from}`;
		}
		if (data.to) {
			newURL += `&to=${data.to}`;
		}
		if (data.order) {
			newURL += `&order=${data.order}`;
		}
		if (data.brands) {
			newURL += `&brands=${data.brands}`;
		}

		const response = await axiosService.post<IResponseSuccess<ILoadMorePaginationRes<IProductItem[]>>>(
			newURL,
			{
				limit: data.limit,
				after: data.after ? data.after : undefined,
			}
		);

		return response.data.data;
	},

	search: async (data: ISearchProduct) => {
		let newURL = URL + `/search?search=${data.search}`;
		if (data.from) {
			newURL += `&from=${data.from}`;
		}
		if (data.to) {
			newURL += `&to=${data.to}`;
		}
		if (data.order) {
			newURL += `&order=${data.order}`;
		}
		if (data.brands) {
			newURL += `&brands=${data.brands}`;
		}

		const response = await axiosService.post<IResponseSuccess<ILoadMorePaginationRes<IProductItem[]>>>(
			newURL,
			{
				limit: data.limit,
				after: data.after ? data.after : undefined,
			}
		);

		return response.data.data;
	},

	recommendCF: async (itemId: string) => {
		const response = await axiosService.get<IResponseSuccess<IProductItem[]>>(
			`${URL}/recommend/cf/${itemId}`
		);

		return response.data.data;
	},

	recommendItemBased: async () => {
		const response = await axiosService.get<IResponseSuccess<IProductItem[]>>(
			`${URL}/recommend/item-based`
		);

		return response.data.data;
	},

	createComment: async (body: ICreateComment) => {
		const response = await axiosService.post<IResponseSuccess<IComment>>(`${URL}/comment`, body);

		return response.data.data;
	},

	updateComment: async (body: IUpdateComment) => {
		const response = await axiosService.put<IResponseSuccess<IComment>>(`${URL}/comment/${body._id}`, {
			rate: body.rate,
			content: body.content,
			productItemId: body.productItemId,
		});

		return response.data.data;
	},

	getRatingType: async (prodItemId: string) => {
		const response = await axiosService.get<IResponseSuccess<IRatingProductItem>>(
			`${URL}/product-detail/${prodItemId}/rating`
		);

		return response.data.data;
	},

	getCommentPagination: async (prodItemId: string, page: number, limit: number, rate?: number) => {
		let reqUrl = "";
		if (rate) {
			reqUrl = `${URL}/product-detail/${prodItemId}/comment/pagination?page=${page}&limit=${limit}&rate=${rate}`;
		} else {
			reqUrl = `${URL}/product-detail/${prodItemId}/comment/pagination?page=${page}&limit=${limit}`;
		}

		const response = await axiosService.get<IResponseSuccess<ICommentPagination>>(reqUrl);

		return response.data.data;
	},

	paginateProductBrand: async (data: IProductBrand) => {
		let newURL = URL + `/product-items/brand/${data.id}/options?`;
		if (data.from) {
			newURL += `&from=${data.from}`;
		}
		if (data.to) {
			newURL += `&to=${data.to}`;
		}
		if (data.order) {
			newURL += `&order=${data.order}`;
		}

		const response = await axiosService.post<
			IResponseSuccess<ILoadMorePaginationRes<IProductBrandItem[]>>
		>(newURL, {
			limit: data.limit,
			after: data.after ? data.after : undefined,
		});

		return response.data.data;
	},

	getCategoryId: async (id: string) => {
		const response = await axiosService.get<IResponseSuccess<string>>(`${URL}/category-id/${id}`);

		return response.data.data;
	},

	checkUserHasComments: async () => {
		const response = await axiosService.get<IResponseSuccess<boolean>>(`${URL}/has-comments`);

		return response.data.data;
	},
};

export default productApi;
