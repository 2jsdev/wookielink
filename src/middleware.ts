import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from '@/@core/infra/auth';

const { auth } = NextAuth(authConfig);

export const ROOT = '/';
export const DEFAULT_REDIRECT = '/admin';
export const LOGIN_ROUTE = '/login';

// Regular expression for dynamic routes like /username
const PUBLIC_DYNAMIC_ROUTE_REGEX = /^\/[a-zA-Z0-9_-]+$/;

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  // Determine if this is the `/admin` route (private)
  const isDashboardRoute = nextUrl.pathname === DEFAULT_REDIRECT;

  // Determine if this is the login route
  const isLoginRoute = nextUrl.pathname === LOGIN_ROUTE;

  // Determine if it is a public dynamic route (like /username)
  const isPublicDynamicRoute = PUBLIC_DYNAMIC_ROUTE_REGEX.test(
    nextUrl.pathname
  );

  // If the user is authenticated and is trying to access /login, redirect to /admin
  if (isAuthenticated && isLoginRoute) {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  // If the user is authenticated and is trying to access /admin, allow access
  if (isAuthenticated && isDashboardRoute) {
    return NextResponse.next(); // Allow access to the admin
  }

  // If the user is authenticated and is not on a private route (/admin), allow access
  if (isAuthenticated && !isDashboardRoute && !isLoginRoute) {
    return NextResponse.next(); // Allow access to all public routes, including dynamic ones
  }

  // If the user is not authenticated and is trying to access a private route (/admin), redirect to the root (login)
  if (!isAuthenticated && isDashboardRoute) {
    return Response.redirect(new URL(ROOT, nextUrl)); // Redirect to login or root
  }

  // If the user is not authenticated and is trying to access a public or dynamic route, allow access
  return NextResponse.next(); // Allow access to public or dynamic routes
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
