interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const SButton = ({ children, ...props }: ButtonProps) => {
  const { className, onClick } = props;

  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SButton;
