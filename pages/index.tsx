import Checkbox from "../components/inputs/checkbox";
import { useSession, signOut } from "next-auth/react";
import Button from "../components/buttons/button";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../redux/slices/user-slice";
import TitlePage from "../components/title-page/title-page";
import Image from "next/image";

export default function Home() {
	const { data: session } = useSession();
	console.log("session: ", session);
	const { push } = useRouter();
	const user = useAppSelector(selectUser);

	const handleSignIn = () => push(`/auth/sign-in`);
	return (
		<section>
			<div className="lg:bg-gray-accent lg:rounded-5xl lg:relative">
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
				<div className=" lg:mt-12 lg:mb-6 rounded-5xl md:py-4 lg:flex lg:justify-end bg-gray-accent lg:bg-transparent lg:rounded-none dark:bg-black-dark-2 px-2 py-10 mt-10">
					<div className="relative h-[221px] md:h-96 lg:h-[432px] lg:w-[576px] xl:w-[768px] xl:h-[576px]">
						<Image className="mx-auto" src={"/images/banner/banner.svg"} fill alt="banner" />
					</div>
				</div>
			</div>
		</section>
	);
}
