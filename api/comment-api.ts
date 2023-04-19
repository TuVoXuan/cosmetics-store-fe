import axiosService from "./axios-service";

const API = process.env.API_PYTHON;

export const commentApi = {
	translateComment: (body: ICommentSimp[]) => {
		return axiosService.post<ICommentTrans[]>(`${API}/translation`, body);
	},
};
