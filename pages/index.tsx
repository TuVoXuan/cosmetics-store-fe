import Checkbox from "../components/inputs/checkbox";
import { useSession, signOut } from "next-auth/react";
import Button from "../components/buttons/button";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../redux/slices/user-slice";
import TitlePage from "../components/title-page/title-page";
import Image from "next/image";
import ProductCard from "../components/card/product-card";
import HyggeImage from "../components/Image/image";

export default function Home() {
	const { data: session } = useSession();
	console.log("session: ", session);
	const { push } = useRouter();
	const user = useAppSelector(selectUser);

	const handleSignIn = () => push(`/auth/sign-in`);
	return (
		<section>
			<div className="lg:bg-gray-accent lg:rounded-5xl lg:dark:bg-black-dark-2 dark:lg:rounded-5xl lg:relative">
				<div className="lg:ml-12 lg:absolute lg:left-0 lg:w-[400px] xl:w-[496px] xl:ml-24 lg:top-0 lg:bottom-0 lg:content-center lg:grid">
					<TitlePage
						className="pt-14 pb-6"
						subtitle="Sản phẩm chăm sóc da"
						title="Chúng tôi cung cấp những sản phẩm tốt nhất cho làn da của bạn"
					/>
					<Button className="lg:w-fit" type="primary">
						Mua ngay
					</Button>
				</div>
				<div className=" lg:mt-12 lg:mb-6 rounded-5xl md:py-4 lg:flex lg:justify-end bg-gray-accent lg:bg-transparent dark:lg:bg-transparent lg:rounded-none dark:bg-black-dark-2 px-2 py-10 mt-10 lg:pt-12 lg:pb-6 lg:pr-6 lg:pl-0 xl:pt-6">
					<HyggeImage
						className="h-[221px] md:h-96 lg:h-[432px] lg:w-[576px] xl:w-[768px] xl:h-[576px]"
						src={"/images/banner/banner.svg"}
						alt="banner"
					/>
				</div>
			</div>
			<div className="mt-[104px]">
				<TitlePage
					className="text-center mb-14 md:text-left"
					subtitle="Sản phẩm"
					title="Khám phá các sản phẩm của chúng tôi"
				/>
				<div className="space-y-14 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-12 lg:gap-x-14 md:space-y-0 md:gap-y-16 xl:grid-cols-4 xl:gap-x-12 xl:gap-y-[72px]">
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
					<ProductCard />
				</div>
				<div className="flex justify-center mt-14">
					<Button type="primary">Xem tất cả</Button>
				</div>
			</div>
		</section>
	);
}
