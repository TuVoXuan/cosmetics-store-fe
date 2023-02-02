import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { Grid, Pagination } from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import Badge from "../../components/badge/badge";
import Price from "../../components/badge/price";
import Button from "../../components/buttons/button";
import QuantityBtn from "../../components/buttons/quantity-btn";
import Comment from "../../components/comment/comment";
import GoBack from "../../components/icons/go-back";
import GoForward from "../../components/icons/go-forward";
import Quality from "../../components/icons/quality";
import ProductImage from "../../components/Image/product-image";
import Dropdown from "../../components/inputs/dropdown";
import Editor from "../../components/quill-editor/quill-editor";
import QuillToolbar, { formats, modules } from "../../components/quill-editor/quill-editor-toolbar";
import TitlePage from "../../components/title-page/title-page";
import { primary } from "../../styles/color";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});
import ProductCard from "../../components/card/product-card";

export default function Product() {
	const [value, setValue] = useState("");
	const productInfoRef = useRef<HTMLDivElement>(null);
	const prodImagesSwiperRef = useRef<SwiperRef>(null);
	const relatedProdsSwiperRef = useRef<SwiperRef>(null);

	const modules = {
		toolbar: [
			["bold", "italic", "underline", "strike"], // toggled buttons
			["blockquote", "code-block"],
			[{ header: 1 }, { header: 2 }], // custom button values
			[{ list: "ordered" }, { list: "bullet" }],
			[{ script: "sub" }, { script: "super" }], // superscript/subscript
			// [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
			// [{ direction: "rtl" }], // text direction
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ color: [] }, { background: [] }], // dropdown with defaults from theme
			[{ align: [] }],
			["clean"],
		],
	};
	const formats = [
		"font",
		"size",
		"bold",
		"italic",
		"underline",
		"strike",
		"color",
		"background",
		"script",
		"header",
		"blockquote",
		// "code-block",
		// "indent",
		"list",
		// "direction",
		"align",
		"link",
		"image",
		"video",
		"formula",
	];

	return (
		<section
			className="pt-14 md:pt-16 space-y-[104px] md:space-y-[112px] xl:space-y-[144px]
			mb-[104px] md:mb-[112px] xl:mb-[144px]"
		>
			<div className="xl:flex xl:gap-x-[72px] xl:items-center">
				<div className="md:hidden">
					<Swiper
						slidesPerView={1}
						spaceBetween={40}
						// breakpoints={{
						// 	0: { slidesPerView: 2, spaceBetween: 24 },
						// 	768: { slidesPerView: 4.8, spaceBetween: 24 },
						// 	1024: { slidesPerView: 7, spaceBetween: 24 },
						// }}
						modules={[Pagination]}
						className="mb-10"
						loop
						ref={prodImagesSwiperRef}
					>
						<SwiperSlide>
							<ProductImage sale={20} />
						</SwiperSlide>
						<SwiperSlide>
							<ProductImage sale={20} />
						</SwiperSlide>
						<SwiperSlide>
							<ProductImage sale={20} />
						</SwiperSlide>
						<SwiperSlide>
							<ProductImage sale={20} />
						</SwiperSlide>
					</Swiper>
					{/* navigate button */}
					<nav className="flex justify-center gap-x-4 mb-14">
						<button
							onClick={() => prodImagesSwiperRef.current?.swiper.slidePrev()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoBack height={16} width={16} className="text-black dark:text-white-light" />
						</button>
						<button
							onClick={() => prodImagesSwiperRef.current?.swiper.slideNext()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoForward height={16} width={16} className="text-black dark:text-white-light" />
						</button>
					</nav>
				</div>

				<div className="hidden md:block md:mb-16 xl:mb-0 xl:w-[55%]">
					<div className="px-[84px] lg:px-[124px] lg:grid lg:grid-cols-4 lg:gap-x-6 xl:px-0">
						<ProductImage isTagResponsive sale={20} className="mb-6 lg:col-span-3 xl:mb-0" />

						<div className="grid grid-cols-3 gap-x-6 lg:block lg:col-start-1 lg:row-start-1 lg:gap-x-0 lg:space-y-6">
							<ProductImage />
							<ProductImage />
							<ProductImage />
						</div>
					</div>
				</div>

				{/* product info */}
				<div>
					<TitlePage
						className="mb-6 text-center md:mb-8 xl:text-left"
						subtitle="Bán chạy"
						title="Kem chống nắng"
					/>

					<div className="flex items-center justify-center mb-10 gap-x-6 md:gap-x-8 xl:mb-12">
						<Badge isResponsive color="yellow_tertiary">
							SUN CARE
						</Badge>
						<Price isResponsive price={30} sale={20} />
					</div>

					<div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
						<QuantityBtn />
						<Button type="primary">Thêm vào giỏ</Button>
					</div>
				</div>
			</div>

			{/* product info */}
			<div>
				<TitlePage
					className="text-center xl:text-left "
					subtitle="Đặc điểm sản phẩm"
					title="Khám phá các đặc điểm"
				/>
				{/* <div className="mt-8" dangerouslySetInnerHTML={{ __html: value }}></div> */}
				<div className="mt-8 text-paragraph-5 md:text-paragraph-4">
					<p>
						<strong>Cách sử dụng</strong>:
					</p>
					<p>- Thoa 1 đến 2 lần/ngày lên điểm mụn sau khi được rửa sạch và lau khô.</p>
					<p>
						<br />
					</p>
					<p>
						<strong>Thành phần</strong>:
					</p>
					<p>
						Water, Hamamelis, Virginiana Extract, Centella Asiatica Extract, Polysorbate 60,
						Lactic Acid, Cetyl Alcohol, Glycolic Acid, Manganese Chloride, Dimethicone
						Phenoxyethanol, Zinc Oxide, Pyridoxine HCL, Niacinamide, Retinal, Bisanolol, Salicylic
						Acid.
					</p>
					<p>
						<br />
					</p>
					<p>
						<strong>Công dụng</strong>:
					</p>
					<p>Ngừa mụn trứng cá, ngừa thâm, dưỡng da..</p>
					<p>Chống lão hóa, giảm mụn sưng viêm..</p>
					<p>
						<br />
					</p>
					<p>
						<strong>Sản phẩm khuyên dùng</strong>:
					</p>
					<p>
						Trường hợp da bị mụn là da hỗn hợp, da khô...rửa mặt sạch và vùng da bị mụn bằng sữa
						rửa mặt chuyên biệt Skinsiogel trước khi thoa Megaduo plus Gel.
					</p>
					<p>
						Trường hợp da bị mụn là da dầu, rửa mặt sạch và vùng da bị mụn bằng sữa rửa mặt
						Vinatid để loại sạch dầu trươc khi thoa Megaduo plus Gel
					</p>
					<p>
						<br />
					</p>
					<p>
						<strong>Xuất xứ</strong> : Việt Nam, nhà sản xuất Gamma Chemical.
					</p>
					<p>
						<strong>Hạn sử dụng</strong> : 3 năm kể từ ngày sản xuất..
					</p>
					<p>
						<strong>Khối lượng</strong> : 15 gram.
					</p>
					<p>
						<strong>Thương Hiệu</strong> : Gamma{" "}
					</p>
				</div>
				{/* <QuillNoSSRWrapper
				onChange={(value) => {
					const newValue = value.replaceAll("<ul>", "<ul class='list-disc ml-6'>");
					const newValue1 = newValue.replaceAll("<h1>", "<h1 class='text-heading-1'>");
					const newValue2 = newValue1.replaceAll("<h2>", "<h2 class='text-heading-2'>");
					const newValue3 = newValue2.replaceAll("<h3>", "<h3 class='text-heading-3'>");
					const newValue4 = newValue3.replaceAll("<h4>", "<h4 class='text-heading-4'>");
					const newValue5 = newValue4.replaceAll("<h5>", "<h5 class='text-heading-5'>");
					const newValue6 = newValue5.replaceAll("<ol>", "<ol class='list-decimal ml-6'>");
					console.log("newValue6: ", newValue6);
					setValue(newValue6);
				}}
				theme="snow"
				value={
					"<p><strong>Cách sử dụng</strong>:</p><p>- Thoa 1 đến 2 lần/ngày lên điểm mụn sau khi được rửa sạch và lau khô.</p><p><br></p><p><strong>Thành phần</strong>:</p><p>Water, Hamamelis, Virginiana Extract, Centella Asiatica Extract, Polysorbate 60, Lactic Acid, Cetyl Alcohol, Glycolic Acid, Manganese Chloride, Dimethicone Phenoxyethanol, Zinc Oxide, Pyridoxine HCL, Niacinamide, Retinal, Bisanolol, Salicylic Acid.</p><p><br></p><p><strong>Công dụng</strong>:</p><p>Ngừa mụn trứng cá, ngừa thâm, dưỡng da..</p><p>Chống lão hóa, giảm mụn sưng viêm..</p><p><br></p><p><strong>Sản phẩm khuyên dùng</strong>:</p><p>Trường hợp da bị mụn là da hỗn hợp, da khô...rửa mặt sạch và vùng da bị mụn bằng sữa rửa mặt chuyên biệt Skinsiogel trước khi thoa Megaduo plus Gel.</p><p>Trường hợp da bị mụn là da dầu, rửa mặt sạch và vùng da bị mụn bằng sữa rửa mặt Vinatid để loại sạch dầu trươc khi thoa Megaduo plus Gel</p><p><br></p><p><strong>Xuất xứ</strong> : Việt Nam, nhà sản xuất Gamma Chemical.</p><p><strong>Hạn sử dụng</strong> : 3 năm kể từ ngày sản xuất..</p><p><strong>Khối lượng</strong> : 15 gram.</p><p><strong>Thương Hiệu</strong> : Gamma</p>"
				}
				modules={modules}
				formats={formats}
			/> */}
			</div>

			{/* comments */}
			<div className="space-y-4">
				<TitlePage
					className="text-center xl:text-left"
					subtitle="Đánh giá"
					title="Khác hàng của chúng tôi nói gì"
				/>

				<div className="flex justify-between md:justify-evenly">
					<h3 className="grid content-center md:text-heading-1 text-heading-2 dark:text-light-100">
						4.9 / 5
					</h3>
					<div className="space-y-1">
						<div className="flex items-center justify-start gap-x-1">
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full lg:w-7 lg:h-7 text-primary-100"
							/>
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<p className="ml-2 dark:text-light-100 lg:text-heading-3">120</p>
						</div>
						<div className="flex items-center justify-start gap-x-1">
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={"none"}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<p className="ml-2 dark:text-light-100 lg:text-heading-3">45</p>
						</div>
						<div className="flex items-center justify-start gap-x-1">
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={"none"}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={"none"}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<p className="ml-2 dark:text-light-100 lg:text-heading-3">12</p>
						</div>
						<div className="flex items-center justify-start gap-x-1">
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={"none"}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={"none"}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={"none"}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<p className="ml-2 dark:text-light-100 lg:text-heading-3">4</p>
						</div>
						<div className="flex items-center justify-start gap-x-1">
							<Quality
								width={20}
								height={20}
								fill={primary[100]}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={"none"}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={"none"}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={"none"}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<Quality
								width={20}
								height={20}
								fill={"none"}
								className="h-full text-primary-100 lg:w-7 lg:h-7"
							/>
							<p className="ml-2 dark:text-light-100 lg:text-heading-3">1</p>
						</div>
					</div>
				</div>

				<Dropdown
					className="md:w-1/4"
					size="small"
					options={[
						{ label: "5 sao", value: "5" },
						{ label: "4 sao", value: "4" },
						{ label: "3 sao", value: "3" },
						{ label: "2 sao", value: "2" },
						{ label: "1 sao", value: "1" },
					]}
					onChange={(value: string) => console.log(value)}
				/>

				<div className="lg:grid lg:grid-cols-2">
					<Comment />
					<Comment />
					<Comment />
					<Comment />
				</div>
				<div className="flex items-center justify-center gap-x-2">
					<GoBack className="dark:text-light-100 md:w-5 md:h-5" width={14} height={14} />
					<p className="font-semibold text-paragraph-5 md:text-paragraph-4 dark:text-light-100">
						1 / 1
					</p>
					<GoForward className="dark:text-light-100 md:w-5 md:h-5" width={14} height={14} />
				</div>
			</div>

			{/* relative product */}
			<div>
				<div className="md:flex md:justify-between md:mb-16 xl:mb-[72px]">
					<TitlePage
						className="mb-6 text-center md:text-left md:mb-0"
						subtitle="Tìm hiểu thêm"
						title="Sản phẩm tương tự"
					/>

					<div className="hidden md:flex md:gap-x-4 md:items-end">
						<button
							onClick={() => relatedProdsSwiperRef.current?.swiper.slidePrev()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoBack height={16} width={16} className="text-black dark:text-white-light" />
						</button>
						<button
							onClick={() => relatedProdsSwiperRef.current?.swiper.slideNext()}
							className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
						>
							<GoForward height={16} width={16} className="text-black dark:text-white-light" />
						</button>
					</div>
				</div>

				<Swiper
					slidesPerView="auto"
					spaceBetween={40}
					breakpoints={{
						0: {
							slidesPerView: 1,
							spaceBetween: 40,
							grid: {
								rows: 1,
							},
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 40,
							grid: {
								rows: 2,
								fill: "row",
							},
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 40,
							grid: {
								rows: 2,
								fill: "row",
							},
						},
						1440: {
							slidesPerView: 4,
							spaceBetween: 40,
							grid: {
								rows: 2,
								fill: "row",
							},
						},
					}}
					modules={[Grid, Pagination]}
					className="mb-10 md:mb-0"
					loop
					ref={relatedProdsSwiperRef}
				>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
					<SwiperSlide>
						<ProductCard />
					</SwiperSlide>
				</Swiper>

				{/* navigate button */}
				<nav className="flex justify-center gap-x-4 mb-14 md:hidden">
					<button
						onClick={() => relatedProdsSwiperRef.current?.swiper.slidePrev()}
						className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
					>
						<GoBack height={16} width={16} className="text-black dark:text-white-light" />
					</button>
					<button
						onClick={() => relatedProdsSwiperRef.current?.swiper.slideNext()}
						className="p-4 rounded-full bg-gray-accent dark:bg-black-dark-2"
					>
						<GoForward height={16} width={16} className="text-black dark:text-white-light" />
					</button>
				</nav>
			</div>
		</section>
	);
}
