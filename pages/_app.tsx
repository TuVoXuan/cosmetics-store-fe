import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat } from "@next/font/google";
import MainLayout from "../layout/main-layout";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({ subsets: ["latin", "vietnamese"] });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<Provider store={store}>
			<SessionProvider session={session}>
				<main className={montserrat.className}>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</main>
				<Toaster
					toastOptions={{
						className: "z-[500]",
					}}
				/>
			</SessionProvider>
		</Provider>
	);
}
