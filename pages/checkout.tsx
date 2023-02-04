import React from "react";
import Steps from "../components/steps/steps";
import TitlePage from "../components/title-page/title-page";

export default function Checkout() {
	return (
		<div className="space-y-14 mt-14">
			<TitlePage subtitle="Gần hoàn thành" title="Thanh toán" />
			<Steps totalSteps={4} currentStep={2} />
		</div>
	);
}
