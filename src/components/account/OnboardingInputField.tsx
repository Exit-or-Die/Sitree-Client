import React from 'react';
import { Nullable } from 'types/common';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';
import SInput from '@/components/common/Input';

type Props = {
  label: string;
  value: string;
  setValue: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  className?: string;
  showValidationButton?: boolean;
  onValidationClick?: () => void;
  isValid?: Nullable<boolean>;
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
        <SInput
          type="text"
          className={`flex-grow h-[44px] p-3 border border-slate-300 rounded-base text-small ${className} ${
            isValid === false && 'bg-[#FFF2F2] border-0'
          }`}
          placeholder={placeholder}
          value={value}
          onChange={setValue}
        />
        {showValidationButton &&
          onValidationClick &&
          (isValid ? (
            <SImage
              src="/check.svg"
              className="absolute right-3 top-3"
              width={20}
              height={20}
              alt="select icon"
            />
          ) : (
            <SButton
              className="h-[44px] border border-slate-300 rounded-large text-slate-500 ml-[6px] text-[14px] whitespace-nowrap"
              onClick={onValidationClick}
            >
              중복 확인
            </SButton>
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
