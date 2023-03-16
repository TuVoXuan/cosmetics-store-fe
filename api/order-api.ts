import { OrderStatus } from "../constants/enums";
import { ICancelOrder, ICreateOrder, IOrder, IOrderDetail } from "../types/apis/order-api";
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
		const response = await axiosService.get<IResponseSuccess<IOrder[]>>(`${URL}/status/${param}`);

		return response.data.data;
	},

	getOrdersById: async (id: string) => {
		const response = await axiosService.get<IResponseSuccess<IOrderDetail>>(`${URL}/detail/${id}`);

		return response.data.data;
	},

	checkOrder: async (orderId: string) => {
		const response = await axiosService.get<IResponseSuccess<boolean>>(`${URL}/${orderId}`);

		return response.data.data;
	},

	cancelOrder: async (orderId: string) => {
		const response = await axiosService.put<IResponseSuccess<ICancelOrder>>(`${URL}/status/${orderId}`, {
			status: OrderStatus.Cancelled,
		});

		return response.data.data;
	},
};
