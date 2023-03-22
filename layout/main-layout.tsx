import { getCookie, setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import Footer from "../components/footer";
import Header from "../components/header";
import { getCategories } from "../redux/actions/category-action";
import { getAddress } from "../redux/actions/user-action";

interface Props {
	children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const { data: session } = useSession();

	const fetchCategories = () => {
		dispatch(getCategories()).unwrap();
	};

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};

	const handleSetToken = async () => {
		// const authorization = getCookie("Authorization");
		if (session) {
			// fetch("/api/user")
			// 	.then((data) => data.json())
			// 	.then((data: JWTToken) => {
			// 		if (data.jwtToken) {
			// 			setCookie("Authorization", data.jwtToken);
			// 		}
			// 		return data;
			// 	})
			// 	.then((data: JWTToken) => {
			// 		if (data.jwtToken) {
			// 			dispatch(getAddress());
			// 		}
			// 	});
			setCookie("Authorization", session.user.token);
			try {
				await dispatch(getAddress());
			} catch (error) {
				console.log("error: ", error);
			}
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		handleSetToken();
	}, [session]);

	return (
		<main
			className={`overflow-hidden p-8 md:pt-8 md:px-10 lg:pt-12 lg:px-12 lg:pb-16 xl:px-24 xl:pt-12 xl:pb-[72px] dark:bg-black-dark-3 ${
				showNavbar && "h-screen overflow-hidden"
			}`}
		>
			<Header onShowNavbar={handleShowNavbar} />
			{children}
			<Footer />
		</main>
	);
}
