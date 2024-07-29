import { useSession, signIn, signOut } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  // TODO when backend user type is defined, replace any with the correct type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [status]);

  const login = () => signIn();
  const logout = () => signOut();

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user: session?.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
