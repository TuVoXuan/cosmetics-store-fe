import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions: AuthOptions = {
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
			httpOptions: {
				timeout: 40000,
			},
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID || "",
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
		}),
	],

	pages: {
		signIn: "/auth/sign-in",
		error: "/auth/error",
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			const data = {
				userId: user.id,
			};
			await fetch("http://localhost:5500/api/v1", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			// const response = await fetch("http://localhost:5500/api/v1");
			// console.log("response: ", response);
			// console.log("credentials: ", credentials);
			// console.log("email: ", email);
			// console.log("profile: ", profile);
			// console.log("account: ", account);
			console.log("user: ", user);

			return true;
		},
	},
	// adapter: MongoDBAdapter(clientPromise),
};
export default NextAuth(authOptions);
