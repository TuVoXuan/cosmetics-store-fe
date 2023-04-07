import React, { useRef } from "react";
import Expand from "../components/icons/expand";
import SmallPara from "../components/text/smallPara";
import TitlePage from "../components/title-page/title-page";
import { useSettings } from "../store/hooks";

export default function Legal() {
	const { language } = useSettings();

	return (
		<section
			className="pt-14 md:pt-16 space-y-[56px] md:space-y-[64px] xl:space-y-[144px]
			mb-[104px] md:mb-[112px] xl:mb-[144px]"
		>
			<TitlePage subtitle={language.legal_page.legal_sub_title} title={language.legal_page.legal_title} />

			<div className="space-y-6 lg:space-y-8">
				<h3 className="font-bold text-heading-4 lg:text-heading-3 dark:text-white">
					1. {language.legal_page.introduction_title}
				</h3>
				<div className="space-y-6 lg:space-y-4 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-x-24 xl:gap-y-[72px]">
					<SmallPara title={`1.1 ${language.legal_page.terms_and_condition_title}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>

					<SmallPara title={`1.2 ${language.legal_page.collection_personal_data_title}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>
					<SmallPara title={`1.3 ${language.legal_page.purpose_of_collecting_data_title}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>

					<SmallPara title={`1.4 ${language.legal_page.usage_of_personal_data}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>
				</div>
			</div>

			<div className="space-y-6 lg:space-y-8">
				<h3 className="font-bold text-heading-4 lg:text-heading-3 dark:text-white">
					2. {language.legal_page.payment_terms_title}
				</h3>
				<div className="space-y-6 lg:space-y-4 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-x-24 xl:gap-y-[72px]">
					<SmallPara title={`2.1 ${language.legal_page.different_payment_metod_title}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>

					<SmallPara title={`2.2 ${language.legal_page.right_to_cacel_payment_title}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>
				</div>
			</div>

			<div className="space-y-6 lg:space-y-8">
				<h3 className="font-bold text-heading-4 lg:text-heading-3 dark:text-white">
					3. {language.legal_page.orders_title}
				</h3>
				<div className="space-y-6 lg:space-y-4 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-x-24 xl:gap-y-[72px]">
					<SmallPara title={`3.1 ${language.legal_page.orders_processing_title}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>

					<SmallPara title={`3.2 ${language.legal_page.dispatch_and_shipping_time_title}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>

					<SmallPara title={`3.3 ${language.legal_page.return_and_refund_policies_title}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>
				</div>
			</div>

			<div className="space-y-6 lg:space-y-8">
				<h3 className="font-bold text-heading-4 lg:text-heading-3 dark:text-white">
					4. {language.legal_page.changes_title}
				</h3>
				<div className="space-y-6 lg:space-y-4 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-x-24 xl:gap-y-[72px]">
					<SmallPara title={`4.1 ${language.legal_page.our_right_to_change_title}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>

					<SmallPara title={`4.2 ${language.legal_page.notice_of_change_title}`}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat.
					</SmallPara>
				</div>
			</div>
		</section>
	);
}
