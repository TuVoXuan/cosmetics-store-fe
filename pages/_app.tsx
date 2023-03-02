import "../styles/globals.css";
import "../styles/nprogress.css";
import type { AppProps } from "next/app";
import { Montserrat } from "@next/font/google";
import MainLayout from "../layout/main-layout";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";

const montserrat = Montserrat({ subsets: ["latin", "vietnamese"] });

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		router.events.on("routeChangeStart", () => NProgress.start());
		router.events.on("routeChangeComplete", () => {
			NProgress.configure({ speed: 4000 });
			NProgress.done();
		});
		router.events.on("routeChangeError", () => NProgress.done());
	}, []);

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
