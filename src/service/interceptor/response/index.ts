import AuthService from '@/service/auth/AuthService';
import { RequestConfigWithResponse } from '..';
import { ApiResponse } from '@/service/service';
import { cookies } from 'next/headers';

export const handleResponseByCode = async <T>(config: RequestConfigWithResponse<T>): Promise<void> => {
  const { response } = config;

  // response가 undefined인지 확인
  if (!response) {
    throw new Error('API Error: Response is undefined');
  }

  if (response.code === 401) {
    // cookie 를 통해서 리프래쉬 토큰 발급
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken');

    // 1. 쿠키를 통해서 들고올지
    // 2. api를 쓰는곳에서 파라미터로 refreshToken 줄지
    const newTokens = await AuthService.renewAccessToken(refreshToken);
    console.log(newTokens);

    // 각각 쿠키쪽 accessToken, refreshToken 세팅

    // config.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
    // const newResponse = await fetch(config.url, config);
    // const newResponseData: ApiResponse<T> = await newResponse.json();
    // config.response = newResponseData;
  }

  // code 값에 따라 처리
  if (response.code !== 0) {
    throw new Error(`API Error: ${response.code}`);
  }
};
