import React, { Fragment, useEffect, useState } from "react";
import GroupStars from "../../components/comment/group-stars";
import GoBack from "../../components/icons/go-back";
import GoForward from "../../components/icons/go-forward";
import Dropdown from "../../components/inputs/dropdown";
import TitlePage from "../../components/title-page/title-page";
import { useProductDetail } from "../../store/hooks";
import productApi from "../../api/product-api";
import { toastError } from "../../util/toast";
import Comment from "../../components/comment/comment";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { English, Vietnamese } from "../../translation";

export default function ProductComment() {
	const { register } = useForm();
	const { locale } = useRouter();
	const { currentItem } = useProductDetail();

	const [currPage, setCurrPage] = useState<number>(1);
	const [seletedStar, setSelectedStar] = useState<number>();
	const [ratingProdItem, setRatingProdItem] = useState<IRatingProductItem>();
	const [commentPagination, setCommentPagination] = useState<ICommentPagination>();

	const { product_detail_page } = locale === "en" ? English : Vietnamese;

	const handleSelecteStar = (value: string) => {
		const star = parseInt(value);
		if (star === 0) {
			setSelectedStar(undefined);
		} else {
			setSelectedStar(star);
		}
		handleGetCommentPagination(1, star);
	};

	const handleGetCommentPagination = async (page: number, star?: number) => {
		try {
			if (currentItem) {
				const limit = parseInt(process.env.LIMI_COMMENT as string);
				const response = await productApi.getCommentPagination(currentItem._id, page, limit, star);
				setCommentPagination(response);
			}
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	const handleGetRatingProdItem = async () => {
		try {
			if (currentItem) {
				const response = await productApi.getRatingType(currentItem._id);
				setRatingProdItem(response);
			}
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	useEffect(() => {
		handleGetRatingProdItem();
		handleGetCommentPagination(1);
	}, [currentItem]);

	return (
		<div className="space-y-4">
			<TitlePage
				className="text-center xl:text-left"
				title={product_detail_page.prod_reviews_Title}
				subtitle={product_detail_page.prod_reviews_subTitle}
			/>

			{ratingProdItem && (
				<div className="flex justify-between md:justify-evenly">
					<h3 className="grid content-center md:text-heading-1 text-heading-2 dark:text-light-100">
						{`${ratingProdItem.rating} / 5`}
					</h3>
					<div className="space-y-1">
						{[...Array(5)]
							.map((value, index) => {
								const rateTypeFound = ratingProdItem.rateType.find((r) => r.rate === index + 1);
								return (
									<div key={index} className="flex items-center justify-start gap-x-1">
										<GroupStars stars={index + 1} />
										<p className="ml-2 dark:text-light-100 lg:text-heading-3">{rateTypeFound?.count || 0}</p>
									</div>
								);
							})
							.reverse()}
					</div>
				</div>
			)}

			<Dropdown
				className="md:w-1/4"
				options={[
					{ label: product_detail_page.all, value: "0" },
					{ label: product_detail_page.five_star, value: "5" },
					{ label: product_detail_page.four_star, value: "4" },
					{ label: product_detail_page.three_star, value: "3" },
					{ label: product_detail_page.two_star, value: "2" },
					{ label: product_detail_page.one_star, value: "1" },
				]}
				onChange={handleSelecteStar}
				register={register}
				name="star"
			/>

			{commentPagination && commentPagination.totalPage > 0 ? (
				<Fragment>
					<div className="lg:grid lg:grid-cols-2">
						{commentPagination.data.map((item) => (
							<Comment key={item._id} comment={item} />
						))}
					</div>
					<div className="flex items-center justify-center gap-x-2">
						<button
							disabled={currPage - 1 < 1}
							onClick={() => {
								handleGetCommentPagination(currPage - 1, seletedStar);
								setCurrPage(currPage - 1);
							}}
							className="disabled:cursor-not-allowed"
						>
							<GoBack className="dark:text-light-100 md:w-5 md:h-5" width={14} height={14} />
						</button>

						<p className="font-semibold text-paragraph-5 md:text-paragraph-4 dark:text-light-100">
							{`${currPage} / ${commentPagination.totalPage}`}
						</p>

						<button
							disabled={currPage + 1 > commentPagination.totalPage}
							onClick={() => {
								handleGetCommentPagination(currPage + 1, seletedStar);
								setCurrPage(currPage + 1);
							}}
							className="disabled:cursor-not-allowed"
						>
							<GoForward className="dark:text-light-100 md:w-5 md:h-5" width={14} height={14} />
						</button>
					</div>
				</Fragment>
			) : (
				<div className="flex flex-col items-center pt-[60px] md:pt-[40px] gap-y-4">
					<p className="text-paragraph-4 md:text-paragraph-2">{product_detail_page.no_reviews}</p>
				</div>
			)}
		</div>
	);
}
