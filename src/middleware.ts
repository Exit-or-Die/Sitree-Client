import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  const loginUrl = new URL('/login', request.url);
  const homeUrl = new URL('/home', request.url);

  if (!request.nextUrl.pathname.startsWith('/login') && !accessToken) {
    return NextResponse.redirect(loginUrl);
  }

  if (request.nextUrl.pathname.startsWith('/login') && accessToken) {
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
