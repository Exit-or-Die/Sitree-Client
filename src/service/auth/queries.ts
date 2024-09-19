import AuthService from './AuthService';

const queryKeys = {
  signIn: () => ['auth', 'signin'] as const,
  signUp: () => ['auth', 'signup'] as const,
  validateUsername: (nickname: string) => ['auth', 'validateUsername', nickname] as const
};

const AuthQueryOptions = {
  signIn: (signInData: { provider: string; email: string; oAuthToken: string }) => ({
    queryKey: queryKeys.signIn(),
    queryFn: () => AuthService.signIn(signInData)
  }),
  signUp: (signUpData: {
    authId: string;
    email: string;
    nickname: string;
    profileImgUrl: string;
  }) => ({
    queryKey: queryKeys.signUp(),
    queryFn: () => AuthService.signUp(signUpData)
  }),
  validateUsername: (nickname: string) => ({
    queryKey: queryKeys.validateUsername(nickname),
    queryFn: () => AuthService.validateUsername(nickname),
    enabled: !!nickname
  })
};

export default AuthQueryOptions;
