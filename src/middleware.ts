import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  const loginUrl = new URL('/login', request.url);
  const homeUrl = new URL('/home', request.url);

  // _next 디렉터리에 있는 캐시된 데이터, 이미지 및 CSS 파일과 관련된 경로를 처리 방지
  if (request.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // if (!request.nextUrl.pathname.startsWith('/login') && !accessToken) {
  //   return NextResponse.redirect(loginUrl);
  // }

  if (request.nextUrl.pathname.startsWith('/login') && accessToken) {
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
