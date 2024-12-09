import AuthService from '@/service/auth/AuthService';

import { RequestConfigWithResponse } from '..';

import { setCookie } from 'cookies-next/client';

export const handleResponseByCode = async <T>(
  config: RequestConfigWithResponse<T>
): Promise<void> => {
  const { response } = config;

  // response가 undefined인지 확인
  if (!response) {
    throw new Error('API Error: Response is undefined');
  }

  // accessToken 만료되었을시
  if (response.code === 401) {
    console.log('Access token expired. Renewing token...');
    try {
      const { accessToken, refreshToken } = await AuthService.renewAccessToken();
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);

      const updatedConfig: RequestConfigWithResponse<T> = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`
        }
      };

      const { pathname } = new URL(updatedConfig.url);
      const json: T = await updatedConfig.request(
        updatedConfig.method,
        pathname.slice(1),
        updatedConfig.body,
        updatedConfig
      );

      config.response = {
        code: 0,
        message: 'successfully fetched!',
        value: json
      };

      return;
    } catch (error) {
      console.error('Failed to renew token:', error);
      throw new Error('Unauthorized: Failed to renew access token');
    }
  }

  // code 값에 따라 처리
  if (response.code !== 0) {
    throw new Error(`API Error: ${response.code}`);
  }
};
