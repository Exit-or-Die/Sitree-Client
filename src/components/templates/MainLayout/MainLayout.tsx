import Link from 'next/link';
import { ReactNode } from 'react';

import { Header } from '@/components/header';

import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  const wrapperStyles = cn('flex flex-col min-h-screen', className);

  return (
    <div className={wrapperStyles}>
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="flex items-center justify-center p-4">
        ©
        <Link href="https://www.linkedin.com/in/mateusz-hadry%C5%9B/" className="pr-2">
          Mateusz Hadryś
        </Link>
        Copyright {new Date().getFullYear()}
      </footer>
    </div>
  );
};
