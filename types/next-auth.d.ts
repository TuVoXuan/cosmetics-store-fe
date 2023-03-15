import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface User {
		token?: string;
	}

	interface Session {
		user: {
			/** The user's postal address. */
			token?: string;
			id?: string;
		} & DefaultSession["user"];
	}
}
