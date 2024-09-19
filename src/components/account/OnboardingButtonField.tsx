import React from 'react';

type Props = {
  isUsernameValid: boolean | null;
  className?: string;
};

const OnboardingButtonField = ({ isUsernameValid, className }: Props) => {
  return (
    <button
      type="submit"
      disabled={!isUsernameValid}
      className={`flex mt-[75px] h-[64px] text-white-100 text-large rounded-xlarge border-icon px-[24px] py-[20px] w-full justify-center items-center ${className} ${
        !isUsernameValid
          ? 'bg-slate-70 cursor-not-allowed'
          : 'bg-gradient-to-r from-tree-50 to-[#00CAA5]'
      }`}
    >
      사이트리 시작
    </button>
  );
};

export default OnboardingButtonField;
