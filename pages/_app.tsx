import "../styles/globals.css";
import "../styles/nprogress.css";
import type { AppProps } from "next/app";
import { Montserrat } from "@next/font/google";
import MainLayout from "../layout/main-layout";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SettingProvider } from "../context/setting.context";

const montserrat = Montserrat({ subsets: ["latin", "vietnamese"] });

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const router = useRouter();
	const { toasts } = useToasterStore();
	const TOAST_LIMIT = 1;

	useEffect(() => {
		router.events.on("routeChangeStart", () => NProgress.start());
		router.events.on("routeChangeComplete", () => NProgress.done());
		router.events.on("routeChangeError", () => NProgress.done());
	}, []);

	useEffect(() => {
		toasts
			.filter((t) => t.visible) // Only consider visible toasts
			.filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
			.forEach((t) => toast.dismiss(t.id));
	}, [toasts]);

	return (
		<Provider store={store}>
			<SettingProvider>
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
			</SettingProvider>
		</Provider>
	);
}
