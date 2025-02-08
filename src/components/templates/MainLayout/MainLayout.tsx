import AuthQueryOptions from '@/service/auth/queries';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

import { Header } from '@/components/header';

import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MainLayout = async ({ children, className }: MainLayoutProps) => {
  const wrapperStyles = cn('flex flex-col min-h-screen bg-slate-100', className);
  const queryClient = new QueryClient();

  const { queryKey, queryFn } = AuthQueryOptions.validateUser(cookies);
  await queryClient.prefetchQuery({ queryKey, queryFn });

  return (
    <div className={wrapperStyles}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
      </HydrationBoundary>
      <main className="flex-1">{children}</main>
    </div>
  );
};
