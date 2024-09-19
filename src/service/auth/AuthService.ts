import Service from '../service';

export interface UserDetail {
  authId: string;
  provider: string;
  email: string;
  nickname: string;
  oAuthToken: string;
  profileImgUrl: string;
  isNewMember: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
}
interface SignInData {
  provider: string;
  email: string;
  oAuthToken: string;
}

interface SignUpData {
  authId: string;
  email: string;
  nickname: string;
  profileImgUrl: string;
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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
