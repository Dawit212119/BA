import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoute = ["/profile", "dashboard"];
async function middelware(req: NextRequest) {
  const isSession = getSessionCookie(req);
  const isProtected = protectedRoute.includes(req.nextUrl.pathname);
  const isAuth = req.nextUrl.pathname.startsWith("/auth");

  if (isProtected && !isSession) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  const publicAuthRoutes = [
    "/auth/verify",
    "/auth/verify/success",
    "/auth/verify/error",
  ];

  if (
    isAuth &&
    isSession &&
    !publicAuthRoutes.some((r) => req.nextUrl.pathname.startsWith(r))
  ) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }
  return NextResponse.next();
}

export default middelware;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
