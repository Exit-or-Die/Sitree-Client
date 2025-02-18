import { getDehydratedQuery, getQueryClient } from '@/hooks/react-query/react-query';
import AuthQueryOptions from '@/service/auth/queries';
import { HydrationBoundary } from '@tanstack/react-query';
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
  const queryClient = getQueryClient();

  const userCookies = cookies();
  const { queryKey, queryFn } = AuthQueryOptions.validateUser(() => userCookies);
  await queryClient.prefetchQuery({ queryKey, queryFn });
  const query = await getDehydratedQuery({ queryKey, queryFn });

  return (
    <div className={wrapperStyles}>
      <HydrationBoundary state={{ queries: [query] }}>
        <Header />
        <main className="flex-1">{children}</main>
      </HydrationBoundary>
    </div>
  );
};
