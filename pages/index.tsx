import Checkbox from "../components/inputs/checkbox";
import { useSession, signOut } from "next-auth/react";
import Button from "../components/buttons/button";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../redux/slices/user-slice";
import TitlePage from "../components/title-page/title-page";

export default function Home() {
	const { data: session } = useSession();
	console.log("session: ", session);
	const { push } = useRouter();
	const user = useAppSelector(selectUser);

	const handleSignIn = () => push(`/auth/sign-in`);
	return (
		<section>
			<div>
				<TitlePage
					className="pt-14 pb-6"
					subtitle="Sản phẩm chăm sóc da"
					title="Chúng tôi cung cấp những sản phẩm tốt nhất cho làn da của bạn"
				/>
				<Button type="primary">Mua ngay</Button>
			</div>
		</section>
	);
}
