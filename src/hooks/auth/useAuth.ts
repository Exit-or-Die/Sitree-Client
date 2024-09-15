import AuthService from '@/service/auth/AuthService';
import { setCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';

export const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: (credentials) => AuthService.signUp(credentials),
    onSuccess: (data) => {
      if (!data.accessToken) return;
      setCookie('accessToken', data.accessToken);
    },
    onError: (error) => {
      console.error('Signup failed:', error);
    }
  });

  return mutation;
};
