import { auth } from '@core/shared/infrastructure/services/auth';
import { NextResponse } from 'next/server';

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
  // runtime: 'nodejs',
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
