import React, { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
// import clsx from "clsx";

interface Props {
	children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	const [showNavbar, setShowNavbar] = useState<boolean>(false);

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar);
	};

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
