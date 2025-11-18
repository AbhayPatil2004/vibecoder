// import NextAuth from "next-auth";

// import { DEFAULT_LOGIN_REDIRECT ,
//     apiAuthPrefix,
//     publicRoutes ,
//     authRoutes

// } from "@/routes"

// import authConfig from "./auth.config";

// const { auth } = NextAuth(authConfig)

// export default auth( (req) => {
//     const { nextUrl} = req ;
//     const isLoggedIn = !!req.auth

//     const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//     const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
//     const isAuthRoute = authRoutes.includes(nextUrl.pathname)

//     if( isApiAuthRoute ){
//         return null
//     }

//     if( isAuthRoute ){
//         if( isLoggedIn ){
//             return Response.redirect( new URL(DEFAULT_LOGIN_REDIRECT , nextUrl))
//         }
//         return null
//     }

//     if( !isLoggedIn && !publicRoutes ){
//         return Response.redirect( new URL("/auth/sign-in" , nextUrl))
//     }

//     return null
// }) 

// export const config = {
//     matcher: [
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//   ],
// }

import { NextResponse } from "next/server";
import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow NextAuth API routes to proceed
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // If on auth pages (sign-in, sign-up) redirect logged-in users away
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Public routes allowed
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protected routes require login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
  }

  // Default: allow
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
