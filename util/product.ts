export const convertPrice = (price: number) => {
	return price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
