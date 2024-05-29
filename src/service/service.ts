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
    this.baseURL = `https://jsonplaceholder.typicode.com/`;
    this.headers = {
      csrf: 'token',
      Referer: this.baseURL
    };

    this.requestInterceptors = [];
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
    config?: RequestInit
  ): Promise<T> {
    const requestConfig: RequestInit & { url: string; method: string } = {
      ...config,
      method,
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
        ...config?.headers
      },
      credentials: 'include', // Ensure this is typed correctly
      body: data ? JSON.stringify(data) : undefined,
      url: this.baseURL + url
    };

    try {
      await this.runInterceptors(this.requestInterceptors, requestConfig);

      const { url, ...fetchConfig } = requestConfig;
      const response = await fetch(url, fetchConfig);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData: T = await response.json();

      // Run response interceptors with a separate config object
      await this.runInterceptors(this.responseInterceptors, {
        ...requestConfig,
        response: responseData
      } as RequestInit & { url: string; method: string; response?: unknown });

      return responseData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  private get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  private delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private head<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('HEAD', url, undefined, config);
  }

  private options<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('OPTIONS', url, undefined, config);
  }

  private post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  private put<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  private patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }
}

export default Service;
