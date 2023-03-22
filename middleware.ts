import { NextRequest, NextResponse } from "next/server";
import APP_PATH from "./constants/app-path";

function checkIfStringStartsWith(str: string, arr: string[]) {
	return arr.some((substr) => str.startsWith(substr));
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	console.log("pathname: ", pathname);

	const cookie = request.cookies.get("Authorization");
	const noAuthPage = [
		APP_PATH.ADDRESS,
		APP_PATH.CART,
		APP_PATH.CHECKOUT,
		APP_PATH.LOADING_CHECKOUT,
		APP_PATH.ORDER_HISTORY,
		APP_PATH.PROFILE,
		APP_PATH.INFO,
		APP_PATH.ORDER_HISTORY,
	];

	if (cookie && !cookie.value && checkIfStringStartsWith(pathname, noAuthPage)) {
		return NextResponse.redirect(new URL(APP_PATH.SIGN_IN, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
};
