import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat } from "@next/font/google";
import MainLayout from "../layout/main-layout";
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({ subsets: ["latin", "vietnamese"] });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<main className={montserrat.className}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</main>
		</SessionProvider>
	);
}
