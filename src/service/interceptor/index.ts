import { handleResponseByCode } from './response';

export interface RequestConfigWithResponse extends RequestInit {
  url: string;
  method: string;
  response?: unknown;
}

export type InterceptorFunction = (config: RequestConfigWithResponse) => Promise<void> | void;

export const requestInterceptors: InterceptorFunction[] = [];
export const responseInterceptors: InterceptorFunction[] = [handleResponseByCode];

export const runInterceptors = async (
  interceptors: Array<InterceptorFunction>,
  config: RequestConfigWithResponse
): Promise<void> => {
  for (const interceptor of interceptors) {
    await interceptor(config);
  }
};
