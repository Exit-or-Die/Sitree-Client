import { PaginationResponse } from '@/service/types';
import { Nullable } from 'types/common';

export interface UserDetail {
  authId: string;
  provider: string;
  email: string;
  nickname: string;
  oAuthToken: string;
  profileImgUrl: string;
  isNewMember: boolean;
  accessToken?: Nullable<string>;
  refreshToken?: Nullable<string>;
}

export interface ValidateUsername {
  exist: boolean;
}

export interface UserResult {
  memberId: number;
  provider: string;
  nickname: string;
  email: string;
  profileImgUrl: string;
  thirdPartyProfileUrl: string;
  belongingId: number;
}

export interface UserSearchResult extends PaginationResponse {
  contents: Array<UserResult>;
}
