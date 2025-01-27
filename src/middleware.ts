import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from '@/@core/infra/auth';

const { auth } = NextAuth(authConfig);

export const LOGIN_ROUTE = '/login';

export default auth((req) => {
  const { nextUrl } = req;

  const isPrivateRoute = nextUrl.pathname.startsWith('/admin');

  if (isPrivateRoute) {
    const isAuthenticated = !!req.auth;
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Match all relevant routes
};
