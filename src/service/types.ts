export interface ApiResponse<T> {
  code: number;
  message: string;
  value: T;
}

export interface RequestInitWithAuth extends RequestInit {
  includeAuth?: boolean;
}

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

export interface PaginationResponse {
  page: number;
  size: number;
  total: number;
  hasPrev: boolean;
  hasNext: boolean;
}
