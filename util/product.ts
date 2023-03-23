export const convertPrice = (price: number) => {
	// return price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
	return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};

export const convertDate = (date: string) => {
	return new Date(date).toLocaleDateString("en-GB");
};
