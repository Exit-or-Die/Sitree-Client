'use client';

import { ToastProvider } from './ToastProvider';

export function ComponentProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {/* 여기에 추가할 Provider 있으면 감싸면 됨 */}
      {children}
    </ToastProvider>
  );
}

export * from './ToastProvider';
