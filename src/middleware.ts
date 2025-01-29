import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from '@/@core/infra/auth';

const { auth } = NextAuth(authConfig);

export const LOGIN_ROUTE = '/login';
export const ADMIN_DASHBOARD = '/admin';

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isLoginPage = nextUrl.pathname === LOGIN_ROUTE;
  const isPrivateRoute = nextUrl.pathname.startsWith('/admin');

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD, nextUrl));
  }

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
