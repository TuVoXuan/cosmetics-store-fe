import "../styles/dummy.css";
import "../styles/globals.css";
import "../styles/nprogress.css";
import type { AppProps } from "next/app";
import { Montserrat } from "@next/font/google";
import MainLayout from "../layout/main-layout";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getLocalData } from "../redux/slices/cart-slice";
import { SettingProvider } from "../context/setting.context";
// CSS
import "node_modules/flag-icons/css/flag-icons.min.css";
import { PathCategoryProvider } from "../context/path-category.context";

const montserrat = Montserrat({ subsets: ["latin", "vietnamese"], variable: "--font-montserrat" });

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const router = useRouter();
	const { toasts } = useToasterStore();
	const TOAST_LIMIT = 1;

	useEffect(() => {
		router.events.on("routeChangeStart", () => NProgress.start());
		router.events.on("routeChangeComplete", () => NProgress.done());
		router.events.on("routeChangeError", () => NProgress.done());

		const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
		store.dispatch(getLocalData(cart));

		const language = localStorage.getItem("language");
		if (language) {
			router.push(router.asPath, router.asPath, { locale: language });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
				<PathCategoryProvider>
					<SessionProvider session={session}>
						<main className={`${montserrat.variable} font-sans`}>
							<MainLayout>
								<Component {...pageProps} />
							</MainLayout>
							<Toaster
								toastOptions={{
									className: "z-[500]",
								}}
							/>
						</main>
					</SessionProvider>
				</PathCategoryProvider>
			</SettingProvider>
		</Provider>
	);
}
