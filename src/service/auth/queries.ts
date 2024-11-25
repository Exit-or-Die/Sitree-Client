import { setCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';

import AuthService, { SignInData, SignUpData } from './AuthService';

const queryKeys = {
  signIn: () => ['auth', 'signin'] as const,
  signUp: () => ['auth', 'signup'] as const,
  validateUsername: (nickname: string) => ['auth', 'validateUsername', nickname] as const
};

const AuthQueryOptions = {
  signIn: (signInData: SignInData) => ({
    mutateKey: queryKeys.signIn(),
    mutateFn: () => AuthService.signIn(signInData)
  }),
  signUp: (signUpData: SignUpData) => ({
    mutateKey: queryKeys.signUp(),
    mutateFn: () => AuthService.signUp(signUpData)
  }),
  validateUsername: (nickname: string) => ({
    mutateKey: queryKeys.validateUsername(nickname),
    mutateFn: () => AuthService.validateUsername(nickname),
    enabled: !!nickname
  })
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (credentials: SignUpData) => AuthQueryOptions.signUp(credentials).mutateFn(),
    onSuccess: (data) => {
      if (!data.accessToken) return;
      setCookie('accessToken', data.accessToken);
    },
    onError: (error) => {
      console.error('Signup failed:', error);
    }
  });
};

export default AuthQueryOptions;
