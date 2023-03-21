import clsx from "clsx";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import productApi from "../../api/product-api";
import { IComment } from "../../types/apis/order-api";
import { toastError } from "../../util/toast";
import Button from "../buttons/button";
import GroupStars from "../comment/group-stars";
import Delete from "../icons/delete";

export type ProdReviewRefType = {
	current: HTMLDivElement | null;
	open: () => void;
	setFormValue: (orderItemId: string, productItemId: string) => void;
	setDefaultComment: (comment: IComment) => void;
};

interface Props {
	overlay?: React.RefObject<HTMLDivElement>;
	setComment: (comment: IComment, orderItemId: string) => void;
}

interface FormValues {
	rate: number;
	content: string;
}

const ProductReview = React.forwardRef<ProdReviewRefType, Props>(({ overlay, setComment }, ref) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const [orderItemId, setOrderItemId] = useState<string>("");
	const [productItemId, setProductItemId] = useState<string>("");
	const [defaultComment, setDefaultComment] = useState<IComment>();
	const [stars, setStars] = useState<number>(0);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			rate: 0,
			content: "",
		},
	});

	const onSubmit = async (value: FormValues) => {
		try {
			if (defaultComment) {
				console.log("value: ", value);
				toast.loading("Updating comment ...", { id: "toastUpdateComment" });
				const body: IUpdateComment = {
					_id: defaultComment._id,
					content: value.content,
					rate: value.rate,
					productItemId: productItemId,
				};

				const response = await productApi.updateComment(body);
				setComment(response, orderItemId);

				toast.dismiss("toastUpdateComment");
				toast.success("Update comment success");
			} else {
				toast.loading("Creating comment ...", { id: "toastCreateComment" });
				const body: ICreateComment = {
					content: value.content,
					orderItemId: orderItemId,
					productItemId: productItemId,
					rate: value.rate,
				};
				const response = await productApi.createComment(body);
				setComment(response, orderItemId);

				toast.dismiss("toastCreateComment");
				toast.success("Create comment success");
			}
			handleClose();
		} catch (error) {
			toastError((error as IResponseError).error);
		}
	};

	const changeStars = (value: number) => {
		setStars(value);
	};

	// funtion for modal action
	const handleOpen = () => {
		document.addEventListener("click", handleClickOutside, true);
		if (containerRef.current && overlay && overlay.current) {
			containerRef.current.classList.replace("-left-[100%]", "left-1/2");
			overlay.current.classList.replace("hidden", "block");
		}
	};

	const handleClose = () => {
		reset();
		changeStars(0);
		setDefaultComment(undefined);
		if (containerRef.current && overlay && overlay.current) {
			containerRef.current.classList.replace("left-1/2", "-left-[100%]");
			overlay.current.classList.replace("block", "hidden");
		}
		document.removeEventListener("click", handleClickOutside, true);
	};

	const handleSetValue = (orderItemId: string, productItemId: string) => {
		setOrderItemId(orderItemId);
		setProductItemId(productItemId);
	};

	const handleSetDefaultComment = (comment: IComment) => {
		setDefaultComment(comment);
	};

	const handleClickOutside = (event: any) => {
		const { target } = event;

		if (containerRef.current && target && "nodeType" in target) {
			if (!containerRef.current.contains(target)) {
				handleClose();
			}
		}
	};

	useImperativeHandle(ref, () => ({
		current: containerRef.current,
		open: handleOpen,
		setFormValue: handleSetValue,
		setDefaultComment: handleSetDefaultComment,
	}));

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);

		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	useEffect(() => {
		if (defaultComment) {
			setValue("rate", defaultComment.rate);
			setValue("content", defaultComment.content);
			setStars(defaultComment.rate);
		}
	}, [defaultComment]);

	return (
		<div
			ref={containerRef}
			className="fixed -left-[100%] z-20 w-[80%] md:w-4/5 lg:w-3/5 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black-dark-3 rounded-3xl top-1/2 transition-all duration-300 ease-out"
		>
			<div className="relative flex justify-between p-4 border-b-2 md:p-5">
				<h3 className="text-heading-4 md:text-heading-3 dark:text-white">Đánh giá của bạn</h3>

				<button
					onClick={handleClose}
					className="absolute top-[50%] -translate-y-1/2 p-1 md:p-2 border-2 rounded-full right-6 border-gray-accent dark:border-black-dark-2"
				>
					<Delete className="w-6 h-6 dark:text-white" />
				</button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-3">
				<div className="flex items-center gap-x-4">
					<p className={clsx(errors.rate && "text-red-accent", "whitespace-nowrap")}>Đánh giá</p>
					<GroupStars
						name="rate"
						register={register}
						option={{
							required: { value: true, message: "Vote star is required" },
							min: { value: 1, message: "Vote star from 1 to 5" },
						}}
						stars={stars}
						onChangeStars={changeStars}
						error={errors.rate?.message}
					/>
				</div>
				{errors.rate && <p className="text-red-accent">{errors.rate.message}</p>}
				<div className="space-y-2">
					<label htmlFor="content" className={clsx(errors.content && "text-red-accent")}>
						Bình luận
					</label>
					<textarea
						{...register("content", {
							required: { value: true, message: "Comment is required" },
						})}
						className={clsx(
							"w-full p-3 border-2 rounded-lg outline-none border-primary-100",
							errors.content && "border-red-accent"
						)}
						id="content"
						rows={3}
					/>
					{errors.content && <p className="text-red-accent">{errors.content.message}</p>}
				</div>
				<Button btnType="submit" type="primary" className="w-full">
					Viết đánh giá
				</Button>
			</form>
		</div>
	);
});

ProductReview.displayName = "ProductReview";

export default ProductReview;
