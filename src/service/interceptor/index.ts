import { RequestConfigWithResponse } from '@/service/types';

import { handleResponseByCode } from './response';

export type InterceptorFunction<T = unknown> = (
  config: RequestConfigWithResponse<T>
) => Promise<void> | void;

export const requestInterceptors: Array<InterceptorFunction> = [];
export const responseInterceptors: Array<InterceptorFunction> = [handleResponseByCode];

export const runInterceptors = async <T>(
  interceptors: Array<InterceptorFunction<T>>,
  config: RequestConfigWithResponse<T>
): Promise<void> => {
  for (const interceptor of interceptors) {
    await interceptor(config);
  }
};
