'use client';

import { isLoggedIn } from '@/service/auth/queries';
import { useState, useEffect } from 'react';

import { useAuthContext } from '@/components/providers/AuthProvider';

import { getCookie } from './cookie';

function useWithAuthCallback(callback: () => void) {
  const { setToggleLogin } = useAuthContext();
  const [isSignIn, setIsSignIn] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkLoginStatus = async () => {
      const loggedInFromAuth = await isLoggedIn();
      const hasRefreshToken = Boolean(getCookie('refreshToken'));
      const isAuthenticated = loggedInFromAuth || hasRefreshToken;

      if (mounted) {
        setIsSignIn(isAuthenticated);
      }
    };

    checkLoginStatus();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAuthCallback = () => {
    if (isSignIn === null) {
      return;
    }

    if (!isSignIn) {
      setToggleLogin(true);

      return;
    }

    callback();
  };

  return handleAuthCallback;
}

export default useWithAuthCallback;
