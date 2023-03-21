import { deleteCookie } from "cookies-next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useRef } from "react";
import APP_PATH from "../../constants/app-path";
import ClipBoard from "../icons/clip-board";
import PinLine from "../icons/pin-line";
import Profile from "../icons/profile";
import SignIn from "../icons/sign-in";
import SignOut from "../icons/sign-out";

interface Props {
	onClose: () => void;
}

export default function MyAccount({ onClose }: Props) {
	const myAccountRef = useRef<HTMLDivElement>(null);

	const router = useRouter();
	const { data: session, status } = useSession();

	const handleClickOutside = (event: any) => {
		const { target } = event;

		if (myAccountRef.current && target && "nodeType" in target) {
			if (!myAccountRef.current.contains(target)) {
				onClose();
			}
		}
	};

	const handleRedirectToLoginPage = () => {
		onClose();
		router.push({
			pathname: APP_PATH.SIGN_IN,
			query: { redirectURL: router.asPath },
		});
	};

	const handleMyAccount = (to: string) => {
		onClose();
		router.push(to);
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			ref={myAccountRef}
			className="absolute right-0 overflow-hidden border-2 top-[calc(100%+16px)] drop-shadow-md w-fit bg-white-light border-gray-accent rounded-xl"
		>
			{status === "authenticated" ? (
				<Fragment>
					<button
						onClick={() => handleMyAccount(APP_PATH.INFO)}
						className="flex items-center w-full px-3 py-2 text-left gap-x-4 whitespace-nowrap"
					>
						<Profile className="text-black shrink-0 dark:text-light-100" />
						<p>Info</p>
					</button>
					<button
						onClick={() => handleMyAccount(APP_PATH.ADDRESS)}
						className="flex items-center w-full px-3 py-2 text-left gap-x-4 whitespace-nowrap"
					>
						<PinLine className="text-black shrink-0 dark:text-light-100" />
						<p>Address</p>
					</button>
					<button
						onClick={() => handleMyAccount(`${APP_PATH.ORDER_HISTORY}?status=pending`)}
						className="flex items-center w-full px-3 py-2 text-left gap-x-4 whitespace-nowrap"
					>
						<ClipBoard className="text-black shrink-0 dark:text-light-100" />
						<p>Orders history</p>
					</button>
					<button
						onClick={() => {
							deleteCookie("Authorization", { path: "/", domain: "localhost" });
							signOut({ callbackUrl: APP_PATH.HOME });
						}}
						className="flex items-center w-full px-3 py-2 text-left gap-x-4 whitespace-nowrap"
					>
						<SignOut className="text-black shrink-0 dark:text-light-100" />
						Sign out
					</button>
				</Fragment>
			) : (
				<button
					onClick={handleRedirectToLoginPage}
					className="flex items-center w-full px-3 py-2 text-left gap-x-4 whitespace-nowrap"
				>
					<SignIn className="text-black shrink-0 dark:text-light-100" />
					Sign in
				</button>
			)}
		</div>
	);
}
