import { setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useSettings } from "../store/hooks";
import Footer from "../components/footer";
import Header from "../components/header";
import { getCategories } from "../redux/actions/category-action";
import { getAddress } from "../redux/actions/user-action";
import { checkUserHasComments, recommendItemBase } from "../redux/actions/recommend-action";
import { getShippingFeePerKm } from "../redux/actions/home-action";

interface Props {
	children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const { data: session } = useSession();
	const { showLayout, toggleLayout } = useSettings();

	const fetchCategories = () => {
		dispatch(getCategories()).unwrap();
	};

	const fetchShippingFeePerKm = () => {
		dispatch(getShippingFeePerKm()).unwrap();
	};

	const fetchRecommendedProducts = async () => {
		if (session) {
			const response = await dispatch(checkUserHasComments()).unwrap();

			if (response) {
				dispatch(recommendItemBase()).unwrap();
			}
		}
	};

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};

	const handleSetToken = async () => {
		if (session) {
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
		fetchShippingFeePerKm();
	}, []);

	useEffect(() => {
		handleSetToken();
		fetchRecommendedProducts();
	}, [session]);

	return (
		<main
			className={`p-4 md:pt-8 md:px-8 lg:pt-12 lg:px-12 lg:pb-16 xl:px-24 xl:pt-12 xl:pb-[72px] dark:bg-black-dark-3 ${
				showLayout && "h-screen overflow-hidden"
			}`}
		>
			<Header onShowNavbar={toggleLayout} />
			{children}
			<Footer />
		</main>
	);
}
