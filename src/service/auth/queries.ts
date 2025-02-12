import { COOKIE_KEY } from '@/constants/cookie';
import { setCookie } from '@/utils/cookie';
import { getCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

import AuthService from './AuthService';
import { SignInData, SignUpData } from './request';

const queryKeys = {
  signIn: () => ['auth', 'signin'] as const,
  signUp: () => ['auth', 'signup'] as const,
  validateUsername: (nickname: string) => ['auth', 'validateUsername', nickname] as const,
  validateUser: () => ['auth', 'validateUser'] as const
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
  }),
  validateUser: (cookies?: () => ReadonlyRequestCookies) => ({
    queryKey: queryKeys.validateUser(),
    queryFn: () => isLoggedIn(cookies)
  })
};

const isLoggedIn = async (cookies?: () => ReadonlyRequestCookies): Promise<boolean> => {
  const accessToken = await getCookie(COOKIE_KEY.ACCESS_TOKEN, { cookies });

  return !!accessToken;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (credentials: SignUpData) => AuthQueryOptions.signUp(credentials).mutateFn(),
    onSuccess: (data) => {
      if (!data.accessToken || !data.refreshToken) return;
      setCookie(COOKIE_KEY.ACCESS_TOKEN, data.accessToken);
      setCookie(COOKIE_KEY.REFRESH_TOKEN, data.refreshToken);
    },
    onError: (error) => {
      console.error('Signup failed:', error);
    }
  });
};

export default AuthQueryOptions;
