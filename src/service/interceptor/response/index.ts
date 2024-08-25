import { RequestConfigWithResponse } from '..';

export const handleResponseByCode = <T>(config: RequestConfigWithResponse<T>): void => {
  const { response } = config;

  // response가 undefined인지 확인
  if (!response) {
    throw new Error('API Error: Response is undefined');
  }

  // code 값에 따라 처리
  if (response.code !== 0) {
    throw new Error(`API Error: ${response.code}`);
  }
};
