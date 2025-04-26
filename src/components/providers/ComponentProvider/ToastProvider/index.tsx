'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

import SvgIcon from '@/components/common/SVGIcon';

export const TOAST_ICON = {
  info: 'info',
  error: 'error',
  success: 'success'
} as const;

type ToastIconType = keyof typeof TOAST_ICON;

interface ToastContextType {
  openToast: (icon: ToastIconType, message: string) => void;
}

interface ToastItemProps {
  icon: ToastIconType;
  message: string;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('Error at Toast Provider');

  return ctx;
}

interface Toast {
  id: string;
  icon: ToastIconType;
  message: string;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const openToast = useCallback((icon: ToastIconType, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, icon, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3300); // 3초 + transition 0.3초
  }, []);

  return (
    <ToastContext.Provider value={{ openToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} message={toast.message} icon={toast.icon} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ icon, message }: ToastItemProps) {
  const [visible, setVisible] = useState(false);

  // mount 시 올라오게, 3초 후 내려가게
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10); // 초기 mount 후 transition 작동을 위해 약간 delay
    const hideTimer = setTimeout(() => setVisible(false), 3000); // 3초 후 숨김

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const ICON_COLOR = {
    info: '#959EB2',
    error: '#FF9FA4',
    success: '#6AE597'
  };

  const gradientBackground = `linear-gradient(90deg, ${ICON_COLOR[icon]}1F 0%, rgba(0, 0, 0, 0) 25%), #2F333D`;

  return (
    <div
      className={`flex items-center gap-1.5 w-[41.2rem] h-[6.4rem] px-[2.8rem] py-4 text-[1.5rem] transform transition-all duration-300 ease-in-out
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} text-white-100 px-4 py-2 rounded-[999px] shadow-md`}
      style={{ background: gradientBackground }}
    >
      <SvgIcon
        icon={`toast_${icon}`}
        width={24}
        height={24}
        color={ICON_COLOR[icon]}
        fillRule="evenodd"
        clipRule="evenodd"
      />
      {message}
    </div>
  );
}
