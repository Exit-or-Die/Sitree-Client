import Image from 'next/image';
import React from 'react';

type Props = {
  label: string;
  value: string;
  setValue: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  className?: string;
  showValidationButton?: boolean;
  onValidationClick?: () => void;
  isValid?: boolean | null;
  successMessage?: string;
  errorMessage?: string;
  showIcon?: boolean;
};

const OnboardingInputField = ({
  label,
  value,
  setValue,
  placeholder,
  className = '',
  showValidationButton = false,
  onValidationClick,
  isValid = null,
  successMessage,
  errorMessage,
  showIcon = false
}: Props) => {
  return (
    <div className="mb-6">
      <div className="flex text-small font-md mb-2 text-slate-30">
        <div>{label}</div>
        {showIcon && (
          <div className="ml-1 pt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="6"
              height="6"
              viewBox="0 0 6 6"
              fill="none"
            >
              <circle cx="3" cy="3" r="3" fill="#08C767" />
            </svg>
          </div>
        )}
      </div>
      <div className="mb-2 flex items-center relative">
        <input
          type="text"
          id={label}
          value={value}
          placeholder={placeholder}
          onChange={setValue}
          className={`h-[40px] flex-grow p-3 border border-slate-300 rounded-base ${className} ${
            isValid === false && 'bg-[#FFF2F2] border-0'
          }`}
        />
        {showValidationButton &&
          onValidationClick &&
          (isValid ? (
            <Image
              src="/check.svg"
              className="absolute right-3"
              width={20}
              height={20}
              alt="select icon"
            />
          ) : (
            <button
              type="button"
              className="h-[40px] px-4 py-2 border border-slate-300 rounded-large text-slate-500 ml-[6px]"
              onClick={onValidationClick}
            >
              중복 확인
            </button>
          ))}
      </div>
      {isValid === true && successMessage && (
        <p className="text-small text-tree-40">{successMessage}</p>
      )}
      {isValid === false && errorMessage && (
        <p className="text-small text-[#F6424E]">{errorMessage}</p>
      )}
    </div>
  );
};

export default OnboardingInputField;
