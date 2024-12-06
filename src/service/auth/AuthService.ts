import { Maybe, Nullable } from 'types/common';
import { getCookie } from 'cookies-next/client';

import Service from '../service';

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
  profileImgUrl: Maybe<string>;
  thirdPartyProfileUrl?: string;
  belonging?: string;
}

interface ValidateUsername {
  exist: boolean;
}

class AuthService extends Service {
  signIn(data: SignInData) {
    return this.http.post<UserDetail>('members/sign-in', data);
  }

  signUp(data: SignUpData) {
    return this.http.post<UserDetail>('members/sign-up', data);
  }

  validateUsername(nickname: string) {
    return this.http.get<ValidateUsername>(`members/nickname/exist?nickname=${nickname}`);
  }

  testComments() {
    const accessToken = getCookie('accessToken');
    const oldToken = 'eyJhbGciOiJSUzI1NiJ9.eyJtZW1iZXJDbGFpbSI6eyJwcm92aWRlciI6IkdPT0dMRSIsImVtYWlsIjoiYmVhcjA0MDEyQGdtYWlsLmNvbSJ9LCJpYXQiOjE3MzMyMjc2OTgsImV4cCI6MTczMzIyNTg5OCwiaXNzIjoiRU9EIiwic3ViIjoiYmVhcjA0MDEyQGdtYWlsLmNvbSJ9.b2PuZfnqhN4WcPrQzL2Cq8KqwFrKRpNYJ6iJkBm6Mw_37oMZIokwsORKFKg7C23Hz44luAlBKLvAyz8jHqIyjiWmOYyvPTCKnd1z5AO0CyzY6qAOVsnyPBrd4ecWKzBojB7uSp6ibnCgaUVGvjmyIU5FzqgSO6v2-7kSa1I9tzkxhBD2Oa_-Hh72oydwLMzGFTNMwuX_pjmX4JQ8TIXjQsFjDkGVFjk7iMbxzd1takH6mZSx3A43RgOPaBqIpYIvqFgjIHhZ8rx4-9-HJWJWemcmJ_6LLRD9YCfhDqbxF_naX_5SizpQyzQmjB3xXVFUte63duIyE162qdZ_ioOr_w'
    const response = this.http.get<any>('comments/project/1', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    response.then((data) => {
      console.log('fk');
      console.log(data);
    })
    return response;
  }

  renewAccessToken() {
    const refreshToken = getCookie('refreshToken');
    const response = this.http.get<any>('members/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      }
    });
    return response;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
