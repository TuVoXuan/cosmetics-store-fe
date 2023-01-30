import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import authApi from "../../../api/auth-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies, setCookie } from "nookies";

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
						return null;

						// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
				if (account && account.type === "credentials") {
					return true;
				}

				const response = await authApi.signInWithSocialMedia({ user, account });

				if (response.data.data) {
					// store.dispatch(signInWithSocialMedia(response.data.data));
					user.token = response.data.data.token;
					return true;
				}

				return false;
			},
			async jwt({ token, user, account, profile, isNewUser }) {
				if (user && user.token) {
					token.jwtToken = user.token;
				}
				return token;
			},
			async session({ session, token, user }) {
				if (token && token.jwtToken) {
					session.user.token = (token.jwtToken as string).toString();
				}
				return session; // The return type will match the one returned in `useSession()`
			},
		},
		secret: process.env.JWT_SECRET,
		session: {
			strategy: "jwt",
			maxAge,
		},
		jwt: {
			secret: process.env.JWT_SECRET,
			maxAge,
		},
	});
}
