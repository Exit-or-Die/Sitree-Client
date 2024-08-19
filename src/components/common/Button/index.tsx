interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const SButton = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center gap-x-2 px-3 py-2 border border-slate-200 bg-white rounded-xlarge ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SButton;
