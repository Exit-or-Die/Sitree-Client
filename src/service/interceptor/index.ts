export type InterceptorFunction = (
  config: RequestInit & { url: string; method: string }
) => Promise<void> | void;

export const requestInterceptors: InterceptorFunction[] = [];
export const responseInterceptors: InterceptorFunction[] = [];

export const runInterceptors = async (
  interceptors: Array<InterceptorFunction>,
  config: RequestInit & { url: string; method: string }
): Promise<void> => {
  for (const interceptor of interceptors) {
    await interceptor(config);
  }
};
