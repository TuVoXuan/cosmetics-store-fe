import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import Footer from "../components/footer";
import Header from "../components/header";
import { getCategories } from "../redux/actions/category-action";
// import clsx from "clsx";

interface Props {
	children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const fetchCategories = () => {
		dispatch(getCategories()).unwrap();
	};

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

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
