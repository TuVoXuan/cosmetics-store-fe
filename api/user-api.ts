import axiosService from "./axios-service";

const API = process.env.API_URL;

const ENDPOINT = "user";
const URL = `${API}/${ENDPOINT}`;

export const userApi = {
	getBasicInfo: async (email: string) => {
		const response = await axiosService.get<IResponseSuccess<IUserBasicInfo>>(`${URL}/${email}`);

		return response.data.data;
	},

	updateUser: async (data: UpdateUser) => {
		const response = await axiosService.put<IResponseSuccess<IUserBasicInfo>>(`${URL}`, data);

		return response.data.data;
	},

	changePass: async (data: ChangePass) => {
		const response = await axiosService.put<IResponseSuccess<string>>(`${URL}/change-pass`, data);

		return response.data.data;
	},

	checkHasPass: async () => {
		const response = await axiosService.get<IResponseSuccess<boolean>>(`${URL}/check-pass`);

		return response.data.data;
	},

	createPass: async (password: string) => {
		const response = await axiosService.post<IResponseSuccess<string>>(`${URL}/create-pass`, {
			password,
		});

		return response.data.data;
	},

	getAddresses: async () => {
		return await axiosService.get<IResponseSuccess<IAddressExtract[]>>(`${URL}/address`);
	},

	createAddress: async (body: IAddressAPI) => {
		return await axiosService.post<IResponseSuccess<IAddressExtract>>(`${URL}/address`, body);
	},

	deleteAddress: async (addressId: string) => {
		return await axiosService.delete<IResponseSuccess<string>>(`${URL}/address/${addressId}`);
	},

	setDefaultAddress: async (addressId: string) => {
		return await axiosService.put<IResponseSuccess<string>>(`${URL}/address/default/${addressId}`);
	},

	updateAddress: async (addressId: string, body: IAddressAPI) => {
		return await axiosService.put<IResponseSuccess<IAddressExtract>>(`${URL}/address/${addressId}`, body);
	},
};
