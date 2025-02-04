import { isBrowser } from '@/utils/misc';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

import { Header } from '@/components/header';

import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  const wrapperStyles = cn('flex flex-col min-h-screen bg-slate-100', className);
  const cookieStore = cookies();

  const isLoggedIn = () => {
    if (!isBrowser()) {
      return cookieStore.has('accessToken');
    }

    return document.cookie.includes('accessToken');
  };

  const isUserExist = isLoggedIn();

  return (
    <div className={wrapperStyles}>
      <Header isUser={isUserExist} />
      <main className="flex-1">{children}</main>
    </div>
  );
};
