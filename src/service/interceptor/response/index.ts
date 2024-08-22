import { RequestConfigWithResponse } from '..';

export const handleResponseByCode = async (config: RequestConfigWithResponse): Promise<void> => {
  const { response } = config;

  // response가 undefined인지 확인
  if (!response) {
    throw new Error('API Error: Response is undefined');
  }

  const responseT = response as { code: number; value: unknown };

  // code 값에 따라 처리
  if (responseT.code !== 0) {
    throw new Error(`API Error: ${responseT.code}`);
  }

  // response.value를 config.response에 할당
  config.response = responseT.value;
};
