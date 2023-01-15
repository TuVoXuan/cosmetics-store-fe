import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";

interface Props {
	children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	return (
		<main>
			<Header />
			{children}
			<Footer />
		</main>
	);
}
