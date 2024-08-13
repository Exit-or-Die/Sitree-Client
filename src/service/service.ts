import { requestInterceptors, responseInterceptors, runInterceptors } from './interceptor';

interface HTTPInstance {
  get<T>(url: string, config?: RequestInit): Promise<T>;
  delete<T>(url: string, config?: RequestInit): Promise<T>;
  head<T>(url: string, config?: RequestInit): Promise<T>;
  options<T>(url: string, config?: RequestInit): Promise<T>;
  post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
}

type InterceptorFunction = (
  config: RequestInit & { url: string; method: string }
) => Promise<void> | void;

class Service {
  public http: HTTPInstance;

  private baseURL: string;

  private headers: Record<string, string>;

  private requestInterceptors: InterceptorFunction[];

  private responseInterceptors: InterceptorFunction[];

  constructor() {
    this.baseURL = `https://api.si-tree.com/`;
    this.headers = {
      // csrf: 'token',
      Referer: this.baseURL
    };

    this.requestInterceptors = []
    this.responseInterceptors = [];

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

  public addRequestInterceptor(interceptor: InterceptorFunction): void {
    this.requestInterceptors.push(interceptor);
  }

  public addResponseInterceptor(interceptor: InterceptorFunction): void {
    this.responseInterceptors.push(interceptor);
  }

  private async runInterceptors(
    interceptors: InterceptorFunction[],
    config: RequestInit & { url: string; method: string }
  ): Promise<void> {
    for (const interceptor of interceptors) {
      await interceptor(config);
    }
  }

  private async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config: RequestInit = {}
  ): Promise<T> {
    const requestConfig: RequestInit & { url: string; method: string } = {
      ...config,
      method,
      headers: {
        ...this.headers,
        // 'Content-Type': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...config.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      url: this.baseURL + url
    };
    console.log(data ? JSON.stringify(data) : undefined)

    try {
      await runInterceptors(requestInterceptors, requestConfig);

      const { url: requestUrl, ...fetchConfig } = requestConfig;
      console.log(fetchConfig);
      const response = await fetch(requestUrl, fetchConfig);
      console.log('------------------------------------')
      console.log(requestUrl);
      console.log(fetchConfig);
      console.log('------------------------------------')
      console.log(await response.json());

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData: T = await response.json();

      await runInterceptors(responseInterceptors, {
        ...requestConfig,
        response: responseData
      } as RequestInit & { url: string; method: string; response?: unknown });

      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  private get<T>(url: string, config: RequestInit = {}): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  private delete<T>(url: string, config: RequestInit = {}): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private head<T>(url: string, config: RequestInit = {}): Promise<T> {
    return this.request<T>('HEAD', url, undefined, config);
  }

  private options<T>(url: string, config: RequestInit = {}): Promise<T> {
    return this.request<T>('OPTIONS', url, undefined, config);
  }

  private post<T>(url: string, data?: unknown, config: RequestInit = {}): Promise<T> {
    console.log(url);
    console.log(data);
    return this.request<T>('POST', url, data, config);
  }

  private put<T>(url: string, data?: unknown, config: RequestInit = {}): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  private patch<T>(url: string, data?: unknown, config: RequestInit = {}): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }
}

export default Service;
