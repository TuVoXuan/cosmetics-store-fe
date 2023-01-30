import Checkbox from "../components/inputs/checkbox";
import { useSession, signOut } from "next-auth/react";
import Button from "../components/buttons/button";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../redux/slices/user-slice";

export default function Home() {
	const { data: session } = useSession();
	const { push } = useRouter();
	const user = useAppSelector(selectUser);

	const handleSignIn = () => push(`/auth/sign-in`);
	return (
		<>
			<div>
				{session ? (
					<>
						<p>You are signed in</p>
						<p>token: {session.user.token}</p>
						<p>name: {session.user.name}</p>
						<button className="px-4 py-2 bg-red-400 border rounded-md" onClick={() => signOut()}>
							Sign Out
						</button>
					</>
				) : (
					<>
						<p>You are not signed in</p>
						<button
							className="px-4 py-2 bg-red-400 border rounded-md"
							onClick={() => handleSignIn()}
						>
							Sign In
						</button>
					</>
				)}
			</div>
		</>
	);
}
