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
      className={`flex items-center justify-center px-3 py-2 border border-slate-200 bg-white rounded-xlarge ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SButton;
