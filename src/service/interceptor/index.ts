import { ApiResponse, RequestInitWithAuth } from '../service';
import { handleResponseByCode } from './response';

export interface RequestConfigWithResponse<T> extends RequestInitWithAuth {
  url: string;
  method: string;
  request: <T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInitWithAuth
  ) => Promise<T>;
  baseURL: string;
  response?: ApiResponse<T>;
}

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
