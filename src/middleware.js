import { NextResponse } from "next/server";

// Middleware function
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/sign-up" || path === "/sign-in";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (!token && path === "/snippet") {
    console.log(path);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/snippet"], // jaise kuch aur pages ho to
};
