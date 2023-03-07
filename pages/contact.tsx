import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/buttons/button";
import Dropdown from "../components/inputs/dropdown";
import Input from "../components/inputs/input";
import ParaEmail from "../components/text/paraEmail";
import TitlePage from "../components/title-page/title-page";
import { en, vi } from "../translation";

export default function Contact() {
	const router = useRouter();
	const { locale } = router;
	const { register } = useForm();

	const content = locale === "en" ? en : vi;

	const handleLanguage = () => {
		switch (locale) {
			case "en":
				router.push("/contact", "/contact", { locale: "vi" });
				break;
			case "vi":
				router.push("/contact", "/contact", { locale: "en" });

				break;
			default:
				break;
		}
	};

	return (
		<section
			className="pt-14 md:pt-16 space-y-[104px] md:space-y-[112px] xl:space-y-[144px]
			mb-[104px] md:mb-[112px] xl:mb-[144px]"
		>
			<h1 onClick={handleLanguage}>{locale}</h1>
			<TitlePage
				className="mb-14 md:mb-16 xl:mb-[72px]"
				subtitle={content.contact_page.ask_question}
				title={content.contact_page.ask_quest_title}
			/>

			<div className="space-y-14 md:space-y-16 xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-x-24 xl:gap-y-[72px]">
				<div className="space-y-4">
					<h3 className="font-semibold text-paragraph-1 dark:text-white">
						{content.contact_page.question_1}
					</h3>
					<ParaEmail>{content.contact_page.answer_1}</ParaEmail>
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold text-paragraph-1 dark:text-white">
						{content.contact_page.question_2}
					</h3>
					<ParaEmail>{content.contact_page.answer_2}</ParaEmail>
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold text-paragraph-1 dark:text-white">
						{content.contact_page.question_3}
					</h3>
					<ParaEmail>{content.contact_page.answer_3}</ParaEmail>
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold text-paragraph-1 dark:text-white">
						{content.contact_page.question_4}
					</h3>
					<ParaEmail>{content.contact_page.answer_4}</ParaEmail>
				</div>
			</div>

			{/* reach out to us */}
			<div className="xl:grid xl:grid-cols-2 xl:gap-x-24">
				<TitlePage
					className="mb-14 md:mb-16 md:pr-[288px] lg:pr-[488px] xl:mb-0 xl:pr-0 xl:pl-[84px]"
					subtitle={content.contact_page.reach_out_to_us}
					title={content.contact_page.reach_out_to_us_title}
				/>

				<form className="space-y-10 md:space-y-12 xl:mt-8">
					<Input
						className="w-full"
						label={content.contact_page.full_name}
						placeholder="John Smith"
					/>
					<Input
						className="w-full"
						label={content.contact_page.email_address}
						placeholder="johnsmith@gmail.com"
					/>

					<Dropdown
						label={content.contact_page.subject}
						options={[
							{
								label: content.contact_page.select_subject,
								value: "",
							},
							{
								label: content.contact_page.delivery_time,
								value: "Thời gian giao hàng",
							},
							{
								label: content.contact_page.discount,
								value: "Giảm giá",
							},
							{
								label: content.contact_page.other,
								value: "Khác",
							},
						]}
						onChange={(value: string) => {}}
						error={""}
						register={register}
						name="subject"
					/>

					<div>
						<p className="mb-2 text-dark-100 md:mb-4 text-paragraph-5 md:text-paragraph-4 dark:text-white-light">
							{content.contact_page.message}
						</p>
						<textarea
							className="w-full border-[2px] border-gray-accent placeholder:text-dark-40 
                            font-semibold text-dark-100 focus:border-primary-100 focus:outline-none
                            dark:focus:border-primary-100 dark:focus:outline-none px-6 py-3 
                            text-heading-5 rounded-3xl md:px-6 md:py-4 md:text-heading-4 md:rounded-4xl
                            dark:border-black-dark-2 dark:bg-transparent dark:text-white-light
                            dark:placeholder:text-light-40"
							placeholder={content.contact_page.enter_message}
							rows={6}
						/>
					</div>

					<Button type="primary" btnType="button">
						{content.contact_page.send}
					</Button>
				</form>
			</div>

			{/* our newsletter */}
			<div
				className="hidden md:block lg:bg-gray-accent dark:lg:bg-black-dark-2 lg:rounded-[48px] 
                    lg:py-16 xl:py-24 xl:rounded-[56px]"
			>
				<TitlePage
					className="text-center mb-14 md:mb-10 md:px-[100px] lg:mb-12"
					subtitle={content.contact_page.our_newsletter}
					title={content.contact_page.our_newsletter_title}
				/>

				<div className="flex items-end justify-center gap-x-6">
					<input
						className="w-[448px] border-[2px] border-gray-accent font-semibold placeholder:text-dark-40 text-dark-100 
						focus:border-primary-100 focus:outline-none dark:focus:border-primary-100 
						dark:focus:outline-none px-6 py-3 text-heading-5 rounded-3xl md:px-6 md:py-4 
						md:text-heading-4 md:rounded-4xl dark:border-black-dark-4 dark:bg-transparent 
						dark:text-white-light dark:placeholder:text-light-40 dark:bg-black-dark-4"
						placeholder="johnsmith@gmal.com"
					/>
					<Button type="primary" className="h-full">
						{content.contact_page.sign_up}
					</Button>
				</div>
			</div>
		</section>
	);
}
