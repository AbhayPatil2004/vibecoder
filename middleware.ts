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

  // 1. Allow API auth routes (NextAuth internal)
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // 2. If the user is already logged in → redirect away from sign-in / sign-up pages
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // 3. If it's a public route → allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 4. Protected routes → require login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/sign-in", nextUrl));
  }

  // 5. Otherwise → allow
  return NextResponse.next();
});

// Tell Next.js which routes this middleware should run on
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
