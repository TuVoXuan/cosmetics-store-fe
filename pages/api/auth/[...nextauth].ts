import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import authApi from "../../../api/auth-api";
import { useAppDispatch } from "../../../app/hooks";
import { store } from "../../../app/store";
import { signInWithSocialMedia } from "../../../redux/slices/user-slice";

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
			const response = await authApi.signInWithSocialMedia({ user, account });

			if (response.data.data) {
				// store.dispatch(signInWithSocialMedia(response.data.data));
				user.token = response.data.data.token;
				// console.log("response.data.data.token: ", response.data.data.token);
				return true;
			}

			return false;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			console.log("user jwt: ", user);
			if (user) {
				token.jwtToken = user.token;
			}
			return token;
		},
		async session({ session, token, user }) {
			console.log("token: ", token);
			console.log("session: ", session);
			session.user.token = (token.jwtToken as string).toString();
			return session; // The return type will match the one returned in `useSession()`
		},
	},
	// adapter: MongoDBAdapter(clientPromise),
};
export default NextAuth(authOptions);
