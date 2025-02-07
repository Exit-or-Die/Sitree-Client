import { getCookie } from '@/utils/cookie';

import {
  requestInterceptors,
  responseInterceptors,
  runInterceptors,
  RequestConfigWithResponse,
  InterceptorFunction
} from './interceptor';

interface HTTPInstance {
  get<T>(url: string, config?: RequestInit & { includeAuth?: boolean }): Promise<T>;
  delete<T>(url: string, config?: RequestInit & { includeAuth?: boolean }): Promise<T>;
  head<T>(url: string, config?: RequestInit & { includeAuth?: boolean }): Promise<T>;
  options<T>(url: string, config?: RequestInit & { includeAuth?: boolean }): Promise<T>;
  post<T>(
    url: string,
    data?: unknown,
    config?: RequestInit & { includeAuth?: boolean }
  ): Promise<T>;
  put<T>(url: string, data?: unknown, config?: RequestInit & { includeAuth?: boolean }): Promise<T>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: RequestInit & { includeAuth?: boolean }
  ): Promise<T>;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  value: T;
}

class Service {
  public http: HTTPInstance;

  private baseURL: string;

  private headers: Record<string, string>;

  constructor() {
    this.baseURL = 'https://api.si-tree.com/';
    this.headers = {
      csrf: 'token',
      Referer: this.baseURL
    };

    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this)
    };
  }

  private getToken(): string {
    // 토큰을 가져오는 로직을 구현합니다.
    // 예를 들어, 로컬 스토리지에서 토큰을 가져올 수 있습니다.
    return getCookie('accessToken') || '';
  }

  public addRequestInterceptor(interceptor: InterceptorFunction): void {
    requestInterceptors.push(interceptor);
  }

  public addResponseInterceptor(interceptor: InterceptorFunction): void {
    responseInterceptors.push(interceptor);
  }

  private async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config: RequestInit & { includeAuth?: boolean } = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      ...this.headers,
      'Content-Type': 'application/json',
      ...(config.headers as Record<string, string>)
    };

    if (config.includeAuth) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }

    const requestConfig: RequestConfigWithResponse<T> = {
      ...config,
      method,
      headers,
      credentials: 'include',
      body: data ? JSON.stringify(data) : undefined,
      url: this.baseURL + url
    };

    try {
      await runInterceptors(requestInterceptors, requestConfig);

      const { url: requestUrl, ...fetchConfig } = requestConfig;
      const response = await fetch(requestUrl, fetchConfig);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData: ApiResponse<T> = await response.json();
      requestConfig.response = responseData;

      await runInterceptors(responseInterceptors, requestConfig);

      // response가 undefined인지 확인 후 반환
      if (!requestConfig.response) {
        throw new Error('API Error: Response is undefined after processing');
      }

      return requestConfig.response.value;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  private get<T>(url: string, config: RequestInit & { includeAuth?: boolean } = {}): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  private delete<T>(url: string, config: RequestInit & { includeAuth?: boolean } = {}): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private head<T>(url: string, config: RequestInit & { includeAuth?: boolean } = {}): Promise<T> {
    return this.request<T>('HEAD', url, undefined, config);
  }

  private options<T>(
    url: string,
    config: RequestInit & { includeAuth?: boolean } = {}
  ): Promise<T> {
    return this.request<T>('OPTIONS', url, undefined, config);
  }

  private post<T>(
    url: string,
    data?: unknown,
    config: RequestInit & { includeAuth?: boolean } = {}
  ): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  private put<T>(
    url: string,
    data?: unknown,
    config: RequestInit & { includeAuth?: boolean } = {}
  ): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  private patch<T>(
    url: string,
    data?: unknown,
    config: RequestInit & { includeAuth?: boolean } = {}
  ): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }
}

export default Service;
