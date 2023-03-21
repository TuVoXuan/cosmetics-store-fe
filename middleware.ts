import { NextRequest, NextResponse } from "next/server";
import APP_PATH from "./constants/app-path";

function checkIfStringStartsWith(str: string, arr: string[]) {
	return arr.some((substr) => str.startsWith(substr));
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	// if (
	// 	pathname.startsWith("/_next") ||
	// 	pathname.startsWith("/image") ||
	// 	pathname.startsWith("/emoji-gif") ||
	// 	pathname.startsWith("/emoji") ||
	// 	pathname.startsWith("/favicon.ico") ||
	// 	pathname.startsWith("/logo.svg") ||
	// 	pathname.startsWith("/logo-and-brand-name.svg")
	// ) {
	// 	return NextResponse.next();
	// }

	const cookie = request.cookies.get("Authorization");
	const noAuthPage = [
		APP_PATH.SIGN_IN,
		APP_PATH.SIGN_UP,
		// APP_PATH.HOME,
		APP_PATH.LEGAL,
		APP_PATH.CONTACT,
		APP_PATH.SEARCH,
		APP_PATH.CATEGORY,
		APP_PATH.ABOUT,
		APP_PATH.PRODUCT,
	];

	// if (cookie && noAuthPage.includes(pathname)) {
	// 	return NextResponse.redirect(new URL("/", request.url));
	// }

	// console.log("isNoAuthPage: ", checkIfStringStartsWith(pathname, noAuthPage));
	if (!cookie && !checkIfStringStartsWith(pathname, noAuthPage)) {
		return NextResponse.redirect(new URL(APP_PATH.SIGN_IN, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
};
