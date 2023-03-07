import React, { useRef } from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Button from "../components/buttons/button";
import OptionButton from "../components/buttons/option-button";
import ProductCard from "../components/card/product-card";
import BarCharDown from "../components/icons/bar-char-down";
import BarCharUp from "../components/icons/bar-char-up";
import LayoutGrid from "../components/icons/layout-grid";
import Wallet from "../components/icons/wallet";
import HyggeImage from "../components/Image/image";
import CategoriesWindow, { CategoriesWindowRefType } from "../components/modal/categories-window";
import Overlay from "../components/modal/overlay";
import PriceRange, { PriceRangeRefType } from "../components/modal/price-range";
import TitlePage from "../components/title-page/title-page";

export default function Search() {
	const overlayRef = useRef<HTMLDivElement>(null);
	const categoriesRef = useRef<CategoriesWindowRefType>(null);
	const priceRangRef = useRef<PriceRangeRefType>(null);

	const handleOpenPriceRange = () => {
		if (priceRangRef.current) {
			priceRangRef.current.open();
		}
	};

	const handleOpenCategories = () => {
		if (categoriesRef.current) {
			categoriesRef.current.open();
		}
	};

	return (
		<div>
			<Breadcrumb className="hidden xl:block xl:mt-[93px]" items={["Trang chủ", "Kết quả tìm kiếm"]} />
			<TitlePage
				className="mt-14 md:mt-16 xl:mt-12"
				subtitle="Kết quả tìm kiếm"
				title="Cocoon chăm sóc da mặt"
			/>
			<p className="mt-6 text-paragraph-4 md:text-paragraph-2 md:mt-12 dark:text-light-100">
				<span className="font-bold text-heading-5 md:text-heading-4 dark:text-light-100">6</span> sản
				phẩm phù hợp
			</p>

			<div className="space-y-4 xl:space-y-12 mt-14 md:mt-16 xl:mt-[72px] lg:mt-14">
				<div className="space-y-2 md:space-y-4 xl:space-y-8">
					<p className="font-bold md:text-heading-4 text-heading-5 xl:text-heading-3 dark:text-light-100">
						Chọn tiêu chí
					</p>
					<div className="space-x-2 md:space-x-4 xl:space-x-8">
						<OptionButton onClick={handleOpenCategories}>
							<LayoutGrid
								width={20}
								height={20}
								className="inline mr-1 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
							/>
							Phân loại
						</OptionButton>
						<div className="inline lg:relative">
							<OptionButton onClick={handleOpenPriceRange}>
								<Wallet
									width={20}
									height={20}
									className="inline mr-1 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
								/>
								Khoảng giá
							</OptionButton>

							{/* price range */}
							<PriceRange overlay={overlayRef} ref={priceRangRef} />
						</div>
					</div>
				</div>

				<div className="space-y-2 md:space-y-4 xl:space-y-8">
					<p className="font-bold md:text-heading-4 text-heading-5 xl:text-heading-3 dark:text-light-100">
						Sắp xếp theo
					</p>
					<div className="flex overflow-x-auto gap-x-2 md:gap-x-4 xl:gap-x-8">
						<OptionButton>
							<BarCharUp
								width={20}
								height={20}
								className="inline mr-1 -rotate-90 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
							/>
							Giá tăng dần
						</OptionButton>
						<OptionButton>
							<BarCharDown
								width={20}
								height={20}
								className="inline mr-1 -rotate-90 dark:text-light-100 text-dark-100 xl:w-6 xl:h-6"
							/>
							Giá giảm dần
						</OptionButton>
					</div>
				</div>
				{/* brand logos */}
				<div className="space-y-2 md:space-y-4 xl:space-y-8">
					<p className="font-bold md:text-heading-4 text-heading-5 xl:text-heading-3 dark:text-light-100">
						Thương hiệu
					</p>

					<div className="flex items-center overflow-x-auto xl:h-36 h-14 md:h-28 gap-x-4 md:gap-x-8 lg:gap-x-10">
						<HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/Cocoon-Logo-PNG-3.png"
							alt="cocoon"
						/>
						<HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/Eucerin_logo.png"
							alt="eucerin"
						/>
						<HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/La-Roche-Posay-Logo-PNG-1.png"
							alt="larocheposay"
						/>
						<HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/Laneige_Logo.svg.png"
							alt="laneige"
						/>
						<HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/Pantene-Logo-2012-2016.png"
							alt="pantene"
						/>
						<HyggeImage
							className="w-20 h-full shrink-0 lg:w-40 xl:w-52 md:w-32"
							src="/images/logo/Vichy-Logo.png"
							alt="vichy"
						/>
					</div>
				</div>
			</div>

			{/* products */}
			<div className="mt-14 xl:mt-[72px] md:mt-16 lg:mt-14 mb-[104px] md:mb-28">
				<div className="space-y-14 md:grid md:grid-cols-3 md:space-y-0 gap-x-12 gap-y-16 lg:grid-cols-4 lg:gap-x-14">
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</div>

				<div className="flex justify-center mt-14 md:mt-16">
					<Button type="primary">Xem thêm</Button>
				</div>
			</div>

			{/* categories */}
			<CategoriesWindow ref={categoriesRef} overlay={overlayRef} />

			{/* overlay */}
			<Overlay ref={overlayRef} />
		</div>
	);
}
