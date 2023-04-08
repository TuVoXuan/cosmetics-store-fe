import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import TitlePage from "../../components/title-page/title-page";
import { toastError } from "../../util/toast";
import { brandApi } from "../../api/brand-api";
import BrandLogoCard from "../../components/card/brand-logo-card";
import { useSettings } from "../../store/hooks";
import APP_PATH from "../../constants/app-path";

const alphabet = [
	"0-9",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

export default function Brands() {
	const [brands, setBrands] = useState<IBrand[]>([]);

	const { language } = useSettings();

	const handleGetBrands = async () => {
		try {
			const response = await brandApi.getListBrands();
			setBrands(response);
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	const handleScrollToChar = (char: string) => () => {
		const element = document.getElementById(char);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		handleGetBrands();
	}, []);

	return (
		<div className="space-y-14 mt-14 mb-14 md:mb-[112px] xl:mb-[144px]">
			<Breadcrumb
				className="hidden lg:block lg:mt-14"
				items={[
					{ title: language.header.home_tag, href: APP_PATH.HOME },
					{ title: language.brand_page.brand_sub_title, href: APP_PATH.BRAND },
				]}
			/>

			<TitlePage
				className="mt-14 xl:mt-12 md:mt-16 lg:mt-14"
				subtitle={language.brand_page.brand_sub_title}
				title={language.brand_page.brand_title}
			/>

			<div className="flex flex-wrap py-4 gap-x-6 gap-y-4 border-y-2 border-gray-accent">
				{alphabet.map((item, index) => (
					<button
						key={index}
						onClick={handleScrollToChar(item)}
						className="px-6 py-2 font-medium text-white uppercase rounded-full bg-primary-100"
					>
						{item}
					</button>
				))}
			</div>

			<div className="space-y-4">
				{alphabet.map((char, index) => {
					const brandNameBeginWithChar = brands.filter((brand) => {
						const regex = new RegExp("^[" + char + "]");
						return brand.name.toLowerCase().match(regex) ? true : false;
					});
					return (
						<div key={index} className="dark:space-y-4">
							<h5
								id={char}
								className="px-3 dark:text-light-100 capitalize rounded-lg text-heading-4 bg-primary-10 dark:bg-primary-100"
							>
								{char}
							</h5>
							<div key={char} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
								{brandNameBeginWithChar.map((brand) => (
									<div key={brand._id} className="flex bg-light-100 items-center rounded-lg p-2">
										<BrandLogoCard brand={brand} />
									</div>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
