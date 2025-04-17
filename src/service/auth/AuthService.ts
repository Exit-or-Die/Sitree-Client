import Service from '@/service/service';

import { SearchUserRequest, SignInData, SignUpData } from './request';
import { UserDetail, UserSearchResult, ValidateUsername } from './response';

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

  searchUsers({ q, pageNo = 0, size = 10 }: SearchUserRequest) {
    const params = new URLSearchParams({
      q,
      pageNo: pageNo.toString(),
      size: size.toString()
    }).toString();

    return this.http.get<UserSearchResult>(`members/search?${params}`, {
      includeAuth: true
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
