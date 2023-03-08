import toast from "react-hot-toast";
export const toastError = (message: string) => {
	toast.error(message, {
		style: { maxWidth: "500px" },
	});
};
export const toastSuccess = (message: string) => {
	toast.success(message, {
		style: { maxWidth: "500px" },
	});
};
