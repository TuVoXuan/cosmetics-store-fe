import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import authApi from "../../../api/auth-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies, setCookie } from "nookies";
import { ISignInWithSocialMediaRes } from "../../../types/apis/auth-api";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	// Do whatever you want here, before the request is passed down to `NextAuth`
	const cookies = parseCookies({ req });

	let maxAge = 24 * 15 * 60;

	if (cookies["remember-me"]) {
		maxAge = cookies["remember-me"] == "true" ? 30 * 24 * 60 * 60 : 24 * 15 * 60;
	} else if (req.body.rememberMe) {
		maxAge = req.body.rememberMe == "true" ? 30 * 24 * 60 * 60 : 24 * 15 * 60;

		setCookie({ res }, "remember-me", req.body.rememberMe, {
			maxAge,
			path: "/",
		});
	}

	return await NextAuth(req, res, {
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
			CredentialsProvider({
				name: "Credentials",
				credentials: {
					email: { label: "Username", type: "text", placeholder: "jsmith" },
					password: { label: "Password", type: "password" },
				},
				async authorize(credentials, req) {
					// Add logic here to look up the user from the credentials supplied
					try {
						const res = await authApi.signIn({
							email: credentials?.email || "abcd@gmail.com",
							password: credentials?.password || "12346789",
							rememberMe: (req.body?.rememberMe === "true" ? true : false) || false,
						});

						if (res.data.data.user) {
							// Any object returned will be saved in `user` property of the JWT
							const user = res.data.data.user;
							return {
								id: user._id,
								email: user.email,
								name: user.name,
								token: res.data.data.token,
							};
						} else {
							// If you return null then an error will be displayed advising the user to check their details.
							return Promise.reject(new Error("Invalid credential"));

							// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
						}
					} catch (error: any) {
						throw new Error((error as IResponseError).error);
					}
				},
			}),
		],

		pages: {
			signIn: "/auth/sign-in",
			error: "/auth/error",
		},
		callbacks: {
			async signIn({ user, account, profile, email, credentials }) {
				try {
					if (account && account.type === "credentials") {
						return true;
					}

					const token = cookies["Authorization"];
					if (token) {
						const url = process.env.API_URL + "/auth/link-social-account";
						const headers = {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						};
						const response = (await (
							await fetch(url, {
								method: "POST",
								headers: headers,
								body: JSON.stringify({ user, account }),
							})
						).json()) as IResponseSuccess<ISignInWithSocialMediaRes> | IResponseError;

						if ("data" in response) {
							user.email = response.data.user.email;
							user.name = response.data.user.name;
							user.id = response.data.user._id;
							user.token = response.data.token;
							user.image = "";
							return true;
						}

						if ("error" in response) {
							throw new Error(response.error);
						}
					}

					const response = await authApi.signInWithSocialMedia({ user, account });

					if (response.data.data) {
						user.token = response.data.data.token;
						user.email = response.data.data.user.email;
						user.name = response.data.data.user.name;
						user.id = response.data.data.user._id;
						user.image = "";
						return true;
					}

					return false;
				} catch (error: any) {
					console.log("error: ", error);
					throw new Error(error.message);
				}
			},
			async jwt({ token, user, account, profile, isNewUser }) {
				if (user && user.token) {
					token.jwtToken = user.token;
					token.id = user.id;
				}
				return token;
			},
			async session({ session, token, user }) {
				if (token && token.jwtToken) {
					session.user.token = (token.jwtToken as string).toString();
					session.user.id = token.id as string;
				}
				return session; // The return type will match the one returned in `useSession()`
			},
			async redirect({ url, baseUrl }) {
				// Allows relative callback URLs
				if (url.startsWith("/")) return `${baseUrl}${url}`;
				// Allows callback URLs on the same origin
				else if (new URL(url).origin === baseUrl) return url;
				return baseUrl;
			},
		},
		// logger: {
		// 	error(code, metadata) {
		// 		console.log(code, metadata);
		// 	},
		// 	warn(code) {
		// 		console.log(code);
		// 	},
		// 	debug(code, metadata) {
		// 		console.log(code, metadata);
		// 	},
		// },
		secret: process.env.NEXTAUTH_SECRET,
		session: {
			strategy: "jwt",
			maxAge,
		},
		jwt: {
			maxAge,
		},
	});
}
