import { OrderStatus } from "../constants/enums";
import { ICreateOrder, IOrder, IOrderDetail } from "../types/apis/order-api";
import axiosService from "./axios-service";

const API = process.env.API_URL;

const ENDPOINT = "order";
const URL = `${API}/${ENDPOINT}`;

export const orderApi = {
	createOrder: async (body: ICreateOrder) => {
		const response = await axiosService.post<IResponseSuccess<string>>(URL, body);

		return response.data.data;
	},

	getOrders: async (param: OrderStatus) => {
		const response = await axiosService.get<IResponseSuccess<IOrder[]>>(`${URL}/${param}`);

		return response.data.data;
	},

	getOrdersById: async (id: string) => {
		const response = await axiosService.get<IResponseSuccess<IOrderDetail>>(`${URL}/detail/${id}`);

		return response.data.data;
	},
};
