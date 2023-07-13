/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		API_URL: process.env.API_URL,
		API_PYTHON: process.env.API_PYTHON,
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
		LIMI_COMMENT: process.env.LIMI_COMMENT,
		DOMAIN: process.env.DOMAIN,
		PAGE_ID: process.env.PAGE_ID,
		MAPQUEST_URL: process.env.MAPQUEST_URL,
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
