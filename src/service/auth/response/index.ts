import { Nullable } from 'types/common';

export interface UserDetail {
  authId: string;
  provider: string;
  email: string;
  nickname: string;
  oAuthToken: string;
  profileImgUrl: string;
  isNewMember: boolean;
  memberId: number;
  accessToken?: Nullable<string>;
  refreshToken?: Nullable<string>;
}

export interface ValidateUsername {
  exist: boolean;
}
