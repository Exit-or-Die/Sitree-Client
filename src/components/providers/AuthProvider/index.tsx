'use client';

import withModal from '@/enhancers/WithModal';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Optional } from 'types/common';

import SignInModal from '@/components/account/SignInModal';

interface AuthContextType {
  toggleLogin: boolean;
  setToggleLogin: (value: boolean) => void;
}

const AuthContext = createContext<Optional<AuthContextType>>(undefined);

const SignWithModal = withModal(SignInModal);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [toggleLogin, setToggleLogin] = useState(false);

  const onClickCloseModal = () => {
    setToggleLogin(false);
  };

  return (
    <AuthContext.Provider value={{ toggleLogin, setToggleLogin }}>
      {children}
      <SignWithModal isVisible={toggleLogin} onClickClose={onClickCloseModal} />
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Error at AuthContext');
  }

  return context;
}
