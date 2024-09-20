'use client';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  disabled?: boolean;
}

const STYLE_BY_SIZE = {
  sm: 'rounded-base px-2 py-1.5 text-[13px] font-md',
  md: 'rounded-[10px] px-3 py-2 text-small font-md',
  lg: 'rounded-large px-4 py-3 text-[15px] font-md',
  xl: 'rounded-large px-4 py-4 text-base font-bd',
  '2xl': 'rounded-[14px] px-5 py-5 text-base font-bd'
};

const SButton = ({
  children,
  className,
  onClick,
  type = 'button',
  size = 'md',
  disabled = false
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`flex items-center border border-slate-200 ${STYLE_BY_SIZE[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SButton;
