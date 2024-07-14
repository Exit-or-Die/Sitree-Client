import Service from '../service';

interface AuthResponse {
  code: number;
  message: string;
  value: {
    authId: string;
    email: string;
    nickname: string;
    profileImgUrl: string;
    isNewMember?: boolean;
    accessToken?: string;
    refreshToken?: string;
  };
}

interface SignInData {
  authId: string;
  email: string;
  nickname: string;
  profileImgUrl: string;
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
