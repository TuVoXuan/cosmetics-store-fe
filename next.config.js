/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		API_URL: process.env.API_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
		FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
		MONGODB_URI: process.env.MONGODB_URI,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		LIIMIT_PRODUCTS_BY_CATEGORY: process.env.LIIMIT_PRODUCTS_BY_CATEGORY,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		MAPQUEST_KEY: process.env.MAPQUEST_KEY,
		SHOP_LAT: process.env.SHOP_LAT,
		SHOP_LNG: process.env.SHOP_LNG,
		SHIPPING_FEE_PER_KM: process.env.SHIPPING_FEE_PER_KM,
		API_HOST: process.env.API_HOST,
		LIMI_COMMENT: process.env.LIMI_COMMENT,
	},
	images: {
		domains: ["i.pinimg.com", "res.cloudinary.com"],
	},
	i18n: {
		locales: ["en", "vi"],
		defaultLocale: "vi",
	},
};

module.exports = nextConfig;
