import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  //쿠키에 저장된 accessToken 값 여부 확인
  if (!accessToken) {
    return NextResponse.redirect('/login'); // 없다면 미로그인 상태로 인지
  }

  //setHeaderToken(accessToken); -> header 고민

  if (request.nextUrl.pathname.startsWith('/login') && accessToken) {
    // 요청 url이 Login이거나 home일 경우 & 토큰 존재
    return NextResponse.redirect('/home');
  }
}
