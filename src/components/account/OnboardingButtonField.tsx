import { Nullable } from '@/utils/common';
import React from 'react';

import SButton from '@/components/common/Button';

type Props = {
  isUsernameValid: Nullable<boolean>;
  className?: string;
};

const OnboardingButtonField = ({ isUsernameValid, className }: Props) => {
  return (
    <SButton
      type="submit"
      className={`mt-[75px] h-[64px] text-white-100 text-large border-icon px-[24px] py-[20px] w-full justify-center items-center ${className} ${
        !isUsernameValid
          ? 'bg-slate-70 cursor-not-allowed'
          : 'bg-gradient-to-r from-tree-50 to-[#00CAA5]'
      }`}
      disabled={!isUsernameValid}
    >
      사이트리 시작
    </SButton>
  );
};

export default OnboardingButtonField;
