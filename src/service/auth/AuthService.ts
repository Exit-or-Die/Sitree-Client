import Service from '../service';

export interface UserDetail {
  authId: string;
  email: string;
  nickname: string;
  profileImgUrl: string;
  isNewMember: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
}
interface AuthResponse {
  code: number;
  message: string;
  value: UserDetail;
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

class AuthService extends Service {
  signIn(data: SignInData) {
    return this.http.post<AuthResponse>('members/sign-in', data);
  }

  signUp(data: SignUpData) {
    return this.http.post<AuthResponse>('members/sign-up', data);
  }
}

export default new AuthService();
