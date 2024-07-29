import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  const loginUrl = new URL('/login', request.url);
  const homeUrl = new URL('/', request.url);

  const authPaths = ['/api/auth', '/api/auth/signin', '/api/auth/callback'];

  // _next 디렉터리에 있는 캐시된 데이터, 이미지 및 CSS 파일과 관련된 경로를 처리 방지
  // auth 관련 리퀘스트는 허용
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    authPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/set-up') && !accessToken) {
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
