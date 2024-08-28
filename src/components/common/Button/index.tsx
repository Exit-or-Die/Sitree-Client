'use client';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const SButton = ({
  children,
  className,
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) => {
  return (
    <button
      type={type}
      // TBD whether gap-x-2, rounded-xlarge, and px-3 should be removed
      className={`flex items-center justify-center gap-x-2 px-3 py-2 border border-slate-200 bg-white rounded-xlarge ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SButton;
