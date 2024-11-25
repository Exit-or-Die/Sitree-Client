import { ReactNode } from 'react';

import { Header } from '@/components/header';

import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  const wrapperStyles = cn('flex flex-col min-h-screen bg-slate-100', className);

  return (
    <div className={wrapperStyles}>
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};
