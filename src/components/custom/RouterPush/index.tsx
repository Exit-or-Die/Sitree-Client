'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  path: string;
  children: ReactNode;
  className?: string;
}

const RouterPush: React.FC<Props> = ({ path, className, children }) => {
  const router = useRouter();

  return (
    <div className={className} onClick={() => router.push(path)}>
      {children}
    </div>
  );
};

export default RouterPush;
