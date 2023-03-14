import { ICreateOrder } from "../types/apis/order-api";
import axiosService from "./axios-service";

const API = process.env.API_URL;

const ENDPOINT = "order";
const URL = `${API}/${ENDPOINT}`;

export const orderApi = {
	createOrder: async (body: ICreateOrder) => {
		const response = await axiosService.post<IResponseSuccess<string>>(URL, body);

		return response.data.data;
	},
};
