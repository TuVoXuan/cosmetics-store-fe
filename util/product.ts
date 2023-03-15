export const convertPrice = (price: number) => {
	return price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const convertDate = (date: string) => {
	return new Date(date).toLocaleDateString("en-GB");
};
