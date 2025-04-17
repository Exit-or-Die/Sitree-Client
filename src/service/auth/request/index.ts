export interface SignInData {
  provider: string;
  email: string;
  oAuthToken: string;
}

export interface SignUpData {
  provider: string;
  oAuthToken: string;
  email: string;
  nickname: string;
  thirdPartyProfileUrl?: string;
  belonging?: string;
}

export interface SearchUserRequest {
  q: string;
  pageNo?: number;
  size?: number;
}
